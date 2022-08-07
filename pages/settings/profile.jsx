/* eslint-disable @next/next/no-img-element */
import React, {
  useEffect,
  useState,
  Suspense,
  startTransition,
  Fragment,
} from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import cookie from 'cookie';
import { getProfile } from '../../lib/getProfile';
import { getSchools } from '../../lib/getSchools';
import { Tab } from '@headlessui/react'
import Loading from '../../components/Loading';
import { useRouter } from 'next/router';
import MyMerits from '../../components/Graphs/MyMerits';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import useCompetions from '../../lib/getCompetitons';
import useLeaderboard, { getLeaderboard } from '../../lib/getLeaderboard';

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

const Profile = () => {
 const { isLoading, user, error } = useUser();
 const { data:prizes, isSuccess, isError } = useCompetions();
 const leaderboardQuery = useQuery('leaderboard', getLeaderboard)

  const leaderboards = useLeaderboard();




  const profileQuery = useQuery(
    'profile',
    async () => {
      let { data: profiles, error } = await supabaseClient
        .from('profiles')
        .select('*, school_id(id, name, streetAddress, city)')
        .eq('id', user.id)
        .single();

      return profiles;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div className="py-2 max-w-6xl mx-auto my-24 lg:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-fuchsia-900 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white",
                "ring-white text-fuchsia-800 ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow text-white"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            My Merits
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-fuchsia-800",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Leaderboard
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-fuchsia-800",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Prizes
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames("rounded-xl bg-white", "focus:outline-none")}
          >

          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-fuchsia-800",
              "focus:outline-none"
            )}
          >
            <Suspense fallback={"Loading.."}></Suspense>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-fuchsia-800 px-4 py-6",
              "focus:outline-none"
            )}
          ></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Profile;

export async function getServerSideProps({ req }) {
  const { user } = await supabaseClient.auth.api.getUserByCookie(req);
  const token = cookie.parse(req.headers.cookie)['sb-access-token'];
  supabaseClient.auth.session = () => ({ access_token: token });

  const queryClient = await new QueryClient();

  console.log(user);

  await queryClient.prefetchQuery('schools', getSchools);
  await queryClient.prefetchQuery('leaderboard', getLeaderboard);
  await queryClient.prefetchQuery('profile', async () => {
    let { data: profiles, error } = await supabaseClient
      .from('profiles')
      .select('*, school_id(id, name, streetAddress, city)')
      .eq('id', user.id)
      .single();

    return profiles;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
