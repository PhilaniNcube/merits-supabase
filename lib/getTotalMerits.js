import { supabase } from '../utils/supabase';
import { useUser } from '../context/AuthContext';

const getTotalMerits = async () => {
  let { data, error } = await supabase.rpc('my_total_merits');

  if (error) {
    throw new Error(`There was an error getting the total number of merits`);
  }

  if (!data) {
    throw new Error(`You currently do not have any merits`);
  }

  return data;
};

export default getTotalMerits;
