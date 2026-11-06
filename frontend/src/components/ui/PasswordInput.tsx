import { forwardRef, useState } from 'react';
import { Input, type InputProps } from './Input';

type PasswordInputProps = Omit<InputProps, 'type' | 'rightSlot'>;

/** Password field with an accessible show/hide toggle. */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <Input
        ref={ref}
        type={isVisible ? 'text' : 'password'}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        rightSlot={
          <button
            type="button"
            onClick={() => setIsVisible((visible) => !visible)}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
            title={isVisible ? 'Hide password' : 'Show password'}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60"
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
        {...props}
      />
    );
  },
);

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-[18px] w-[18px]" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.04 12.32a1 1 0 0 1 0-.64C3.42 7.51 7.36 4.5 12 4.5s8.58 3.01 9.96 7.18a1 1 0 0 1 0 .64C20.58 16.49 16.64 19.5 12 19.5s-8.58-3.01-9.96-7.18Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-[18px] w-[18px]" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.58 10.58a2 2 0 0 0 2.83 2.83M9.36 5.14A9.7 9.7 0 0 1 12 4.5c4.64 0 8.58 3.01 9.96 7.18a1 1 0 0 1 0 .64 10.6 10.6 0 0 1-2.4 3.6M6.1 6.1a10.6 10.6 0 0 0-4.06 5.58 1 1 0 0 0 0 .64C3.42 16.49 7.36 19.5 12 19.5c1.2 0 2.35-.2 3.42-.57" />
    </svg>
  );
}
