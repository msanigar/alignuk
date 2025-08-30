'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Clock, Shield, HelpCircle, FileText } from 'lucide-react';

export default function ContactPage() {
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
            <MessageSquare className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
              Contact Us
            </h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Get in touch with the AlignUK team. We're here to help with questions, feedback, and support.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">General Inquiries</h3>
            <p className="text-neutral-600 text-sm mb-3">
              Questions about AlignUK, feedback, or general support
            </p>
            <a 
              href="mailto:hello@alignuk.com" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              hello@alignuk.com
            </a>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Privacy & Legal</h3>
            <p className="text-neutral-600 text-sm mb-3">
              Privacy policy, data requests, or legal matters
            </p>
            <a 
              href="mailto:privacy@alignuk.com" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              privacy@alignuk.com
            </a>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Technical Support</h3>
            <p className="text-neutral-600 text-sm mb-3">
              Technical issues, bugs, or account problems
            </p>
            <a 
              href="mailto:support@alignuk.com" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              support@alignuk.com
            </a>
          </div>
        </motion.div>

        {/* Response Times */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card mb-12"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Response Times</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">General Inquiries</h3>
                <p className="text-neutral-600 text-sm">
                  We typically respond within 24-48 hours during business days (Monday-Friday, 9 AM - 6 PM GMT).
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Privacy & Legal</h3>
                <p className="text-neutral-600 text-sm">
                  Legal and privacy requests are handled within 5-10 business days as required by regulations.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Technical Support</h3>
                <p className="text-neutral-600 text-sm">
                  Technical issues are prioritized and typically resolved within 24 hours during business days.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Methodology Questions</h3>
                <p className="text-neutral-600 text-sm">
                  Detailed methodology questions may take 3-5 business days for comprehensive responses.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card mb-12"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b border-neutral-200 pb-4">
              <h3 className="font-semibold text-neutral-900 mb-2">How accurate are the quiz results?</h3>
              <p className="text-neutral-600 text-sm">
                Our quiz is designed to provide educational insights based on your responses. While we use validated 
                methodology, results should be considered as one perspective among many. Political views are complex 
                and cannot be fully captured by any single assessment.
              </p>
            </div>
            
            <div className="border-b border-neutral-200 pb-4">
              <h3 className="font-semibold text-neutral-900 mb-2">Can I retake the quiz?</h3>
              <p className="text-neutral-600 text-sm">
                Yes, you can retake the quiz as many times as you like. If you have an account, your previous results 
                will be saved so you can track how your views change over time.
              </p>
            </div>
            
            <div className="border-b border-neutral-200 pb-4">
              <h3 className="font-semibold text-neutral-900 mb-2">Is my data secure?</h3>
              <p className="text-neutral-600 text-sm">
                Yes, we take data security seriously. We use encryption, Row Level Security, and follow privacy best 
                practices. You can take the quiz anonymously, and personal data is only collected with explicit consent.
              </p>
            </div>
            
            <div className="border-b border-neutral-200 pb-4">
              <h3 className="font-semibold text-neutral-900 mb-2">How do you calculate party matches?</h3>
              <p className="text-neutral-600 text-sm">
                We use cosine similarity algorithms to compare your six-dimensional results with estimated party positions. 
                This provides educational insights but should not be considered as voting advice.
              </p>
            </div>
            
            <div className="border-b border-neutral-200 pb-4">
              <h3 className="font-semibold text-neutral-900 mb-2">Can I delete my account and data?</h3>
              <p className="text-neutral-600 text-sm">
                Yes, you can request deletion of your account and all associated data at any time. Contact us at 
                privacy@alignuk.com with your request, and we'll process it within the required timeframe.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Do you share my data with third parties?</h3>
              <p className="text-neutral-600 text-sm">
                No, we do not sell, rent, or share your personal data with third parties for marketing purposes. 
                We only use your data to provide our services and improve the platform, as described in our Privacy Policy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="card mb-12"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Send Us a Message</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  aria-describedby="name-help"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your name"
                />
                <div id="name-help" className="mt-1 text-sm text-neutral-500">
                  Please enter your full name
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  aria-describedby="email-help"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
                <div id="email-help" className="mt-1 text-sm text-neutral-500">
                  We'll use this to respond to your inquiry
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="technical">Technical Support</option>
                <option value="privacy">Privacy & Data</option>
                <option value="methodology">Methodology Question</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Please provide details about your inquiry..."
              ></textarea>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                required
                className="mt-1 mr-3"
              />
              <label htmlFor="privacy" className="text-sm text-neutral-600">
                I agree to the processing of my data as described in the{' '}
                <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a>
                . *
              </label>
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full md:w-auto"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Additional Resources
            </h2>
            <p className="text-neutral-600 mb-6">
              Before contacting us, you might find answers in our other resources:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/about" className="btn-secondary">
                About AlignUK
              </a>
              <a href="/methodology" className="btn-secondary">
                Our Methodology
              </a>
              <a href="/glossary" className="btn-secondary">
                Political Glossary
              </a>
              <a href="/privacy" className="btn-secondary">
                Privacy Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
