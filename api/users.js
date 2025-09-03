import { createClient } from '@supabase/supabase-js';
import { getUserFromRequest } from './_authHelper.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('users').select('*');
      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const user = await getUserFromRequest(req, res);
      if (!user) return;

      const { name } = req.body || {};
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const { data, error } = await supabase
        .from('users')
        .insert({ id: user.id, name, email: user.email })
        .select()
        .single();

      if (error) return res.status(400).json({ error: error.message });
      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
