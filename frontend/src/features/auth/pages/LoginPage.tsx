import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { sanitizeRedirectPath } from '@/utils/redirect';
import { LoginForm } from '../components/LoginForm';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Already signed in? Skip the login screen entirely.
  useEffect(() => {
    if (isLoading || !isAuthenticated) return;
    const next = sanitizeRedirectPath(new URLSearchParams(location.search).get('next'), '/dashboard');
    navigate(next, { replace: true });
  }, [isAuthenticated, isLoading, location.search, navigate]);

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
