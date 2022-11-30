import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function useSupabase(){
    const supabase = useSupabaseClient();

    return supabase
}
