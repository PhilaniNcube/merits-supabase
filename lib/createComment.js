import { supabaseClient } from '@supabase/supabase-js';


const createComment = async (eventId, content) => {
  console.log(eventId, content);

  const { data, error } = await supabaseClient
    .from('comments')
    .insert([{ content: content, event_id: eventId }]);

  console.log({ data, error });
};

export default createComment;
