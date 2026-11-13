"use no memo";
"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRoomStore } from "@/components/room/state/room-store";
import { GltfModel } from "../interactive-object";

/** Ceiling fan whose blades spin once it has been "activated" (visited). */
export function SpinningFan({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const spinning = useRoomStore((s) => s.visited.has("ceilingfan"));
  useFrame((_, dt) => {
    if (ref.current && spinning) ref.current.rotation.y += dt * 6;
  });
  return (
    <group ref={ref} position={position}>
      <GltfModel id="ceiling-fan" />
    </group>
  );
}
