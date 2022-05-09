import React from 'react';
import cookie from 'cookie';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getSchool, getSchools } from '../../../lib/getSchools';
import { supabase } from '../../../utils/supabase';

const index = () => {
  return <div>index</div>;
};

export default index;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const token = cookie.parse(req.headers.cookie)['sb-access-token'];
  supabase.auth.session = () => ({ access_token: token });

  const queryClient = await new QueryClient();

  console.log(user);

  await queryClient.prefetchQuery('schools', getSchools);

  await queryClient.prefetchQuery('profiles', async () => {
    let schoolProfiles = await supabase.from('profiles').select('*');

    return schoolProfiles.data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
