// import { useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { LogOut, Sparkles } from "lucide-react";
// import BrandMark from "@/components/BrandMark";
// import type { User } from "@shared/models/auth";

// function initials(user: User) {
//   const a = (user.firstName || "").trim();
//   const b = (user.lastName || "").trim();
//   const base = `${a} ${b}`.trim();
//   if (base) {
//     return base
//       .split(/\s+/)
//       .slice(0, 2)
//       .map((p) => p[0]?.toUpperCase())
//       .join("");
//   }
//   const email = (user.email || "").trim();
//   return (email ? email[0] : "U").toUpperCase();
// }

// export default function TopBar({ user }: { user: User }) {
//   const name = useMemo(() => {
//     const full = `${user.firstName || ""} ${user.lastName || ""}`.trim();
//     return full || user.email || "You";
//   }, [user.email, user.firstName, user.lastName]);

//   return (
//     <div className="pt-8 sm:pt-10">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <BrandMark />

//         <div className="flex items-center justify-between gap-3 sm:justify-end">
//           <div className="hidden sm:flex items-center gap-3 rounded-2xl border border-border bg-card/70 px-3 py-2 shadow-sm backdrop-blur">
//             <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary/12 to-accent/10">
//               <Sparkles className="h-4 w-4 text-primary" />
//             </div>
//             <div className="leading-tight">
//               <div className="text-sm font-semibold text-foreground">
//                 {name}
//               </div>
//               <div className="text-xs text-muted-foreground">
//                 Signed in
//               </div>
//             </div>
//             <Avatar className="h-8 w-8">
//               <AvatarImage src={user.profileImageUrl || undefined} alt={name} />
//               <AvatarFallback>{initials(user)}</AvatarFallback>
//             </Avatar>
//           </div>

//           <Button
//             data-testid="button-logout"
//             variant="secondary"
//             className="rounded-2xl border border-border bg-card/70 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
//             onClick={() => {
//               window.location.href = "/api/logout";
//             }}
//           >
//             <LogOut className="mr-2 h-4 w-4" />
//             Logout
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { Button } from "@/components/ui/button";
import { LogOut, Sparkles } from "lucide-react";
import BrandMark from "@/components/BrandMark";

export default function TopBar({
  user,
  onLogout,
}: {
  user: any;
  onLogout: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <BrandMark />

      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          {user?.email}
        </div>

        <Button variant="secondary" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
