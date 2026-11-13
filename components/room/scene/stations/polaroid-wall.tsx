"use client";
import { useTexture } from "@react-three/drei";
import { roomContent } from "@/components/room/content/room-content";

/** Renders gallery images as small framed planes on the wall. */
export function PolaroidPhotos({ origin }: { origin: [number, number, number] }) {
  const imgs = roomContent.gallery.map((g) => g.src);
  const textures = useTexture(imgs);
  const list = Array.isArray(textures) ? textures : [textures];
  return (
    <group position={origin}>
      {list.map((tex, i) => (
        <mesh key={i} position={[(i - (list.length - 1) / 2) * 0.5, 0, 0.02]}>
          <planeGeometry args={[0.4, 0.4]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
