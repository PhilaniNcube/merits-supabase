import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CogIcon, HomeIcon, MailIcon, PlayIcon } from '@heroicons/react/solid';

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="flex border-t bg-slate-200">
      <Link href="/">
        <a
          className={`flex items-center justify-center text-center w-1/4 py-4 ${
            router.pathname === '/' ? 'text-sky-600' : 'text-gray-500'
          }`}
        >
          <HomeIcon className="w-7 h-7 cursor-pointer" />
        </a>
      </Link>
      <Link href="/messages">
        <a
          className={`flex items-center justify-center text-center w-1/4 py-4 ${
            router.pathname === '/messages' ? 'text-sky-600' : 'text-gray-500'
          }`}
        >
          <MailIcon className="w-7 h-7 cursor-pointer" />
        </a>
      </Link>
      <Link href="/events">
        <a
          className={`flex items-center justify-center text-center w-1/4 py-4 ${
            router.route === '/events' ? 'text-sky-600' : 'text-gray-500'
          }`}
        >
          <PlayIcon className="w-7 h-7 cursor-pointer  " />
        </a>
      </Link>
      <Link href="/settings">
        <a
          className={`flex items-center justify-center text-center w-1/4 py-4 ${
            router.pathname === '/settings' ? 'text-sky-600' : 'text-gray-500'
          }`}
        >
          <CogIcon className="w-7 h-7 cursor-pointer" />
        </a>
      </Link>
    </footer>
  );
};

export default Footer;

const Gear = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 fill-current"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};

const Home = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 fill-current"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
};

const Messages = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 fill-current"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
};

const Events = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 fill-current"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
