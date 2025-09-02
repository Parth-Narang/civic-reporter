import { supabase } from '../supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });

  try {
    const { user_id, title, description, status } = req.body || {};
    if (!user_id || !title || !description || !status)
      return res.status(400).json({ error: "All fields are required" });

    const { data, error } = await supabase
      .from('issues')
      .insert({ user_id, title, description, status })
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
