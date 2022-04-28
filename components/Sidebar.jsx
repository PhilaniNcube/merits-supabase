/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Sidebar({ children }) {
  const router = useRouter();

  const user = null;

  return (
    <div className="flex text-white h-screen">
      <div className="bg-slate-800  max-w-60 flex flex-col">
        <Link href="/">
          <a className="font-bold px-2 text-2xl h-12 items-center flex shadow-md shadow-slate-700 bg-slate-900 cursor-pointer">
            Merits
          </a>
        </Link>

        <div className="mt-8 flex-1 flex flex-col space-y-3">
          <Link href="/">
            <a className="text-base hover:text-gray-200 hover:bg-slate-900 py-2 px-3">
              {' '}
              Home
            </a>
          </Link>
          <Link href="/events">
            <a className="text-base hover:text-gray-200 hover:bg-slate-900 py-2 px-3">
              {' '}
              Events
            </a>
          </Link>
          <Link href="/sports">
            <a className="text-base hover:text-gray-200 hover:bg-slate-900 py-2 px-3">
              {' '}
              Sports
            </a>
          </Link>
          <Link href="/schools">
            <a className="text-base hover:text-gray-200 hover:bg-slate-900 py-2 px-3">
              {' '}
              Schools
            </a>
          </Link>
        </div>

        <div className="py-1 text-center space-y-3 flex flex-col rounded">
          {user ? (
            <Fragment>
              <Link href="/account">
                <a className="text-base bg-gray-900 px-4 py-1">My Account</a>
              </Link>

              <button className="text-base bg-gray-900 px-4 py-1">
                Logout
              </button>
            </Fragment>
          ) : (
            <Link href="/sign-in">
              <a className="text-base">Sign In</a>
            </Link>
          )}
        </div>
      </div>
      <div className="bg-slate-700 flex-1 overflow-y-scroll">{children} </div>
    </div>
  );
}

export default Sidebar;
