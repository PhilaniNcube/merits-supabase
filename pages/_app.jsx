import React, { Fragment } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';
// _app.jsx
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Sidebar from '../components/Sidebar';
import useSupabase from '../utils/supabase';

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  const { session, supabase } = useSupabase();

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Sidebar>
            <Component session={session} supabase={supabase} {...pageProps} />
          </Sidebar>
        </Hydrate>
        {/** <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </Fragment>
  );
}
