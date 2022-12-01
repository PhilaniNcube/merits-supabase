import { Database } from "../utils/database.types"
import supabase from "./supabase"

export type School = Database['public']['Tables']['school']['Row']

export async function getSchools() {
    let { data: schools, error, status } = await supabase
  .from('school')
  .select('*')

  if(error && status !== 406) {
     throw new Error(error.details)
  }

  return schools as School[]

}


