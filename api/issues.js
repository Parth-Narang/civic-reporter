import { supabase } from '../supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, category, priority, location, photo } = req.body;
    const { data, error } = await supabase
      .from('issues')
      .insert([
        {
          title,
          description,
          category,
          priority,
          location,
          photo,
          status: 'Submitted',
          dateSubmitted: new Date().toISOString(),
          dateUpdated: new Date().toISOString(),
          userId: 'user1' // You can change or make dynamic based on auth
        }
      ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('issues')
      .select('*')
      .order('dateSubmitted', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
