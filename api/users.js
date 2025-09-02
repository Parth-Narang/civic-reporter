import { supabase } from '../supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email } = req.body || {};
    if (!name || !email) return res.status(400).json({ error: "Name and email required" });

    const { data, error } = await supabase
      .from('users')
      .insert({ name, email })
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
