/**
 * Guards against open-redirect attacks: only same-origin, absolute paths are
 * accepted as post-login destinations.
 */
export function sanitizeRedirectPath(raw: string | null | undefined, fallback = '/dashboard'): string {
  if (!raw) return fallback;

  // Must be a rooted path, and must not be a protocol-relative URL ("//evil.com").
  if (!raw.startsWith('/') || raw.startsWith('//') || raw.startsWith('/\\')) {
    return fallback;
  }

  // Reject anything that tries to smuggle a scheme or backslashes.
  if (/[\\]/.test(raw) || /^\/[a-z]+:/i.test(raw)) {
    return fallback;
  }

  return raw;
}
