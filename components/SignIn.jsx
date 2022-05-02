/* eslint-disable @next/next/no-img-element */
import { LockClosedIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import { useUser } from '../context/AuthContext';

export default function SignIn({ setShow }) {
  const [email, setEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const { signIn } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    signIn(email);

    setModalOpen(true);
  };

  return (
    <Fragment>
      <div className="bg-gray-200 flex items-center absolute inset-0 justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 relative isolate">
          {modalOpen && (
            <Notification
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              setShow={setShow}
            />
          )}
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in or create your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-sky-500 group-hover:text-sky-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

function Notification({ modalOpen, setModalOpen, setShow }) {
  return (
    <>
      <div className="py-8 absolute top-0 left-0 z-30">
        <div className="flex items-end justify-end sm:mr-12 mr-6">
          {/*code for notification starts*/}
          <div
            role="alert"
            className="flex sm:items-center justify-between transition duration-150 ease-in-out bg-white dark:bg-gray-800 pl-3 pr-4  sm:pr-8 py-4 sm:py-0 rounded shadow relative"
            id="notification"
          >
            <img
              className="absolute bottom-0"
              src="https://i.ibb.co/xXc3LDg/Saly-8.png"
              alt="notification"
            />
            <div className="flex items-start w-full ml-11">
              <div>
                <p className="text-sm sm:text-lg font-bold md:leading-5 dark:text-gray-100 text-gray-800">
                  Please check your email address.
                </p>
                <p className="text-xs font-medium leading-4 sm:leading-3 text-gray-600 dark:text-gray-300 mt-1.5 sm:mt-3">
                  We have sent you a link to log in to the application. The
                  email might be in your spam.
                </p>
              </div>
            </div>
            <div className="sm:ml-14 pl-4 sm:pl-8 sm:border-l border-gray-200 dark:border-gray-700 sm:py-7 h-full absolue right-0">
              <button
                id="close-modal"
                onClick={() => {
                  setModalOpen(false);
                  setShow(false);
                }}
                className="focus:outline-none dark:text-gray-100 text-gray-800 sm:w-8 sm:h-8 w-5 h-5 flex items-center justify-center"
              >
                <svg
                  width={8}
                  height={12}
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.2294 5.99999L0.457397 2.22932L2.34273 0.342651L8.00006 5.99999L2.34273 11.6573L0.457397 9.77065L4.2294 5.99999Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/*code for notification ends*/}
        </div>
      </div>
    </>
  );
}
