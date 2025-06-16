
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!mounted) return;
      
      if (error) {
        console.error('Error getting initial session:', error);
      }
      
      console.log('Initial session:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    // Validate inputs
    if (!email || !password) {
      const error = { message: 'Email and password are required' };
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }

    if (password.length < 6) {
      const error = { message: 'Password must be at least 6 characters long' };
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName || ''
          }
        }
      });

      if (error) {
        let errorMessage = error.message;
        
        // Handle specific error cases
        if (error.message.includes('rate_limit')) {
          errorMessage = 'Too many sign up attempts. Please wait a moment and try again.';
        } else if (error.message.includes('email_address_not_authorized')) {
          errorMessage = 'This email address is not authorized to sign up.';
        } else if (error.message.includes('weak_password')) {
          errorMessage = 'Password is too weak. Please choose a stronger password.';
        }

        toast({
          title: "Sign up failed",
          description: errorMessage,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success!",
          description: "Please check your email to confirm your account."
        });
      }

      return { error };
    } catch (err) {
      const error = { message: 'An unexpected error occurred. Please try again.' };
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    // Validate inputs
    if (!email || !password) {
      const error = { message: 'Email and password are required' };
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        let errorMessage = error.message;
        
        // Handle specific error cases
        if (error.message.includes('invalid_credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('email_not_confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link before signing in.';
        } else if (error.message.includes('rate_limit')) {
          errorMessage = 'Too many sign in attempts. Please wait a moment and try again.';
        }

        toast({
          title: "Sign in failed",
          description: errorMessage,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in."
        });
      }

      return { error };
    } catch (err) {
      const error = { message: 'An unexpected error occurred. Please try again.' };
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('Attempting to sign out...');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log('Sign out successful');
        // Clear local state immediately
        setSession(null);
        setUser(null);
        
        toast({
          title: "Signed out",
          description: "You have been successfully signed out."
        });
        
        // Force redirect to home page
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Unexpected sign out error:', err);
      toast({
        title: "Sign out failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        let errorMessage = error.message;
        
        if (error.message.includes('rate_limit')) {
          errorMessage = 'Too many Google sign in attempts. Please wait a moment and try again.';
        }

        toast({
          title: "Google sign in failed",
          description: errorMessage,
          variant: "destructive"
        });
      }

      return { error };
    } catch (err) {
      const error = { message: 'An unexpected error occurred with Google sign in.' };
      toast({
        title: "Google sign in failed",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
