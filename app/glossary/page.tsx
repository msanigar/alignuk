'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen } from 'lucide-react';
import { GLOSSARY } from '@/lib/glossary';
import { GlossaryTerm } from '@/lib/types';

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  const filteredTerms = GLOSSARY.filter(term =>
    term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.context?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
              Political Glossary
            </h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Understand the key terms and concepts used in UK politics and our political alignment quiz.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((term, index) => (
            <motion.div
              key={term.term}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="card cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => setSelectedTerm(selectedTerm?.term === term.term ? null : term)}
            >
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                {term.term}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {term.definition}
              </p>
              {selectedTerm?.term === term.term && term.context && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t border-neutral-200"
                >
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    <strong>Context:</strong> {term.context}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredTerms.length === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-neutral-600">
              No terms found matching "{searchQuery}". Try a different search term.
            </p>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="card">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              About This Glossary
            </h3>
            <div className="space-y-3 text-neutral-600">
              <p>
                This glossary contains key terms and concepts used throughout our political alignment quiz. 
                Understanding these terms will help you better understand the questions and your results.
              </p>
              <p>
                Terms are selected based on their relevance to UK politics and their frequency in political discourse. 
                We strive to provide clear, neutral definitions that avoid partisan bias.
              </p>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              How to Use
            </h3>
            <div className="space-y-3 text-neutral-600">
              <p>
                <strong>Search:</strong> Use the search bar to find specific terms or concepts you're interested in.
              </p>
              <p>
                <strong>Click to expand:</strong> Click on any term card to see additional context and usage examples.
              </p>
              <p>
                <strong>Quiz integration:</strong> Terms in the quiz questions are automatically highlighted 
                and linked to their definitions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back to Quiz */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a href="/quiz" className="btn-primary">
            Take the Quiz
          </a>
        </motion.div>
      </div>
    </div>
  );
}
