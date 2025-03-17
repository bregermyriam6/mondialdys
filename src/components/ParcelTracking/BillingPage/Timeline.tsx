import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface Step {
  step: number;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface TimelineProps {
  steps: Step[];
}

export function Timeline({ steps }: TimelineProps) {
  const getProgressWidth = () => {
    const completedSteps = steps.filter(s => s.status === 'completed').length;
    const totalSteps = steps.length - 1;
    return `${(completedSteps / totalSteps) * 100}%`;
  };

  return (
    <div className="mb-12">
      <div className="relative">
        <div className="absolute left-0 top-[22px] w-full h-1 bg-gray-200">
          <div 
            className="absolute left-0 top-0 h-full bg-[#96154a] transition-all duration-300"
            style={{ width: getProgressWidth() }}
          />
        </div>

        <div className="relative flex justify-between">
          {steps.map(({ step, label, status }) => (
            <div key={`step-${step}`} className="flex flex-col items-center">
              <div 
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  transition-all duration-300 transform
                  ${status === 'completed' || status === 'current'
                    ? 'bg-[#96154a] scale-100'
                    : 'bg-gray-200 scale-95'
                  }
                `}
              >
                {status === 'completed' ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : (
                  <Circle className={`w-6 h-6 ${status === 'current' ? 'text-white' : 'text-gray-400'}`} />
                )}
              </div>
              <div className="text-center mt-2">
                <span className={`
                  text-sm font-medium
                  ${status === 'completed' || status === 'current'
                    ? 'text-[#96154a]'
                    : 'text-gray-500'
                  }
                `}>
                  {label}
                </span>
                <div className={`
                  h-1 w-8 mx-auto rounded mt-1 transition-all duration-300
                  ${status === 'completed' || status === 'current'
                    ? 'bg-[#96154a]'
                    : 'bg-gray-200'
                  }
                `} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}