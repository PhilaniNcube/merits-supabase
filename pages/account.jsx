import React, { Fragment, Suspense, useState } from 'react';
import cookie from 'cookie';
import { supabase } from '../utils/supabase';
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import getProfile from '../lib/getProfile';
import { getSchools } from '../lib/getSchools';
import updateProfile from '../lib/updateProfile';
import Loading from '../components/Loading';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useUser } from '@supabase/auth-helpers-react';

const Account = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [school, setSchool] = useState('');
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const queryClient = useQueryClient();

  const { user } = useUser();

  const mutation = useMutation(async () => {
    return await supabase
      .from('user')
      .update({
        firstName: firstName,
        lastName: lastName,
        avatar: avatar,
        username: username,
        school: school,
      })
      .eq('id', user.id)
      .single();
  });

  const query = useQuery('profile', getProfile, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const profile = query.data;

  const { data: schools } = useQuery('schools', getSchools, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const profile = await mutation.mutateAsync();
      queryClient.setQueryData('profile', profile.data);
    } catch (error) {
      console.log(mutation.isError);
    }
  };

  return (
    <Fragment>
      <div className="my-4 max-w-7xl mx-auto px-4 md:px-2 lg:px-0">
        <h1 className="text-slate-800 font-bold text-xl md:text-3xl lg:text-4xl">
          Update Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="md:w-4/6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="school" className="sr-only">
                  School
                </label>
                <select
                  id="school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  name="school"
                  type="text"
                  autoComplete="school"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="School"
                >
                  <Suspense fallback={<Loading />}>
                    {schools.map((school) => (
                      <option key={school.id} value={school.id}>
                        {school.name}
                      </option>
                    ))}
                  </Suspense>
                </select>
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Account;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const token = cookie.parse(req.headers.cookie)['sb-access-token'];
  supabase.auth.session = () => ({ access_token: token });

  const queryClient = await new QueryClient();

  await queryClient.prefetchQuery('schools', getSchools);
  await queryClient.prefetchQuery('profile', getProfile);

  if (user) {
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } else if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
