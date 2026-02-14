// hooks/use-bookmarks.ts
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function useBookmarks(userId?: string) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    fetchBookmarks();
  }, [userId]);

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error) setBookmarks(data || []);
  };

  const addBookmark = async (title: string, url: string) => {
    if (!userId) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("bookmarks")
      .insert([{ title, url, user_id: userId }])
      .select()
      .single();

    if (error) throw error;

    setBookmarks((prev) => [data, ...prev]);
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  return {
    bookmarks,
    addBookmark,
    deleteBookmark,
    loading,
  };
}

// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase/client";
// import { useAuth } from "@/hooks/use-auth";

// export type Bookmark = {
//   id: string;
//   title: string;
//   url: string;
//   user_id: string;
//   created_at: string;
// };

// /* ---------------- Fetch ---------------- */

// export function useBookmarks() {
//   const { user } = useAuth();
//   const [data, setData] = useState<Bookmark[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   const fetchBookmarks = async () => {
//     if (!user) return;

//     const { data, error } = await supabase
//       .from("bookmarks")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       setError(error);
//     } else {
//       setData(data || []);
//     }

//     setIsLoading(false);
//   };

//   useEffect(() => {
//     fetchBookmarks();
//   }, [user]);

//   useEffect(() => {
//   const handler = () => fetchBookmarks();
//   window.addEventListener("bookmarks-update", handler);
//   return () => window.removeEventListener("bookmarks-update", handler);
// }, []);

//   return { data, isLoading, error, refetch: fetchBookmarks };
// }

// /* ---------------- Realtime ---------------- */

// export function useBookmarksRealtime(enabled: boolean) {
//   const { user } = useAuth();

//   useEffect(() => {
//     if (!enabled || !user) return;

//     const channel = supabase
//       .channel("bookmarks-live")
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "bookmarks",
//           filter: `user_id=eq.${user.id}`,
//         },
//         () => {
//           // just refetch through normal hook
//           window.dispatchEvent(new Event("bookmarks-update"));
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [enabled, user]);
// }

// /* ---------------- Create ---------------- */

// export function useCreateBookmark() {
//   const { user } = useAuth();
//   const [isPending, setIsPending] = useState(false);

//   const mutateAsync = async (values: { title: string; url: string }) => {
//     if (!user) throw new Error("Not authenticated");

//     setIsPending(true);

//     const { error } = await supabase.from("bookmarks").insert({
//       title: values.title,
//       url: values.url,
//       user_id: user.id, // 🔥 REQUIRED FOR RLS
//     });

//     setIsPending(false);

//     if (error) throw error;
//   };

//   return { mutateAsync, isPending };
// }

// /* ---------------- Delete ---------------- */

// export function useDeleteBookmark() {
//   const [isPending, setIsPending] = useState(false);

//   const mutateAsync = async (id: string) => {
//     setIsPending(true);
//     const { error } = await supabase.from("bookmarks").delete().eq("id", id);
//     setIsPending(false);
//     if (error) throw error;
//   };

//   return { mutateAsync, isPending };
// }



// "use client";





// import { supabase } from "@/lib/supabase/client";
// import { useEffect, useState } from "react";

// export function useBookmarks(userId?: string) {
//   const [bookmarks, setBookmarks] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBookmarks = async () => {
//     if (!userId) return;

//     const { data } = await supabase
//       .from("bookmarks")
//       .select("*")
//       .eq("user_id", userId)
//       .order("created_at", { ascending: false });

//     setBookmarks(data || []);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchBookmarks();

//     if (!userId) return;

//     const channel = supabase
//       .channel("bookmarks-realtime")
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "bookmarks",
//           filter: `user_id=eq.${userId}`,
//         },
//         fetchBookmarks
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [userId]);

//   const addBookmark = async (title: string, url: string) => {
//     if (!userId) return;
//     await supabase.from("bookmarks").insert({
//       title,
//       url,
//       user_id: userId,
//     });
//   };

//   const deleteBookmark = async (id: string) => {
//     await supabase.from("bookmarks").delete().eq("id", id);
//   };

//   return {
//     bookmarks,
//     loading,
//     addBookmark,
//     deleteBookmark,
//   };
// }


// "use client";

// import { supabase } from "@/lib/supabase/client";
// import { useEffect, useState } from "react";

// export function useBookmarks() {
//   const [bookmarks, setBookmarks] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBookmarks = async () => {
//     const { data } = await supabase
//       .from("bookmarks")
//       .select("*")
//       .order("created_at", { ascending: false });

//     setBookmarks(data || []);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchBookmarks();

//     const channel = supabase
//       .channel("bookmarks-realtime")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "bookmarks" },
//         () => {
//           fetchBookmarks();
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   const createBookmark = async (title: string, url: string) => {
//     await supabase.from("bookmarks").insert({ title, url });
//   };

//   const deleteBookmark = async (id: string) => {
//     await supabase.from("bookmarks").delete().eq("id", id);
//   };

//   return {
//     bookmarks,
//     loading,
//     createBookmark,
//     deleteBookmark,
//   };
// }
