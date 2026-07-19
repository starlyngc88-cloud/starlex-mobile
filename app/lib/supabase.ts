// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const expoConfig = Constants.expoConfig ?? Constants.manifest ?? {};
const configExtra = expoConfig.extra ?? {};

const SUPABASE_URL = configExtra.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = configExtra.supabaseAnonKey || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
const SUPABASE_SCHEMA = configExtra.supabaseSchema || process.env.EXPO_PUBLIC_SUPABASE_SCHEMA || 'legal';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  db: {
    schema: SUPABASE_SCHEMA,
  },
});
