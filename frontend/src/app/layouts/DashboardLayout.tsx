import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-navy-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/dashboard" aria-label="KALIKA AI dashboard">
            <Logo size={32} withWordmark wordmarkClassName="text-[15px]" />
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-[13px] text-slate-400 sm:inline">
              {user?.email}
            </span>
            <Button variant="secondary" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>
    </div>
  );
}
