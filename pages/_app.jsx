import React, { Fragment, Suspense } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';
import AuthProvider from '../context/AuthContext';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Sidebar from '../components/Sidebar';

// _app.jsx

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <Fragment>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Sidebar>
              <Component {...pageProps} />
            </Sidebar>
          </Hydrate>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthProvider>
    </Fragment>
  );
}
