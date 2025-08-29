'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '../providers/AuthProvider';
import { LogIn } from 'lucide-react';
import { Logo } from '../Logo';

export function HeroSection() {
  const { user, signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
              Discover Your{' '}
              <span className="text-primary-600">Political Alignment</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-700 mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Take our evidence-based UK political alignment quiz to understand where you stand on six key dimensions: economic, social, authority, sovereignty, environment, and welfare. Choose between our Lite (36 questions) or Full (60 questions) versions. Get matched with UK political parties based on your results.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
          >
            <Link href="/quiz" className="btn-primary text-lg px-8 py-4">
              Start Quiz Now
            </Link>
            <Link href="/about" className="btn-secondary text-lg px-8 py-4">
              Learn More
            </Link>
            {!user && (
              <button
                onClick={handleSignIn}
                className="flex items-center gap-2 bg-white border border-neutral-300 text-neutral-700 px-6 py-4 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <LogIn className="w-5 h-5" />
                Sign in
              </button>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-sm text-neutral-600"
          >
            <p className="text-xs sm:text-sm">✓ Evidence-based questions • ✓ Neutral and unbiased • ✓ Privacy-focused • ✓ Party matching</p>
            <p className="mt-2 text-xs sm:text-sm">Lite version: 36 questions (~5 min) • Full version: 60 questions (~8 min)</p>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300 rounded-full opacity-20"></div>
      </div>
    </section>
  );
}
