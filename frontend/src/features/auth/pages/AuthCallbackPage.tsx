import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { getAuthErrorMessage } from '@/lib/errors';
import { sanitizeRedirectPath } from '@/utils/redirect';

/**
 * Landing page for OAuth (Google) and email-confirmation redirects.
 * Supabase exchanges the code in the URL for a session automatically; we just
 * wait for the auth state to settle and then forward the user.
 */
export default function AuthCallbackPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthError = params.get('error_description') ?? params.get('error');
    if (oauthError) {
      setError(getAuthErrorMessage(new Error(oauthError)));
      return;
    }

    if (isLoading) return;

    if (isAuthenticated) {
      const next = sanitizeRedirectPath(params.get('next'), '/dashboard');
      navigate(next, { replace: true });
    } else {
      // Give Supabase a moment to finish the PKCE exchange before failing.
      const timeout = window.setTimeout(() => {
        setError('We could not complete sign in. Please try again.');
      }, 4000);
      return () => window.clearTimeout(timeout);
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      {error ? (
        <>
          <p className="text-[15px] text-rose-300">{error}</p>
          <button
            type="button"
            onClick={() => navigate('/login', { replace: true })}
            className="rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-navy-950"
          >
            Back to sign in
          </button>
        </>
      ) : (
        <>
          <Spinner className="h-7 w-7 text-teal-300" label="Completing sign in" />
          <p className="text-[14.5px] text-slate-400">Completing sign in to KALIKA AI…</p>
        </>
      )}
    </div>
  );
}
