import { describe, it, expect } from "vitest";
import { extractModelShortIds, extractModelInfo, pickBest } from "./poly-pizza.mjs";

describe("poly-pizza helpers", () => {
  it("extracts unique /m/ short ids from bundle html", () => {
    const html = `x "url":"\\u002Fm\\u002FJuTzNjtD54" y /m/9QpPhjLcMV z /m/JuTzNjtD54`;
    expect(extractModelShortIds(html).sort()).toEqual(["9QpPhjLcMV", "JuTzNjtD54"]);
  });

  // Real poly.pizza public ids sometimes contain hyphens/underscores (e.g. "1xBl-8de6b0",
  // "9Ptsg_xZt6B"); a bundle page live-fetched during Step 2 showed these get silently
  // dropped or truncated by an alphanumeric-only id regex, which drops real models from
  // the bundle index. Confirmed against https://poly.pizza/bundle/The-Office-Pack-UGIy7YcQP9.
  it("extracts /m/ short ids containing hyphens and underscores", () => {
    const html = `"url":"\\u002Fm\\u002F1xBl-8de6b0" "url":"\\u002Fm\\u002F9Ptsg_xZt6B"`;
    expect(extractModelShortIds(html).sort()).toEqual(["1xBl-8de6b0", "9Ptsg_xZt6B"]);
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

  // Real model pages' og:title is "<Name> - Free Model By <Author>", not the bare name
  // (e.g. https://poly.pizza/m/JuTzNjtD54 has content="Door - Free Model By Quaternius").
  // Matching that verbatim against MANIFEST display names would never resolve. The page
  // also embeds the bare name in a `"Title":"..."` JSON blob (window.__SERVER_APP_STATE__),
  // which is a raw JS string literal with \uXXXX escapes (not JSON.parsed), so a slash in
  // the name shows up as / and must be unescaped.
  it("prefers the bare JSON Title over the suffixed og:title, and unescapes \\uXXXX", () => {
    const html = `<meta property="og:title" content="Laptop / MacBook Pro - Free Model By Alex Safayan"/>
      window.__SERVER_APP_STATE__ = {"initialData":{"model":{"Title":"Laptop \\u002F MacBook Pro"}}};
      <a href="/u/Alex Safayan">Alex Safayan</a>`;
    expect(extractModelInfo(html).name).toBe("Laptop / MacBook Pro");
  });

  it("extracts the author from model html", () => {
    const html = `<meta property="og:title" content="Bed Double" />
      <a href="/u/Quaternius" class="author">Quaternius</a>`;
    expect(extractModelInfo(html).author).toBe("Quaternius");
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
