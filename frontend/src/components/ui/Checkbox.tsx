import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, id, ...props },
  ref,
) {
  const generatedId = useId();
  const checkboxId = id ?? `checkbox-${generatedId}`;

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={cn(
            'peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[5px] border border-white/20 bg-navy-850/80',
            'transition-all duration-150',
            'checked:border-teal-400 checked:bg-teal-500',
            'hover:border-white/35',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
          {...props}
        />
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute h-3 w-3 scale-75 text-navy-950 opacity-0 transition-all duration-150 peer-checked:scale-100 peer-checked:opacity-100"
        >
          <path d="M2.5 8.5 6 12l7.5-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>

      <label
        htmlFor={checkboxId}
        className="cursor-pointer select-none text-[13.5px] leading-none text-slate-400 transition-colors hover:text-slate-200"
      >
        {label}
      </label>
    </div>
  );
});
