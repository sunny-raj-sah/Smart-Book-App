import { Bookmark } from "lucide-react";

export default function BrandMark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 blur-md" />
        <div className="relative grid h-11 w-11 place-items-center rounded-2xl border border-border bg-card shadow-sm">
          <Bookmark className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div className="leading-tight">
        <div className="font-display text-base tracking-tight text-foreground">
          Atlasmarks
        </div>
        <div className="text-xs text-muted-foreground">
          Private, live-synced bookmarks
        </div>
      </div>
    </div>
  );
}
