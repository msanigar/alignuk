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
        <span className="text-sm font-medium text-neutral-700">
          Progress
        </span>
        <span className="text-sm text-neutral-500">
          {current} of {total}
        </span>
      </div>
      
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-neutral-400 mt-1">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
