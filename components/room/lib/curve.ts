import * as THREE from "three";
import type { Vec3 } from "@/components/room/content/objects";
import type { StationId } from "@/components/room/state/room-store";

export function buildCurve(points: Vec3[]): THREE.CatmullRomCurve3 {
  return new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(p.x, p.y, p.z)),
    false,
    "catmullrom",
    0.5,
  );
}

export function sampleAt(curve: THREE.CatmullRomCurve3, t: number): THREE.Vector3 {
  const clamped = Math.min(1, Math.max(0, t));
  return curve.getPointAt(clamped);
}

/**
 * Arc-length fraction (0..1) of each control point along the curve, found by
 * nearest-sample search over an arc-length-spaced tessellation.
 */
export function computeControlOffsets(
  curve: THREE.CatmullRomCurve3,
  points: Vec3[],
  samples = 512,
): number[] {
  const spaced = curve.getSpacedPoints(samples); // samples+1 arc-equidistant points
  return points.map((p) => {
    let bestIdx = 0;
    let bestDist = Infinity;
    for (let i = 0; i <= samples; i++) {
      const dx = spaced[i].x - p.x;
      const dy = spaced[i].y - p.y;
      const dz = spaced[i].z - p.z;
      const d = dx * dx + dy * dy + dz * dz;
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    return bestIdx / samples;
  });
}

export interface OffsetEntry {
  id: StationId;
  offset: number;
}

export function nearestStation(
  offset: number,
  entries: OffsetEntry[],
  threshold = 0.08,
): StationId | null {
  let best: OffsetEntry | null = null;
  let bestDist = Infinity;
  for (const e of entries) {
    const d = Math.abs(e.offset - offset);
    if (d < bestDist) {
      bestDist = d;
      best = e;
    }
  }
  return best && bestDist <= threshold ? best.id : null;
}
