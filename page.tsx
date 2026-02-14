import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function IndexGate() {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) redirect("/home");
  redirect("/landing");
}
