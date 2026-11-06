import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type AlertVariant = 'error' | 'success' | 'info' | 'warning';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
  onDismiss?: () => void;
}

const styles: Record<AlertVariant, { wrapper: string; icon: string; title: string }> = {
  error: {
    wrapper: 'border-rose-500/30 bg-rose-500/10 text-rose-200',
    icon: 'text-rose-400',
    title: 'text-rose-100',
  },
  success: {
    wrapper: 'border-teal-400/30 bg-teal-400/10 text-teal-100',
    icon: 'text-teal-300',
    title: 'text-teal-50',
  },
  info: {
    wrapper: 'border-violet-400/30 bg-violet-400/10 text-violet-100',
    icon: 'text-violet-300',
    title: 'text-violet-50',
  },
  warning: {
    wrapper: 'border-amber-400/30 bg-amber-400/10 text-amber-100',
    icon: 'text-amber-300',
    title: 'text-amber-50',
  },
};

export function Alert({ variant = 'error', title, children, className, onDismiss }: AlertProps) {
  const s = styles[variant];

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={cn(
        'flex items-start gap-3 rounded-xl border px-3.5 py-3 text-[13.5px] leading-relaxed',
        'animate-fade-in',
        s.wrapper,
        className,
      )}
    >
      <span className={cn('mt-0.5 shrink-0', s.icon)} aria-hidden="true">
        <AlertIcon variant={variant} />
      </span>

      <div className="min-w-0 flex-1">
        {title && <p className={cn('mb-0.5 font-semibold', s.title)}>{title}</p>}
        <div>{children}</div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss message"
          className="-mr-1 -mt-0.5 shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      )}
    </div>
  );
}

function AlertIcon({ variant }: { variant: AlertVariant }) {
  if (variant === 'success') {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.86-9.36a.75.75 0 1 0-1.22-.88l-3.2 4.44-1.9-1.9a.75.75 0 1 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.14-.09l3.74-5.13Z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  if (variant === 'info') {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.25v3.25a.75.75 0 0 0 1.5 0V10A1 1 0 0 0 9.75 9H9Z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  if (variant === 'warning') {
    return (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path
          fillRule="evenodd"
          d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-11.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6.5Zm0 7.25a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
