'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface QuizInsufficientDataProps {
  onRetake: () => void;
}

export function QuizInsufficientData({ onRetake }: QuizInsufficientDataProps) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-8">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">
              We Need More Data
            </h1>
            <p className="text-xl text-neutral-600 mb-6">
              To provide you with accurate results, we need you to answer more questions.
            </p>
          </div>

          <div className="card mb-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Why This Happens
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-neutral-600">
                  You may have skipped too many questions in certain areas
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-neutral-600">
                  Our algorithm requires sufficient data across all six dimensions
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-neutral-600">
                  This ensures your results are meaningful and accurate
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              What You Can Do
            </h3>
            <p className="text-blue-800 mb-4">
              Take the quiz again and try to answer more questions. Even if you're unsure, 
              your best guess is better than skipping. There are no "wrong" answers!
            </p>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Answer questions even if you're not completely certain</li>
              <li>• Use the "Neither Agree nor Disagree" option if you're truly neutral</li>
              <li>• Focus on questions you haven't answered yet</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRetake}
              className="btn-primary inline-flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake Quiz
            </button>
            <a
              href="/"
              className="btn-secondary"
            >
              Back to Home
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
