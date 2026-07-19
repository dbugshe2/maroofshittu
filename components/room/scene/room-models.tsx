"use client";
import { interactiveObjects, ambientObjects } from "@/components/room/content/objects";
import { GltfModel, InteractiveObject } from "./interactive-object";

export function RoomModels() {
  return (
    <group>
      {ambientObjects.map((a, i) => (
        <group
          key={i}
          position={[a.transform.position.x, a.transform.position.y, a.transform.position.z]}
          rotation={[0, a.transform.rotationY ?? 0, 0]}
          scale={a.transform.scale ?? 1}
        >
          {a.models.map((m) => (
            <GltfModel key={m} id={m} />
          ))}
        </group>
      ))}
      {interactiveObjects.map((o) => (
        <InteractiveObject key={o.id} obj={o} />
      ))}
    </group>
  );
}
