'use client';

import { motion } from 'framer-motion';
import { Shield, BarChart3, Eye, BookOpen, Users, Zap, Target } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            About AlignUK
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            A neutral, evidence-based political alignment tool designed specifically for UK politics, 
            helping citizens understand their political views across multiple dimensions.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card mb-12"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Mission</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            AlignUK aims to promote informed political discourse in the United Kingdom by providing 
            citizens with a comprehensive, neutral tool to understand their political alignment. 
            We believe that understanding one's political views is the first step toward meaningful 
            civic engagement and informed voting.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Our approach goes beyond simple left-right politics, recognizing that political views 
            are complex and multi-dimensional. By analyzing six key dimensions of political thought, 
            we provide a more nuanced understanding of where individuals stand on important issues.
          </p>
        </motion.div>

        {/* Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card mb-12"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Our Methodology</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Question Design</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Our questions are carefully crafted to be neutral and avoid loaded language. 
                Each question targets one or two political dimensions and includes relevant UK 
                statistics and sources for context. Available in Lite (36 questions) and Full (60 questions) versions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Scoring System</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Responses use a 7-point Likert scale mapped to scores from -3 to +3. 
                These are weighted, normalized, and converted to a -100 to +100 scale 
                for each dimension.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Party Matching</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                We use advanced similarity algorithms to compare your results with major UK political 
                parties. This provides educational insights into how your views align with party 
                positions, though it's not intended as voting advice.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Confidence Assessment</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                We measure data sufficiency per axis and require 60% coverage before 
                showing results. This ensures accuracy and meaningful insights.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Privacy Protection</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Your responses are private by default. Anonymous sessions are supported, 
                and personal data is only collected with explicit consent.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Six Dimensions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card mb-12"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Six Dimensions of Political Thought</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Economic</h3>
              <p className="text-blue-800 text-sm">
                Views on the role of government in the economy, from state-led to market-led approaches.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Social</h3>
              <p className="text-purple-800 text-sm">
                Attitudes toward social change and traditional values, from progressive to traditional.
              </p>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Authority</h3>
              <p className="text-red-800 text-sm">
                Preference for individual freedom vs collective control, from libertarian to authoritarian.
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-lg">
              <h3 className="font-semibold text-amber-900 mb-2">Sovereignty</h3>
              <p className="text-amber-800 text-sm">
                Views on national independence vs international cooperation, from nationalist to globalist.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Environment</h3>
              <p className="text-green-800 text-sm">
                Priority between environmental protection and economic growth.
              </p>
            </div>
            
            <div className="p-4 bg-cyan-50 rounded-lg">
              <h3 className="font-semibold text-cyan-900 mb-2">Welfare</h3>
              <p className="text-cyan-800 text-sm">
                Approach to social support and public services, from universalist to conditionalist.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="card mb-12"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Neutrality</h3>
              <p className="text-neutral-600 text-sm">
                We present balanced perspectives and avoid partisan bias in our questions and analysis.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Evidence-Based</h3>
              <p className="text-neutral-600 text-sm">
                Our questions include relevant UK statistics and sources to provide context and verification.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Privacy</h3>
              <p className="text-neutral-600 text-sm">
                We respect your privacy and provide anonymous options for taking the quiz.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Comprehensive</h3>
              <p className="text-neutral-600 text-sm">
                We analyze multiple dimensions of political thought, not just left-right politics.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Educational</h3>
              <p className="text-neutral-600 text-sm">
                Our party matching and analysis features help users understand political concepts and positioning.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Accessible</h3>
              <p className="text-neutral-600 text-sm">
                Our tool is designed to be user-friendly and accessible to all UK citizens.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Efficient</h3>
              <p className="text-neutral-600 text-sm">
                Complete the quiz in 5-8 minutes with our streamlined, focused approach.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Ready to Discover Your Political Alignment?
            </h2>
            <p className="text-neutral-600 mb-6">
              Take our evidence-based quiz to understand where you stand on key UK political issues.
            </p>
            <Link href="/quiz" className="btn-primary text-lg px-8 py-4">
              Start Quiz Now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
