"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ContactShadows } from "@react-three/drei";
import { useRoomStore } from "@/components/room/state/room-store";
import { RoomShell } from "./room-shell";
import { Lighting } from "./lighting";

export default function RoomScene() {
  const quality = useRoomStore((s) => s.quality);
  return (
    <Canvas
      shadows={quality === "high"}
      dpr={quality === "low" ? [1, 1.25] : [1, 2]}
      camera={{ position: [0, 1.6, 5], fov: 55 }}
      className="!fixed inset-0"
    >
      <color attach="background" args={["#1b1726"]} />
      <Suspense fallback={null}>
        <Lighting quality={quality} />
        <RoomShell />
        <ContactShadows position={[0, 0.01, 0]} opacity={0.4} scale={12} blur={2} far={4} />
      </Suspense>
    </Canvas>
  );
}
