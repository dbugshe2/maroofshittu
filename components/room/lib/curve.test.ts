import { describe, it, expect } from "vitest";
import { buildCurve, sampleAt, computeControlOffsets, nearestStation } from "./curve";
import { getTour } from "./tour";
import { tourPoints, stations } from "@/components/room/content/objects";

describe("curve lib", () => {
  it("samples endpoints at t=0 and t=1", () => {
    const curve = buildCurve(tourPoints);
    const start = sampleAt(curve, 0);
    const end = sampleAt(curve, 1);
    expect(start.x).toBeCloseTo(tourPoints[0].x, 3);
    expect(end.x).toBeCloseTo(tourPoints[tourPoints.length - 1].x, 3);
  });

  it("clamps t outside [0,1]", () => {
    const curve = buildCurve(tourPoints);
    expect(sampleAt(curve, -1).x).toBeCloseTo(tourPoints[0].x, 3);
    expect(sampleAt(curve, 2).x).toBeCloseTo(tourPoints[tourPoints.length - 1].x, 3);
  });

  it("computeControlOffsets returns ascending offsets in [0,1]", () => {
    const curve = buildCurve(tourPoints);
    const offsets = computeControlOffsets(curve, tourPoints);
    expect(offsets.length).toBe(tourPoints.length);
    expect(offsets[0]).toBeCloseTo(0, 2);
    expect(offsets[offsets.length - 1]).toBeCloseTo(1, 2);
    for (let i = 1; i < offsets.length; i++) {
      expect(offsets[i]).toBeGreaterThan(offsets[i - 1]);
    }
  });
});

describe("tour", () => {
  it("station entries come after the intro, ascending, with labels", () => {
    const { introEnd, stationEntries } = getTour();
    expect(stationEntries.length).toBe(stations.length);
    expect(introEnd).toBeGreaterThan(0);
    expect(stationEntries[0].offset).toBeGreaterThan(introEnd);
    for (let i = 1; i < stationEntries.length; i++) {
      expect(stationEntries[i].offset).toBeGreaterThan(stationEntries[i - 1].offset);
    }
    expect(stationEntries.map((s) => s.id)).toEqual(stations.map((s) => s.id));
    expect(stationEntries[0].label).toBe(stations[0].label);
  });

  it("nearestStation finds the closest entry within threshold", () => {
    const { stationEntries } = getTour();
    const bookcase = stationEntries.find((s) => s.id === "bookcase")!;
    expect(nearestStation(bookcase.offset + 0.01, stationEntries, 0.06)).toBe("bookcase");
    const a = stationEntries[1].offset;
    const b = stationEntries[2].offset;
    expect(nearestStation((a + b) / 2, stationEntries, 0.005)).toBeNull();
  });
});
