import { createClient } from '@supabase/supabase-js';
import { getUserFromRequest } from './_authHelper.js';

// Create Supabase client with service role key for server-side
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    // GET summaries (all or by issue_id)
    if (req.method === 'GET') {
      const issue_id = req.query.issue_id;

      let query = supabase
        .from('summaries')
        .select('*')
        .order('created_at', { ascending: false });

      // If issue_id is provided, filter by it
      if (issue_id) query = query.eq('issue_id', issue_id);

      const { data, error } = await query;

      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json(data);
    }

    // POST a new summary
    if (req.method === 'POST') {
      const user = await getUserFromRequest(req, res);
      if (!user) return;

      const { issue_id, summary_text } = req.body || {};
      if (!issue_id || !summary_text) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const { data, error } = await supabase
        .from('summaries')
        .insert({
          issue_id,
          summary_text,
          author_id: user.id
        })
        .select()
        .single();

      if (error) return res.status(400).json({ error: error.message });
      return res.status(201).json(data);
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
