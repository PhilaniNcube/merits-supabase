/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getEvents } from '../lib/getEvents';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useUser } from '../context/AuthContext';
import getProfile from '../lib/getProfile';

export default function Home() {
  const { user } = useUser();

  const [filter, setFilter] = useState('');

  const { data: profile } = useQuery('profile', getProfile, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: events } = useQuery('events', getEvents, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const filteredEvents = useMemo(
    () =>
      events.filter((event) =>
        event.name.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter, events],
  );

  return (
    <div className="flex flex-col h-full px-2  md:px-12">
      <div className="mt-4 flex space-x-4">
        <main className="flex-1 rounded-md bg-slate-700 h-full">
          {filteredEvents.map((event) => (
            <div
              className="mb-6 rounded-lg overflow-hidden flex bg-slate-200"
              key={event.id}
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-1/2 object-cover"
              />
              <div className="text-slate-800 w-full flex flex-col flex-1 p-3">
                <h2 className=" underline font-medium text-lg">{event.name}</h2>
                <h2 className="font-bold text-base">
                  Hosted by: {event.school.name}
                </h2>
                <div className="flex space-x-2">
                  <p className="text-sm text-gray-700 mt-2">
                    Date: {new Date(event.date).toDateString('en-ZA')}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Time: {event.time}
                  </p>
                </div>

                <p className="text-sm mt-2">{event.description}</p>
                <div className="mt-2 flex space-x-3">
                  <Link href={`/events/${event.id}`} passHref>
                    <button className="px-3 text-xs rounded shadow-md hover:shadow-sm py-1 bg-sky-700 text-white">
                      View Event
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </main>
        <aside className="w-2/6 rounded-md bg-slate-600 h-[90vh] p-4">
          <h2 className="text-lg font-bold">
            My School: {profile.school.name}
          </h2>
          <div className=""></div>
        </aside>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const queryClient = await new QueryClient();

  await queryClient.prefetchQuery('events', getEvents);
  await queryClient.prefetchQuery('profile', getProfile);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
