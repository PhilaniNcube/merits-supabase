
import { Database } from "../utils/database.types";
import supabase from "./supabase";




const getLeaderboard = async () => {



let { data, error } = await supabase
  .from('leaderboards')
  .select('*')

if (error) console.error(error)
else return data


}


export default getLeaderboard
