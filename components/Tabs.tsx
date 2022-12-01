import { useState } from "react";
import { Tab } from "@headlessui/react";
import getLeaderboard from "../lib/getLeadeboard";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../utils/database.types";
import { Doughnut, Line } from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import Leaderboard from "./Leaderboard";

ChartJS.register(ArcElement, Tooltip, Legend);

type Merits = Database["public"]["Tables"]["merits"]["Row"];

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {

    const supabase = useSupabaseClient();


  const {data:leaderboard, isLoading, isSuccess} = useQuery(['leaderboard'], getLeaderboard)

  const {data:myMerits, isLoading:myMeritsLoading, isSuccess:myMeritsSuccess, error:myMeritsError} = useQuery(['my-merits'], async () => {
    let { data: merits, error } = await supabase.from("merits").select("*, profile_id(*), school_id(*)");

    if(error) {throw new Error(error.details)} else return merits as Merits[]
  } )

  const totalMerits = myMerits?.reduce((acc, cur) => acc + cur.points, 0);

console.log({totalMerits, myMerits})

let chartData = {
  labels: myMerits?.map((item) => item.type),

  datasets: [{
    label: "Merits",
    data: myMerits?.map((item) => item.points),
    backgroundColor: [
      'white',
      'orange',
      'green',
    ],
    borderColor: [
      'black',
    ],
    borderWidth:1,
  }]
}




  return (
    <div className="w-full max-w-md px-2 py-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-full bg-purple-700 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-full py-2.5 text-sm font-medium leading-5 text-blue-700",
                "focus:outline-none",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            My Merits
          </Tab>{" "}
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-full py-2.5 text-sm font-medium leading-5 text-blue-700",
                "focus:outline-none",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Leaderboard
          </Tab>{" "}
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-full py-2.5 text-sm font-medium leading-5 text-blue-700",
                "focus:outline-none",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Prizes
          </Tab>
        </Tab.List>
        <Tab.Panels className="">
          <Tab.Panel
            className={classNames("rounded-xl  p-3", "focus:outline-none")}
          >
            <div className="flex items-center justify-center py-10 text-white relative isolate">
              {myMeritsLoading
                ? "loading"
                : myMeritsError ? "error" :  (
                    <Doughnut
                      data={chartData}
                      className="text-white"

                    />
                  )}
                 <div className="absolute inset-0 flex justify-center items-center text-xs">Total Merits:{totalMerits}</div>
            </div>
          </Tab.Panel>
          <Tab.Panel
            className={classNames("rounded-xl  py-3", "focus:outline-none")}
          >
            {isLoading ? 'loading' : isSuccess && (
              <div className="flex  items-center justify-center w-full">
                 <Leaderboard />
              </div>
            )}
          </Tab.Panel>
          <Tab.Panel
            className={classNames("rounded-xl  py-3", "focus:outline-none")}
          >
            <h1 className="text-center text-7xl text-white">Prizes</h1>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
