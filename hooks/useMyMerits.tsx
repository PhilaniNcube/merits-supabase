
import { useQuery } from "@tanstack/react-query";
import supabase from "../lib/supabase";


const getMyMerits = async () => {

  let { data, error } = await supabase.rpc("my_total_merits");

  if (error) console.error(error);
  else return data
};


