import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email?: string;
          name?: string;
          avatar_url?: string;
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string;
          name?: string;
          avatar_url?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar_url?: string;
          created_at?: string;
        };
      };
      sessions: {
        Row: {
          id: string;
          created_at: string;
          anon_key: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          anon_key: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          anon_key?: string;
        };
      };
      quizzes: {
        Row: {
          id: string;
          profile_id?: string;
          session_id?: string;
          created_at: string;
          version: string;
          duration_ms?: number;
          importance_weights?: Record<string, number>;
        };
        Insert: {
          id?: string;
          profile_id?: string;
          session_id?: string;
          created_at?: string;
          version: string;
          duration_ms?: number;
          importance_weights?: Record<string, number>;
        };
        Update: {
          id?: string;
          profile_id?: string;
          session_id?: string;
          created_at?: string;
          version?: string;
          duration_ms?: number;
          importance_weights?: Record<string, number>;
        };
      };
      answers: {
        Row: {
          id: string;
          quiz_id: string;
          question_id: string;
          value: number;
        };
        Insert: {
          id?: string;
          quiz_id: string;
          question_id: string;
          value: number;
        };
        Update: {
          id?: string;
          quiz_id?: string;
          question_id?: string;
          value?: number;
        };
      };
      scores: {
        Row: {
          id: string;
          quiz_id: string;
          axis: string;
          score: number;
          confidence: number;
        };
        Insert: {
          id?: string;
          quiz_id: string;
          axis: string;
          score: number;
          confidence: number;
        };
        Update: {
          id?: string;
          quiz_id?: string;
          axis?: string;
          score?: number;
          confidence?: number;
        };
      };
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
