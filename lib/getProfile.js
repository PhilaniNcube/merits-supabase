import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const getProfiles = async () => {
  let { data: profiles, error } = await supabaseClient
    .from("profiles")
    .select("*");

  return profiles;
};

export const getProfile = async (id) => {
  let { data: profiles, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  return profiles;
};

export default getProfiles;
