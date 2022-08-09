/* eslint-disable @next/next/no-img-element */
import React, { Fragment, Suspense } from 'react';
import useCompetions from '../lib/getCompetitons';
import useLeaderboard from '../lib/getLeaderboard';
import Loading from '../components/Loading';
import EventsFeed from '../components/Events/EventsFeed';

import { getEvents } from '../lib/getEvents';

import { dehydrate, QueryClient, useQuery } from 'react-query';
import MyMerits from '../components/Graphs/MyMerits';

const Home = () => {
  const { data, isLoading, isSuccess, isError } = useCompetions();
  const leaderboards = useLeaderboard();

  const eventQuery = useQuery('events', getEvents, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <Fragment>
      <div className="mt-20">

        {eventQuery.isSuccess && <EventsFeed events={eventQuery.data} />}
      </div>
    </Fragment>
  );
};

export default Home;

export async function getServerSideProps({ req }) {
  const queryClient = await new QueryClient();

  await queryClient.prefetchQuery('events', getEvents);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
