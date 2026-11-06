import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Checkbox, Divider, Input, PasswordInput } from '@/components/ui';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { getAuthErrorMessage } from '@/lib/errors';
import { sanitizeRedirectPath } from '@/utils/redirect';
import { hasErrors, validateEmail, validatePassword, type FieldErrors } from '@/utils/validation';
import { GoogleButton } from './GoogleButton';

type LoginField = 'email' | 'password';

const REMEMBERED_EMAIL_KEY = 'kalika-ai:remembered-email';

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<LoginField>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const redirectTo = sanitizeRedirectPath(
    new URLSearchParams(location.search).get('next'),
    '/dashboard',
  );

  // Restore a previously remembered email address.
  useEffect(() => {
    try {
      const remembered = window.localStorage.getItem(REMEMBERED_EMAIL_KEY);
      if (remembered) {
        setEmail(remembered);
        setRememberMe(true);
      }
    } catch {
      /* localStorage can be unavailable in private mode — ignore. */
    }
  }, []);

  const validate = useCallback((): FieldErrors<LoginField> => {
    const errors: FieldErrors<LoginField> = {};
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    return errors;
  }, [email, password]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setFormError(null);
    const errors = validate();
    setFieldErrors(errors);

    if (hasErrors(errors)) {
      if (errors.email) emailRef.current?.focus();
      else if (errors.password) passwordRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn({ email, password });

      try {
        if (rememberMe) {
          window.localStorage.setItem(REMEMBERED_EMAIL_KEY, email.trim().toLowerCase());
        } else {
          window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
        }
      } catch {
        /* Non-critical: remembering the email is a convenience only. */
      }

      navigate(redirectTo, { replace: true });
    } catch (error) {
      setFormError(getAuthErrorMessage(error));
      setPassword('');
      passwordRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isGoogleLoading || isSubmitting) return;
    setFormError(null);
    setIsGoogleLoading(true);
    try {
      // On success the browser is redirected to Google, so we keep the
      // loading state until the page unloads.
      await signInWithGoogle(redirectTo);
    } catch (error) {
      setFormError(getAuthErrorMessage(error));
      setIsGoogleLoading(false);
    }
  };

  const isBusy = isSubmitting || isGoogleLoading;

  return (
    <div className="w-full">
      <header className="mb-7">
        <h2 className="text-[1.75rem] font-bold tracking-tight text-white sm:text-[2rem]">
          Welcome Back
        </h2>
        <p className="mt-2 text-[14.5px] text-slate-400">
          Sign in to continue to <span className="font-medium text-slate-200">KALIKA AI</span>.
        </p>
      </header>

      {formError && (
        <Alert variant="error" className="mb-5" onDismiss={() => setFormError(null)}>
          {formError}
        </Alert>
      )}

      <GoogleButton onClick={handleGoogleSignIn} isLoading={isGoogleLoading} disabled={isSubmitting} />

      <Divider label="or continue with email" className="my-6" />

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          ref={emailRef}
          label="Email address"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
          }}
          onBlur={() => {
            if (email) setFieldErrors((prev) => ({ ...prev, email: validateEmail(email) ?? undefined }));
          }}
          error={fieldErrors.email}
          disabled={isBusy}
          leftIcon={<MailIcon />}
          required
        />

        <PasswordInput
          ref={passwordRef}
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
          }}
          error={fieldErrors.password}
          disabled={isBusy}
          leftIcon={<LockIcon />}
          required
        />

        <div className="flex items-center justify-between gap-3 pt-0.5">
          <Checkbox
            label="Remember me"
            name="remember"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            disabled={isBusy}
          />

          <Link
            to="/auth/forgot-password"
            className="rounded text-[13.5px] font-medium text-teal-300 transition-colors hover:text-teal-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          loadingText="Signing in…"
          disabled={isGoogleLoading}
          className="mt-2"
        >
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-[13.5px] text-slate-400">
        Don&apos;t have an account?{' '}
        <Link
          to="/auth/signup"
          className="font-semibold text-teal-300 transition-colors hover:text-teal-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60"
        >
          Create Account
        </Link>
      </p>

      <p className="mt-8 text-center text-[12px] leading-relaxed text-slate-500">
        By continuing, you agree to the{' '}
        <a
          href="/terms"
          className="text-slate-400 underline decoration-slate-600 underline-offset-2 transition-colors hover:text-teal-300"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          href="/privacy"
          className="text-slate-400 underline decoration-slate-600 underline-offset-2 transition-colors hover:text-teal-300"
        >
          Privacy Policy
        </a>{' '}
        of KALIKA AI.
      </p>
    </div>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.5 7 7.4 5.3a2 2 0 0 0 2.2 0L20.5 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]">
      <rect x="4.5" y="10" width="15" height="10.5" rx="2.5" />
      <path strokeLinecap="round" d="M8 10V7.5a4 4 0 0 1 8 0V10" />
      <circle cx="12" cy="15.2" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
