'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Question } from '@/lib/types';
import { ProgressBar } from './ProgressBar';
import { QuestionTooltip } from './QuestionTooltip';
import { SourcesModal } from './SourcesModal';

interface QuizQuestionsProps {
  currentQuestion: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (questionId: string, value: number) => void;
  onGoBack: () => void;
  canGoBack: boolean;
  currentAnswer?: number;
  loading?: boolean;
  onQuickTest?: () => void;
}

  const likertLabels = [
    'Strongly Disagree',
    'Disagree',
    'Somewhat Disagree',
    'Neither Agree nor Disagree',
    'Somewhat Agree',
    'Agree',
    'Strongly Agree'
  ];



export function QuizQuestions({
  currentQuestion,
  questionNumber,
  totalQuestions,
  onAnswer,
  onGoBack,
  canGoBack,
  currentAnswer,
  loading = false,
  onQuickTest,
}: QuizQuestionsProps) {
  const [showSources, setShowSources] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(currentAnswer || null);

  // Reset selected value when question changes
  useEffect(() => {
    setSelectedValue(currentAnswer || null);
  }, [currentQuestion.id, currentAnswer]);

  const handleOptionClick = (value: number) => {
    setSelectedValue(value);
    onAnswer(currentQuestion.id, value);
  };

  const handleSkip = () => {
    onAnswer(currentQuestion.id, 4); // Neutral value
  };

  const highlightTerms = (text: string) => {
    const terms = ['ECHR', 'NHS', 'GDP', 'ONS', 'HMRC', 'MP', 'Brexit', 'Net Zero', 'Universal Credit', 'Bank of England', 'North Sea'];
    let highlightedText = text;
    
    terms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="text-primary-600 font-medium cursor-help" title="Click for definition">${term}</span>`);
    });
    
    return highlightedText;
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Progress Bar */}
        <ProgressBar current={questionNumber} total={totalQuestions} />
        
        {/* Question Card */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="card mt-4 sm:mt-8"
        >
          {/* Question Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                {canGoBack && (
                  <button
                    onClick={onGoBack}
                    disabled={loading}
                    className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-800 transition-colors disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium">Back</span>
                  </button>
                )}
                <span className="text-sm font-medium text-neutral-500">
                  Question {questionNumber} of {totalQuestions}
                </span>
              </div>
              <QuestionTooltip rationale={currentQuestion.rationale} />
            </div>
            
            <h2 
              className="text-lg sm:text-xl md:text-2xl font-semibold text-neutral-900 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightTerms(currentQuestion.text) }}
            />
            
            {currentQuestion.stat && (
              <div className="mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-800">
                  <strong>UK Context:</strong> {currentQuestion.stat}
                  {currentQuestion.sources && (
                    <button
                      onClick={() => setShowSources(true)}
                      className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
                    >
                      View sources
                    </button>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Likert Scale */}
          <div className="space-y-3">
            <div className="hidden lg:flex justify-between text-sm text-neutral-600 mb-4 px-1">
              <span className="text-xs sm:text-sm">Strongly Disagree</span>
              <span className="text-xs sm:text-sm">Strongly Agree</span>
            </div>
            
            <div className="likert-scale">
              {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <button
                  key={value}
                  onClick={() => handleOptionClick(value)}
                  disabled={loading}
                  className={`likert-option ${
                    selectedValue === value ? 'selected' : ''
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="text-base md:text-lg font-semibold text-neutral-700 mb-1">
                    {value}
                  </div>
                  <div className="text-xs text-neutral-500 leading-tight">
                    {likertLabels[value - 1]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Skip Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleSkip}
              disabled={loading}
              className="text-neutral-500 hover:text-neutral-700 text-sm underline disabled:opacity-50"
            >
              Skip this question
            </button>
          </div>

          {/* Quick Test Button - Only show on localhost */}
          {onQuickTest && typeof window !== 'undefined' && window.location.hostname === 'localhost' && (
            <div className="mt-4 text-center">
              <button
                onClick={onQuickTest}
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🚀 Quick Test (Random Answers)
              </button>
              <p className="text-xs text-neutral-500 mt-2">
                Generates random answers for all remaining questions
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mt-6 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-sm text-neutral-600 mt-2">Processing your answer...</p>
            </div>
          )}
        </motion.div>

        {/* Sources Modal */}
        {showSources && currentQuestion.sources && (
          <SourcesModal
            sources={currentQuestion.sources}
            onClose={() => setShowSources(false)}
          />
        )}
      </div>
    </div>
  );
}
