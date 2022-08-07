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

      <MyMerits />
        <Suspense fallback={'Loading..'}>
          {isSuccess && (
            <div className="w-full my-3">
              <div className="w-full relative">
                <img
                  src={data[0].prize_image}
                  alt={data[0].title}
                  className="rounded-md w-full object-cover bg-slate-300 aspect-video"
                />
                <h2 className="text-lg font-bold text-gray-700">
                  First Prize: {data[0].title}
                </h2>
              </div>

              <div className="grid grid-cols-2 mt-4 gap-2">
                <div className="w-full relative">
                  <img
                    src={data[1].prize_image}
                    alt={data[1].title}
                    className="rounded-md  w-full object-cover bg-slate-300 aspect-video"
                  />
                  <p className="text-md text-gray-600 font-medium">2nd Prize</p>
                  <p className="text-xs text-gray-500">{data[1].title}</p>
                </div>
                <div className="w-full relative">
                  <img
                    src={data[2].prize_image}
                    alt={data[2].title}
                    className="rounded-md  w-full object-cover bg-slate-300 aspect-video"
                  />
                  <p className="text-md text-gray-600 font-medium">3rd Prize</p>
                  <p className="text-xs text-gray-500">{data[2].title}</p>
                </div>
              </div>

              <div className="w-full mt-3">
                <p className="text-gray-600 text-sm font-medium">
                  Make sure you participate in the school merits program and
                  stand a chance to win one of the prizes above if you are in
                  the top 3 Merits Holders
                </p>
              </div>

              <div className="w-full mt-3">
                <h2 className="text-xl font-medium text-gray-600">
                  School Leaderboard
                </h2>

                {leaderboards.isLoading ? (
                  <Loading />
                ) : leaderboards.isError ? (
                  <p>Failed To Load Data</p>
                ) : (
                  leaderboards.isSuccess && (
                    <table className="w-full rounded  border border-gray-300">
                      <thead className="w-full bg-gray-200">
                        <tr className="px-6 py-1 font-medium text-gray-700">
                          <td className="w-[20%]">Position</td>
                          <td className="w-[60%] px-3">Name</td>
                          <td className="w-[20%] px-3">Points</td>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboards.data.map((student, i) => (
                          <tr
                            key={student.id}
                            className="odd:bg-white even:bg-slate-100 text-sm font-medium text-gray-500"
                          >
                            <td className="px-3 py-1 border-r">{i + 1}</td>
                            <td className="px-3 py-1 border-r">
                              {`${student.username}`}
                            </td>
                            <td className="px-3 py-1">{student.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                )}
              </div>
            </div>
          )}
        </Suspense>

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
