import { Auth } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import SignIn from "../components/SignIn";
import Account from "../components/Account";
import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="max-w-3xl">
      {!session ? (
        <div className="bg-purple-800 p-8 flex items-center justify-center flex-col h-screen">
          <Image
            src="/images/logo-01.svg"
            width={200}
            height={200}
            alt="Merits"
            className="h-44 w-44 mb-4"
          />
          <h1 className="text-white text-3xl font-medium">Merits</h1>
          <div className="w-full flex items-center justify-between gap-4 text-center mt-4">
            <Link
              href="/sign-in"
              className="text-lg text-purple-800 font-medium bg-purple-100 rounded-lg px-6 w-2/4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-lg text-purple-800 font-medium bg-purple-100 rounded-lg px-6 w-2/4 py-2"
            >
              Register
            </Link>
          </div>
        </div>
      ) : (
        <Layout>
          <Account session={session} />
        </Layout>
      )}
    </div>
  );
};

export default Home;
