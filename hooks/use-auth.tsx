// hooks/use-auth.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get user on first load
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:`${window.location.origin}/home`,
      },
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return { user, loading, loginWithGoogle, logout };
}

// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase/client";

// const AuthContext = createContext<any>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   // 1. Get session on first load
//   //   supabase.auth.getSession().then(({ data }) => {
//   //     console.log("SESSION:", data.session);
//   //     setUser(data.session?.user ?? null);
//   //     setLoading(false);
//   //   });

//   //   // 2. Listen to auth changes
//   //   const { data: listener } = supabase.auth.onAuthStateChange(
//   //     (_event, session) => {
//   //       console.log("AUTH CHANGE:", session);
//   //       setUser(session?.user ?? null);
//   //     }
//   //   );

//   //   return () => {
//   //     listener.subscription.unsubscribe();
//   //   };
//   // }, []);

//   const loginWithGoogle = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo:"http://localhost:3000/home",
//       },
//     });
//   };

//   const logout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);


// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase/client";
// import type { User } from "@supabase/supabase-js";

// type AuthContextType = {
//   user: User | null;
//   loading: boolean;
//   loginWithGoogle: () => Promise<void>;
//   logout: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null);
//       setLoading(false);
//     });

//     const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const loginWithGoogle = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: { redirectTo: `${window.location.origin}/home` },
//     });
//   };

//   const logout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// }





// // // "use client";

// // "use client";

// // import { createContext, useContext, useEffect, useState } from "react";
// // import { supabase } from "@/lib/supabase/client";
// // import type { User } from "@supabase/supabase-js";

// // type AuthContextType = {
// //   user: User | null;
// //   loading: boolean;
// //   loginWithGoogle: () => Promise<void>;
// //   logout: () => Promise<void>;
// // };

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export function AuthProvider({ children }: { children: React.ReactNode }) {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Get session on load (after redirect)
// //     supabase.auth.getSession().then(({ data: { session } }) => {
// //       setUser(session?.user ?? null);
// //       setLoading(false);
// //     });

// //     // Listen to changes
// //     const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
// //       setUser(session?.user ?? null);
// //     });

// //     return () => {
// //       subscription.unsubscribe();
// //     };
// //   }, []);

// //   const loginWithGoogle = async () => {
// //     await supabase.auth.signInWithOAuth({
// //       provider: "google",
// //       options: {
// //         redirectTo: `${window.location.origin}/home`, // After login redirect
// //       },
// //     });
// //   };

// //   const logout = async () => {
// //     await supabase.auth.signOut();
// //     setUser(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   const ctx = useContext(AuthContext);
// //   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
// //   return ctx;
// // }


// // // import { createContext, useContext, useEffect, useState } from "react";
// // // import { supabase } from "@/lib/supabase/client";
// // // import type { User } from "@supabase/supabase-js";

// // // type AuthContextType = {
// // //   user: User | null;
// // //   loading: boolean;
// // //   loginWithGoogle: () => Promise<void>;
// // //   logout: () => Promise<void>;
// // // };

// // // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // // export function AuthProvider({ children }: { children: React.ReactNode }) {
// // //   const [user, setUser] = useState<User | null>(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     supabase.auth.getUser().then(({ data }) => {
// // //       setUser(data.user ?? null);
// // //       setLoading(false);
// // //     });

// // //     const {
// // //       data: { subscription },
// // //     } = supabase.auth.onAuthStateChange((_event, session) => {
// // //       setUser(session?.user ?? null);
// // //     });

// // //     return () => subscription.unsubscribe();
// // //   }, []);

// // //   const loginWithGoogle = async () => {
// // //     await supabase.auth.signInWithOAuth({
// // //       provider: "google",
// // //       options: {
// // //         redirectTo: `${window.location.origin}/auth/callback`,
// // //       },
// // //     });
// // //   };

// // //   const logout = async () => {
// // //     await supabase.auth.signOut();
// // //     setUser(null);
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // }

// // // export function useAuth() {
// // //   const ctx = useContext(AuthContext);
// // //   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
// // //   return ctx;
// // // }


 
