'use client';

import { motion } from 'framer-motion';
import { Cookie, Shield, Settings, Eye, Database } from 'lucide-react';

export default function CookiesPage() {
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
            <Cookie className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
              Cookie Policy
            </h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            How we use cookies and similar technologies to improve your experience on AlignUK.
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
            This Cookie Policy explains how AlignUK uses cookies and similar technologies when you visit our website. 
            Cookies are small text files that are stored on your device to help us provide and improve our services.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            We are committed to transparency about our use of cookies and respect your privacy choices. 
            You can control and manage cookies through your browser settings.
          </p>
        </motion.div>

        {/* What Are Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">What Are Cookies?</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <Cookie className="w-5 h-5 mr-2 text-primary-600" />
                Definition
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. 
                They help websites remember information about your visit, such as your preferred language and other settings.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary-600" />
                Purpose
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Cookies help us provide you with a better experience by remembering your preferences, 
                analyzing how you use our site, and ensuring our services work properly.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-primary-600" />
                Control
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                You can control cookies through your browser settings. You can delete existing cookies and 
                choose to block future cookies, though this may affect how our website functions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Types of Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Types of Cookies We Use</h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Essential Cookies</h3>
              <p className="text-green-800 text-sm mb-2">
                These cookies are necessary for the website to function properly. They enable basic functions like page navigation, 
                access to secure areas, and form submissions.
              </p>
              <p className="text-green-700 text-xs">
                <strong>Examples:</strong> Authentication cookies, session management, security features
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Functional Cookies</h3>
              <p className="text-blue-800 text-sm mb-2">
                These cookies remember your preferences and choices to provide enhanced, more personalized features.
              </p>
              <p className="text-blue-700 text-xs">
                <strong>Examples:</strong> Language preferences, quiz progress, theme settings
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Analytics Cookies</h3>
              <p className="text-purple-800 text-sm mb-2">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
              </p>
              <p className="text-purple-700 text-xs">
                <strong>Examples:</strong> Page views, time spent on site, error tracking
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="font-semibold text-amber-900 mb-2">Third-Party Cookies</h3>
              <p className="text-amber-800 text-sm mb-2">
                These cookies are set by third-party services that we use, such as Google Analytics and authentication providers.
              </p>
              <p className="text-amber-700 text-xs">
                <strong>Examples:</strong> Google OAuth, analytics services, social media integrations
              </p>
            </div>
          </div>
        </motion.div>

        {/* Specific Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Cookies We Use</h2>
          
          <div className="space-y-4">
            <div className="border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-900 mb-2">Session Cookies</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Name:</strong> session_id<br />
                  <strong>Purpose:</strong> Maintains your quiz session<br />
                  <strong>Duration:</strong> Session only
                </div>
                <div>
                  <strong>Name:</strong> quiz_progress<br />
                  <strong>Purpose:</strong> Saves your quiz progress<br />
                  <strong>Duration:</strong> 24 hours
                </div>
                <div>
                  <strong>Name:</strong> auth_token<br />
                  <strong>Purpose:</strong> Authentication for signed-in users<br />
                  <strong>Duration:</strong> 30 days
                </div>
              </div>
            </div>
            
            <div className="border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-900 mb-2">Preference Cookies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Name:</strong> theme_preference<br />
                  <strong>Purpose:</strong> Remembers your theme choice<br />
                  <strong>Duration:</strong> 1 year
                </div>
                <div>
                  <strong>Name:</strong> language_preference<br />
                  <strong>Purpose:</strong> Remembers your language choice<br />
                  <strong>Duration:</strong> 1 year
                </div>
              </div>
            </div>
            
            <div className="border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-900 mb-2">Analytics Cookies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Name:</strong> _ga (Google Analytics)<br />
                  <strong>Purpose:</strong> Distinguishes unique users<br />
                  <strong>Duration:</strong> 2 years
                </div>
                <div>
                  <strong>Name:</strong> _ga_* (Google Analytics)<br />
                  <strong>Purpose:</strong> Session state and analytics<br />
                  <strong>Duration:</strong> 2 years
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Managing Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Managing Your Cookie Preferences</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Browser Settings</h3>
                <p className="text-neutral-600 text-sm">
                  Most browsers allow you to control cookies through their settings. You can delete existing cookies, 
                  block future cookies, or set preferences for different types of cookies.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Essential Cookies</h3>
                <p className="text-neutral-600 text-sm">
                  Essential cookies cannot be disabled as they are necessary for the website to function. 
                  Disabling them may prevent you from using certain features.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Third-Party Opt-Out</h3>
                <p className="text-neutral-600 text-sm">
                  For third-party cookies (like Google Analytics), you can opt out through the respective 
                  service providers' opt-out mechanisms.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1">Contact Us</h3>
                <p className="text-neutral-600 text-sm">
                  If you have questions about our use of cookies or need help managing your preferences, 
                  please contact us at privacy@alignuk.com.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Updates to This Policy</h2>
          <p className="text-neutral-600 leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, 
            legal, or regulatory reasons. We will notify you of any material changes by posting the new policy on our website 
            and updating the "Last Updated" date.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center"
        >
          <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Questions About Cookies?
            </h2>
            <p className="text-neutral-600 mb-6">
              If you have any questions about our use of cookies or this Cookie Policy, 
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

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
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
