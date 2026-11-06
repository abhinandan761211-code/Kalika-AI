import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { env } from '@/config/env';
import type { AuthCredentials, SignUpPayload } from '@/types/auth';

/**
 * Thin, typed wrapper around Supabase Auth.
 * Components never talk to Supabase directly — they go through this service.
 */
export const authService = {
  async getSession(): Promise<Session | null> {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  async getUser(): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      // A missing session is not an error condition for callers.
      if (error.name === 'AuthSessionMissingError') return null;
      throw error;
    }
    return data.user;
  },

  async signInWithPassword({ email, password }: AuthCredentials): Promise<Session> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) throw error;
    if (!data.session) throw new Error('Sign in succeeded but no session was returned.');
    return data.session;
  },

  async signUp({ email, password, fullName }: SignUpPayload): Promise<{ needsEmailConfirmation: boolean }> {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: { full_name: fullName.trim() },
        emailRedirectTo: `${env.appUrl}/auth/callback`,
      },
    });
    if (error) throw error;

    // When email confirmation is enabled, Supabase returns a user but no session.
    return { needsEmailConfirmation: !data.session };
  },

  async signInWithGoogle(redirectTo = '/dashboard'): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${env.appUrl}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      },
    });
    if (error) throw error;
  },

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async requestPasswordReset(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${env.appUrl}/auth/reset-password`,
    });
    if (error) throw error;
  },

  async updatePassword(password: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  },

  /** Subscribe to auth state changes. Returns an unsubscribe function. */
  onAuthStateChange(
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ): () => void {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => callback(event, session));

    return () => subscription.unsubscribe();
  },
};
