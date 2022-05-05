/* eslint-disable @next/next/no-img-element */
import {
  ChatAltIcon,
  EyeIcon,
  EyeOffIcon,
  HeartIcon,
  PlusIcon,
  SaveAsIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import React, { Suspense } from 'react';
import EventSkeleton from '../Loaders/EventSkeleton';
import getLikes from '../../lib/getLikes';
import { useMutation, useQuery } from 'react-query';
import { useUser } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase';
import Loading from '../Loading';

const EventsFeed = ({ events }) => {
  console.log(events);

  const { user } = useUser();

  return (
    <div>
      <Suspense fallback={<EventSkeleton />}>
        {events.map((event) => {
          return (
            <div key={event.id} className="px-4 py-3 border-b border-slate-200">
              <div className="flex">
                <img
                  src={event.image}
                  alt={event.name}
                  className="rounded-full object-cover w-10 h-10 mr-3"
                />
                {/**Event Body */}
                <div className="flex flex-col min-w-0 flex-1">
                  {/**Event Header */}
                  <p className="text-sm flex">
                    <span className="truncate">
                      <span className="font-bold">{event.name}</span>
                      <span className="text-slate-500 font-normal pl-1">
                        {format(parseISO(event.date), 'MMM dd')}
                      </span>
                    </span>
                    <span className="flex-shrink-0">
                      <span className="pl-1 text-slate-500">-</span>
                      <span className="pl-1 text-slate-500">{event.time}</span>
                    </span>
                  </p>

                  {/**Event Description */}
                  <p className="text-sm">{event.description}</p>
                  {/***Event Icons */}
                  <div className="flex items-center justify-between py-2 hover:text-sky-600">
                    <Link href={`/events/${event.id}`} passHref>
                      <EyeIcon className="h-6 w-6 text-gray-400 hover:text-sky-600" />
                    </Link>

                    <HeartIcon className="h-6 w-6 text-gray-400 hover:text-sky-600" />

                    <ChatAltIcon className="h-6 w-6 text-gray-400 hover:text-sky-600" />
                    <PlusIcon className="h-6 w-6 text-gray-400 hover:text-sky-600" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Suspense>
    </div>
  );
};

export default EventsFeed;
