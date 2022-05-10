import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AcademicCapIcon,
  CogIcon,
  HomeIcon,
  MailIcon,
} from '@heroicons/react/solid';

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
      <Link href="/schools">
        <a
          className={`flex items-center justify-center text-center w-1/4 py-4 ${
            router.route === '/schools' ? 'text-sky-600' : 'text-gray-500'
          }`}
        >
          <AcademicCapIcon className="w-7 h-7 cursor-pointer  " />
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
