
import { Database, LeaderboardItem } from "../utils/database.types";
import supabase from "./supabase";




const getLeaderboard = async () => {



let { data, error } = await supabase
  .from('new_leaderboards')
  .select('*')

if (error) console.error(error)
else return data as LeaderboardItem[]


}


export default getLeaderboard
