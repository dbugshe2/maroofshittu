import type * as THREE from "three";
import { buildCurve, computeControlOffsets } from "./curve";
import { introPath, stations, tourPoints, type Vec3 } from "@/components/room/content/objects";
import type { StationId } from "@/components/room/state/room-store";

export interface StationEntry {
  id: StationId;
  label: string;
  offset: number; // derived arc-length fraction along the tour spline
  cameraPos: Vec3;
  lookAt: Vec3;
}

export interface Tour {
  curve: THREE.CatmullRomCurve3;
  introEnd: number; // offset where the overhead dive-in ends (last intro keyframe)
  stationEntries: StationEntry[];
}

let cached: Tour | null = null;

/** Builds the tour spline once and derives station offsets from arc length. */
export function getTour(): Tour {
  if (cached) return cached;
  const curve = buildCurve(tourPoints);
  const offsets = computeControlOffsets(curve, tourPoints);
  cached = {
    curve,
    introEnd: offsets[introPath.length - 1],
    stationEntries: stations.map((s, i) => ({
      id: s.id,
      label: s.label,
      offset: offsets[introPath.length + i],
      cameraPos: s.cameraPos,
      lookAt: s.lookAt,
    })),
  };
  return cached;
}
