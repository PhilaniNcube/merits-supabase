/* eslint-disable @next/next/no-img-element */
import { CursorClickIcon, HeartIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useUser } from '../../context/AuthContext';
import getLikes from '../../lib/getLikes';
import { supabase } from '../../utils/supabase';

const EventId = ({ likes, event }) => {
  console.log({ event, likes });

  const { user } = useUser();

  const mutation = useMutation(async () => {
    const { data, error } = await supabase
      .from('like')
      .insert([{ user: user.id, event: event.id }]);

    return data;
  }, ['likes']);

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
        <span className="flex space-x-2">
          <h1 className="font-bold text-xl text-slate-800">{event.name}</h1>
          <svg
            onClick={() => {
              if (!user) {
                return;
              } else {
                mutation.mutateAsync();
              }
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>

          <p className="text-xs text-gray-700">{likes.length} Likes</p>
        </span>
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

        <p className="text-slate-600 text-base leading-7 mt-4">
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
