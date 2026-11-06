import { AuthError } from '@supabase/supabase-js';

/**
 * Maps Supabase / network errors to short, human-friendly messages that are
 * safe to show in the UI (no internal details, no account enumeration).
 */
export function getAuthErrorMessage(error: unknown): string {
  if (!error) return 'Something went wrong. Please try again.';

  if (error instanceof AuthError) {
    const code = (error as AuthError & { code?: string }).code ?? '';
    const message = error.message.toLowerCase();

    if (code === 'invalid_credentials' || message.includes('invalid login credentials')) {
      return 'Incorrect email or password. Please try again.';
    }
    if (code === 'email_not_confirmed' || message.includes('email not confirmed')) {
      return 'Please verify your email address before signing in.';
    }
    if (code === 'user_already_exists' || message.includes('already registered')) {
      return 'An account with this email already exists. Try signing in instead.';
    }
    if (code === 'weak_password' || message.includes('password should be')) {
      return 'That password is too weak. Use at least 8 characters with letters and numbers.';
    }
    if (code === 'over_email_send_rate_limit' || message.includes('rate limit')) {
      return 'Too many attempts. Please wait a moment and try again.';
    }
    if (code === 'same_password') {
      return 'Your new password must be different from your current password.';
    }
    if (message.includes('failed to fetch') || message.includes('network')) {
      return 'Network error. Check your connection and try again.';
    }
    return error.message || 'Authentication failed. Please try again.';
  }

  if (error instanceof Error) {
    if (error.message.toLowerCase().includes('failed to fetch')) {
      return 'Network error. Check your connection and try again.';
    }
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}
