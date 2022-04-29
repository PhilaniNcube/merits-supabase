import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
);

const signOut = async () => {
  let { error } = await supabase.auth.signOut();
};

const useSupabase = () => {
  const [session, setSession] = useState(supabase.auth.session());

  const user = supabase.auth.user();

  supabase.auth.onAuthStateChange(async (_event, session) => {
    setSession(session);
  });

  return { session, supabase, signOut, user };
};

export default useSupabase;

export { supabase };
