/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { Fragment, Suspense, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../context/AuthContext';
import cookie from 'cookie';
import { supabase } from '../utils/supabase';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getSchools } from '../lib/getSchools';

const Account = ({ profile }) => {
  const { user } = useUser();

  const router = useRouter();

  const { data: schools } = useQuery('schools', getSchools, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [school, setSchool] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');

  console.log({ user, profile });

  const handleFileUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error('You must select an image to upload.');
    }

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('merits')
      .upload(`${fileName}`, file);

    console.log({ data, error });

    const fileUrl = data.Key;

    setAvatar(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileUrl}`,
    );

    console.log('Avatar', avatar);

    const profile = await supabase
      .from('user')
      .update({
        avatar: avatar,
      })
      .eq('id', user.id);

    console.log(profile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('user')
      .update({
        firstName: firstName,
        lastName: lastName,
        school: school,
        username: username,
      })
      .eq('id', user.id);

    console.log({ data, error });

    if (data.length > 0) {
      router.push('/');
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/6 md:h-screen md:border-r-2 border-gray-200 px-2 md:px-6 py-4">
          <h1 className="text-3xl text-white font-bold">Profile</h1>
          <Suspense
            fallback={<small className="text-xs text-white">Email:</small>}
          >
            <small className="text-xs text-slate-100">
              {!user ? 'Loading...' : `${user.email}`}
            </small>

            <div className="bg-gray-200 rounded-md shadow-md mt-2 p-2 flex space-x-4">
              {profile.avatar ? (
                <img
                  className="bg-sky-200 rounded-full h-24 w-24 object-cover"
                  src={profile.avatar}
                />
              ) : (
                <img
                  className="bg-sky-200 rounded-full h-24 w-24 object-cover"
                  src="/images/avatar.png"
                />
              )}
              <p className="text-slate-800 font-medium text-sm">
                Profile Image
              </p>
            </div>
          </Suspense>
        </div>

        <div className="w-full py-6 px-2 md:px-8 flex-1">
          <h2 className="text-base md:text-xl font-medium">Edit Profile</h2>

          <form
            onSubmit={handleSubmit}
            className="mt-6 px-2 md:px-4  py-3 rounded-md shadow-lg bg-gray-800 "
          >
            <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-6 w-full ">
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="firstName"
                  className="text-slate-100 text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-slate-200 py-2 px-3 text-sm rounded-md"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="lastName"
                  className="text-slate-100 text-sm font-medium"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-slate-200 py-2 px-3 text-sm  rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-6 w-full mt-6">
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="school"
                  className="text-slate-100 text-sm font-medium"
                >
                  School
                </label>
                <select
                  type="text"
                  id="school"
                  name="school"
                  placeholder="First Name"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="bg-slate-200 text-slate-400 py-2 px-3 text-sm rounded-md"
                >
                  {schools.map((school) => (
                    <option
                      className="text-gray-600 rounded-sm px-2 text-sm"
                      key={school.id}
                      value={school.id}
                    >
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="username"
                  className="text-slate-100 text-sm font-medium"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Create Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-slate-200 py-2 px-3 text-sm  rounded-md"
                />
              </div>
            </div>

            <button
              className="mt-6 bg-slate-200 text-slate-800 px-6 py-1 text-base font-bold rounded-md"
              type="submit"
            >
              Save
            </button>
          </form>

          <div className="flex items-center mt-6 space-x-4">
            <div className="flex justify-start">
              <div className="mb-3 ">
                <label
                  htmlFor="avatar"
                  className="pb-2 text-sm font-bold text-gray-50"
                >
                  Change Avatar Image
                </label>
                <input
                  className="form-control m-0focus:text-gray-700 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:outline-none"
                  onChange={handleFileUpload}
                  type="file"
                  accept="image/*"
                  name="avatar"
                  id="avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Account;

export async function getServerSideProps({ req }) {
  const queryClient = await new QueryClient();

  const { user } = await supabase.auth.api.getUserByCookie(req);
  const token = cookie.parse(req.headers.cookie)['sb-access-token'];

  console.log(token);

  supabase.auth.session = () => ({ access_token: token });

  let profile = await supabase
    .from('user')
    .select('*')
    .single();

  await queryClient.prefetchQuery('schools', getSchools);

  console.log(profile);

  return {
    props: {
      profile: profile.data,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
