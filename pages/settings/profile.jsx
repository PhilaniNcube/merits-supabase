import React, {
  useEffect,
  useState,
  Suspense,
  startTransition,
  Fragment,
} from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import cookie from 'cookie';
import { getProfile } from '../../lib/getProfile';
import { getSchools } from '../../lib/getSchools';
import { supabase } from '../../utils/supabase';
import Loading from '../../components/Loading';
import { useRouter } from 'next/router';
import MyMerits from '../../components/Graphs/MyMerits';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';

const Profile = () => {
 const { isLoading, user, error } = useUser();

  console.log(user);

  const profileQuery = useQuery(
    'profile',
    async () => {
      let { data: profiles, error } = await supabaseClient
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

  return (
    <div className="px-4 py-2 maxw-6xl mx-auto lg:px-0">



        <MyMerits />

    </div>
  );
};

export default Profile;

export async function getServerSideProps({ req }) {
  const { user } = await supabaseClient.auth.api.getUserByCookie(req);
  const token = cookie.parse(req.headers.cookie)['sb-access-token'];
  supabaseClient.auth.session = () => ({ access_token: token });

  const queryClient = await new QueryClient();

  console.log(user);

  await queryClient.prefetchQuery('schools', getSchools);
  await queryClient.prefetchQuery('profile', async () => {
    let { data: profiles, error } = await supabaseClient
      .from('profiles')
      .select('*, school_id(id, name, streetAddress, city)')
      .eq('id', user.id)
      .single();

    return profiles;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
