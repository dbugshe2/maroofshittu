"use client";
import { useProgress } from "@react-three/drei";

/** Branded Suspense loader shown while GLBs stream in. */
export function RoomLoader() {
  const { progress, active } = useProgress();
  const show = active || (progress > 0 && progress < 100);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-20 grid place-items-center bg-background">
      <div className="w-64 border-2 border-border bg-card p-6 shadow-[4px_4px_0px_0px_var(--border)]">
        <p className="mb-3 font-mono text-sm text-foreground">entering my room…</p>
        <div className="h-3 w-full border-2 border-border">
          <div
            className="h-full bg-primary transition-[width] duration-200"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>
        <p className="mt-2 text-right font-mono text-xs text-muted-foreground">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
