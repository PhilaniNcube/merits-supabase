import React, { useEffect, useState, Suspense } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import cookie from 'cookie';
import { useUser } from '../../context/AuthContext';
import { getProfile } from '../../lib/getProfile';
import { getSchools } from '../../lib/getSchools';
import { supabase } from '../../utils/supabase';
import Loading from '../../components/Loading';
import { useRouter } from 'next/router';

const Profile = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [school, setSchool] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [grade, setGrade] = useState(10);

  const [schools, setSchools] = useState([]);

  console.log(schools);

  useEffect(() => {
    if (schoolsQuery.status === 'success') {
      setSchools(schoolsQuery.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schoolsQuery = useQuery('schools', getSchools, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const profileQuery = useQuery(
    'profile',
    async () => {
      let { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      return profiles;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  console.log(schoolsQuery);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const { data, error } = await supabase
      .from('profiles')
      .update({ username: username, school_id: school })
      .eq('id', profileQuery.data.id);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (data) {
      console.log(data);
      alert('Updated profile successfully');
      setLoading(false);
      router.push('/');
    }
  };

  return (
    <div className="px-4 py-2 maxw-6xl mx-auto lg:px-0">
      <header className="border-b-2 pb-1">
        <p className="text-lg font-medium text-slate-700">
          Username: {profileQuery.data.username}
        </p>
      </header>

      <h1 className="text-xl font-medium text-slate-800 mt-8">
        Please Update your profile
      </h1>

      <Suspense fallback={<Loading />}>
        <form
          className="w-full flex flex-col space-y-3"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm space-y-1">
            <div>
              <label htmlFor="username" className="text-xs text-slate-500">
                Username
              </label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="username"
                autoComplete="username"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
          </div>

          <Suspense fallback={<Loading />}>
            <div className="rounded-md shadow-sm space-y-1">
              <div>
                <label htmlFor="school" className="text-xs text-slate-500">
                  Select School
                </label>
                <select
                  id="school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  name="school"
                  type="school"
                  autoComplete="school"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-slate-600 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                >
                  <option className="text-xs py-3" value="" disabled>
                    Select Your School
                  </option>
                  <Suspense fallback={<Loading />}>
                    {schools.map((school) => {
                      return (
                        <option
                          className="px-3 text-gray-600"
                          key={school.id}
                          value={school.id}
                        >
                          {school.name}
                        </option>
                      );
                    })}
                  </Suspense>
                </select>
              </div>
            </div>
          </Suspense>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Update
            </button>
          </div>
        </form>
      </Suspense>
    </div>
  );
};

export default Profile;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const token = cookie.parse(req.headers.cookie)['sb-access-token'];
  supabase.auth.session = () => ({ access_token: token });

  const queryClient = await new QueryClient();

  console.log(user);

  await queryClient.prefetchQuery('schools', getSchools);
  await queryClient.prefetchQuery('profile', async () => {
    let { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
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
