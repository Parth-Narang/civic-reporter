// /api/_authHelper.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function getUserFromRequest(req, res) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ error: 'Authorization header missing' });
            return null;
        }

        const token = authHeader.split(' ')[1]; // "Bearer <token>"
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            res.status(401).json({ error: 'Invalid or expired token' });
            return null;
        }

        return user;
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Auth check failed' });
        return null;
    }
}
