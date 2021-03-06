import React, { Fragment, lazy, Suspense } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';
import AuthProvider from '../context/AuthContext';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Div100vh from 'react-div-100vh'

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
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
          <Div100vh>
              <Suspense fallback={<Loading />}>

                  <Suspense fallback={<Loading />}>
                    <HeaderComponent title={Component.headerTitle} />
                  </Suspense>

                  <main className="flex-1 h-[100vh] overflow-y-scroll">
                  <Suspense fallback={<Loading />}>
                  <Component {...pageProps} />
                  </Suspense>
                  </main>
                  <Footer />

                  </Suspense>
                  </Div100vh>
              <ReactQueryDevtools />
            </Hydrate>
          </QueryClientProvider>
        </Suspense>
      </AuthProvider>
    </Fragment>
  );
}
