import { supabase } from '../utils/supabase';

const createComment = async (eventId, content) => {
  console.log(eventId, content);

  const { data, error } = await supabase
    .from('comments')
    .insert([{ content: content, event_id: eventId }]);

  console.log({ data, error });
};

export default createComment;
