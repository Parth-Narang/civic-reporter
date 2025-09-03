// /api/issues.js
import { createClient } from '@supabase/supabase-js';
import { getUserFromRequest } from './_authHelper.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Backend only key
);

export default async function handler(req, res) {
  try {
    // ---------------------
    // GET: Fetch all issues
    // ---------------------
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase GET error:', error);
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json(data || []);
    }

    // ---------------------
    // POST: Submit new issue
    // ---------------------
    if (req.method === 'POST') {
      // Get user from auth token
      const user = await getUserFromRequest(req, res);
      if (!user) return; // Already handled in _authHelper

      const { title, description, status, category, priority, location, photo } = req.body || {};

      // Validation
      if (!title || !description || !status || !category || !priority || !location) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Insert issue
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
        console.error('Supabase POST error:', error);
        return res.status(400).json({ error: error.message });
      }

      return res.status(201).json(data);
    }

    // ---------------------
    // Other methods
    // ---------------------
    return res.status(405).json({ error: 'Method not allowed' });

  } catch (e) {
    console.error('API error:', e);
    return res.status(500).json({ error: e.message });
  }
}
