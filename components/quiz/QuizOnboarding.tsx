'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, BarChart3, Eye, LogIn, User, Target } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';
import { Logo } from '../Logo';
import { useState } from 'react';

interface QuizOnboardingProps {
  onStart: (version: 'lite' | 'full') => void;
  onQuickTest?: () => void;
}

export function QuizOnboarding({ onStart, onQuickTest }: QuizOnboardingProps) {
  const { user, signIn, signOut } = useAuth();
  const [selectedVersion, setSelectedVersion] = useState<'lite' | 'full'>('lite');

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Welcome to AlignUK
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Before you begin, here's what you need to know about our political alignment quiz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-primary-100 rounded-lg mr-4">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Neutral & Unbiased</h3>
            </div>
            <p className="text-neutral-600">
              Our questions are carefully crafted to avoid loaded language and present balanced perspectives on UK political issues. We don't tell you what the "right" answer is.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-primary-100 rounded-lg mr-4">
                <BarChart3 className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Six Dimensions</h3>
            </div>
            <p className="text-neutral-600">
              We analyze your views across six key dimensions: Economic, Social, Authority, Sovereignty, Environment, and Welfare. This gives you a more nuanced understanding than simple left-right politics.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-primary-100 rounded-lg mr-4">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Flexible Timing</h3>
            </div>
            <p className="text-neutral-600">
              Choose between Lite (36 questions, ~5 minutes) or Full (60 questions, ~8 minutes) versions. You can save your progress and return later if needed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-primary-100 rounded-lg mr-4">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Party Matching</h3>
            </div>
            <p className="text-neutral-600">
              See how your views align with major UK political parties using advanced similarity algorithms. Get percentage matches and detailed breakdowns to understand your political positioning.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-primary-100 rounded-lg mr-4">
                <Eye className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Privacy-Focused</h3>
            </div>
            <p className="text-neutral-600">
              Your responses are private by default. You can optionally sign in to save your results and track changes over time. We never share your personal data.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Note</h3>
            <p className="text-blue-800">
              This quiz is designed to help you understand your political views, not to tell you how to think. 
              There are no "correct" answers - only your honest opinions matter.
            </p>
          </div>

          {/* Quiz Version Selection */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Choose Your Quiz Version</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedVersion === 'lite' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
                onClick={() => setSelectedVersion('lite')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-neutral-900">Lite Version</h4>
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center">
                    {selectedVersion === 'lite' && (
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-neutral-600 mb-2">36 questions • ~5 minutes</p>
                <p className="text-xs text-neutral-500">
                  Perfect for a quick overview of your political alignment
                </p>
              </div>
              
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedVersion === 'full' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
                onClick={() => setSelectedVersion('full')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-neutral-900">Full Version</h4>
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center">
                    {selectedVersion === 'full' && (
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-neutral-600 mb-2">60 questions • ~8 minutes</p>
                <p className="text-xs text-neutral-500">
                  Comprehensive analysis with more detailed questions
                </p>
              </div>
            </div>
          </div>

          {/* Sign-in Section */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Save Your Results (Optional)</h3>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {user.user_metadata?.avatar_url && (
                      <img 
                        src={user.user_metadata.avatar_url} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full"
                        crossOrigin="anonymous"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    )}
                    {(!user.user_metadata?.avatar_url || true) && (
                      <User className="w-8 h-8 text-neutral-400 hidden" />
                    )}
                    <span className="text-neutral-700">
                      Signed in as {user.user_metadata?.full_name || user.email}
                    </span>
                  </div>
                  <button
                    onClick={signOut}
                    className="text-sm text-neutral-500 hover:text-neutral-700 underline"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-neutral-600 text-sm">
                    Sign in to save your results and track changes over time
                  </p>
                  <button
                    onClick={handleSignIn}
                    className="flex items-center gap-2 bg-white border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign in with Google
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onStart(selectedVersion)}
              className="btn-primary text-lg px-8 py-4"
            >
              {user ? `Start ${selectedVersion === 'lite' ? 'Lite' : 'Full'} Quiz (Results will be saved)` : `Start ${selectedVersion === 'lite' ? 'Lite' : 'Full'} Quiz (Anonymous)`}
            </button>
            
            {onQuickTest && typeof window !== 'undefined' && window.location.hostname === 'localhost' && (
              <button
                onClick={onQuickTest}
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-lg font-medium transition-colors"
              >
                🚀 Quick Test (Random Answers)
              </button>
            )}
          </div>

          <p className="text-sm text-neutral-500 mt-4">
            By starting the quiz, you agree to our{' '}
            <a href="/privacy" className="text-primary-600 hover:underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" className="text-primary-600 hover:underline">
              Terms of Service
            </a>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}
