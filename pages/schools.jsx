import { Combobox } from '@headlessui/react';
import cookie from 'cookie';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { SearchIcon } from '@heroicons/react/outline';
import { useUser } from '../context/AuthContext';
import { getSchools } from '../lib/getSchools';
import { supabase } from '../utils/supabase';

const Schools = () => {
  const { user } = useUser();
  const [query, setQuery] = useState('');

  const router = useRouter();

  const schoolsQuery = useQuery('schools', getSchools, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const schools = schoolsQuery.data;

  const profileQuery = useQuery(
    'profile',
    async () => {
      let profile = await supabase
        .from('profiles')
        .select('*, school_id(id, name, streetAddress, city)')
        .eq('id', user.id)
        .single();

      return profile.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const profile = profileQuery.data;

  const profilesQuery = useQuery(
    'profiles',
    async () => {
      let profile = await supabase.from('profiles').select('*');

      return profile.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  console.log(profile);

  const filteredSchools = query
    ? schools.filter((school) =>
        school.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  return (
    <Fragment>
      <main className="max-w-6xl mx-auto px-4 py-4">
        <div className="my-3 h-36 rounded-xl p-2 shadow-gray-800/40 bg-sky-600 shadow-lg">
          <h2 className="font-bold text-white text-xl">
            {schools.length} Schools Signed Up
          </h2>
          <p className="text-md text-sky-100 py-2">
            Search for your school below.
          </p>
        </div>
        <Combobox
          onChange={(school) => {
            // Navigate to the school
            router.push(`/schools/${school.id}`);
          }}
          as="div"
          className="relative max-w-xl mx-auto rounded-xl bg-white shadow-2xl ring ring-black/5 divide-y overflow-hidden"
        >
          <div className="flex items-center px-4">
            <SearchIcon className="h-6 w-6 text-slate-500" />
            <Combobox.Input
              onChange={(event) => {
                //Handle search logic
                setQuery(event.target.value);
              }}
              className="w-full bg-transparent border-0  focus:outline-none focus:ring-0 text-base focus-ring-0 text-gray-700 placeholder-gray-400 h-12"
              placeholder="Search for your school..."
            />
          </div>

          {filteredSchools.length > 0 && (
            <Combobox.Options className="py-4 text-sm max-h-56 overflow-y-auto">
              {filteredSchools.map((school) => (
                <Combobox.Option key={school.id} value={school}>
                  {({ active }) => (
                    <div
                      className={`px-4 py-2 space-x-2 ${
                        active ? 'bg-sky-600' : 'bg-white'
                      } `}
                    >
                      <span
                        className={`font-medium ${
                          active ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {school.name}
                      </span>
                      <span
                        className={`${
                          active ? 'text-slate-100' : 'text-gray-400'
                        }`}
                      >
                        {school.city}
                      </span>
                    </div>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}

          {query && filteredSchools.length === 0 && (
            <p className="p-4 text-sm text-gray-400">No schools found...</p>
          )}
        </Combobox>
      </main>
    </Fragment>
  );
};

Schools.headerTitle = 'Schools';

export default Schools;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const token = cookie.parse(req.headers.cookie)['sb-access-token'];
  supabase.auth.session = () => ({ access_token: token });

  const queryClient = await new QueryClient();

  await queryClient.prefetchQuery('schools', getSchools);

  await queryClient.prefetchQuery('profiles', async () => {
    let profiles = await supabase.from('profiles').select('*');

    return profiles.data;
  });

  await queryClient.prefetchQuery('profile', async () => {
    let profile = await supabase
      .from('profiles')
      .select('*, school_id(id, name, streetAddress, city)')
      .eq('id', user.id)
      .single();

    return profile.data;
  });

  await queryClient.prefetchQuery('profiles', async () => {
    let profiles = await supabase.from('profiles').select('*');

    return profiles.data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
