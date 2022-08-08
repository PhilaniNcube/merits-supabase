import { supabaseClient } from '@supabase/auth-helpers-nextjs';


const handler = async (req, res) => {
  await supabaseClient.auth.api.setAuthCookie(req, res);
};

export default handler;
