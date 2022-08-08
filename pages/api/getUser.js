import { supabaseClient } from '@supabase/auth-helpers-nextjs';


export default async function getUser(req, res) {
  const user = await supabaseClient.auth.user();
  return res.status(200).json({ user: user });
}
