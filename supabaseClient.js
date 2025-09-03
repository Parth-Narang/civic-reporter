import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;   // frontend-safe
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY; // frontend-safe

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
