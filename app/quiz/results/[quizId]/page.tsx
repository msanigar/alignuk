'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';
import { AxisScore, Answer } from '@/lib/types';
import { ResultsChart } from '@/components/quiz/ResultsChart';
import { CompassChart } from '@/components/quiz/CompassChart';
import { ShareModal } from '@/components/quiz/ShareModal';
import { useAuth } from '@/components/providers/AuthProvider';
import { PartyMatches } from '@/components/PartyMatches';
import { Vector6 } from '@/lib/partyVectors';
import { getQuizResults } from '@/lib/database';
import { getAxisLabel } from '@/lib/scoring';

interface QuizResultsData {
  scores: AxisScore[];
  tags: string[];
  summary: Record<string, string>;
  overallSummary?: string;
  answers: Answer[];
  durationMs: number;
}

export default function QuizResultsPage() {
  const params = useParams();
  const quizId = params.quizId as string;
  const { user } = useAuth();
  const [results, setResults] = useState<QuizResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);


  useEffect(() => {
    const fetchResults = async () => {
      if (!quizId) {
        setError('No quiz ID provided');
        setLoading(false);
        return;
      }

      try {
        const quizData = await getQuizResults(quizId);
        
        if (!quizData) {
          setError('Quiz results not found. This quiz may not exist or you may not have permission to view it.');
          setLoading(false);
          return;
        }

        // Convert the database format to the expected format
        const resultsData: QuizResultsData = {
          scores: quizData.scores,
          tags: [], // We'll need to generate tags from scores
          summary: {}, // We'll need to generate summary from scores
          answers: quizData.answers,
          durationMs: 0, // Not stored in database currently
        };

        // Generate tags and summary from scores
        const { generateTags, generateSummary } = await import('@/lib/scoring');
        resultsData.tags = generateTags(quizData.scores);
        resultsData.summary = generateSummary(quizData.scores);

        setResults(resultsData);
      } catch (err) {
        console.error('Error fetching quiz results:', err);
        setError('Failed to load quiz results. Please check that you have permission to view this quiz.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [quizId]);



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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Results Not Found</h1>
          <p className="text-neutral-600 mb-6">{error || 'The quiz results you are looking for could not be found.'}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/dashboard" className="btn-primary">
              Back to Dashboard
            </a>
            <a href="/quiz" className="btn-secondary">
              Take New Quiz
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Your Political Alignment Results
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Based on your responses, here's how your views align across six key political dimensions.
          </p>
        </motion.div>

        {/* Results Content */}
        <div className="space-y-12">
          {/* Overall Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
          >
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Overall Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Your Position</h3>
                <div className="space-y-3">
                  {results.scores.map((score) => (
                    <div key={score.axis} className="flex justify-between items-center">
                      <span className="text-neutral-700 capitalize">{score.axis.replace('_', ' ')}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-neutral-900">
                          {getAxisLabel(score.axis, score.score)}
                        </span>
                        <span className="text-xs text-neutral-500">
                          ({score.score > 0 ? '+' : ''}{score.score})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Key Characteristics</h3>
                <div className="flex flex-wrap gap-2">
                  {results.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="card">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">Radar Chart</h3>
              <ResultsChart scores={results.scores} />
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">Compass View</h3>
              <CompassChart scores={results.scores} />
            </div>
          </motion.div>

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
