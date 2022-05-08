/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from 'react';
import cookie from 'cookie';
import { supabase } from '../../../utils/supabase';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import getProfiles from '../../../lib/getProfile';
import { getSchool, getSchools } from '../../../lib/getSchools';

const School = () => {
  const router = useRouter();

  console.log('router', router.query.id);

  const schoolQuery = useQuery('school', async function() {
    const school = await getSchool(router.query.id);

    return school;
  });

  const profilesQuery = useQuery(
    'profiles',
    async () => {
      let { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('school_id', router.query.id)
        .order('username', { ascending: true });

      return profiles;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <Fragment>
      {/* Card is full width. Use in 12 col grid for best view. */}
      {/* Card code block start */}
      <div className="flex flex-col-reverse lg:flex-row w-full py-4 shadow rounded px-4">
        <div className="w-full lg:w-1/2">
          <div className="pt-4 lg:pt-6 pb-4 lg:pb-6 pl-4 lg:pl-6 pr-4 lg:pr-6">
            <div className="flex justify-between items-center lg:items-start flex-row-reverse lg:flex-col"></div>
            <h2 className="text-gray-800  mt-4 mb-2 tracking-normal text-xl lg:text-2xl font-bold">
              {schoolQuery.data.name}
            </h2>

            <div className="flex lg:items-center items-start flex-col lg:flex-row">
              <div className="flex items-center">
                <div className="border-2 border-white  shadow rounded-full w-6 h-6">
                  <img
                    className="w-full h-full overflow-hidden object-cover rounded-full"
                    src="/images/avatar.png"
                    alt="avatar"
                  />
                </div>

                <p className="text-gray-600  text-xs font-normal ml-1">
                  {profilesQuery.data.length} Students Signed Up
                </p>
              </div>
              <div className="mt-4 lg:mt-0 ml-0 lg:ml-12 flex items-end">
                <span className="mr-1 text-gray-600 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-map-pin"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx={12} cy={11} r={3} />
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                  </svg>
                </span>
                <p className="text-gray-600  text-sm tracking-normal font-normal text-center">
                  {`${schoolQuery.data.streetAddress}, ${schoolQuery.data.city} `}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-64 lg:h-auto lg:w-1/2 rounded-t lg:rounded-t-none lg:rounded-r inline-block">
          <img
            className="w-full h-full absolute inset-0 object-cover rounded-t lg:rounded-r lg:rounded-t-none"
            src="/images/school.jpg"
            alt="school"
          />
        </div>
      </div>
      {/* Card code block end */}
    </Fragment>
  );
};

export default School;

export async function getServerSideProps({ req, params: { id } }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const token = cookie.parse(req.headers.cookie)['sb-access-token'];
  supabase.auth.session = () => ({ access_token: token });

  const queryClient = await new QueryClient();

  console.log(user);

  await queryClient.prefetchQuery('schools', getSchools);
  await queryClient.prefetchQuery('school', async () => {
    const school = await getSchool(id);

    return school;
  });

  await queryClient.prefetchQuery('profiles', async () => {
    let schoolProfiles = await supabase
      .from('profiles')
      .select('*')
      .eq('school_id', id);

    return schoolProfiles.data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
