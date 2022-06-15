import { supabase } from '../utils/supabase';
import { format } from 'date-fns';
import { useQuery } from 'react-query';

export const getCompetitons = async () => {
  let { data: competition, error } = await supabase
    .from('competition')
    .select('*, school_id(id, name)')
    .order('value', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  if (!competition) {
    throw new Error('Not competitons found');
  }

  return competition;
};

export default function useCompetions() {
  return useQuery('competitons', () => getCompetitons());
}
