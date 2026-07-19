"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

/** Minimal scene; lighting/models/camera added in Tasks 10–13. */
export default function RoomScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.6, 5], fov: 55 }}
      className="!fixed inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#d9cbb0" />
        </mesh>
      </Suspense>
    </Canvas>
  );
}
