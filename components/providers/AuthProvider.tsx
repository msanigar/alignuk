'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/lib/types';
import { getProfile, upsertProfile } from '@/lib/database';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('AuthProvider: Getting initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthProvider: Error getting session:', error);
        }
        
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            console.log('AuthProvider: Getting user profile...');
            const userProfile = await getProfile(session.user.id);
            setProfile(userProfile);
          } catch (profileError) {
            console.error('AuthProvider: Error getting profile:', profileError);
            // Don't fail the entire auth process if profile fails
            setProfile(null);
          }
        }
      } catch (error) {
        console.error('AuthProvider: Error in getInitialSession:', error);
      } finally {
        console.log('AuthProvider: Setting loading to false');
        setLoading(false);
      }
    };

    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('AuthProvider: Timeout reached, setting loading to false');
      setLoading(false);
    }, 10000); // 10 second timeout

    getInitialSession();

    return () => clearTimeout(timeoutId);

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthProvider: Auth state change:', event, session?.user?.id);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            // Create or update profile
            await upsertProfile({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name,
              avatarUrl: session.user.user_metadata?.avatar_url,
            });
            
            const userProfile = await getProfile(session.user.id);
            setProfile(userProfile);
          } catch (profileError) {
            console.error('AuthProvider: Error updating profile:', profileError);
            // Don't fail the entire auth process if profile fails
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    console.log('Attempting Google OAuth sign in...');
    console.log('Current origin:', window.location.origin);
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
    
    if (error) {
      console.error('Sign in error:', error);
      console.error('Error details:', error.message);
    } else {
      console.log('OAuth URL generated:', data?.url);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
    }
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
