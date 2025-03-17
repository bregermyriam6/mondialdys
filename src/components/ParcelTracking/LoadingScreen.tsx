import React from 'react';
import { ASSETS } from '../../config/assets';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <img 
        src={ASSETS.LOGO}
        alt="Logo"
        className="h-24 mb-8 animate-bounce"
      />
      <div className="w-16 h-16 border-4 border-[#96154a] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}