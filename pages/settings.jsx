import React from 'react';
import cookie from 'cookie';
import { supabase } from '../utils/supabase';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { useUser } from '../context/AuthContext';

const Settings = () => {
  const { user } = useUser();

  const profileQuery = useQuery(
    'profile',
    async () => {
      let { data: profiles, error } = await supabase
        .from('profiles')
        .select('*, school_id(id, name, streetAddress, city)')
        .eq('id', user.id)
        .single();

      return profiles;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  return <div>Settings</div>;
};

Settings.headerTitle = 'Settings';

export default Settings;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const token = cookie.parse(req.headers.cookie)['sb-access-token'];
  supabase.auth.session = () => ({ access_token: token });

  const queryClient = await new QueryClient();

  console.log(user);

  await queryClient.prefetchQuery('profile', async () => {
    let profile = await supabase
      .from('profiles')
      .select('*, school_id(id, name, streetAddress, city)')
      .eq('id', user.id);

    return profile.data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
