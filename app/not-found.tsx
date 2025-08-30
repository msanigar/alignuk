import Link from 'next/link';
import { Home, Mail, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto text-center px-4">
        <div>
          {/* Error Icon */}
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-red-600">404</span>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link 
              href="/"
              className="btn-primary inline-flex items-center justify-center w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
            
            <Link 
              href="/contact"
              className="btn-secondary inline-flex items-center justify-center w-full"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-8 pt-8 border-t border-neutral-200">
            <h2 className="text-sm font-semibold text-neutral-700 mb-4">
              Popular Pages
            </h2>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <Link href="/quiz" className="text-primary-600 hover:text-primary-700 hover:underline">
                Take the Political Alignment Quiz
              </Link>
              <Link href="/about" className="text-primary-600 hover:text-primary-700 hover:underline">
                About AlignUK
              </Link>
              <Link href="/methodology" className="text-primary-600 hover:text-primary-700 hover:underline">
                Our Methodology
              </Link>
              <Link href="/glossary" className="text-primary-600 hover:text-primary-700 hover:underline">
                Political Terms Glossary
              </Link>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-6">
            <Link 
              href="/"
              className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
