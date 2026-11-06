import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CapabilityCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  accent: 'teal' | 'violet' | 'mixed';
  className?: string;
}

const accentStyles = {
  teal: {
    icon: 'text-teal-300 bg-teal-400/10 ring-teal-400/25',
    glow: 'group-hover:shadow-[0_0_30px_-10px_rgba(45,212,191,0.55)]',
  },
  violet: {
    icon: 'text-violet-300 bg-violet-400/10 ring-violet-400/25',
    glow: 'group-hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.55)]',
  },
  mixed: {
    icon: 'text-teal-200 bg-gradient-to-br from-teal-400/15 to-violet-500/15 ring-white/15',
    glow: 'group-hover:shadow-[0_0_30px_-10px_rgba(94,234,212,0.45)]',
  },
} as const;

export function CapabilityCard({ icon, title, description, accent, className }: CapabilityCardProps) {
  const styles = accentStyles[accent];

  return (
    <div
      className={cn(
        'group relative flex items-start gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4',
        'backdrop-blur-md transition-all duration-300',
        'hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.06]',
        styles.glow,
        className,
      )}
    >
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-105',
          styles.icon,
        )}
        aria-hidden="true"
      >
        {icon}
      </span>

      <div className="min-w-0">
        <h3 className="text-[14px] font-semibold leading-tight text-white">{title}</h3>
        <p className="mt-1 text-[12.5px] leading-relaxed text-slate-400">{description}</p>
      </div>
    </div>
  );
}
