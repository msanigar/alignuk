'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Source } from '@/lib/types';

interface SourcesModalProps {
  sources: Source[];
  onClose: () => void;
}

export function SourcesModal({ sources, onClose }: SourcesModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900">
              Sources & References
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-96">
            <div className="space-y-4">
              {sources.map((source, index) => (
                <div key={index} className="p-4 bg-neutral-50 rounded-lg">
                  <h4 className="font-medium text-neutral-900 mb-2">
                    {source.label}
                  </h4>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm"
                  >
                    View source
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> These sources provide additional context and verification for the statistics mentioned in the question. We strive to use official and authoritative sources where possible.
              </p>
            </div>
          </div>
          
          <div className="p-6 border-t border-neutral-200">
            <button
              onClick={onClose}
              className="w-full btn-primary"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
