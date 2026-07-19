import { describe, it, expect } from "vitest";
import { cursorFor } from "./interactive-object";

describe("cursorFor", () => {
  it("is pointer when hovered and interactive", () => {
    expect(cursorFor(true)).toBe("pointer");
  });
  it("is auto when not hovered", () => {
    expect(cursorFor(false)).toBe("auto");
  });
});
