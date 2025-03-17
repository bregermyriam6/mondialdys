import React from 'react';
import { ASSETS } from '../../config/assets';

interface SecurityVerificationProps {
  isShaking: boolean;
  children: React.ReactNode;
}

export function SecurityVerification({ isShaking, children }: SecurityVerificationProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className={`bg-white rounded-lg shadow-xl p-8 w-full max-w-md transform transition-transform duration-300 ease-in-out ${isShaking ? 'animate-shake' : ''}`}>
        <div className="flex flex-col items-center mb-6">
          <img 
            src={ASSETS.LOGO}
            alt="Logo"
            className="w-32 h-auto mb-4 animate-fade-in"
          />
          <h1 className="text-2xl font-bold text-gray-900 animate-slide-up">Vérification de Sécurité</h1>
        </div>
        
        <div className="h-px bg-gradient-to-r from-transparent via-[#8b1850] to-transparent w-full my-6"></div>
        
        {children}

        <div className="mt-6 text-center text-sm text-gray-500">
          Cette page est protégée par reCAPTCHA pour assurer la sécurité et prévenir les abus.
        </div>
      </div>
    </div>
  );
}