import { supabase } from '../utils/supabase';

const updateProfile = async (
  id,
  firstName,
  lastName,
  avatar,
  username,
  school,
) => {
  const { data, error } = await supabase
    .from('user')
    .update({
      firstName: firstName,
      lastName: lastName,
      avatar: avatar,
      username: username,
      school: school,
    })
    .eq('id', id)
    .single();
};

export default updateProfile;
