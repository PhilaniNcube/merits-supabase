import React, { Fragment, Suspense, useState } from 'react';
import { useRouter } from 'next/router';
import SignIn from '../components/SignIn';
import { useUser } from '../context/AuthContext';
import { supabase } from '../utils/supabase';
import cookie from 'cookie';
import Loading from '../components/Loading';
import getProfile from '../lib/getProfile';
import { getEvents } from '../lib/getEvents';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getSchools } from '../lib/getSchools';
import Header from '../components/Header';
import EventsFeed from '../components/Events/EventsFeed';
import EventSkeleton from '../components/Loaders/EventSkeleton';

const Home = ({ message = 'Please Sign In' }) => {
  const { user, signIn } = useUser();

  const router = useRouter();

  const eventQuery = useQuery('events', getEvents, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const schoolsQuery = useQuery('schools', getSchools, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <EventsFeed events={eventQuery.data} />
      </Suspense>
    </Fragment>
  );
};

Home.headerTitle = 'Home';

export default Home;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const token = cookie.parse(req.headers.cookie)['sb-access-token'];

  supabase.auth.session = () => ({ access_token: token });

  const queryClient = await new QueryClient();

  await queryClient.prefetchQuery('schools', getSchools);
  await queryClient.prefetchQuery('events', getEvents);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
