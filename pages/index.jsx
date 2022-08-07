import React, { Fragment, Suspense } from 'react';
import { getEvents } from '../lib/getEvents';
import Link from 'next/link';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { useUser } from "@supabase/auth-helpers-react";
import Image from 'next/future/image';
import { getSchools } from '../lib/getSchools';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { AcademicCapIcon, PlusCircleIcon, UserGroupIcon } from '@heroicons/react/outline';
import { FaFootballBall } from "react-icons/fa";

const EventsFeed = React.lazy(() => import('../components/Events/EventsFeed'));

const Home = () => {
 const {  user, error } = useUser();

  const router = useRouter();


  return (
    <Fragment>
      <header className="bg-gradient-to-b py-20 from-fuchsia-800 via-violet-900 to-gray-900 rounded-b-2xl flex flex-col items-center justify-center">
        <div className="relative w-full flex flex-col justify-center items-center mb-4">
          <Image
            src="/images/merits-logo.png"
            width={277}
            height={260}
            alt="logo"
            className="w-[130px] object-cover"
          />
        </div>
        <h1 className="text-yellow-300 text-4xl mt-3 font-bold text-center uppercase">
          Rewarding
        </h1>
        <p className="text-yellow-300 text-2xl mt-2 font-bold text-center uppercase">
          Academic | Social | Sports
        </p>
        <h1 className="text-white text-5xl mt-2 font-bold font-serif italic text-center uppercase">
          Excellence
        </h1>
        <div className="flex justify-around space-x-4 mt-6">
          <Link href="/sign-in" passHref>
            <button className="border text-white uppercase border-white rounded-full px-8 py-1">
              Sign In
            </button>
          </Link>
          <Link href="/register" passHref>
            <button className="border border-white bg-white text-fuschia-800 uppercase rounded-full px-8 py-1">
              Register
            </button>
          </Link>
        </div>
      </header>
      <section className="py-4">
        <h2 className="text-gray-800 text-lg text-center font-extrabold mt-4">
          Earn Merits and get awesome <br />
          rewards by excellig in:
        </h2>
        <div className="mt-6 flex flex-col items-center space-y-2 px-6">
          <AcademicCapIcon className="text-purple-800 h-12 w-12 " />
          <p className="font-bold text-gray-800 text-lg">Academics</p>
          <p className="text-gray-600 text-sm text-center font-medium">
            Earn Academic Merits by performing well in the classroom. Merits are
            awarded by your subject teachers for doing well in tests and
            assignments
          </p>
        </div>
        <div className="mt-6 flex flex-col items-center space-y-2 px-6">
          <FaFootballBall className="text-purple-800 h-12 w-12 " />
          <p className="font-bold text-gray-800 text-lg">Sports</p>
          <p className="text-gray-600 text-sm text-center font-medium">
            Earn Sports Merits by performing well on the sports field. Merits
            are awarded by your coaches for doing well in each sports
            discipline.
          </p>
        </div>
        <div className="mt-6 flex flex-col items-center space-y-2 px-6">
          <UserGroupIcon className="text-purple-800 h-12 w-12 " />
          <p className="font-bold text-gray-800 text-lg">Social</p>
          <p className="text-gray-600 text-sm text-center font-medium">
            Earn Social Merits by doing good deeds. Merits are awarded by school
            staff for doing good social deeds or doing well in your clubs
          </p>
        </div>
      </section>
    </Fragment>
  );
};

Home.headerTitle = 'Home';

export default Home;

