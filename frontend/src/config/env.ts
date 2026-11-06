/**
 * Centralised, validated access to build-time environment variables.
 *
 * Vite only exposes variables prefixed with `VITE_` to the client bundle, so
 * nothing secret can ever leak through here. The Supabase anon key is a public
 * key by design — it is protected by Row Level Security, not by secrecy.
 */

interface AppEnv {
  supabaseUrl: string;
  supabaseAnonKey: string;
  apiBaseUrl: string;
  appUrl: string;
  isConfigured: boolean;
}

function read(key: keyof ImportMetaEnv, fallback = ''): string {
  const value = import.meta.env[key];
  return typeof value === 'string' ? value.trim() : fallback;
}

const supabaseUrl = read('VITE_SUPABASE_URL');
const supabaseAnonKey = read('VITE_SUPABASE_ANON_KEY');

export const env: AppEnv = {
  supabaseUrl,
  supabaseAnonKey,
  apiBaseUrl: read('VITE_API_BASE_URL', 'http://localhost:8000/api/v1'),
  appUrl: read('VITE_APP_URL', window.location.origin),
  isConfigured: Boolean(supabaseUrl && supabaseAnonKey),
};

/**
 * Fails loudly in development when the Supabase credentials are missing,
 * instead of letting the app crash with an opaque error at runtime.
 */
export function assertSupabaseConfigured(): void {
  if (env.isConfigured) return;

  const message =
    'KALIKA AI: Supabase is not configured. Copy `frontend/.env.example` to ' +
    '`frontend/.env.local` and set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.';

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.error(message);
  }
}
