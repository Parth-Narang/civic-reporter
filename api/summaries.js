import { supabase } from '../supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });

  try {
    const { issue_id, summary_text } = req.body || {};
    if (!issue_id || !summary_text)
      return res.status(400).json({ error: "All fields are required" });

    const { data, error } = await supabase
      .from('summaries')
      .insert({ issue_id, summary_text })
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
