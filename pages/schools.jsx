import React, { Suspense, useMemo, useState } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getSchools } from '../lib/getSchools';

const Schools = () => {
  const [filter, setFilter] = useState('');

  const { data: schools } = useQuery('schools', getSchools, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const filteredSchools = useMemo(
    () =>
      schools.filter((school) =>
        school.name.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter, schools],
  );

  return <div>schools</div>;
};

export default Schools;

export const getServerSideProps = async () => {
  const queryClient = await new QueryClient();

  await queryClient.prefetchQuery('schools', getSchools);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
