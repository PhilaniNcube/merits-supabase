import { supabase } from '../utils/supabase';
import { useUser } from '../context/AuthContext';

const getTotalMerits = async () => {
  let { data, error } = await supabase.rpc('my_total_merits');

  if (error) {
    throw new Error(`There was an error getting the total number of merits`);
  }

  if (!data) {
   return 0;
  }

  return data;
};

export const getSportsMerits = async () => {
  let { data, error } = await supabase.rpc('get_sports_merits');

  if (error) {
    throw new Error(`There was an error getting the sports merits`);
  }

  if (!data) {
    return 0;
  }

  return data;
};

export const getSocialMerits = async () => {
  let { data, error } = await supabase.rpc('get_social_merits');

  if (error) {
    throw new Error(`There was an error getting the social merits`);
  }

  if (!data) {
    return 0;
  }

  return data;
};

export const getAcademicMerits = async () => {
  let { data, error } = await supabase.rpc('get_academic_merits');

  if (error) {
    throw new Error(`There was an error getting the academic merits`);
  }

  if (!data) {
    return 0;
  }

  return data;
};

export const getMyMerits = async () => {
  let academic = await supabase.rpc('get_academic_merits');
  let social = await supabase.rpc('get_social_merits');
  let sports = await supabase.rpc('get_sports_merits');

  if (academic.error || social.error || sports.error) {
    throw new Error(`There was an error getting your merits`);
  }


  return [
    { item: 'sports', count: sports.data, color: '#ffaB22' },
    { item: 'social', count: social.data, color: '#134e6f' },
    { item: 'academic', count: academic.data, color: '#de20e6' },
  ];
};

export default getTotalMerits;
