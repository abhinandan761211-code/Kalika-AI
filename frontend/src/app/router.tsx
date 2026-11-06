import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Spinner } from '@/components/ui';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const SignUpPage = lazy(() => import('@/features/auth/pages/SignUpPage'));
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/features/auth/pages/ResetPasswordPage'));
const AuthCallbackPage = lazy(() => import('@/features/auth/pages/AuthCallbackPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="h-7 w-7 text-teal-300" label="Loading KALIKA AI" />
    </div>
  );
}

function withSuspense(element: JSX.Element) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: withSuspense(<LoginPage />),
  },
  {
    path: '/auth/signup',
    element: withSuspense(<SignUpPage />),
  },
  {
    path: '/auth/forgot-password',
    element: withSuspense(<ForgotPasswordPage />),
  },
  {
    path: '/auth/reset-password',
    element: withSuspense(<ResetPasswordPage />),
  },
  {
    path: '/auth/callback',
    element: withSuspense(<AuthCallbackPage />),
  },
  {
    path: '/dashboard',
    element: withSuspense(
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>,
    ),
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
