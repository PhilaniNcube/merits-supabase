import React, { Fragment, lazy, Suspense } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';
import AuthProvider from '../context/AuthContext';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Loading from '../components/Loading';
import Navbar from '../components/Navbar/Navbar';

const HeaderComponent = lazy(() => import('../components/Header'));

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
