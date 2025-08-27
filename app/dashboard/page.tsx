'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { getQuizHistory } from '@/lib/database';
import { QuizHistory } from '@/lib/types';
import { motion } from 'framer-motion';
import { Calendar, Clock, BarChart3, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const [quizHistory, setQuizHistory] = useState<QuizHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuizHistory = async () => {
      if (user) {
        try {
          console.log('Dashboard: Loading quiz history...');
          const history = await getQuizHistory();
          setQuizHistory(history);
        } catch (error) {
          console.error('Failed to load quiz history:', error);
        } finally {
          setLoading(false);
        }
      } else {
        // If no user, set loading to false immediately
        setLoading(false);
      }
    };

    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('Dashboard: Timeout reached, setting loading to false');
      setLoading(false);
    }, 10000); // 10 second timeout

    loadQuizHistory();

    return () => clearTimeout(timeoutId);
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Sign in Required</h1>
          <p className="text-neutral-600 mb-6">
            You need to sign in to view your quiz history and saved results.
          </p>
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading your quiz history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Your Quiz History
          </h1>
          <p className="text-lg text-neutral-600">
            Track your political alignment over time and see how your views evolve.
          </p>
        </motion.div>

        {quizHistory.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-12"
          >
            <BarChart3 className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">No Quiz Results Yet</h2>
            <p className="text-neutral-600 mb-6">
              Complete your first quiz to start tracking your political alignment.
            </p>
            <Link href="/quiz" className="btn-primary">
              Take Your First Quiz
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {quizHistory.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2 text-sm text-neutral-500">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(quiz.createdAt).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-neutral-500">
                        <Clock className="w-4 h-4" />
                        <span>
                          {new Date(quiz.createdAt).toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      Quiz #{quiz.id.slice(-8)}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {quiz.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {quiz.tags.length > 3 && (
                        <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                          +{quiz.tags.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <p className="text-neutral-600 text-sm">
                      Overall confidence: {Math.round(quiz.scores.reduce((sum, score) => sum + score.confidence, 0) / quiz.scores.length)}%
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <Link
                      href={`/quiz/results/${quiz.id}`}
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <span>View Results</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link href="/quiz" className="btn-primary">
            Take Another Quiz
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
