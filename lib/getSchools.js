import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const getSchools = async () => {
  let { data: school, error } = await supabaseClient
    .from("school")
    .select("*")
    .order("name", { ascending: true });

  return school;
};

const getSchool = async (id) => {
  let { data: school, error } = await supabaseClient
    .from("school")
    .select("*")
    .eq("id", id)
    .single();

  return school;
};

export { getSchools, getSchool };
