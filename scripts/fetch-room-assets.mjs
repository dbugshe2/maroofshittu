// One-time downloader: resolves requested items from two Poly Pizza bundles,
// downloads GLBs to public/models/room, writes assets.ts + CREDITS.md.
import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { extractModelShortIds, extractModelInfo, pickBest } from "./lib/poly-pizza.mjs";

const BUNDLES = {
  furniture: "https://poly.pizza/bundle/Furniture-Pack-pgvx8Zkq8v",
  office: "https://poly.pizza/bundle/The-Office-Pack-UGIy7YcQP9",
};

// requested items: assetId, display name (matches Poly Pizza), bundle, author, license
const MANIFEST = [
  ["bookcase-books", "Bookcase with Books", "furniture", "Quaternius", "CC0"],
  ["bed-double", "Bed Double", "furniture", "Quaternius", "CC0"],
  ["night-stand", "Night Stand", "furniture", "Quaternius", "CC0"],
  ["chair", "Chair", "furniture", "Quaternius", "CC0"],
  ["closet", "Closet", "furniture", "Quaternius", "CC0"],
  ["door", "Door", "furniture", "Quaternius", "CC0"],
  ["desk", "Desk", "furniture", "Quaternius", "CC0"],
  ["office-chair", "Office Chair", "office", "Quaternius", "CC0"],
  ["trashcan", "Trashcan", "office", "Quaternius", "CC0"],
  ["phone", "Phone", "office", "Quaternius", "CC0"],
  ["mug-office-tool", "Mug With Office Tool", "office", "CreativeTrio", "CC0"],
  ["computer-mouse", "Computer Mouse", "office", "CreativeTrio", "CC0"],
  ["computer-screen", "Computer Screen", "office", "Kenney", "CC0"],
  ["doorway-front", "Doorway Front", "office", "Kenney", "CC0"],
  ["rug", "Rug Round", "office", "Kenney", "CC0"],
  ["ceiling-fan", "Ceiling Fan", "office", "CreativeTrio", "CC0"],
  ["curtains-double", "Curtains Double", "office", "Quaternius", "CC0"],
  ["crushed-soda-can", "Crushed Soda Can", "office", "Thermo_DynAmics", "CC-BY"],
  ["whiteboard", "Whiteboard", "office", "jeremy", "CC-BY"],
  ["book-stack", "Book Stack", "office", "Danni Bittman", "CC-BY"],
  ["mug", "Mug", "office", "Poly by Google", "CC-BY"],
  ["skateboard", "Skateboard", "office", "Poly by Google", "CC-BY"],
  ["keyboard", "Keyboard", "office", "Poly by Google", "CC-BY"],
  ["sticky-notes", "Sticky Notes", "office", "Nick Slough", "CC-BY"],
  ["polaroids", "Polaroids", "office", "Jarlan Perez", "CC-BY"],
  ["window-blinds", "Window Blinds", "office", "Alex Safayan", "CC-BY"],
  ["notebook", "Notebook", "office", "jeremy", "CC-BY"],
  ["small-stack-paper", "Small Stack of Paper", "office", "Jarlan Perez", "CC-BY"],
  ["light-switch", "Light Switch", "office", "Jarlan Perez", "CC-BY"],
  ["laptop", "Laptop / MacBook Pro", "office", "Alex Safayan", "CC-BY"],
];

const OUT_DIR = "public/models/room";
const CONCURRENCY = 8;

async function getText(url) {
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 room-fetch" } });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.text();
}

async function mapWithConcurrency(items, fn, limit) {
  const out = [];
  let i = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return out;
}

async function buildBundleIndex(bundleUrl) {
  const html = await getText(bundleUrl);
  const ids = extractModelShortIds(html);
  const infos = await mapWithConcurrency(
    ids,
    async (id) => {
      try {
        const page = await getText(`https://poly.pizza/m/${id}`);
        const info = extractModelInfo(page);
        return { id, ...info };
      } catch {
        return { id, name: null, glbUrl: null, license: null };
      }
    },
    CONCURRENCY,
  );
  return infos.filter((x) => x.name && x.glbUrl);
}

async function downloadGlb(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  await pipeline(res.body, createWriteStream(dest));
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log("Indexing bundles…");
  const index = {
    furniture: await buildBundleIndex(BUNDLES.furniture),
    office: await buildBundleIndex(BUNDLES.office),
  };

  const resolved = [];
  for (const [assetId, name, bundle, author, license] of MANIFEST) {
    const best = pickBest(index[bundle], { name, author });
    if (!best) {
      console.error(`✗ NOT FOUND: ${name} (${bundle})`);
      continue;
    }
    // Wrong author = wrong model variant = wrong license. Hard fail.
    if (best.author && best.author.toLowerCase() !== author.toLowerCase()) {
      console.error(`✗ AUTHOR MISMATCH: ${name} — wanted ${author}, page says ${best.author}`);
      continue;
    }
    // MANIFEST license is ground truth (verified against bundle listings);
    // the page-parsed license is advisory only — warn, don't fail.
    if (best.license && best.license !== license) {
      console.warn(`⚠ license advisory: ${name} — manifest ${license}, page parsed ${best.license}`);
    }
    const file = `${assetId}.glb`;
    await downloadGlb(best.glbUrl, `${OUT_DIR}/${file}`);
    resolved.push({ assetId, file, author, license, source: `https://poly.pizza/m/${best.id}` });
    console.log(`✓ ${name} -> ${file}`);
  }

  if (resolved.length !== MANIFEST.length) {
    throw new Error(`Resolved ${resolved.length}/${MANIFEST.length}. Fix names above and re-run.`);
  }

  // assets.ts
  const idUnion = resolved.map((r) => `"${r.assetId}"`).join(" | ");
  const entries = resolved
    .map(
      (r) =>
        `  "${r.assetId}": { id: "${r.assetId}", file: "/models/room/${r.file}", author: ${JSON.stringify(r.author)}, license: "${r.license}", source: "${r.source}" },`,
    )
    .join("\n");
  const assetsTs = `// AUTO-GENERATED by scripts/fetch-room-assets.mjs. Do not edit by hand.
export type AssetId = ${idUnion};

export interface AssetMeta {
  id: AssetId;
  file: string;
  author: string;
  license: "CC0" | "CC-BY";
  source: string;
}

export const ASSETS: Record<AssetId, AssetMeta> = {
${entries}
};

export const CC_BY_CREDITS: AssetMeta[] = Object.values(ASSETS).filter(
  (a) => a.license === "CC-BY",
);
`;
  await writeFile("components/room/content/assets.ts", assetsTs);

  // CREDITS.md
  const rows = resolved
    .map((r) => `| ${r.assetId} | ${r.author} | ${r.license} | ${r.source} |`)
    .join("\n");
  const credits = `# Model Credits

3D models from [Poly Pizza](https://poly.pizza) — Furniture Pack (Quaternius) and The Office Pack.
CC-BY models are attributed below as required by their license; CC0 models credited as courtesy.

| Asset | Author | License | Source |
|---|---|---|---|
${rows}
`;
  await writeFile("CREDITS.md", credits);
  console.log(`\nDone. ${resolved.length} models, assets.ts + CREDITS.md written.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
