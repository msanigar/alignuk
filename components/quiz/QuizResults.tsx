'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Download, BarChart3, Tag, TrendingUp } from 'lucide-react';
import { AxisScore } from '@/lib/types';
import { AXES } from '@/lib/axes';
import { ResultsChart } from './ResultsChart';
import { CompassChart } from './CompassChart';
import { AxisDetail } from './AxisDetail';
import { ShareModal } from './ShareModal';
import { useAuth } from '@/components/providers/AuthProvider';
import { getAxisLabel } from '@/lib/scoring';
import { PartyMatches } from '@/components/PartyMatches';
import { Vector6 } from '@/lib/partyVectors';

interface QuizResultsData {
  scores: AxisScore[];
  tags: string[];
  summary: Record<string, string>;
  overallSummary?: string;
  answers: any[];
  durationMs: number;
}

export function QuizResults() {
  const { user, signIn } = useAuth();
  const [results, setResults] = useState<QuizResultsData | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedAxis, setSelectedAxis] = useState<string | null>(null);

  useEffect(() => {
    const savedResults = sessionStorage.getItem('quiz-results');
    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults);
        // Check if results have the new format with overallSummary
        if (!parsedResults.overallSummary) {
          console.log('Clearing old results format, please retake the quiz');
          sessionStorage.removeItem('quiz-results');
          window.location.href = '/quiz';
          return;
        }
        setResults(parsedResults);
      } catch (error) {
        console.error('Failed to load results:', error);
      }
    }
  }, []);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleSaveResults = async () => {
    if (!user) {
      await signIn();
    }
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const convertScoresToVector6 = (scores: AxisScore[]): Vector6 => {
    const vector: Vector6 = {
      economic: 0,
      social: 0,
      authority: 0,
      sovereignty: 0,
      environment: 0,
      welfare: 0,
    };
    
    scores.forEach(score => {
      if (score.axis in vector) {
        vector[score.axis as keyof Vector6] = score.score;
      }
    });
    
    return vector;
  };

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Your Political Alignment
          </h1>
          {results.overallSummary && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6">
              <p className="text-base sm:text-lg text-blue-900 leading-relaxed">
                {results.overallSummary}
              </p>
            </div>
          )}
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-6">
            Here's how your views align across six key dimensions of UK politics
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {results.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleShare}
              className="btn-primary inline-flex items-center"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </button>
            {!user && (
              <button
                onClick={handleSaveResults}
                className="btn-secondary inline-flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Save Results
              </button>
            )}
          </div>
        </motion.div>

        {/* Results Grid */}
        <div className="space-y-8">
          {/* Charts and Party Matching */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Charts */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Radar Chart */}
              <div className="card">
                <div className="flex items-center mb-6">
                  <BarChart3 className="w-6 h-6 text-primary-600 mr-2" />
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Six-Dimensional Profile
                  </h2>
                </div>
                <ResultsChart scores={results.scores} />
              </div>
              
              {/* 2D Compass */}
              <div className="card">
                <div className="flex items-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary-600 mr-2" />
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Economic vs Authority Compass
                  </h2>
                </div>
                <div className="mt-6">
                  <CompassChart scores={results.scores} />
                </div>
              </div>
            </motion.div>

            {/* Axis Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              {results.scores.map((score, index) => (
                <motion.div
                  key={score.axis}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <AxisDetail
                    score={score}
                    axis={AXES[score.axis]}
                    summary={results.summary[score.axis]}
                    isSelected={selectedAxis === score.axis}
                    onClick={() => setSelectedAxis(selectedAxis === score.axis ? null : score.axis)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Party Matching */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <PartyMatches 
              userScores={convertScoresToVector6(results.scores)} 
              answers={results.answers.reduce((acc, answer) => {
                // Convert Likert 1-7 to -3 to +3 scale
                acc[answer.questionId] = answer.value - 4;
                return acc;
              }, {} as Record<string, number>)}
            />
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="card">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              About Your Results
            </h3>
            <div className="space-y-3 text-neutral-600">
              <p>
                Your scores range from -100 to +100, where negative values indicate 
                agreement with the left label and positive values indicate agreement 
                with the right label.
              </p>
              <p>
                Confidence scores show how certain we can be about your position 
                based on the questions you answered.
              </p>
              <p>
                These results are based on your responses to {results.answers.length} questions 
                completed in {formatDuration(results.durationMs)}.
              </p>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              What's Next?
            </h3>
            <div className="space-y-3 text-neutral-600">
              <p>
                <strong>Learn more:</strong> Explore our glossary to understand 
                the political terms and concepts used in the quiz.
              </p>
              <p>
                <strong>Track changes:</strong> Sign in to save your results and 
                retake the quiz later to see how your views evolve.
              </p>
              <p>
                <strong>Share:</strong> Share your results with friends and 
                discuss your political alignment.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/quiz" className="btn-primary inline-flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Take Quiz Again
            </a>
            {user && (
              <a href="/dashboard" className="btn-secondary inline-flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                View History
              </a>
            )}
            <a href="/glossary" className="btn-secondary">
              View Glossary
            </a>
            <a href="/" className="btn-ghost">
              Back to Home
            </a>
          </div>
        </motion.div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          results={results}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}
