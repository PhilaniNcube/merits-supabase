import { UserMinusIcon } from "@heroicons/react/20/solid";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ReactNode } from "react";
import getProfile from "../lib/getProfile";

import DropDownMenu from "./Navigation";

const Layout = ({children}: {children: ReactNode}) => {

    const supabase = useSupabaseClient();

  const user = useUser()

     const {
       data: profile,
       isLoading,
       isSuccess,
     } = useQuery(["profile"], async () => {
       if (typeof user == null || typeof user == "undefined") {
         throw new Error();
       } else {
         return getProfile(user?.id!);
       }
     });


  return (
    <main className="max-w-4xl relative isolate">
      <header className="bg-purple-800 py-4 px-4 flex justify-between items-center">
        {isLoading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 rounded-full text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ) : profile && (
          <div className="flex items-center space-x-2">
            <img
              src={profile?.avatar_url}
              className="h-10 w-10 aspect-square object-cover rounded-full border border-white"
            />
            <p className="text-xs text-white font-medium">{profile?.username}</p>
          </div>
        )}
        <div className="flex space-x-2 items-center">
           <DropDownMenu />

        </div>

      </header>
      {children}
    </main>
  );
};
export default Layout;
