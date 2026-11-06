import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Spinner } from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-gradient text-navy-950 font-semibold shadow-glow hover:shadow-[0_0_50px_-6px_rgba(45,212,191,0.6)] hover:brightness-110 active:brightness-95',
  secondary:
    'glass text-slate-100 hover:bg-white/[0.08] hover:border-white/20 active:bg-white/[0.06]',
  outline:
    'border border-teal-400/40 bg-transparent text-teal-300 hover:bg-teal-400/10 hover:border-teal-400/70',
  ghost: 'bg-transparent text-slate-300 hover:bg-white/[0.06] hover:text-white',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm rounded-lg gap-2',
  md: 'h-11 px-5 text-sm rounded-xl gap-2.5',
  lg: 'h-12 px-6 text-[15px] rounded-xl gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    loadingText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className,
    children,
    disabled,
    type = 'button',
    ...props
  },
  ref,
) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={cn(
        'relative inline-flex select-none items-center justify-center whitespace-nowrap',
        'transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner className="h-4 w-4" />
          <span>{loadingText ?? children}</span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
});
