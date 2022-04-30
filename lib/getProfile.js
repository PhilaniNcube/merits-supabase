import { supabase } from '../utils/supabase';

const getProfile = async (id) => {
  let profile = await supabase
    .from('user')
    .select('*, school(*)')
    .single();

  return profile.data;
};

export default getProfile;
