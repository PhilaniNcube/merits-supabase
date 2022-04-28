import React, { Fragment } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';
// _app.jsx
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Sidebar from '../components/Sidebar';

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Sidebar>
            <Component {...pageProps} />
          </Sidebar>
        </Hydrate>
        {/** <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </Fragment>
  );
}
