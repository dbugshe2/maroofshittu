import { describe, it, expect } from "vitest";
import { lockScroll } from "./scroll-lock";

describe("lockScroll", () => {
  it("locks the element and restores its prior overflow", () => {
    const el = document.createElement("div");
    el.style.overflow = "auto";
    const restore = lockScroll(el);
    expect(el.style.overflow).toBe("hidden");
    restore();
    expect(el.style.overflow).toBe("auto");
  });

  it("restores an initially empty overflow", () => {
    const el = document.createElement("div");
    const restore = lockScroll(el);
    expect(el.style.overflow).toBe("hidden");
    restore();
    expect(el.style.overflow).toBe("");
  });
});
