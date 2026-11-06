import { useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { Alert, Button, PasswordInput } from '@/components/ui';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { getAuthErrorMessage } from '@/lib/errors';
import { validateNewPassword, validatePasswordConfirmation } from '@/utils/validation';

export default function ResetPasswordPage() {
  const { updatePassword, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setFormError(null);
    const nextPasswordError = validateNewPassword(password);
    const nextConfirmError = validatePasswordConfirmation(password, confirmPassword);
    setPasswordError(nextPasswordError);
    setConfirmError(nextConfirmError);

    if (nextPasswordError || nextConfirmError) {
      passwordRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await updatePassword(password);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setFormError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  // The recovery link signs the user in with a temporary session. Without it,
  // the link is invalid or expired.
  const hasRecoverySession = isAuthenticated;

  return (
    <AuthLayout>
      <header className="mb-6">
        <h2 className="text-[1.75rem] font-bold tracking-tight text-white sm:text-[2rem]">
          Set New Password
        </h2>
        <p className="mt-2 text-[14.5px] text-slate-400">
          Choose a strong password for your KALIKA AI account.
        </p>
      </header>

      {formError && (
        <Alert variant="error" className="mb-5" onDismiss={() => setFormError(null)}>
          {formError}
        </Alert>
      )}

      {!isLoading && !hasRecoverySession ? (
        <div className="space-y-5">
          <Alert variant="warning" title="Link expired">
            This password reset link is invalid or has expired. Request a new one to continue.
          </Alert>
          <Button size="lg" fullWidth onClick={() => navigate('/auth/forgot-password')}>
            Request New Link
          </Button>
          <p className="text-center text-[13.5px] text-slate-400">
            <Link to="/login" className="font-semibold text-teal-300 hover:underline">
              Back to sign in
            </Link>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <PasswordInput
            ref={passwordRef}
            label="New password"
            name="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (passwordError) setPasswordError(null);
            }}
            error={passwordError ?? undefined}
            hint="Use 8+ characters with at least one letter and one number."
            disabled={isSubmitting}
            required
          />

          <PasswordInput
            label="Confirm new password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Re-enter your new password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              if (confirmError) setConfirmError(null);
            }}
            error={confirmError ?? undefined}
            disabled={isSubmitting}
            required
          />

          <Button
            type="submit"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            loadingText="Updating password…"
            className="mt-2"
          >
            Update Password
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
