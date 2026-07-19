import { describe, it, expect } from "vitest";
import { lightingConfig } from "./lighting";

describe("lightingConfig", () => {
  it("day is brighter than night", () => {
    expect(lightingConfig("day").keyIntensity).toBeGreaterThan(
      lightingConfig("night").keyIntensity,
    );
  });
  it("night is warm and dim", () => {
    const n = lightingConfig("night");
    expect(n.ambient).toBeLessThan(lightingConfig("day").ambient);
  });
});
