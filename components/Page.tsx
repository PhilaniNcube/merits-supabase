import Head from "next/head";
import { ReactNode } from "react";

const Page = ({title = "Merits", children}: {title:string, children:ReactNode}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="max-w-2xl mx-auto">{children}</main>
    </>
  );
};
export default Page;
