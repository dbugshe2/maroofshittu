"use client";
import Link from "next/link";
import { useRoomStore } from "@/components/room/state/room-store";
import { interactiveObjects } from "@/components/room/content/objects";
import { getTour } from "@/components/room/lib/tour";

const TOTAL = interactiveObjects.length;

export function RoomHud() {
  const visited = useRoomStore((s) => s.visited);
  const lighting = useRoomStore((s) => s.lighting);
  const toggleLighting = useRoomStore((s) => s.toggleLighting);
  const requestJumpTo = useRoomStore((s) => s.requestJumpTo);
  const openPanel = useRoomStore((s) => s.openObjectPanel);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 select-none">
      {/* top bar */}
      <div className="pointer-events-auto absolute left-4 top-4 flex items-center gap-3">
        <Link
          href="/"
          className="border-2 border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground shadow-[3px_3px_0px_0px_var(--border)] hover:-translate-y-0.5 transition-transform"
        >
          ← exit
        </Link>
        <span className="border-2 border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground shadow-[3px_3px_0px_0px_var(--border)]">
          {visited.size} / {TOTAL} explored
        </span>
      </div>

      {/* top-right controls */}
      <div className="pointer-events-auto absolute right-4 top-4 flex items-center gap-2">
        <button
          onClick={toggleLighting}
          aria-label="Toggle lights"
          className="border-2 border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground shadow-[3px_3px_0px_0px_var(--border)] hover:-translate-y-0.5 transition-transform"
        >
          {lighting === "day" ? "🌙 night" : "☀️ day"}
        </button>
        <button
          onClick={() => openPanel("bookcase")}
          className="border-2 border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground shadow-[3px_3px_0px_0px_var(--border)] hover:-translate-y-0.5 transition-transform"
        >
          about
        </button>
      </div>

      {/* bottom section nav */}
      <nav
        aria-label="Jump to area"
        className="pointer-events-auto absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-wrap justify-center gap-2 px-4"
      >
        {getTour().stationEntries.map((s) => (
          <button
            key={s.id}
            onClick={() => requestJumpTo(s.offset)}
            className="border-2 border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground shadow-[3px_3px_0px_0px_var(--border)] hover:-translate-y-0.5 transition-transform"
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* scroll hint */}
      <p className="absolute bottom-16 left-1/2 -translate-x-1/2 font-mono text-[11px] text-muted-foreground">
        scroll to wander · click things
      </p>
    </div>
  );
}
