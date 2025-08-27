'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';

interface QuestionTooltipProps {
  rationale: string;
}

export function QuestionTooltip({ rationale }: QuestionTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
        aria-label="Question rationale"
      >
        <HelpCircle className="w-5 h-5" />
      </button>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsVisible(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-neutral-900">Question Context</h3>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-neutral-700 leading-relaxed">{rationale}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
