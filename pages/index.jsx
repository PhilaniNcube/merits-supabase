import React, { Fragment, Suspense } from 'react';
import { useUser } from '../context/AuthContext';
import { getEvents } from '../lib/getEvents';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getSchools } from '../lib/getSchools';
import EventsFeed from '../components/Events/EventsFeed';
import Loading from '../components/Loading';

const Home = () => {
  const { user, signIn } = useUser();

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
  const queryClient = await new QueryClient();

  await queryClient.prefetchQuery('schools', getSchools);
  await queryClient.prefetchQuery('events', getEvents);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
