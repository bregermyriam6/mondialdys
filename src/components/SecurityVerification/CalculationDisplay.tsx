import React from 'react';

interface CalculationDisplayProps {
  firstNumber: number;
  secondNumber: number;
  isRefreshing: boolean;
}

export function CalculationDisplay({ firstNumber, secondNumber, isRefreshing }: CalculationDisplayProps) {
  return (
    <div className="flex items-center justify-center space-x-4 text-3xl font-bold mb-6">
      <div className={`transition-all duration-500 ${isRefreshing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <span className="bg-[#8b1850] text-white w-16 h-16 rounded-lg flex items-center justify-center shadow-lg number-transition">
          {firstNumber}
        </span>
      </div>
      <span className={`text-[#8b1850] transition-all duration-500 ${isRefreshing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        +
      </span>
      <div className={`transition-all duration-500 ${isRefreshing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <span className="bg-[#8b1850] text-white w-16 h-16 rounded-lg flex items-center justify-center shadow-lg number-transition">
          {secondNumber}
        </span>
      </div>
      <span className={`text-[#8b1850] transition-all duration-500 ${isRefreshing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        =
      </span>
      <div className={`transition-all duration-500 ${isRefreshing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <span className="bg-gray-100 w-16 h-16 rounded-lg flex items-center justify-center shadow-inner number-transition">
          ?
        </span>
      </div>
    </div>
  );
}