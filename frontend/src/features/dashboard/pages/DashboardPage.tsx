import { DashboardLayout } from '@/app/layouts/DashboardLayout';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();
  const displayName =
    (user?.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    user?.email?.split('@')[0] ??
    'there';

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-teal-300">
          Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Welcome back, {displayName}.
        </h1>
        <p className="mt-2 max-w-xl text-[14.5px] text-slate-400">
          You are signed in to KALIKA AI. This is a placeholder dashboard — the feature modules
          (AI chat, vision, agriculture intelligence and more) plug in here.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {['AI Assistant', 'Image Intelligence', 'Agriculture AI'].map((title) => (
            <div
              key={title}
              className="glass rounded-2xl p-5 transition-colors hover:border-white/20"
            >
              <h2 className="text-[15px] font-semibold text-white">{title}</h2>
              <p className="mt-1.5 text-[13px] text-slate-400">Coming soon.</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
