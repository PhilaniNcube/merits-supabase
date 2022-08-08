import React from 'react';
import cookie from 'cookie';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getSchool, getSchools } from '../../../lib/getSchools';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';

const index = () => {
  return <div>index</div>;
};

export default index;

export async function getServerSideProps({ req }) {
  const { user } = await supabaseClient.auth.api.getUserByCookie(req);
  const token = cookie.parse(req.headers.cookie)['sb-access-token'];
  supabaseClient.auth.session = () => ({ access_token: token });

  const queryClient = await new QueryClient();

  console.log(user);

  await queryClient.prefetchQuery('schools', getSchools);

  await queryClient.prefetchQuery('profiles', async () => {
    let schoolProfiles = await supabaseClient.from('profiles').select('*');

    return schoolProfiles.data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
