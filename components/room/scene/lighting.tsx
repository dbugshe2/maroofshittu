"use client";
import { useRoomStore } from "@/components/room/state/room-store";

export interface LightingSettings {
  ambient: number;
  ambientColor: string;
  keyIntensity: number;
  keyColor: string;
}

export function lightingConfig(mode: "day" | "night"): LightingSettings {
  return mode === "day"
    ? { ambient: 0.7, ambientColor: "#e8ecff", keyIntensity: 1.4, keyColor: "#fff6e0" }
    : { ambient: 0.18, ambientColor: "#2a2440", keyIntensity: 0.5, keyColor: "#ffb26b" };
}

export function Lighting({ quality }: { quality: "high" | "med" | "low" }) {
  const mode = useRoomStore((s) => s.lighting);
  const c = lightingConfig(mode);
  const castShadow = quality === "high";
  return (
    <>
      <hemisphereLight intensity={c.ambient} color={c.ambientColor} groundColor="#3a2f24" />
      <directionalLight
        position={[4, 7, 3]}
        intensity={c.keyIntensity}
        color={c.keyColor}
        castShadow={castShadow}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {mode === "night" && (
        <pointLight position={[2.6, 1.4, -3.2]} intensity={0.8} color="#ffd9a0" distance={6} />
      )}
    </>
  );
}
