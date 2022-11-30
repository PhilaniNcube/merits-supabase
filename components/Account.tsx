import { useState, useEffect } from "react";
import { useUser, useSupabaseClient, Session } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { getProfiles } from "../lib/getProfiles";
import getProfile from "../lib/getProfile";

import { Database } from "../utils/database.types";
import Avatar from "./Avatar";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Account({ session }:{session: Session}) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles["username"]>('');
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>('');
  const [firstName, setFirstName] = useState()
  console.log({session})


   const {data: profile, isLoading, isSuccess} = useQuery(['profile'], async () => {
    if(typeof user == null || typeof user == 'undefined') {
      throw new Error();
    } else {
        return getProfile(user?.id!)
    }
   })


   console.log({profile})


  async function updateProfile({ username,  avatar_url }:{username:string, avatar_url:string}) {
    try {
      setLoading(true);

      const updates = {
        id: user?.id,
        username,
        avatar_url,

      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-purple-800 rounded-b-2xl px-4 py-4 text-white">
      <Avatar
      />
    </div>
  );
}
