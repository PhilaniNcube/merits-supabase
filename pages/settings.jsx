/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import cookie from 'cookie';
import { supabase } from '../utils/supabase';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { useUser } from '../context/AuthContext';
import { getSchools } from '../lib/getSchools';
import { SearchIcon } from '@heroicons/react/outline';
import { Combobox } from '@headlessui/react';
import { useRouter } from 'next/router';

const Settings = () => {
  const { user } = useUser();

  const router = useRouter();

  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');

  const schoolsQuery = useQuery('schools', getSchools, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const schools = schoolsQuery.data;

  const profileQuery = useQuery(
    'profile',
    async () => {
      let { data: profiles, error } = await supabase
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

  const filteredSchools = query
    ? schools.filter((school) =>
        school.name.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const profile = profileQuery.data;

  return (
    <div className="w-5/6 mx-auto">
      <div className="xl:w-3/4 2xl:w-4/5 w-full">
        <div className="bg-white">
          <div className="relative mt-8 border rounded-xl shadow-lg shadow-slate-900/30 p-3 sm:p-5 2xl:flex items-center justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="w-20 h-20 shadow rounded-full"
                  src="/images/avatar.png"
                  alt="avatar"
                />
                <div className="ml-3">
                  <p className="text-base font-medium leading-none text-gray-800">
                    {`${profile.firstname} ${profile.lastname}`}
                  </p>
                  <p className="text-xs leading-3 text-gray-500 mt-2">
                    Username: {profile.username}
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:flex items-center lg:items-start xl:items-center mt-4 2xl:mt-0">
              <div className="md:flex items-center">
                <div className="sm:flex items-center ">
                  <div className="whitespace-nowrap shadow w-48 sm:w-auto p-3 bg-gray-100 rounded text-xs md:text-sm font-medium leading-4 text-gray-600">
                    Email: {user.email}
                  </div>
                  <div className="p-3 bg-gray-100 w-48 shadow sm:w-auto rounded text-xs md:text-sm font-medium leading-4 text-gray-600 sm:ml-4 mt-4 sm:mt-0">
                    Role: {profile.role}
                  </div>
                </div>

                {!!profile.school_id ? (
                  <div className="flex flex-col items-start sm:flex-row sm:items-center mt-4 md:mt-0">
                    <div className="flex space-x-2 p-3 bg-gray-100 shadow rounded text-xs md:text-sm font-medium leading-4 text-gray-600 md:ml-4 w-48 sm:w-auto">
                      <span className="pr-2">School:</span>{' '}
                      {profile.school_id.name}
                    </div>
                  </div>
                ) : (
                  ''
                )}

                {profile.role === 'teacher' && (
                  <Link href={`admin/schools/${profile.school_id.id}`} passHref>
                    <div className="flex flex-col items-start sm:flex-row sm:items-center mt-4 md:mt-0">
                      <button className="flex justify-center space-x-2 p-3 bg-sky-600 shadow rounded text-sm font-medium leading-4 cursor-pointer text-gray-50 md:ml-4 w-48 sm:w-auto text-center">
                        Award Merits
                      </button>
                    </div>
                  </Link>
                )}
              </div>
              <div className="absolute xl:relative xl:ml-4 right-0 top-0 mr-3 mt-3">
                <button
                  className="focus:outline-none mt-1"
                  onClick={() => setShow(!show)}
                >
                  <svg
                    className="dropbtn"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z"
                      stroke="#A1A1AA"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z"
                      stroke="#A1A1AA"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z"
                      stroke="#A1A1AA"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <p className="text-md text-sky-600 py-2">Select Your School</p>

            <Combobox
              onChange={async (school) => {
                // Navigate to the school

                const { data, error } = await supabase
                  .from('profiles')
                  .update({ school_id: school.id })
                  .eq('id', user.id);

                console.log({ data, error });

                if (data) {
                  router.push(`/settings/profile`);
                } else {
                  alert('Could Not Find Profile');
                }
              }}
              as="div"
              className="relative max-w-xl mx-auto rounded-xl bg-white shadow-2xl ring ring-black/5 divide-y overflow-hidden"
            >
              <div className="flex items-center px-4">
                <SearchIcon className="h-6 w-6 text-slate-500" />
                <Combobox.Input
                  onChange={async (event) => {
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
                    <Combobox.Option
                      key={school.id}
                      value={school}
                      onClick={async (school) => {
                        const { data, error } = await supabase
                          .from('profiles')
                          .update({ school_id: school.id })
                          .eq('id', user.id);

                        if (data) {
                          route.push(`/settings/profile`);
                        } else {
                          alert('Could Not Find Profile');
                        }
                      }}
                    >
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
          </div>
        </div>
      </div>
    </div>
  );
};

Settings.headerTitle = 'Settings';

export default Settings;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const token = cookie.parse(req.headers.cookie)['sb-access-token'];
  supabase.auth.session = () => ({ access_token: token });

  const queryClient = await new QueryClient();

  await queryClient.prefetchQuery('schools', getSchools);

  await queryClient.prefetchQuery('profile', async () => {
    let profile = await supabase
      .from('profiles')
      .select('*, school_id(id, name, streetAddress, city)')
      .eq('id', user.id)
      .single();

    return profile.data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
