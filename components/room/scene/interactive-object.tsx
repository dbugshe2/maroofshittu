"use no memo";
"use client";
import { useState, useCallback } from "react";
import { useGLTF, Html, Outlines } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { ASSETS, type AssetId } from "@/components/room/content/assets";
import type { InteractiveObject as IObj } from "@/components/room/content/objects";
import { useRoomStore } from "@/components/room/state/room-store";

export function cursorFor(hovered: boolean): "pointer" | "auto" {
  return hovered ? "pointer" : "auto";
}

/** Loads and renders a single GLB by AssetId at the origin of its parent group. */
export function GltfModel({ id }: { id: AssetId }) {
  const { scene } = useGLTF(ASSETS[id].file);
  // clone so the same GLB can be reused if referenced twice
  return <primitive object={scene.clone()} />;
}

function toTransform(t: IObj["transform"]) {
  return {
    position: [t.position.x, t.position.y, t.position.z] as [number, number, number],
    rotation: [0, t.rotationY ?? 0, 0] as [number, number, number],
    scale: t.scale ?? 1,
  };
}

export function InteractiveObject({ obj }: { obj: IObj }) {
  const [hovered, setHovered] = useState(false);
  const openObjectPanel = useRoomStore((s) => s.openObjectPanel);
  const toggleLighting = useRoomStore((s) => s.toggleLighting);
  const markVisited = useRoomStore((s) => s.markVisited);
  const reducedMotion = useRoomStore((s) => s.reducedMotion);
  const t = toTransform(obj.transform);

  const activate = useCallback(
    (e?: ThreeEvent<MouseEvent>) => {
      e?.stopPropagation();
      if (obj.panel) {
        openObjectPanel(obj.id);
      } else if (obj.action === "toggleLighting") {
        toggleLighting();
        markVisited(obj.id);
      } else if (obj.action === "spin") {
        markVisited(obj.id);
        // fan spin handled by store visited + ceilingfan component in Task 13
      }
    },
    [obj, openObjectPanel, toggleLighting, markVisited],
  );

  return (
    <group position={t.position} rotation={t.rotation} scale={t.scale}>
      <group
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={activate}
      >
        {obj.models.map((m) => (
          <GltfModel key={m} id={m} />
        ))}
        {hovered && <Outlines thickness={4} color="#111" />}
      </group>

      {obj.hotspot && (
        <Html
          position={[
            obj.hotspot.x - obj.transform.position.x,
            obj.hotspot.y - obj.transform.position.y,
            obj.hotspot.z - obj.transform.position.z,
          ]}
          center
          distanceFactor={8}
          occlude
        >
          <button
            onClick={() => activate()}
            className="pointer-events-auto whitespace-nowrap border-2 border-border bg-card px-2 py-1 font-mono text-[10px] text-foreground shadow-[3px_3px_0px_0px_var(--border)] transition-transform hover:-translate-y-0.5"
            style={{ opacity: hovered ? 1 : 0.85, transition: reducedMotion ? "none" : undefined }}
          >
            {obj.label}
          </button>
        </Html>
      )}
    </group>
  );
}

// Preload all interactive + ambient GLBs.
Object.values(ASSETS).forEach((a) => useGLTF.preload(a.file));
