import { describe, it, expect } from "vitest";

describe("test infra", () => {
  it("runs and has jest-dom matchers", () => {
    const el = document.createElement("div");
    el.textContent = "ok";
    expect(el).toHaveTextContent("ok");
  });
});
