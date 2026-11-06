import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { authService } from '@/services/auth.service';
import type { AuthContextValue, AuthCredentials, SignUpPayload } from '@/types/auth';
import { AuthContext } from './hooks/useAuth';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    // Restore any persisted session on first paint.
    authService
      .getSession()
      .then((restored) => {
        if (!mountedRef.current) return;
        setSession(restored);
        setUser(restored?.user ?? null);
      })
      .catch(() => {
        if (!mountedRef.current) return;
        setSession(null);
        setUser(null);
      })
      .finally(() => {
        if (mountedRef.current) setIsLoading(false);
      });

    // Keep state in sync with token refreshes, sign-outs and OAuth callbacks.
    const unsubscribe = authService.onAuthStateChange((_event, nextSession) => {
      if (!mountedRef.current) return;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      mountedRef.current = false;
      unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (credentials: AuthCredentials) => {
    const nextSession = await authService.signInWithPassword(credentials);
    setSession(nextSession);
    setUser(nextSession.user);
  }, []);

  const signUp = useCallback(async (payload: SignUpPayload) => {
    return authService.signUp(payload);
  }, []);

  const signInWithGoogle = useCallback(async (redirectTo?: string) => {
    await authService.signInWithGoogle(redirectTo);
  }, []);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setSession(null);
    setUser(null);
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    await authService.requestPasswordReset(email);
  }, []);

  const updatePassword = useCallback(async (password: string) => {
    await authService.updatePassword(password);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      isLoading,
      isAuthenticated: Boolean(session),
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      requestPasswordReset,
      updatePassword,
    }),
    [user, session, isLoading, signIn, signUp, signInWithGoogle, signOut, requestPasswordReset, updatePassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
