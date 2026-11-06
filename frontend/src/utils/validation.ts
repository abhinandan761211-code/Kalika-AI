/**
 * Framework-free validation helpers shared by every auth form.
 * Each validator returns `null` when the value is valid, or an error string.
 */

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

// Pragmatic email pattern: rejects obvious typos without rejecting valid
// addresses that a stricter RFC regex would wrongly block.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export function validateEmail(value: string): string | null {
  const email = value.trim();
  if (!email) return 'Email is required.';
  if (email.length > 254) return 'Email address is too long.';
  if (!EMAIL_PATTERN.test(email)) return 'Enter a valid email address.';
  return null;
}

export function validatePassword(value: string): string | null {
  if (!value) return 'Password is required.';
  if (value.length < 8) return 'Password must be at least 8 characters.';
  if (value.length > 72) return 'Password must be 72 characters or fewer.';
  return null;
}

/** Stricter rules used when creating a new account. */
export function validateNewPassword(value: string): string | null {
  const base = validatePassword(value);
  if (base) return base;
  if (!/[a-zA-Z]/.test(value)) return 'Password must include at least one letter.';
  if (!/\d/.test(value)) return 'Password must include at least one number.';
  return null;
}

export function validatePasswordConfirmation(password: string, confirmation: string): string | null {
  if (!confirmation) return 'Please confirm your password.';
  if (password !== confirmation) return 'Passwords do not match.';
  return null;
}

export function validateFullName(value: string): string | null {
  const name = value.trim();
  if (!name) return 'Full name is required.';
  if (name.length < 2) return 'Name must be at least 2 characters.';
  if (name.length > 80) return 'Name must be 80 characters or fewer.';
  return null;
}

/** Returns true when the errors object contains no messages. */
export function hasErrors<T extends string>(errors: FieldErrors<T>): boolean {
  return Object.values(errors).some(Boolean);
}
