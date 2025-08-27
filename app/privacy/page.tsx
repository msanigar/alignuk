'use client';

import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database } from 'lucide-react';

export default function PrivacyPage() {
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
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            How we protect your privacy and handle your data when you use AlignUK.
          </p>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Overview</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            At AlignUK, we are committed to protecting your privacy and ensuring that your personal 
            information is handled responsibly. This privacy policy explains how we collect, use, 
            and protect your data when you use our political alignment quiz.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            We believe that privacy is fundamental to political expression and civic engagement. 
            That's why we've designed our platform with privacy-first principles, allowing you 
            to take our quiz anonymously while providing optional features for those who choose 
            to create accounts.
          </p>
        </motion.div>

        {/* Data Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Data We Collect</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-primary-600" />
                Anonymous Quiz Data
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                When you take our quiz anonymously, we collect only your quiz responses and basic 
                session information. This data is not linked to any personal identifiers and is 
                used solely to calculate your political alignment results.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <Database className="w-5 h-5 mr-2 text-primary-600" />
                Account Data (Optional)
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                If you choose to create an account, we collect your email address, name, and 
                profile information. This allows you to save your results and track changes 
                over time. We use Google OAuth for secure authentication.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-primary-600" />
                Technical Data
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                We collect basic technical information such as your IP address, browser type, 
                and device information for security and analytics purposes. This data is 
                anonymized and used only to improve our service.
              </p>
            </div>
          </div>
        </motion.div>

        {/* How We Use Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">How We Use Your Data</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Quiz Results</h3>
              <p className="text-neutral-600 text-sm">
                Your quiz responses are used to calculate your political alignment scores 
                across six dimensions and generate personalized results.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Account Features</h3>
              <p className="text-neutral-600 text-sm">
                If you have an account, we use your data to save your results, track changes 
                over time, and provide personalized features.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Service Improvement</h3>
              <p className="text-neutral-600 text-sm">
                Aggregated, anonymized data helps us improve our questions, scoring algorithm, 
                and user experience.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Security</h3>
              <p className="text-neutral-600 text-sm">
                Technical data is used to detect and prevent fraud, abuse, and security threats.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Data Protection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Data Protection</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Encryption</h3>
              <p className="text-green-800 text-sm">
                All data is encrypted in transit and at rest using industry-standard encryption protocols.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Row Level Security</h3>
              <p className="text-blue-800 text-sm">
                Our database uses Row Level Security (RLS) to ensure users can only access their own data.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Anonymous Sessions</h3>
              <p className="text-purple-800 text-sm">
                You can take our quiz completely anonymously without creating an account or providing personal information.
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="font-semibold text-amber-900 mb-2">No Third-Party Sharing</h3>
              <p className="text-amber-800 text-sm">
                We do not sell, rent, or share your personal data with third parties for marketing purposes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Your Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Your Rights</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Access Your Data</h3>
                <p className="text-neutral-600 text-sm">
                  You can request a copy of all personal data we hold about you.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Delete Your Data</h3>
                <p className="text-neutral-600 text-sm">
                  You can request deletion of your account and all associated data at any time.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Opt Out</h3>
                <p className="text-neutral-600 text-sm">
                  You can opt out of optional features and data collection while still using our core quiz.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Contact Us</h3>
                <p className="text-neutral-600 text-sm">
                  You can contact us at privacy@alignuk.com with any privacy-related questions or concerns.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-neutral-600 mb-6">
              If you have any questions about our privacy policy or how we handle your data, 
              please don't hesitate to contact us.
            </p>
            <a 
              href="mailto:privacy@alignuk.com" 
              className="btn-primary"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
