import supabase from "./supabase"

export async function getProfiles() {
    let { data: profiles, error, status } = await supabase
  .from('profiles')
  .select('*')

  if(error && status !== 406) {
     throw new Error(error.details)
  }

  return profiles

}


export function signOut(){
    return supabase.auth.signOut()
}
