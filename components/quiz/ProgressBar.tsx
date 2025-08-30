'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs sm:text-sm font-medium text-neutral-700">
          Progress
        </span>
        <span className="text-xs sm:text-sm text-neutral-500">
          Question {current} of {total}
        </span>
      </div>
      
      <div 
        className="progress-bar"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Question ${current} of ${total}`}
      >
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-neutral-400 mt-1">
        <span>Start</span>
        <span>Complete</span>
      </div>
      
      {/* Progress percentage for screen readers */}
      <div className="sr-only">
        {Math.round(percentage)}% complete
      </div>
    </div>
  );
}
