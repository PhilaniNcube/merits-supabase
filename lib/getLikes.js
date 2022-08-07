import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const getLikes = async (id) => {
  let { data: like, error } = await supabaseClient
    .from("like")
    .select("*")
    .eq("event", id);

  return like;
};

export default getLikes;
