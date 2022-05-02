import React, { Fragment, Suspense } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';
import AuthProvider from '../context/AuthContext';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Suspense fallback={<Loading />}>
                <div className="flex flex-col h-screen">
                  <Header title={Component.headerTitle} />

                  <main className="flex-1 overflow-y-scroll">
                    <Component {...pageProps} />
                  </main>
                  <Footer />
                </div>
              </Suspense>
            </Hydrate>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </AuthProvider>
      </Suspense>
    </Fragment>
  );
}
