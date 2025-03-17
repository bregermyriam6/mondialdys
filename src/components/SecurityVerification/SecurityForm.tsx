import React from 'react';
import { RefreshCw } from 'lucide-react';
import { CalculationDisplay } from './CalculationDisplay';

interface SecurityFormProps {
  firstNumber: number;
  secondNumber: number;
  userAnswer: string;
  error: boolean;
  isRefreshing: boolean;
  onAnswerChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onRegenerate: () => void;
}

export function SecurityForm({
  firstNumber,
  secondNumber,
  userAnswer,
  error,
  isRefreshing,
  onAnswerChange,
  onSubmit,
  onRegenerate
}: SecurityFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Pour prouver que vous êtes humain, veuillez résoudre ce calcul simple :
        </p>
        <CalculationDisplay
          firstNumber={firstNumber}
          secondNumber={secondNumber}
          isRefreshing={isRefreshing}
        />
        <div className="relative">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg text-center text-xl transition-all duration-300 hover:shadow-md outline-none"
            placeholder="Votre réponse"
          />
        </div>
        {error && (
          <p className="text-red-500 mt-2 animate-fade-in">
            Réponse incorrecte, veuillez réessayer.
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-[#8b1850] text-white px-6 py-3 rounded-lg hover:bg-[#6d1340] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Vérifier
        </button>
        <button
          type="button"
          onClick={onRegenerate}
          className={`px-4 py-3 border border-[#8b1850] text-[#8b1850] rounded-lg hover:bg-[#8b1850] hover:text-white transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 ${isRefreshing ? 'animate-spin' : ''}`}
        >
          <RefreshCw className="w-5 h-5 refresh-icon-hover" />
        </button>
      </div>
    </form>
  );
}