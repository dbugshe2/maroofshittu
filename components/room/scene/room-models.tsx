"use client";
import { interactiveObjects, ambientObjects } from "@/components/room/content/objects";
import { GltfModel, InteractiveObject } from "./interactive-object";
import { WorkstationScreen } from "./stations/workstation-screen";
import { PolaroidPhotos } from "./stations/polaroid-wall";
import { SpinningFan } from "./stations/ceiling-fan";

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
      <WorkstationScreen position={[2.6, 1.15, -3.55]} />
      <PolaroidPhotos origin={[-1, 1.75, -3.85]} />
      <SpinningFan position={[0, 3.4, 0]} />
    </group>
  );
}
