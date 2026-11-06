import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { BrandPanel } from '@/features/auth/components/BrandPanel';

interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * Two-column authentication shell:
 *  - Left: KALIKA AI branding panel (desktop / large tablet only)
 *  - Right: glassmorphism card holding the auth form
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden">
      <BrandPanel />

      <main className="relative flex w-full flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:w-[48%] lg:px-10 xl:w-[45%]">
        {/* Mobile-only ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden"
        >
          <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-teal-500/15 blur-[90px]" />
          <div className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-violet-600/15 blur-[100px]" />
        </div>

        <div className="relative z-10 w-full max-w-[420px]">
          {/* Compact brand header for mobile / tablet */}
          <div className="mb-8 flex justify-center lg:hidden">
            <Link
              to="/"
              className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60"
              aria-label="KALIKA AI home"
            >
              <Logo size={38} withWordmark wordmarkClassName="text-[16px]" />
            </Link>
          </div>

          <div className="gradient-border animate-fade-up rounded-3xl bg-navy-900/60 p-6 shadow-glass backdrop-blur-2xl sm:p-8">
            {children}
          </div>

          <p className="mt-6 text-center text-[11.5px] text-slate-600">
            © {new Date().getFullYear()} KALIKA AI. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
