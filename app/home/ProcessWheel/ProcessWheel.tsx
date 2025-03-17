'use client';

import React from 'react';
import { ProcessWheelProps } from './types';
import { recruitmentSteps, hrProcesses } from './data';

const ProcessWheel: React.FC<ProcessWheelProps> = ({ type = 'recruitment' }) => {
  const steps = type === 'recruitment' ? recruitmentSteps : hrProcesses;
  const centerTitle = type === 'recruitment' ? 'Recruitment Process' : 'Human Resources';

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square p-4">
      {/* Center Circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
        <div className="text-center">
          <h2 className="font-bold text-lg">{centerTitle}</h2>
          {type === 'hr' && (
            <div className="mt-2">
              <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 5v2a2 2 0 01-2 2H10a2 2 0 01-2-2V5m4 0V3a1 1 0 00-1-1H7a1 1 0 00-1 1v2m4 0h4M4 7h16M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Process Steps */}
      {steps.map((step, index) => {
        const angle = (index * (360 / steps.length) - 90) * (Math.PI / 180);
        const radius = 38; // Percentage of container width
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);

        return (
          <div
            key={step.title}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              backgroundColor: step.color,
            }}
          >
            <div className="h-full flex items-center justify-center p-2">
              <p className="text-white text-center text-xs md:text-sm font-medium">
                {step.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProcessWheel;
