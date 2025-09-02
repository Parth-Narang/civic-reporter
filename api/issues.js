import { supabase } from '../supabaseClient.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user_id, title, description, status } = req.body;
    const { data, error } = await supabase
      .from('issues')
      .insert({ user_id, title, description, status })
      .select()
      .single();

    if (error) return res.status(400).json(error);
    res.status(200).json(data);
  } else {
    res.status(405).send('Method not allowed');
  }
}
