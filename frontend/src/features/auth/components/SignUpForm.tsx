import { useCallback, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Checkbox, Divider, Input, PasswordInput } from '@/components/ui';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { getAuthErrorMessage } from '@/lib/errors';
import {
  hasErrors,
  validateEmail,
  validateFullName,
  validateNewPassword,
  validatePasswordConfirmation,
  type FieldErrors,
} from '@/utils/validation';
import { GoogleButton } from './GoogleButton';

type SignUpField = 'fullName' | 'email' | 'password' | 'confirmPassword' | 'terms';

export function SignUpForm() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors<SignUpField>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const validate = useCallback((): FieldErrors<SignUpField> => {
    const errors: FieldErrors<SignUpField> = {};
    const nameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const passwordError = validateNewPassword(password);
    const confirmError = validatePasswordConfirmation(password, confirmPassword);

    if (nameError) errors.fullName = nameError;
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    if (confirmError) errors.confirmPassword = confirmError;
    if (!acceptedTerms) errors.terms = 'Please accept the Terms of Service and Privacy Policy.';

    return errors;
  }, [fullName, email, password, confirmPassword, acceptedTerms]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setFormError(null);
    setSuccessMessage(null);

    const errors = validate();
    setFieldErrors(errors);

    if (hasErrors(errors)) {
      if (errors.fullName) nameRef.current?.focus();
      else if (errors.email) emailRef.current?.focus();
      else if (errors.password) passwordRef.current?.focus();
      else if (errors.confirmPassword) confirmRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const { needsEmailConfirmation } = await signUp({ email, password, fullName });

      if (needsEmailConfirmation) {
        setSuccessMessage(
          'Account created. Check your inbox for a verification link to activate your KALIKA AI account.',
        );
        setPassword('');
        setConfirmPassword('');
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      setFormError(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isGoogleLoading || isSubmitting) return;
    setFormError(null);
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle('/dashboard');
    } catch (error) {
      setFormError(getAuthErrorMessage(error));
      setIsGoogleLoading(false);
    }
  };

  const isBusy = isSubmitting || isGoogleLoading;

  return (
    <div className="w-full">
      <header className="mb-6">
        <h2 className="text-[1.75rem] font-bold tracking-tight text-white sm:text-[2rem]">
          Create Account
        </h2>
        <p className="mt-2 text-[14.5px] text-slate-400">
          Get started with <span className="font-medium text-slate-200">KALIKA AI</span> in seconds.
        </p>
      </header>

      {formError && (
        <Alert variant="error" className="mb-5" onDismiss={() => setFormError(null)}>
          {formError}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" title="Verify your email" className="mb-5">
          {successMessage}
        </Alert>
      )}

      <GoogleButton
        onClick={handleGoogleSignIn}
        isLoading={isGoogleLoading}
        disabled={isSubmitting}
        label="Sign up with Google"
      />

      <Divider label="or sign up with email" className="my-6" />

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          ref={nameRef}
          label="Full name"
          name="fullName"
          autoComplete="name"
          placeholder="Your full name"
          value={fullName}
          onChange={(event) => {
            setFullName(event.target.value);
            if (fieldErrors.fullName) setFieldErrors((prev) => ({ ...prev, fullName: undefined }));
          }}
          error={fieldErrors.fullName}
          disabled={isBusy}
          required
        />

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
          error={fieldErrors.email}
          disabled={isBusy}
          required
        />

        <PasswordInput
          ref={passwordRef}
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
          }}
          error={fieldErrors.password}
          hint="Use 8+ characters with at least one letter and one number."
          disabled={isBusy}
          required
        />

        <PasswordInput
          ref={confirmRef}
          label="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            if (fieldErrors.confirmPassword)
              setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
          error={fieldErrors.confirmPassword}
          disabled={isBusy}
          required
        />

        <div>
          <Checkbox
            label={
              <span>
                I agree to the{' '}
                <a href="/terms" className="text-teal-300 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-teal-300 hover:underline">
                  Privacy Policy
                </a>
              </span>
            }
            name="terms"
            checked={acceptedTerms}
            onChange={(event) => {
              setAcceptedTerms(event.target.checked);
              if (fieldErrors.terms) setFieldErrors((prev) => ({ ...prev, terms: undefined }));
            }}
            disabled={isBusy}
          />
          {fieldErrors.terms && (
            <p role="alert" className="mt-1.5 text-[12.5px] text-rose-400">
              {fieldErrors.terms}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          loadingText="Creating account…"
          disabled={isGoogleLoading}
          className="mt-2"
        >
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-[13.5px] text-slate-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-teal-300 transition-colors hover:text-teal-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
