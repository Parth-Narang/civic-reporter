import { supabase } from '../supabaseClient.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;
    const { data, error } = await supabase
      .from('users')
      .insert({ name, email })
      .select()
      .single();

    if (error) return res.status(400).json(error);
    res.status(200).json(data);
  } else {
    res.status(405).send('Method not allowed');
  }
}
