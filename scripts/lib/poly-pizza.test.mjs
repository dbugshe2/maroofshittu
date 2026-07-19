import { describe, it, expect } from "vitest";
import { extractModelShortIds, extractModelInfo, pickBest } from "./poly-pizza.mjs";

describe("poly-pizza helpers", () => {
  it("extracts unique /m/ short ids from bundle html", () => {
    const html = `x "url":"\\u002Fm\\u002FJuTzNjtD54" y /m/9QpPhjLcMV z /m/JuTzNjtD54`;
    expect(extractModelShortIds(html).sort()).toEqual(["9QpPhjLcMV", "JuTzNjtD54"]);
  });

  it("extracts glb url, name and license from model html", () => {
    const html = `
      <meta property="og:title" content="Bed Double" />
      ...https://static.poly.pizza/7c257cc3-8ade-4813-86c2-82615b4c8eda.glb...
      ...https://static.poly.pizza/7c257cc3-8ade-4813-86c2-82615b4c8eda.glb.br...
      <span>CC0</span>`;
    const info = extractModelInfo(html);
    expect(info.name).toBe("Bed Double");
    expect(info.glbUrl).toBe("https://static.poly.pizza/7c257cc3-8ade-4813-86c2-82615b4c8eda.glb");
    expect(info.license).toBe("CC0");
  });

  it("pickBest matches by name case-insensitively", () => {
    const cands = [
      { name: "Desk", author: "dook" },
      { name: "Desk", author: "Quaternius" },
    ];
    expect(pickBest(cands, { name: "desk", author: "Quaternius" }).author).toBe("Quaternius");
    expect(pickBest(cands, { name: "desk" }).name).toBe("Desk");
    expect(pickBest(cands, { name: "chair" })).toBeNull();
  });
});
