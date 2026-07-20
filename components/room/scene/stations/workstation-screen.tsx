"use no memo";
"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRoomStore } from "@/components/room/state/room-store";

/** A softly pulsing emissive plane sitting over the monitor face. */
export function WorkstationScreen({ position }: { position: [number, number, number] }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const lighting = useRoomStore((s) => s.lighting);
  useFrame((state) => {
    if (!mat.current) return;
    const base = lighting === "night" ? 0.9 : 0.4;
    mat.current.emissiveIntensity = base + Math.sin(state.clock.elapsedTime * 2) * 0.08;
  });
  return (
    <mesh position={position}>
      <planeGeometry args={[0.5, 0.32]} />
      <meshStandardMaterial ref={mat} color="#0b1e2b" emissive="#57c7ff" emissiveIntensity={0.5} />
    </mesh>
  );
}
