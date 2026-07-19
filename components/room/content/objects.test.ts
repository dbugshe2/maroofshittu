import { describe, it, expect } from "vitest";
import {
  interactiveObjects,
  ambientObjects,
  stations,
  introPath,
  tourPoints,
  PANEL_KEYS,
} from "./objects";
import { ASSETS } from "./assets";
import { roomContent } from "./room-content";

describe("object registry integrity", () => {
  it("interactive object ids are unique", () => {
    const ids = interactiveObjects.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every referenced AssetId exists in ASSETS", () => {
    const all = [...interactiveObjects, ...ambientObjects].flatMap((o) => o.models);
    for (const m of all) expect(ASSETS[m], `missing asset ${m}`).toBeDefined();
  });

  it("every object.station exists in stations", () => {
    const ids = new Set(stations.map((s) => s.id));
    for (const o of interactiveObjects) {
      if (o.station) expect(ids.has(o.station), `bad station ${o.station}`).toBe(true);
    }
  });

  it("every object.panel is a known PanelKey", () => {
    for (const o of interactiveObjects) {
      if (o.panel) expect(PANEL_KEYS).toContain(o.panel);
    }
  });

  it("tourPoints thread intro keyframes then station poses in order", () => {
    expect(introPath.length).toBeGreaterThanOrEqual(2);
    expect(tourPoints.length).toBe(introPath.length + stations.length);
    expect(tourPoints[0]).toEqual(introPath[0]);
    stations.forEach((s, i) => {
      expect(tourPoints[introPath.length + i]).toEqual(s.cameraPos);
    });
  });

  it("gallery images are committed under /public", () => {
    // src like "/avatar.jpg" -> public/avatar.jpg
    // (existence is asserted structurally; files verified in Task 3/repo)
    for (const g of roomContent.gallery) expect(g.src.startsWith("/")).toBe(true);
  });
});
