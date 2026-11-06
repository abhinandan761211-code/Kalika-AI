import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { assertSupabaseConfigured, env } from '@/config/env';

assertSupabaseConfigured();

/**
 * Single Supabase client for the whole app.
 *
 * Only the public anon key is used here. All privileged operations must go
 * through the KALIKA AI backend, which holds the service-role credentials.
 */
export const supabase: SupabaseClient = createClient(
  env.supabaseUrl || 'https://placeholder.supabase.co',
  env.supabaseAnonKey || 'public-anon-key-placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storageKey: 'kalika-ai-auth',
    },
    global: {
      headers: {
        'x-client-info': 'kalika-ai-web/1.0.0',
      },
    },
  },
);
