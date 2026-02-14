// "use client";

// import { useAuth } from "@/hooks/use-auth";

// export default function Landing() {
//   const { loginWithGoogle } = useAuth();

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <button
//         onClick={loginWithGoogle}
//         className="px-6 py-3 bg-black text-white rounded"
//       >
//         Sign in with Google
//       </button>
//     </div>
//   );
// }



 



 "use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import AppShell from "@/components/AppShell";
import GlowCard from "@/components/GlowCard";
import BrandMark from "@/components/BrandMark";
import { Button } from "@/components/ui/button";

import { ArrowRight, Lock, Zap, Globe } from "lucide-react";


export default function Landing() {
   const { loginWithGoogle } = useAuth();
   const router = useRouter();

  return (
    <AppShell className="pb-16">
      <div className="fade-in-up pt-10 sm:pt-12 lg:pt-16">
        <div className="flex items-center justify-between">
          <BrandMark />
          <Button
            data-testid="button-login"
            onClick={loginWithGoogle}
            className="rounded-2xl px-5 py-5 shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
          >
            Sign in with Google
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_0_4px_hsl(var(--accent)/0.12)]" />
              Free. Private. Realtime.
            </div>

            <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              A smart bookmark vault that{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                updates live
              </span>
              .
            </h1>

            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Save links with clean titles, keep them private to your account,
              and watch them appear instantly across tabs—no refresh, no fuss.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                data-testid="button-login"
                onClick= {loginWithGoogle}
                className="h-12 rounded-2xl px-6 shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
              >
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="text-sm text-muted-foreground">
                Google OAuth only • no passwords stored
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <GlowCard className="p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-lg">Why you’ll love it</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Minimal surface, maximal clarity.
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur">
                  Live sync
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background/40 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background/60 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10">
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        Private by default
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Only you can see your list.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-background/40 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background/60 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Realtime updates</div>
                      <div className="text-xs text-muted-foreground">
                        Add in one tab, see it in another.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-background/40 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background/60 hover:shadow-md sm:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold">
                          Clean, fast capture
                        </div>
                        <div className="hidden sm:block text-xs text-muted-foreground">
                          URL + title
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Drop a link, name it, and keep moving. Everything stays
                        crisp and searchable.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-card/60 p-4 text-sm text-muted-foreground shadow-sm backdrop-blur">
                Tip: open two tabs, add a bookmark in one, and watch it appear in
                the other.
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
