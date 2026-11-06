import type { Session, User } from '@supabase/supabase-js';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpPayload extends AuthCredentials {
  fullName: string;
}

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  /** True until the initial session has been restored from storage. */
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (credentials: AuthCredentials) => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<{ needsEmailConfirmation: boolean }>;
  signInWithGoogle: (redirectTo?: string) => Promise<void>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

export type AuthStatus = 'idle' | 'loading' | 'success' | 'error';
