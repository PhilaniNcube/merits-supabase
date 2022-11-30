import React, { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "../utils/database.types";
import supabase from "../lib/supabase";
import { useRouter } from "next/router";
import Tabs from "./Tabs";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Avatar() {

  const router = useRouter()

  const user = useUser()
  const [avatarUrl, setAvatarUrl] = useState<Profiles | null>(null);
  const [uploading, setUploading] = useState(false);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${user?.id}.${fileExt}`;
      const filePath = `${fileName}`;

      let {data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      console.log({ data, uploadError });


    } catch (error) {
      alert("Error uploading avatar!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  console.log({ avatarUrl });

  return (
    <div className="bg-purple-800  rounded-2xl">
       <Tabs />
    </div>
  );
}
