/* eslint-disable @next/next/no-img-element */
import { CursorClickIcon, HeartIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React from 'react';
import { supabase } from '../../utils/supabase';

const EventId = ({ likes, event }) => {
  console.log({ event, likes });

  return (
    <main className="max-w-6xl my-2 mx-auto px-4 lg:px-0">
      <div className="rounded w-full bg-gray-400 mb-8">
        <img
          src={event.image}
          alt={event.name}
          className="aspect-video object-cover w-full rounded shadow-lg"
        />
      </div>
      <div className="">
        <h1 className="font-bold text-xl text-slate-800">{event.name}</h1>
        <p className="font-medium text-sm text-slate-600">
          Hosted By: {event.school.name}
        </p>
        <span className="flex mt-2 space-x-4 text-xs text-slate-800">
          <span className="bg-green-300 rounded-full px-3 py-1">
            Date: {event.date}
          </span>
          <span className="bg-sky-300 rounded-full px-3 py-1">
            Venue: {event.venue}
          </span>
        </span>
        <span className="flex space-x-3 mt-4 relative">
          <HeartIcon className="h-12 w-12 text-red-600" />{' '}
          <span className="flex items-center justify-center absolute -left-3 top-0 bg-sky-200 h-4 w-4 rounded-full">
            {likes && `${likes.length}`}
          </span>
        </span>

        <p className="text-slate-600 text-base leading-7">
          {event.description}
        </p>
      </div>
    </main>
  );
};

export default EventId;

export async function getServerSideProps({ req, params: { id } }) {
  let { data: event, error } = await supabase
    .from('event')
    .select('*, school(id, name)')
    .eq('id', id)
    .single();

  let likes = await supabase
    .from('like')
    .select('*')
    .eq('event', id);

  return {
    props: {
      likes: likes.data,
      event,
    },
  };
}
