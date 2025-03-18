'use client';

import React from 'react';
import { ProcessWheelProps } from './types';
import { recruitmentSteps, hrProcesses } from './data';

const ProcessWheel: React.FC<ProcessWheelProps> = ({ type = 'recruitment' }) => {
  const steps = type === 'recruitment' ? recruitmentSteps : hrProcesses;
  const centerTitle = type === 'recruitment' ? 'Recruitment Process' : 'Human Resources';
  
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square p-4">
      {/* Cool Background Pattern
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 opacity-10" 
             style={{
               backgroundImage: 'radial-gradient(circle at 20px 20px, #4299e1 0, transparent 10px), radial-gradient(circle at 60px 60px, #63b3ed 0, transparent 10px), radial-gradient(circle at 100px 40px, #90cdf4 0, transparent 10px)',
               backgroundSize: '100px 100px',
             }}
        />
        <div className="absolute inset-0 opacity-5"
             style={{
               backgroundImage: 'linear-gradient(45deg, #4299e1 25%, transparent 25%, transparent 75%, #4299e1 75%, #4299e1), linear-gradient(45deg, #4299e1 25%, transparent 25%, transparent 75%, #4299e1 75%, #4299e1)',
               backgroundSize: '60px 60px',
               backgroundPosition: '0 0, 30px 30px',
             }}
        />
      </div>
       */}
      {/* Center Circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-blue-50 rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-blue-200">
        <div className="text-center">
          <h2 className="font-bold text-lg text-blue-800">{centerTitle}</h2>
          {type === 'hr' && (
            <div className="mt-2">
              <svg className="w-8 h-8 mx-auto text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
            className="absolute  z-10 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer"
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
      
      {/* Subtle Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100">
        {steps.map((_, index) => {
          const angle = (index * (360 / steps.length) - 90) * (Math.PI / 180);
          const radius = 38;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          
          return (
            <line
              key={`line-${index}`}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default ProcessWheel;