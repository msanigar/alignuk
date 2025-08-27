'use client';

import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, Users, BarChart3 } from 'lucide-react';

export default function TermsPage() {
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
            <FileText className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
              Terms of Service
            </h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            The terms and conditions governing your use of AlignUK's political alignment platform.
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
            Welcome to AlignUK. These Terms of Service govern your use of our political alignment 
            quiz and related services. By using our platform, you agree to these terms and our 
            Privacy Policy.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            AlignUK is designed to help users understand their political views through evidence-based 
            questions and analysis. We are committed to neutrality, accuracy, and educational value 
            in all our content and features.
          </p>
        </motion.div>

        {/* Service Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Our Services</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
                Political Alignment Quiz
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Our core service is a comprehensive political alignment quiz that analyzes your views 
                across six dimensions: Economic, Social, Authority, Sovereignty, Environment, and Welfare. 
                The quiz is available in Lite (36 questions) and Full (60 questions) versions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary-600" />
                Party Matching Analysis
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                We provide party matching analysis that compares your quiz results with major UK political 
                parties using advanced similarity algorithms. This feature is for educational purposes 
                and should not be considered as voting advice or endorsement.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary-600" />
                Account Features
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Optional account features allow you to save your results, track changes over time, 
                and access your quiz history. These features require authentication via Google OAuth.
              </p>
            </div>
          </div>
        </motion.div>

        {/* User Responsibilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Your Responsibilities</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Honest Responses</h3>
                <p className="text-neutral-600 text-sm">
                  Provide honest and thoughtful responses to quiz questions. The accuracy of your results 
                  depends on the sincerity of your answers.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Educational Use</h3>
                <p className="text-neutral-600 text-sm">
                  Use our platform for educational and self-reflection purposes. Our results are not 
                  intended as voting advice or political endorsement.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Respectful Conduct</h3>
                <p className="text-neutral-600 text-sm">
                  Use our platform respectfully and in accordance with applicable laws. Do not attempt 
                  to manipulate or abuse our systems.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Account Security</h3>
                <p className="text-neutral-600 text-sm">
                  If you create an account, you are responsible for maintaining the security of your 
                  login credentials and for all activities under your account.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Important Disclaimers</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="font-semibold text-amber-900 mb-2 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Not Voting Advice
              </h3>
              <p className="text-amber-800 text-sm">
                Our party matching analysis is for educational purposes only. It should not be considered 
                as voting advice or endorsement of any political party. Always research candidates and 
                parties independently before voting.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Educational Tool</h3>
              <p className="text-blue-800 text-sm">
                AlignUK is designed as an educational tool to help users understand political concepts 
                and their own views. Results are estimates based on your responses and should be 
                considered as one perspective among many.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">No Guarantees</h3>
              <p className="text-purple-800 text-sm">
                While we strive for accuracy, we cannot guarantee the precision of our analysis or 
                party matching results. Political views are complex and cannot be fully captured 
                by any single assessment.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Neutral Platform</h3>
              <p className="text-green-800 text-sm">
                We are committed to neutrality and do not endorse any political ideology, party, 
                or candidate. Our questions and analysis are designed to be balanced and unbiased.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Intellectual Property */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Intellectual Property</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Our Content</h3>
              <p className="text-neutral-600 text-sm">
                All content on AlignUK, including questions, methodology, and analysis, is protected 
                by copyright and other intellectual property laws. You may not reproduce, distribute, 
                or create derivative works without permission.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Your Data</h3>
              <p className="text-neutral-600 text-sm">
                You retain ownership of your quiz responses and personal data. We use this data only 
                as described in our Privacy Policy and to provide our services.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Attribution</h3>
              <p className="text-neutral-600 text-sm">
                When sharing results or referencing our platform, please provide appropriate attribution 
                to AlignUK and include a link to our website.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Limitation of Liability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Limitation of Liability</h2>
          
          <p className="text-neutral-600 leading-relaxed mb-4">
            AlignUK is provided "as is" without warranties of any kind. We are not liable for any 
            damages arising from your use of our platform, including but not limited to:
          </p>
          
          <div className="space-y-2">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-neutral-600 text-sm">Decisions made based on quiz results</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-neutral-600 text-sm">Inaccuracies in analysis or party matching</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-neutral-600 text-sm">Service interruptions or technical issues</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-neutral-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-neutral-600 text-sm">Data loss or security breaches</p>
            </div>
          </div>
        </motion.div>

        {/* Changes to Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Changes to Terms</h2>
          <p className="text-neutral-600 leading-relaxed">
            We may update these Terms of Service from time to time. We will notify users of significant 
            changes by posting the new terms on our website and updating the "Last Updated" date. 
            Continued use of our platform after changes constitutes acceptance of the new terms.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-center"
        >
          <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-neutral-600 mb-6">
              If you have any questions about these Terms of Service or our platform, 
              please don't hesitate to contact us.
            </p>
            <a 
              href="mailto:legal@alignuk.com" 
              className="btn-primary"
            >
              Contact Us
            </a>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-neutral-500">
            Last Updated: {new Date().toLocaleDateString('en-GB', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
