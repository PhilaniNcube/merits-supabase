import { supabase } from '../utils/supabase';
import { format } from 'date-fns';
import { useQuery } from 'react-query';

export const getLeaderboard = async () => {
  let { data: leaderboards, error } = await supabase
    .from('leaderboards')
    .select('*')
    .order('points', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  if (!leaderboards) {
    throw new Error('No leaderboard');
  }

  return leaderboards;
};

export default function useLeaderboard() {
  return useQuery('leaderboards', () => getLeaderboard());
}
