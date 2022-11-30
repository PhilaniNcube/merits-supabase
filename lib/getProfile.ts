import { Database } from "../utils/database.types";
import supabase from "./supabase";

type Profile = Database['public']['Tables']['profiles']['Row']

const getProfile = async (userID:string) => {

  let { data: profile, error } = await supabase.from("profiles").select("*").eq('id', userID).single()

  if(error) {
    throw new Error(error.details)
  }

  return profile as Profile

}


export default getProfile
