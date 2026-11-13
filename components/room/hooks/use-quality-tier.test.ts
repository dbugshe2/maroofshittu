import { describe, it, expect } from "vitest";
import { computeQualityTier } from "./use-quality-tier";

describe("computeQualityTier", () => {
  it("returns low for coarse-pointer low-core devices", () => {
    expect(computeQualityTier({ cores: 4, coarsePointer: true, dpr: 3 })).toBe("low");
  });
  it("returns med for mid devices", () => {
    expect(computeQualityTier({ cores: 8, coarsePointer: true, dpr: 2 })).toBe("med");
  });
  it("returns high for desktop", () => {
    expect(computeQualityTier({ cores: 12, coarsePointer: false, dpr: 2 })).toBe("high");
  });
});
