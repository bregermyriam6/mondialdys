import React from 'react';
import { ASSETS } from '../../../config/assets';

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <img 
        src={ASSETS.LOGO}
        alt="Logo"
        className="h-24 mb-8 animate-bounce"
      />
      <div className="w-16 h-16 border-4 border-[#96154a] border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-8 text-lg text-gray-600">
        Vérification de votre paiement en cours...
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Veuillez patienter pendant que nous sécurisons votre transaction
      </p>
    </div>
  );
}