"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleRedirect() {
          // This reads the code & sets the session
      const { data, error } = await supabase.auth.getSessionFromUrl({
        storeSession: true, // stores the session in localStorage
      });
 if (error) {
        console.error("OAuth error:", error);
        router.replace("/landing");
        return;
      }

      if (data.session) {
        router.replace("/home"); // redirect to protected page
      } else {
        router.replace("/landing"); // redirect to login if not signed in
      }
    }

    handleRedirect();
  }, [router]);

  return <div>Loading...</div>;
}
// import { redirect } from "next/navigation";
// import { createServerSupabase } from "@/lib/supabase/server";

// export default async function IndexGate() {
//   const supabase = await createServerSupabase();
//   const { data } = await supabase.auth.getUser();

//   if (data.user) {
//     redirect("/home");
//   }

//   redirect("/landing");
    
// }

