/* eslint-disable @next/next/no-img-element */
import { CursorClickIcon, HeartIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import cookie from 'cookie';
import React, { Suspense, useState } from 'react';
import { useRouter } from 'next/router';
import {
  dehydrate,
  QueryClient,
  useQueryClient,
  useQuery,
  useMutation,
  QueryCache,
} from 'react-query';
import Loading from '../../components/Loading';
import { useUser } from '../../context/AuthContext';
import getLikes from '../../lib/getLikes';
import { supabase } from '../../utils/supabase';
import createComment from '../../lib/createComment';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

const EventId = () => {
  const [content, setContent] = useState('');

  const { user } = useUser();

  const queryClient = useQueryClient();

  const router = useRouter();

  const eventQuery = useQuery(
    'event',
    async () => {
      let event = await supabase
        .from('event')
        .select('*, school_id(id, name, streetAddress, city)')
        .eq('id', router.query.id)
        .single();

      return event.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const commentsQuery = useQuery(
    'comments',
    async () => {
      let comments = await supabase
        .from('comments')
        .select('*, profile_id(id, username)')
        .eq('event_id', router.query.id)
        .order('created_at', { ascending: true });

      return comments.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const event = eventQuery.data;
  const comments = commentsQuery.data;

  const commentMutation = useMutation(() => createComment(event.id, content), {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });

  const handleCreateComment = async (e) => {
    e.preventDefault();
    const newComments = await commentMutation.mutateAsync(event.id, content);
    setContent('');
  };

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
        </span>
        <p className="font-medium text-sm text-slate-600">
          Hosted By: {event.school_id.name}
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

      <div className="mt-6">
        <h2 className="font-medium text-slate-700 text-xl">Comments</h2>
        <ul className="px-3 bg-slate-100 border rounded-lg shadow-inner">
          <Suspense fallback={<Loading />}>
            {commentsQuery.isLoading ? (
              <Loading />
            ) : (
              comments?.map((comment) => (
                <li
                  className="text-sm py-2 my-3 text-slate-800 flex flex-col px-2"
                  key={comment.id}
                >
                  <span className="text-xs flex space-x-4">
                    <pre>{comment.profile_id.username}</pre>{' '}
                    <pre className="text-slate-400">
                      {formatDistanceToNow(parseISO(comment.created_at), {
                        addSuffix: true,
                      })}
                    </pre>
                  </span>
                  <span className="text-base font-medium max-w-[45ch] text-gray-700">
                    {comment.content}
                  </span>
                </li>
              ))
            )}
          </Suspense>
        </ul>

        <Suspense fallback={<Loading />}>
          {user === null ? (
            <p className="text-slate-400 text-base font-medium">
              Please sign in to comment
            </p>
          ) : (
            <div className="w-full mt-8">
              <form className="w-full" onSubmit={handleCreateComment}>
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Comment
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="content"
                      name="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="write your comment"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-1 bg-sky-600 text-white text-base fornt-medium rounded-md mt-2 shadow"
                >
                  {commentMutation.isLoading
                    ? 'Saving...'
                    : commentMutation.isError
                    ? 'Error saving comment'
                    : commentMutation.isSuccess
                    ? 'Saved'
                    : 'Save'}
                </button>
              </form>
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
};

export default EventId;

export async function getServerSideProps({ req, params: { id } }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const token = cookie.parse(req.headers.cookie)['sb-access-token'];
  supabase.auth.session = () => ({ access_token: token });



  const queryClient = await new QueryClient();

  await queryClient.prefetchQuery('event', async () => {
    let event = await supabase
      .from('event')
      .select('*, school_id(id, name, streetAddress, city)')
      .eq('id', id)
      .single();

    return event.data;
  });

  await queryClient.prefetchQuery('comments', async () => {
    let comments = await supabase
      .from('comments')
      .select('*, profile_id(id, username)')
      .eq('event_id', id)
      .order('created_at', { ascending: true });

    return comments.data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
