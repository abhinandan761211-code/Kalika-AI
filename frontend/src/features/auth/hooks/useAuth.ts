import { createContext, useContext } from 'react';
import type { AuthContextValue } from '@/types/auth';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/** Access the current auth session and actions. Must be used inside <AuthProvider>. */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an <AuthProvider>.');
  }
  return context;
}
