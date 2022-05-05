/* eslint-disable @next/next/no-img-element */
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import React, { Fragment, Suspense, useEffect, useState } from 'react';
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
              <div className="flex space-x-2 items-center">
                <Suspense fallback={<Loading />}>
                  <LogoutIcon
                    onClick={() => signOut()}
                    className="h-7 w-7 text-red-500"
                  />
                </Suspense>
              </div>
            ) : (
              <Suspense>
                <button
                  onClick={() => setShow(true)}
                  className="flex items-center"
                >
                  <span className="font-medium text-gray-700">Sign In</span>
                  <span>
                    <LoginIcon className="pl-1 h-6 w-6 text-sky-500" />
                  </span>
                </button>
              </Suspense>
            )}
          </div>
        </Suspense>
      </header>
    </Fragment>
  );
};

export default Header;
