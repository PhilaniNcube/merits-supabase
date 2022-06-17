import React, {
  useEffect,
  useState,
  Suspense,
  startTransition,
  Fragment,
} from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import cookie from 'cookie';
import { useUser } from '../../context/AuthContext';
import { getProfile } from '../../lib/getProfile';
import { getSchools } from '../../lib/getSchools';
import { supabase } from '../../utils/supabase';
import Loading from '../../components/Loading';
import { useRouter } from 'next/router';
import MyMerits from '../../components/Graphs/MyMerits';

const Profile = () => {
  const { user } = useUser();

  console.log(user);

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

  return (
    <div className="px-4 py-2 maxw-6xl mx-auto lg:px-0">
      <Suspense fallback={<Loading />}>
        <div className="w-full mt-2 rounded-lg shadow-lg shadow-gray-800/20 p-2 bg-gradient-to-r from-cyan-500 to-blue-500">
          <p className="text-white font-bold text-2xl">{`${profileQuery.data.firstname} ${profileQuery.data.lastname}`}</p>

          <p className="text-white font-medium text-lg mt-2">
            {profileQuery.data.school_id.name}
          </p>
          <p className="text-white text-md mt-1">
            {profileQuery.data.school_id.streetAddress}
          </p>
        </div>

        <MyMerits />
      </Suspense>
    </div>
  );
};

export default Profile;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const token = cookie.parse(req.headers.cookie)['sb-access-token'];
  supabase.auth.session = () => ({ access_token: token });

  const queryClient = await new QueryClient();

  console.log(user);

  await queryClient.prefetchQuery('schools', getSchools);
  await queryClient.prefetchQuery('profile', async () => {
    let { data: profiles, error } = await supabase
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
