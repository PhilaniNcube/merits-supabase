import { supabase } from '../utils/supabase';
import { format } from 'date-fns';

const getEvents = async () => {
  const date = format(new Date(), 'MM/dd/yyyy');

  let { data: event, error } = await supabase
    .from('event')
    .select('*')
    .gte('date', date)
    .order('date', { ascending: true });

  return event;
};

const getEvent = async (id) => {
  let { data: event, error } = await supabase
    .from('event')
    .select('*')
    .eq('id', id)
    .single();

  return event;
};

export { getEvents, getEvent };
