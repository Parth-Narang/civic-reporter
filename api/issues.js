// /api/issues.js
import { createClient } from '@supabase/supabase-js';
import { getUserFromRequest } from './_authHelper.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // only for backend
);

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Fetch all issues from Supabase
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
      }

      // Return data (frontend will use sample if empty)
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const user = await getUserFromRequest(req, res);
      if (!user) return;

      const {
        title,
        description,
        status,
        category,
        priority,
        location,
        photo
      } = req.body || {};

      // Basic validation
      if (!title || !description || !status || !category || !priority || !location) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Insert into Supabase
      const { data, error } = await supabase
        .from('issues')
        .insert({
          user_id: user.id,
          title,
          description,
          status,
          category,
          priority,
          location,
          photo
        })
        .select()
        .single();

      if (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
      }

      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
