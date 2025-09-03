import { createClient } from '@supabase/supabase-js';

// This client is only for verifying tokens
const supabaseAuth = createClient(
  process.env.SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY  // frontend-safe anon key
);

export async function getUserFromRequest(req, res) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return null;
  }

  const { data, error } = await supabaseAuth.auth.getUser(token);
  if (error || !data?.user) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return null;
  }
  return data.user; // contains id, email, etc.
}
