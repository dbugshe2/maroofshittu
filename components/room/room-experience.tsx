"use client";
import { useEffect } from "react";
import { useWebGLSupport } from "./hooks/use-webgl-support";
import { useQualityTier } from "./hooks/use-quality-tier";
import { useRoomStore } from "./state/room-store";
import { Fallback2D } from "./ui/fallback-2d";
import { RoomLoader } from "./ui/loader";
import RoomScene from "./scene/room-scene";

export default function RoomExperience() {
  const supported = useWebGLSupport();
  const quality = useQualityTier();
  const setQuality = useRoomStore((s) => s.setQuality);
  const setReducedMotion = useRoomStore((s) => s.setReducedMotion);

  useEffect(() => setQuality(quality), [quality, setQuality]);
  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [setReducedMotion]);

  if (supported === null) {
    return <div className="fixed inset-0 bg-background" aria-hidden />;
  }
  if (!supported) return <Fallback2D />;

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      <RoomLoader />
      <RoomScene />
      {/* HUD + overlays added in Tasks 14–15 */}
    </div>
  );
}
