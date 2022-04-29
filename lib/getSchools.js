import { supabase } from '../utils/supabase';

const getSchools = async () => {
  let { data: school, error } = await supabase
    .from('school')
    .select('*')
    .order('name', { ascending: true });

  return school;
};

const getSchool = async (id) => {
  let { data: school, error } = await supabase
    .from('school')
    .select('*')
    .eq('id', id)
    .single();

  return school;
};

export { getSchools, getSchool };
