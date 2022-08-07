import { CogIcon, LogoutIcon, MenuAlt1Icon, UserCircleIcon, UserIcon, XIcon } from "@heroicons/react/outline";
import { useUser } from "@supabase/auth-helpers-react";
import {motion, AnimatePresence } from "framer-motion";
import Image from "next/future/image";
import Link from "next/link";
import { Fragment, useState } from "react";


const Navbar = () => {

 const { isLoading, user, error } = useUser();

 const [open, setOpen] = useState(false)
 console.log(open)

  return (
    <nav className="bg-fuchsia-800 absolute top-0 left-0 right-0">
      <div className="px-4 py-2 items-center relative flex justify-between">
        {!user ? (
          <Image
            src="/images/merits-logo.png"
            width={40}
            height={38}
            alt="logo"
            className="h-16 w-20 object-cover"
          />
        ) : (
          <UserCircleIcon
            alt="Avatar"
            className="h-16 w-16 bg-white text-fuchsia-800 font-light rounded-full object-cover"
          />
        )}

        <MenuAlt1Icon
          onClick={() => setOpen(!open)}
          className="h-12 w-12 text-white"
        />

        <AnimatePresence exitBeforeEnter>
          {open && (
            <motion.div
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex justify-center z-30 px-4 py-2"
            >
              <div className="h-[90vh] z-30 w-full mx-auto bg-white shadow-lg shadow-gray-700/60 rounded-lg relative">
                <XIcon
                  onClick={() => setOpen(false)}
                  className="h-12 w-12 text-fuchsia-800 absolute top-8 right-4"
                />
                <div className="flex flex-col items-start px-8 py-12">
                  <Link href="/home">
                    <a className="text-fuchsia-800 w-full font-medium text-xl hover:bg-fuchsia-100 rounded-lg py-2 px-3">
                      Home
                    </a>
                  </Link>
                  <Link href="/events">
                    <a className="text-fuchsia-800 w-full font-medium text-xl hover:bg-fuchsia-100 rounded-lg py-2 px-3">
                      Events
                    </a>
                  </Link>
                  <Link href="/schools">
                    <a className="text-fuchsia-800 w-full font-medium text-xl hover:bg-fuchsia-100 rounded-lg py-2 px-3">
                      Schools
                    </a>
                  </Link>
                  {!user ? (
                    <Fragment>
                      <Link href="/sign-in">
                        <a className="text-fuchsia-800 w-full font-medium text-xl hover:bg-fuchsia-100 rounded-lg py-2 px-3">
                          Sign In
                        </a>
                      </Link>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Link href="/settings/profile" passHref>
                        <span className="text-fuchsia-800 my-1 w-full flex justify-between items-center font-medium text-xl bg-fuchsia-100 rounded-lg py-2 px-3">
                          <p>Profile</p>
                          <UserIcon className="h-7 w-7" />
                        </span>
                      </Link>
                      <Link href="/settings" passHref>
                        <span className="text-fuchsia-800 my-1 w-full flex justify-between items-center font-medium text-xl bg-fuchsia-100 rounded-lg py-2 px-3">
                          <p>Settings</p>
                          <CogIcon className="h-7 w-7" />
                        </span>
                      </Link>

                      <Link href="/api/auth/logout" passHref>
                        <span className="text-fuchsia-50 my-1 w-full flex justify-between items-center font-medium text-xl bg-fuchsia-700 rounded-lg py-2 px-3">
                          <p>Logout</p>
                          <LogoutIcon className="h-7 w-7" />
                        </span>
                      </Link>
                    </Fragment>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
export default Navbar;
