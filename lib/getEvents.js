import { supabase } from '../utils/supabase';

const getEvents = async () => {
  let { data: event, error } = await supabase
    .from('event')
    .select('*, school(*)')
    .order('name', { ascending: true });

  return event;
};

const getEvent = async (id) => {
  let { data: event, error } = await supabase
    .from('event')
    .select('*, school(*)')
    .eq('id', id)
    .single();

  return event;
};

export { getEvents, getEvent };
