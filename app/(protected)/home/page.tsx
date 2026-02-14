 "use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import GlowCard from "@/components/GlowCard";
import TopBar from "@/components/TopBar";
import { useAuth } from "@/hooks/use-auth";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { ExternalLink, Trash2, Plus, Search, Inbox } from "lucide-react";
import { format } from "date-fns";

function normalizeUrl(u: string) {
  const trimmed = u.trim();
  if (!trimmed) return trimmed;
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

export default function Home() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const { bookmarks, addBookmark, deleteBookmark } = useBookmarks(user?.id);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/landing");
    }
  }, [user, loading, router]);

  const items = useMemo(() => {
    const q = query.toLowerCase();
    return (bookmarks || []).filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.url.toLowerCase().includes(q)
    );
  }, [bookmarks, query]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!user) return null;

  return (
    <AppShell className="pb-16">
      <TopBar user={user} onLogout={logout} />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* ADD BOOKMARK */}
        <GlowCard className="p-6 lg:col-span-5">
          <h2 className="text-xl font-semibold mb-4">Add Bookmark</h2>

          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form= new FormData(e.currentTarget);
              
              const url = form.get("url") as string;
              const title = form.get("title") as string;
                                 const formEl = e.currentTarget;
              await addBookmark(title.trim(), normalizeUrl(url));
              // e.currentTarget.reset();
               formEl.reset();
            }}
          >
            <input
              name="url"
              placeholder="https://example.com"
              required
              className="w-full h-12 rounded-xl border px-4"
            />

            <input
              name="title"
              placeholder="Bookmark title"
              required
              className="w-full h-12 rounded-xl border px-4"
            />

            <button className="w-full h-12 bg-black text-white rounded-xl flex items-center justify-center gap-2">
              <Plus size={16} />
              Add
            </button>
          </form>
        </GlowCard>

        {/* LIST */}
        <GlowCard className="p-6 lg:col-span-7">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Bookmarks</h2>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="pl-8 h-10 rounded-xl border"
              />
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Inbox className="mx-auto mb-2" />
              No bookmarks yet
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((b) => (
                <div
                  key={b.id}
                  className="border rounded-xl p-4 flex justify-between items-start"
                >
                  <div>
                    <a
                      href={b.url}
                      target="_blank"
                      className="font-semibold flex items-center gap-2"
                    >
                      {b.title}
                      <ExternalLink size={14} />
                    </a>
                    <div className="text-xs text-gray-500">
                      Added {format(new Date(b.created_at), "MMM d, yyyy")}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteBookmark(b.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </GlowCard>
      </div>
    </AppShell>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase/client";

// type Bookmark = {
//   id: string;
//   title: string;
//   url: string;
// };

// export default function Home() {
//   const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");

//   // STEP 4 — Fetch (auto private because of RLS)
//   const fetchBookmarks = async () => {
//     const { data } = await supabase
//       .from("bookmarks")
//       .select("*")
//       .order("created_at", { ascending: false });

//     setBookmarks(data || []);
//   };

//   // STEP 3 — Insert with user_id
//   const addBookmark = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       alert("Not logged in");
//       return;
//     }

//     await supabase.from("bookmarks").insert({
//       title,
//       url,
//       user_id: user.id,
//     });

//     setTitle("");
//     setUrl("");
//   };

//   // STEP 6 — Delete
//   const deleteBookmark = async (id: string) => {
//     await supabase.from("bookmarks").delete().eq("id", id);
//   };

//   // STEP 5 — Realtime
//   useEffect(() => {
//     fetchBookmarks();

//     const channel = supabase
//       .channel("bookmarks-live")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "bookmarks" },
//         () => fetchBookmarks()
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>My Bookmarks</h1>

//       <div style={{ marginBottom: 20 }}>
//         <input
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           placeholder="URL"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//         />
//         <button onClick={addBookmark}>Add</button>
//       </div>

//       {bookmarks.map((b) => (
//         <div key={b.id} style={{ marginBottom: 10 }}>
//           <a href={b.url} target="_blank">
//             {b.title}
//           </a>
//           <button onClick={() => deleteBookmark(b.id)}>❌</button>
//         </div>
//       ))}
//     </div>
//   );
// }

 
 




//  "use client";

// import { useEffect, useMemo, useState } from "react";
// import AppShell from "@/components/AppShell";
// import GlowCard from "@/components/GlowCard";
// import TopBar from "@/components/TopBar";
// import { useAuth } from "@/hooks/use-auth";
// import { useBookmarks } from "@/hooks/use-bookmarks";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Separator } from "@/components/ui/separator";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { ExternalLink, Plus, Trash2, Link as LinkIcon, Search, Sparkles, ShieldAlert, Inbox } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { Bookmark } from "@/types/bookmark";

// type AddFormValues = {
//   url: string;
//   title: string;
// };

// function normalizeUrl(u: string) {
//   const trimmed = u.trim();
//   if (!trimmed) return trimmed;
//   if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
//   return trimmed;
// }

// export default function Home() {
//   const { toast } = useToast();
//   const { user, loading: authLoading, logout } = useAuth();
//   const { bookmarks, addBookmark, deleteBookmark } = useBookmarks(user?.id);

//   const [query, setQuery] = useState("");
// useEffect(() => {
//   if (!loading && !user) {
//     router.replace("/landing");
//   }
// }, [user, loading, router]);

//   const form = useForm<AddFormValues>({
//     defaultValues: { url: "", title: "" },
//     mode: "onChange",
//   });

//   const items = useMemo(() => {
//     const list = bookmarks || [];
//     const q = query.trim().toLowerCase();
//     if (!q) return list;
//     return list.filter((b) => {
//       return (
//         b.title.toLowerCase().includes(q) ||
//         b.url.toLowerCase().includes(q)
//       );
//     });
//   }, [bookmarks, query]);

//   if (authLoading) {
//     return (
//       <AppShell className="pb-16">
//         <div className="pt-10">
//           <div className="flex items-center justify-between">
//             <Skeleton className="h-12 w-56 rounded-2xl" />
//             <Skeleton className="h-11 w-32 rounded-2xl" />
//           </div>
//           <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
//             <Skeleton className="h-64 rounded-3xl lg:col-span-5" />
//             <Skeleton className="h-64 rounded-3xl lg:col-span-7" />
//           </div>
//         </div>
//       </AppShell>
//     );
//   }

//   if (!user) return null;

//   return (
//     <AppShell className="pb-16">
//       <TopBar user={user} onLogout={logout} />

//       <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
//         <GlowCard className="p-5 sm:p-6 lg:col-span-5">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <div className="font-display text-xl">Add a bookmark</div>
//               <div className="mt-1 text-sm text-muted-foreground">
//                 Drop a URL and a title. We’ll keep it safe—and live-synced.
//               </div>
//             </div>
//             <div className="hidden sm:grid h-10 w-10 place-items-center rounded-2xl border border-border bg-card/70 shadow-sm backdrop-blur">
//               <Sparkles className="h-4 w-4 text-primary" />
//             </div>
//           </div>

//           <Separator className="my-5" />

//           <Form {...form}>
//             <form
//               className="space-y-4"
//               onSubmit={form.handleSubmit(async (values) => {
//                 try {
//                   await addBookmark(
//                     values.title.trim(),
//                     normalizeUrl(values.url)
//                   );
//                   form.reset({ url: "", title: "" });
//                   toast({
//                     title: "Saved",
//                     description: "Bookmark added to your private vault.",
//                   });
//                 } catch (e: any) {
//                   toast({
//                     title: "Couldn’t add bookmark",
//                     description: e.message,
//                     variant: "destructive",
//                   });
//                 }
//               })}
//             >
//               <FormField
//                 control={form.control}
//                 name="url"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>URL</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                         <Input className="h-12 rounded-2xl pl-10" {...field} />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="title"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Title</FormLabel>
//                     <FormControl>
//                       <Input className="h-12 rounded-2xl" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button type="submit" className="h-12 w-full rounded-2xl">
//                 <Plus className="mr-2 h-4 w-4" />
//                 Add bookmark
//               </Button>
//             </form>
//           </Form>
//         </GlowCard>

//         <GlowCard className="p-5 sm:p-6 lg:col-span-7">
//           <div className="flex justify-between">
//             <div>
//               <div className="font-display text-xl">Your bookmarks</div>
//               <div className="text-sm text-muted-foreground">
//                 Private to you. Updates instantly across tabs.
//               </div>
//             </div>

//             <div className="relative w-full sm:max-w-xs">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="h-11 rounded-2xl pl-10"
//               />
//             </div>
//           </div>

//           <Separator className="my-5" />

//           {items.length === 0 ? (
//             <div className="grid place-items-center p-10">
//               <Inbox className="h-8 w-8 text-primary" />
//               <div>No bookmarks yet</div>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {items.map((b: Bookmark) => (
//                 <div key={b.id} className="rounded-3xl border p-4">
//                   <div className="flex justify-between">
//                     <div>
//                       <a href={b.url} target="_blank" className="font-semibold">
//                         {b.title}
//                         <ExternalLink className="inline h-4 w-4 ml-2" />
//                       </a>
//                       <div className="text-xs text-muted-foreground">
//                         Added {format(new Date(b.created_at), "MMM d, yyyy")}
//                       </div>
//                     </div>

//                     <AlertDialog>
//                       <AlertDialogTrigger asChild>
//                         <Button variant="secondary">
//                           <Trash2 className="h-4 w-4 text-destructive" />
//                         </Button>
//                       </AlertDialogTrigger>

//                       <AlertDialogContent>
//                         <AlertDialogHeader>
//                           <AlertDialogTitle>Delete bookmark?</AlertDialogTitle>
//                         </AlertDialogHeader>
//                         <AlertDialogFooter>
//                           <AlertDialogCancel>Cancel</AlertDialogCancel>
//                           <AlertDialogAction
//                             onClick={() => deleteBookmark(b.id)}
//                           >
//                             Delete
//                           </AlertDialogAction>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </GlowCard>
//       </div>
//     </AppShell>
//   );
// }
