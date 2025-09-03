import { createClient } from '@supabase/supabase-js';
import { getUserFromRequest } from './_authHelper.js';

// Supabase client with service role key (full access)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    // GET: Fetch summaries
    if (req.method === 'GET') {
      const issue_id = req.query.issue_id;

      const baseQuery = supabase
        .from('summaries')
        .select('*')
        .order('created_at', { ascending: false });

      const { data, error } = issue_id
        ? await baseQuery.eq('issue_id', issue_id)
        : await baseQuery;

      if (error) return res.status(400).json({ error: error.message });

      return res.status(200).json(data);
    }

    // POST: Add new summary
    if (req.method === 'POST') {
      const user = await getUserFromRequest(req, res);
      if (!user) return; // auth failed, response already sent

      const { issue_id, summary_text } = req.body || {};
      if (!issue_id || !summary_text) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const { data, error } = await supabase
        .from('summaries')
        .insert({ issue_id, summary_text, author_id: user.id })
        .select()
        .single();

      if (error) return res.status(400).json({ error: error.message });

      return res.status(201).json(data);
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error('Server error:', e);
    return res.status(500).json({ error: e.message });
  }
}
