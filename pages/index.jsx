import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home({ session, supabase }) {
  console.log({ session });

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!session);
  }, [session]);

  if (!loggedIn) {
    return (
      <div className="flex justify-center h-full items-center">
        <Link href="/sign-in" passHref>
          <button className="bg-sky-600 text-white text-base px-6 py-2 rounded">
            Sign In
          </button>
        </Link>
      </div>
    );
  } else {
    return <div className="flex items-center h-full justify-center">Home</div>;
  }
}
