import { supabase } from '../utils/supabase';

const getLikes = async (id) => {
  let { data: like, error } = await supabase
    .from('like')
    .select('*')
    .eq('event', id);

  return like;
};

export default getLikes;
