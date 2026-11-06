import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
  /** Visually hide the label but keep it for screen readers. */
  hideLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, leftIcon, rightSlot, hideLabel = false, className, id, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? `input-${generatedId}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className={cn(
          'mb-1.5 block text-[13px] font-medium text-slate-300',
          hideLabel && 'sr-only',
        )}
      >
        {label}
      </label>

      <div className="relative">
        {leftIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'h-12 w-full rounded-xl border bg-navy-850/60 text-[15px] text-slate-100',
            'placeholder:text-slate-500',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            leftIcon ? 'pl-11' : 'pl-4',
            rightSlot ? 'pr-12' : 'pr-4',
            error
              ? 'border-rose-500/60 focus:border-rose-400 focus:ring-rose-500/30'
              : 'border-white/10 hover:border-white/20 focus:border-teal-400/60 focus:ring-teal-400/25',
            'disabled:cursor-not-allowed disabled:opacity-60',
            className,
          )}
          {...props}
        />

        {rightSlot && (
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2">{rightSlot}</div>
        )}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-rose-400">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-11.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6.5Zm0 7.25a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-[12.5px] text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
