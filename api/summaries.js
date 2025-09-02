import { supabase } from '../supabaseClient.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { issue_id, summary_text } = req.body;
    const { data, error } = await supabase
      .from('summaries')
      .insert({ issue_id, summary_text })
      .select()
      .single();

    if (error) return res.status(400).json(error);
    res.status(200).json(data);
  } else {
    res.status(405).send('Method not allowed');
  }
}
