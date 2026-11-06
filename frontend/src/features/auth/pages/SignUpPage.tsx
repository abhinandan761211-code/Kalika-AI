import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { SignUpForm } from '../components/SignUpForm';

export default function SignUpPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
