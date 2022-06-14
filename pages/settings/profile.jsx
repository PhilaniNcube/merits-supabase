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
import MyMerits from '../../components/Graphs/MyMerits';

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

  const academicMeritsQuery = useQuery(
    'acadmicMerits',
    async () => {
      let { data, error } = await supabase.rpc('get_academic_merits');

      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const socialMeritsQuery = useQuery(
    'socialMerits',
    async () => {
      let { data, error } = await supabase.rpc('get_social_merits');

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

        <MyMerits />
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
