import { Database } from "../utils/database.types";
import supabase from "./supabase";



const getMyMerits = async () => {


let { data, error } = await supabase
  .rpc('my_total_merits')

if (error) console.error(error)
else return data


}


export default getMyMerits
