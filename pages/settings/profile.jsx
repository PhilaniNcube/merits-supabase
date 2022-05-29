import React, {
  useEffect,
  useState,
  Suspense,
  startTransition,
  Fragment,
} from 'react';
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

  console.log(user);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [school, setSchool] = useState('');
  const [username, setUsername] = useState('');
  const [schools, setSchools] = useState([]);

  const schoolsQuery = useQuery('schools', getSchools, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    startTransition(() => {
      if (schoolsQuery.status === 'success') {
        setSchools(schoolsQuery.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const sportsMeritsQuery = useQuery(
    'sportsMerits',
    async () => {
      let { data, error } = await supabase.rpc('get_sports_merits');

      console.log({ data, error });

      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const leaderBoardQuery = useQuery(
    'leaderboard',
    async () => {
      let { data: merits, error } = await supabase
        .from('merits')
        .select('*')
        .eq('school_id', profileQuery.data.school_id.id);

      return merits;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const academicMeritsQuery = useQuery(
    'acadmicMerits',
    async () => {
      let { data, error } = await supabase.rpc('get_academic_merits');

      console.log({ data, error });

      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const { data, error } = await supabase
      .from('profiles')
      .update({ school_id: school })
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
      <header className="">
        <p className="text-2xl font-medium text-slate-700">My Profile</p>
      </header>

      {profileQuery.data.school_id === null && (
        <Fragment>
          <h1 className="text-md font-medium text-slate-800 mt-8">
            Please Update your profile
          </h1>

          <Suspense fallback={<Loading />}>
            <form
              className="w-full flex flex-col space-y-3"
              onSubmit={handleSubmit}
            >
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
        </Fragment>
      )}

      <Suspense fallback={<Loading />}>
        <div className="w-full mt-2 rounded-lg shadow-lg shadow-gray-800/20 p-2 bg-gradient-to-r from-cyan-500 to-blue-500">
          <p className="text-white font-bold text-2xl">{`${profileQuery.data.firstname} ${profileQuery.data.lastname}`}</p>

          <p className="text-white font-medium text-lg mt-2">
            {profileQuery.data.school_id.name}
          </p>
          <p className="text-white text-md mt-1">
            {profileQuery.data.school_id.streetAddress}
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-lg shadow-lg shadow-gray-800/20 p-2 bg-gradient-to-r from-red-500 to-orange-500 flex flex-col">
            <p className="text-white font-medium text-md text-center uppercase">
              Academic Merits
            </p>
            <p className="text-5xl text-center font-bold text-white">
              <Suspense fallback={<Loading />}>
                {academicMeritsQuery.isLoading
                  ? 'loading..'
                  : academicMeritsQuery.isSuccess
                  ? `${academicMeritsQuery.data}`
                  : ''}
              </Suspense>
            </p>
          </div>
          <div className="rounded-lg shadow-lg shadow-gray-800/20 p-2 bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col">
            <p className="text-white font-medium text-md text-center uppercase">
              Sports Merits
            </p>
            <p className="text-5xl text-center font-bold text-white">
              <Suspense fallback={<Loading />}>
                {sportsMeritsQuery.isLoading
                  ? 'loading..'
                  : sportsMeritsQuery.isSuccess
                  ? `${sportsMeritsQuery.data}`
                  : ''}
              </Suspense>
            </p>
          </div>
        </div>
        <div className="w-full mt-4">
          <p className="text-gray-700 font-extrabold text-2xl mt-2">
            School Leaderboard
          </p>
          <table className="min-w-full bg-gray-300 rounded-t-lg">
            <thead className="rounded-t-lg">
              <tr className="w-full h-16 rounded-t-lg bg-zinc-800 text-white">
                <th>
                  <p>Username</p>
                </th>
                <th>
                  <p>Points</p>
                </th>
              </tr>
            </thead>
            <tbody className="mt-1">
              <tr className="h-12">
                <td className="pl-3">Philani Ncube</td>
                <td className="pl-3 bg-slate-500">20</td>
              </tr>
            </tbody>
          </table>
        </div>
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
