import React, { Fragment, Suspense } from 'react';
import { useUser } from '../context/AuthContext';
import { getEvents } from '../lib/getEvents';
import Link from 'next/link';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Image from 'next/image';
import { getSchools } from '../lib/getSchools';
import Loading from '../components/Loading';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

const EventsFeed = React.lazy(() => import('../components/Events/EventsFeed'));

const Home = () => {
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
      <main className="w-full h-full my-4">
        <header className="w-full px-2 bg-gradient-to-r from-cyan-500 to-blue-500 py-6">
          <h1 className="text-3xl font-extrabold text-center text-slate-700">
            Join The <span className="text-sky-50">Merits</span> Family
          </h1>
          <p className="font-medium text-center text-white text-base">
            Get rewarded for your academic, sports or social participation at
            school.
          </p>
          <div className="my-8 flex items-center space-x-3 justify-center">
            <button
              onClick={() => router.push('/sign-in')}
              className="rounded-md font-bold shadow-lg shadow-gray-800/40 bg-white text-green-500 py-2 text-sm w-[40%]"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push('/register')}
              className="rounded-md shadow-lg font-bold shadow-gray-800/40 bg-green-600 text-green-50 py-2 text-sm w-[40%]"
            >
              Register
            </button>
          </div>
        </header>
        <section className=" mt-3 w-full px-2">
          <div className="w-full">
            <Image
              src="/images/highschool.jpg"
              alt="school"
              height={1195}
              width={1920}
              className="w-full shadow-lg shadow-black/50 aspect-video rounded-lg"
            />
          </div>
          <h2 className="font-bold mt-3 leading-5 text-lg text-slate-800">
            Earn Merits at school and stand a chance to win awesome prices
          </h2>
          <div className=" px-2 py-3 mt-2">
            <span className="flex items-start space-x-3 bg-slate-200 rounded shadow-lg py-2 px-2">
              <div className="text-sky-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>
              <div>
                <p className="font-base underline w-fit font-medium text-gray-800">
                  Academic Merits
                </p>
                <p className="font-medium text-sm text-gray-700">
                  Earn these merits from doing good work in class. Merits are
                  awarded by your teachers
                </p>
              </div>
            </span>
            <span className="flex mt-4 items-start space-x-3 bg-slate-200 rounded shadow-lg py-2 px-2">
              <div className="text-sky-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-base underline w-fit font-medium text-gray-800">
                  Sports Merits
                </p>
                <p className="font-medium text-sm text-gray-700">
                  Perform well at school sports events an get the chance to earn
                  sports merits
                </p>
              </div>
            </span>
          </div>
        </section>
        <section className="mt-4 w-full px-2">
          <h2 className="text-gray-800 font-bold text-lg leading-5 mb-3">
            Engage with students from your school and other schools
          </h2>
          <div className="w-full">
            <Image
              src="/images/rugby.jpg"
              alt="sports"
              height={1280}
              width={1920}
              className="w-full shadow-lg shadow-black/50 aspect-video rounded-lg"
            />
          </div>
          <div className="py-4">
            <div className="flex space-x-3 items-start px-2 py-2 bg-slate-200 rounded-lg shadow-lg">
              <div className="text-sky-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-base w-fit font-bold text-gray-800">
                  Interact with other students
                </p>
                <p className="font-medium text-xs text-gray-700">
                  Get updates on events at your school and other schools around
                  you. Find out about sports results between your school and
                  others.
                </p>
              </div>
            </div>
            <div className="flex mb-4 mt-4 space-x-3 items-start px-2 py-2 bg-slate-200 rounded-lg shadow-lg">
              <div className="text-sky-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-base  w-fit font-bold text-gray-800">
                  Sponsored Competitions
                </p>
                <p className="font-medium text-xs text-gray-700">
                  Enter into sponsored competitions by brands and stand a chance
                  to will by earning as many merits as you can.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
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
