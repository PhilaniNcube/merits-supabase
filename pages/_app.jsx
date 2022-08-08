import React, { Fragment, lazy, Suspense } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Loading from '../components/Loading';
import Navbar from '../components/Navbar/Navbar';


// _app.jsx

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
          },
        },
      }),
  );

  return (
    <Fragment>
      <UserProvider supabaseClient={supabaseClient}>
        <Suspense fallback={<Loading />}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Navbar />
              <Component {...pageProps} />
              <ReactQueryDevtools />
            </Hydrate>
          </QueryClientProvider>
        </Suspense>
      </UserProvider>
    </Fragment>
  );
}
