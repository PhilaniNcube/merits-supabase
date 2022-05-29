/* eslint-disable @next/next/no-img-element */
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import React, { Fragment, Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../context/AuthContext';
import SignIn from './SignIn';
import Loading from './Loading';

const Header = ({ title }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { user, signOut, signIn } = useUser();

  useEffect(() => {
    setLoggedIn(!!user);
  }, [user]);

  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <header className="flex justify-between items-center px-4 py-3 border-b">
        {show && <SignIn setShow={setShow} />}
        <div className="flex">
          <img
            className="rounded-full w-7 h-7"
            src="/images/avatar.png"
            alt="avatar"
          />
          <p className="ml-6 text-lg font-extrabold">{title}</p>
        </div>
        <Suspense>
          <div className="flex space-x-2 items-center">
            {loggedIn ? (
              <button
                onClick={() => signOut()}
                className="flex bg-red-600 py-2 px-4 rounded space-x-2 items-center"
              >
                <Suspense fallback={<Loading />}>
                  <p className="text-white">Logout</p>
                  <LogoutIcon className="h-6 w-6 text-red-50" />
                </Suspense>
              </button>
            ) : (
              <Suspense>
                <Link href="/sign-in" passHref>
                  <button className="flex bg-green-500 rounded py-2 px-4 items-center">
                    <span className="font-medium text-gray-50">Sign In</span>
                    <span>
                      <LoginIcon className="pl-1 h-6 w-6 text-sky-50" />
                    </span>
                  </button>
                </Link>
              </Suspense>
            )}
          </div>
        </Suspense>
      </header>
    </Fragment>
  );
};

export default Header;
