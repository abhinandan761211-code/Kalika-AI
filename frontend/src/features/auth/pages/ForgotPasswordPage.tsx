import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { Alert, Button, Input } from '@/components/ui';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { getAuthErrorMessage } from '@/lib/errors';
import { validateEmail } from '@/utils/validation';

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setFormError(null);
    const emailError = validateEmail(email);
    setError(emailError);
    if (emailError) {
      emailRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await requestPasswordReset(email);
      // Always show the same confirmation, whether or not the account exists,
      // to avoid leaking which emails are registered.
      setIsSent(true);
    } catch (err) {
      setFormError(getAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <header className="mb-6">
        <h2 className="text-[1.75rem] font-bold tracking-tight text-white sm:text-[2rem]">
          Reset Password
        </h2>
        <p className="mt-2 text-[14.5px] text-slate-400">
          Enter your email and we&apos;ll send you a secure link to reset your KALIKA AI password.
        </p>
      </header>

      {formError && (
        <Alert variant="error" className="mb-5" onDismiss={() => setFormError(null)}>
          {formError}
        </Alert>
      )}

      {isSent ? (
        <div className="space-y-5">
          <Alert variant="success" title="Check your inbox">
            If an account exists for <span className="font-medium">{email}</span>, a password reset
            link is on its way. The link expires in 60 minutes.
          </Alert>

          <Button variant="secondary" size="lg" fullWidth onClick={() => setIsSent(false)}>
            Use a different email
          </Button>

          <p className="text-center text-[13.5px] text-slate-400">
            <Link
              to="/login"
              className="font-semibold text-teal-300 transition-colors hover:text-teal-200 hover:underline"
            >
              Back to sign in
            </Link>
          </p>
        </div>
      ) : (
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
              if (error) setError(null);
            }}
            error={error ?? undefined}
            disabled={isSubmitting}
            required
          />

          <Button
            type="submit"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            loadingText="Sending link…"
            className="mt-2"
          >
            Send Reset Link
          </Button>

          <p className="pt-2 text-center text-[13.5px] text-slate-400">
            Remembered it?{' '}
            <Link
              to="/login"
              className="font-semibold text-teal-300 transition-colors hover:text-teal-200 hover:underline"
            >
              Back to sign in
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
