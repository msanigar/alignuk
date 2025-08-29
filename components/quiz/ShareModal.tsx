'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Twitter, Facebook, Linkedin } from 'lucide-react';

interface ShareModalProps {
  results: {
    tags: string[];
  };
  onClose: () => void;
}

export function ShareModal({ results, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `I just took the AlignUK political alignment quiz! My results: ${results.tags.join(', ')}. Take the quiz at alignuk.com to discover your political alignment across six key dimensions.`;

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://alignuk.com';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleSocialShare = (platform: string) => {
    let url = '';
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900">
              Share Your Results
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h4 className="font-medium text-neutral-900 mb-3">Your Political Profile</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {results.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-neutral-600">
                Share your political alignment results with friends and start a conversation about UK politics!
              </p>
            </div>

            {/* Copy Text */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Share Text
              </label>
              <div className="relative">
                <textarea
                  value={shareText}
                  readOnly
                  className="w-full p-3 border border-neutral-300 rounded-lg text-sm resize-none"
                  rows={4}
                />
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  aria-label="Copy text"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 mt-1">Copied to clipboard!</p>
              )}
            </div>

            {/* Social Share Buttons */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Share on Social Media
              </label>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  <span className="text-sm">Twitter</span>
                </button>
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  <span className="text-sm">Facebook</span>
                </button>
                <button
                  onClick={() => handleSocialShare('linkedin')}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Sharing your results helps others discover their political alignment and promotes informed political discussion in the UK.
              </p>
            </div>
          </div>
          
          <div className="p-6 border-t border-neutral-200">
            <button
              onClick={onClose}
              className="w-full btn-primary"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
