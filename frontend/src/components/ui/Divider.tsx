import { cn } from '@/lib/cn';

interface DividerProps {
  label?: string;
  className?: string;
}

export function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <div className={cn('hairline', className)} role="separator" />;
  }

  return (
    <div className={cn('flex items-center gap-3', className)} role="separator" aria-label={label}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
      <span className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
    </div>
  );
}
