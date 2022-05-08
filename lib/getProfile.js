import { supabase } from '../utils/supabase';

const getProfiles = async () => {
  let { data: profiles, error } = await supabase.from('profiles').select('*');

  return profiles;
};

export const getProfile = async (id) => {
  let { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  return profiles;
};

export default getProfiles;
