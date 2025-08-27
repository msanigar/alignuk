'use client';

import Link from 'next/link';
import { useAuth } from './providers/AuthProvider';
import { LogIn, LogOut, User } from 'lucide-react';
import { Logo } from './Logo';

export function Header() {
  const { user, signIn, signOut } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Logo size="md" />
              <span className="text-xl font-bold text-neutral-900">AlignUK</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/quiz" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              Quiz
            </Link>
            {user && (
              <Link href="/dashboard" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Dashboard
              </Link>
            )}
            <Link href="/about" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              About
            </Link>
            <Link href="/glossary" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              Glossary
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {user.user_metadata?.avatar_url && (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full"
                      crossOrigin="anonymous"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to user icon if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  )}
                  {(!user.user_metadata?.avatar_url || true) && (
                    <User className="w-8 h-8 text-neutral-400 hidden" />
                  )}
                  <span className="text-sm text-neutral-700 hidden sm:block">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </div>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-1 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Sign out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:block">Sign in</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
