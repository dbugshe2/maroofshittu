# "My Room" — Explorable 3D Room — Design Spec

**Date:** 2026-07-19
**Route:** `/room`
**Status:** Approved design, pre-implementation

## 1. Goal

Add a full-screen, explorable 3D room to the portfolio at `/room`. It is a cozy
bedroom-with-workspace explored via a **scroll-driven first-person flight**: an
overhead establishing view dives down into the room, then flies the camera up
close to each section in turn. Interactive "stations" (desk, bookcase, polaroid
wall, etc.) reveal aspects of Maroof — projects, story, interests, hobbies,
current work, and contact. The scene is built from curated Poly Pizza low-poly
GLTF models. The system is **data-driven** so new objects/content can be added
later with minimal code.

Success = production-ready: it loads fast (route-split, `ssr:false`), performs
well (desktop-first with graceful mobile/low-end degradation), degrades to a
usable 2D fallback with no WebGL, is accessible, is license-compliant
(attribution for CC-BY models), and has tests covering wiring/logic.

## 2. User experience

1. Visitor lands on `/room`. Site navbar/chrome is hidden; a branded loader
   shows asset progress.
2. The room fades in on an **overhead establishing view** — the whole room seen
   from high above, dollhouse-style.
3. Scrolling **dives the camera down into the room**, then flies it FPV-style
   along a keyframed spline that carries it **up close to each section** in
   turn (damped, cinematic). Scroll = distance along the flight; the look
   direction eases from straight-down overhead to level flight, then frames
   each station's objects near-to.
4. Arriving at a **station** highlights its interactive objects and shows their
   floating labels — nothing else opens during flight; the tour stays
   cinematic and uncluttered.
5. Highlighted objects are **clickable**: clicking opens a full detail modal
   (DOM), e.g. the computer "boots" a projects OS, a polaroid enlarges, the
   whiteboard expands. The camera holds position on the rails while a modal is
   open. Closing returns to the flow.
6. A HUD shows a "N/M explored" discovery counter, a "jump to section" nav
   (Desk · Shelf · Wall · Corner), a day/night toggle mirror of the light
   switch, and an exit-to-site control.
7. Ambient/easter-egg interactions: light switch toggles warm-day ↔ cozy-night;
   ceiling fan spins on click.

## 3. Scope

### In scope (v1)
- `/room` route, full-screen canvas, chrome hidden on immersive routes.
- Scroll-driven camera flight: overhead intro dive + close-up station
  keyframes on one spline; damped; eased look targets.
- Room shell (procedural walls/floor/window) + 30 Poly Pizza furniture/prop
  GLBs placed to dress the room.
- 8 interactive objects (6 content stations + 2 ambient interactions), listed
  in §8.
- Data-driven content (`room-content.ts`) and object registry (`objects.ts`).
- Overlay UI: HUD, station panels, object detail overlays, branded loader,
  credits card.
- Quality tiers + adaptive perf; 2D fallback for no-WebGL; a11y support.
- Asset fetch pipeline (script) + generated `CREDITS.md`.
- Vitest + RTL test suite for logic/wiring/fallback.

### Out of scope (v1, future extensions)
- First-person free-roam / WASD (we chose scroll-on-rails).
- Multiplayer, physics, VR.
- CMS-backed content (content lives in typed TS modules).
- Dark-mode theming of the whole site (room overlay uses existing tokens; the
  in-room day/night toggle is scene lighting only, not site theme).
- Audio/ambient music (deferred; a HUD hook may be stubbed but no audio ships).

## 4. Tech stack additions

| Package | Purpose |
|---|---|
| `three` | WebGL engine |
| `@react-three/fiber` (R3F v9, React 19 compatible) | React renderer for three |
| `@react-three/drei` | `ScrollControls`, `useScroll`, `useGLTF`, `Environment`, `Html`, `ContactShadows`, `useProgress`, `AdaptiveDpr`, `PerformanceMonitor`, `BakeShadows`, `useDetectGPU`, `Outlines` |
| `zustand` | scene/UI state store |
| `@react-three/test-renderer` (dev) | scene-graph assertions |
| `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `@vitejs/plugin-react` (dev) | test runner + DOM testing |

Notes:
- Meshopt/Draco decoding via drei's built-in loaders if assets are compressed.
- No post-processing library in v1 (bundle/perf); lighting + contact shadows +
  environment carry the look. Can add later.

## 5. Route & app integration

- **`app/room/page.tsx`** — server component. Metadata (`title: "My Room"`),
  renders `<RoomExperience />` via `next/dynamic(..., { ssr: false })`.
- **Chrome hiding** — introduce `components/chrome-gate.tsx` (client, uses
  `usePathname`). Move `<Navbar />` and `<ScrollIndicator />` from
  `app/layout.tsx` into `ChromeGate`, which renders them only when the path is
  not an immersive route (`/room`). This makes the canvas truly full-screen
  without restructuring existing routes into route groups. The `<Navbar>`
  bottom spacer lives inside the navbar component, so hiding it also removes the
  spacer.
- `RoomExperience` renders a `fixed inset-0` container; a tall inner scroll
  region provides the scroll distance that `ScrollControls` consumes.

## 6. Architecture / file layout

```
app/room/page.tsx                     # metadata + dynamic(ssr:false) import

components/chrome-gate.tsx            # path-aware wrapper for Navbar/ScrollIndicator

components/room/
  room-experience.tsx                # WebGL check -> <Canvas> or <Fallback2D>; mounts overlay UI
  scene/
    room-scene.tsx                   # <ScrollControls> + scene contents
    camera-rig.tsx                   # samples spline by scroll offset in useFrame
    room-shell.tsx                   # procedural walls / floor / window frame
    lighting.tsx                     # lights + environment + contact/baked shadows; day/night
    interactive-object.tsx           # generic: renders models, hover outline, label, click->open
    stations/                        # per-station custom visuals (screen texture, polaroid images, etc.)
      workstation.tsx
      polaroid-wall.tsx
      ...
  ui/
    room-hud.tsx                     # discovery counter, section nav, day/night, exit, credits button
    object-overlay.tsx               # focused object detail (DOM), dispatches per panel kind
    panels/                          # projects-os, about, gallery, hobbies, now, contact, credits
    loader.tsx                       # branded Suspense loader (useProgress)
    fallback-2d.tsx                  # no-WebGL scrollable content
  state/
    room-store.ts                    # zustand store
  content/
    room-content.ts                  # personal content (single source to edit)
    objects.ts                       # interactive object registry + tour path/stations
    assets.ts                        # AssetId -> GLB path + author/license metadata (written by fetch script)
  hooks/
    use-webgl-support.ts
    use-quality-tier.ts
  lib/
    curve.ts                         # spline helpers (build path, sample by offset, ease)
    dispose.ts                       # gltf/material disposal helpers

scripts/fetch-room-assets.mjs        # downloads Poly Pizza GLBs + writes assets.ts + CREDITS.md
public/models/room/*.glb             # committed assets
CREDITS.md                           # attribution (generated)

docs/superpowers/specs/2026-07-19-my-room-3d-design.md   # this file
```

## 7. State management (zustand)

```ts
type StationId = 'workstation' | 'bookcase' | 'polaroids' | 'corner' | 'whiteboard' | 'phone';
type ObjectId  = StationId | 'lightswitch' | 'ceilingfan';
type Quality   = 'high' | 'med' | 'low';

interface RoomState {
  phase: 'loading' | 'ready';
  quality: Quality;
  reducedMotion: boolean;
  lighting: 'day' | 'night';
  scrollOffset: number;          // 0..1 mirrored from useScroll for HUD/section nav
  requestedOffset: number | null;// section-nav jump target; a bridge applies it to the scroll el
  activeStation: StationId | null;
  openObject: ObjectId | null;   // detail overlay open for this object
  visited: Set<ObjectId>;

  setPhase(p): void;
  setQuality(q): void;
  toggleLighting(): void;
  setScrollOffset(o): void;
  requestJumpTo(id: StationId): void;   // sets requestedOffset from station offset
  clearRequestedOffset(): void;
  setActiveStation(id): void;
  openObjectPanel(id: ObjectId): void;  // also marks visited
  closeObjectPanel(): void;
}
```

- Canvas components subscribe transiently (selectors) to avoid re-rendering the
  tree on scroll. `scrollOffset` is written from a throttled `useFrame` reader,
  consumed by DOM HUD.
- `requestJumpTo` → `requestedOffset`; a small `ScrollBridge` inside
  `ScrollControls` reads it and calls `scroll.el.scrollTo(...)`, then clears it.

## 8. Interactive objects & stations

Tour order: **overhead establishing view → dive toward the doorway →
nightstand/phone → bookcase → polaroid wall → whiteboard → desk workstation →
skateboard corner**. The spline threads through a close-up camera pose at
every station.

| id | Station? | Built from (models) | Panel / action | Reveals |
|---|---|---|---|---|
| `workstation` | ✓ | Desk, Computer Screen, Keyboard, Computer Mouse, Laptop/MacBook, Office Chair, Mug | `projects-os` overlay | Projects (seeded from real site) + links to `/showcase`, GitHub |
| `bookcase` | ✓ | Bookcase with Books, Book Stack | `about` overlay | Story, reclusive-sloth ethos, influences, reading list |
| `polaroids` | ✓ | Polaroids (+ `avatar.jpg`, `work1.jpg`, `work2.jpg` textures) | `gallery` overlay | Interests — caption gallery |
| `corner` | ✓ | Skateboard | `hobbies` overlay | Life outside code — hobbies/music |
| `whiteboard` | ✓ | Whiteboard, Sticky Notes | `now` overlay | Currently building, goals, quick facts |
| `phone` | ✓ | Phone (on nightstand) | `contact` overlay | Email `hi@maroofshittu.com`, socials |
| `lightswitch` | — | Light Switch | action: `toggleLighting` | Warm-day ↔ cozy-night |
| `ceilingfan` | — | Ceiling Fan | action: `spin` | Delight easter egg |

Ambient dressing (non-interactive, from the requested list): Bed Double,
Night Stand, Chair, Closet, Door, Doorway Front, Curtains Double, Window Blinds,
Rug, Trashcan, Crushed Soda Can, Mug With Office Tool, Notebook, Small Stack of
Paper. Any of these can be promoted to interactive later via the registry.

Generic `InteractiveObject` behavior:
- Hover: outline highlight (drei `Outlines` or emissive boost) + pointer cursor
  + floating label (drei `Html` billboard). Disabled on touch (tap = activate).
- Click/tap/Enter: if `panel` → `openObjectPanel(id)` (overlay opens, marks
  visited); if `action` → run action (toggle light / spin fan), mark visited.
- Keyboard: hotspots are focusable DOM buttons (via drei `Html`), Enter
  activates, Esc closes any open overlay.

## 9. Content data model

`content/room-content.ts` — the single source of truth to edit:

```ts
interface RoomContent {
  about: { headline: string; paragraphs: string[]; influences: string[];
           reading: { title: string; author: string }[] };
  projects: { name: string; blurb: string; href?: string; tags: string[] }[];
  gallery: { src: string; caption: string; alt: string }[];
  hobbies: { intro: string; music: string[]; activities: string[] };
  now: { building: string[]; goals: string[]; stickyNotes: string[] };
  contact: { email: string; socials: { label: string; href: string }[] };
}
```

Seed values from known facts: name "Maroof Shittu", software engineer,
"reclusive sloth who builds cool stuff", email `hi@maroofshittu.com`, projects
seeded from the existing site (Playground / drive-link-converter) plus clearly
marked placeholders Maroof fills in. Gallery reuses existing `/public` images.

`content/objects.ts` — registry + tour geometry:

```ts
interface Vec3 { x: number; y: number; z: number }

interface InteractiveObject {
  id: ObjectId;
  label: string;                 // hover label
  models: AssetId[];             // GLBs composing it (from assets.ts)
  transform: { position: Vec3; rotation?: Vec3; scale?: number };
  hotspot?: Vec3;                // label/anchor offset
  station?: StationId;
  panel?: PanelKey;              // opens overlay
  action?: 'toggleLighting' | 'spin'; // non-panel interaction
}

interface Station { id: StationId; label: string; cameraPos: Vec3; lookAt: Vec3 }

export const introPath: Vec3[];   // overhead establishing keyframes (dive-in)
export const stations: Station[]; // ordered close-up camera poses + look targets
export const tourPoints: Vec3[];  // spline control points = intro + station poses
export const interactiveObjects: InteractiveObject[];
export const ambientObjects: { models: AssetId[]; transform: ... }[];
```

Invariants (test-enforced): object ids unique; every `station` referenced by an
object exists in `stations`; every `panel` maps to a real panel component; every
`AssetId` referenced exists in `assets.ts`; `tourPoints` is the intro keyframes
followed by each station's `cameraPos` in tour order; derived station offsets
(see §10) strictly ascending.

## 10. Navigation model (scroll-driven FPV)

- **The tour is a keyframe flight.** Spline control points = `introPath` (an
  overhead establishing view high above the room, then a dive toward the
  doorway wall down to eye level) followed by each station's `cameraPos` in
  tour order. A `THREE.CatmullRomCurve3` threads through all of them, so the
  camera flies up close to every station, and a station's framing is tuned by
  editing its `cameraPos`/`lookAt` alone.
- **Station scroll offsets are derived, not hand-written**: each station's
  offset is the arc-length fraction of the spline at its `cameraPos`
  (nearest-sample search over an arc-length tessellation). `lib/tour.ts`
  builds the curve once and exposes `{ curve, introEnd, stationEntries }`
  where each entry carries `{ id, label, offset, cameraPos, lookAt }`.
- `<ScrollControls pages={N} damping={...}>` wraps the scene. `N` sized so the
  flight has comfortable scroll length (tunable; ~ stations + intro margin).
- `camera-rig.tsx`: each frame reads `scroll.offset`, samples
  `curve.getPointAt(offset)` for position, and lerps the camera for
  smoothness (raw offset everywhere so station offsets stay aligned).
- **Look direction:** during the intro (`offset < introEnd`) the camera gazes
  at the room center, easing from straight-down overhead toward level as it
  dives; after the dive it blends a spline look-ahead with the nearest
  station's `lookAt`, so each arrival frames its objects close-up.
- **Arrival UI:** reaching a station highlights its objects and shows their
  floating labels. No content panel opens during flight — content is
  click-only (modal overlay).
- `activeStation` = nearest `stationEntry` within a threshold of the current
  offset; drives highlight emphasis + HUD state.
- Section-nav jump: `requestJumpTo(offset)` → `ScrollBridge` scrolls the
  scroll element to `offset * scrollHeight`.
- `prefers-reduced-motion`: reduce look-sway and damping; still scroll-linked.
- Mobile: native touch scroll drives the same flight; panels become bottom
  sheets.

## 11. Rendering, lighting, look & feel

- **Room shell**: procedural boxes/planes for floor, 3 walls, ceiling, and a
  window opening; simple warm materials matching a cozy palette. Furniture GLBs
  placed inside.
- **Lighting**: hemisphere + key directional (sun through window) + a warm desk
  lamp point light. `day` = brighter, cooler ambient + strong window light;
  `night` = dim, warm, lamp-dominant, optional emissive screen glow. Toggled by
  the light switch / HUD via `lighting` state.
- **Shadows**: contact shadows (drei `ContactShadows`) always; real shadow maps
  on `high` only, `BakeShadows` since geometry is static.
- **Environment**: subtle drei `Environment` preset for material reflections.
- **Overlay UI**: matches site brand — mono font, `--radius: 0`, hard
  `4px 4px 0` shadows, black borders — using the **defined** theme tokens
  (`background`, `foreground`, `primary`, `accent`, `card`, `border`), NOT the
  currently-undefined `brand-*` utilities.

## 12. Assets pipeline

Source bundles:
- **Furniture Pack** (`poly.pizza/bundle/Furniture-Pack-pgvx8Zkq8v`) — Quaternius,
  all CC0.
- **The Office Pack** (`poly.pizza/bundle/The-Office-Pack-UGIy7YcQP9`) — mixed
  CC0 / CC-BY.

Download mechanism (verified): bundle page embeds model links `/m/<shortId>`;
each model page exposes `https://static.poly.pizza/<uuid>.glb` (HTTP 200,
`model/gltf-binary`, Brotli `.glb.br` variant available). No API key needed.

`scripts/fetch-room-assets.mjs`:
1. Fetch both bundle pages, parse embedded JSON for each model's name, author,
   license, and `/m/<shortId>`.
2. For each requested item, resolve the correct model (by name; prefer CC0
   variant when duplicates exist), fetch its page, extract the GLB URL.
3. Download to `public/models/room/<kebab-name>.glb`. (Optional: meshopt
   compression via `gltf-transform` if it materially reduces size.)
4. Write `components/room/content/assets.ts` (`AssetId` → path + author +
   license + sourceUrl) and `CREDITS.md`.

**Asset mapping (item → bundle → author → license):**

| # | Item | Bundle | Author | License |
|---|---|---|---|---|
| 1 | Bookcase with Books | Furniture | Quaternius | CC0 |
| 2 | Bed Double | Furniture | Quaternius | CC0 |
| 3 | Night Stand | Furniture | Quaternius | CC0 |
| 4 | Chair | Furniture | Quaternius | CC0 |
| 5 | Closet | Furniture | Quaternius | CC0 |
| 6 | Door | Furniture | Quaternius | CC0 |
| 7 | Desk | Furniture/Office | Quaternius | CC0 |
| 8 | Office Chair | Office | Quaternius | CC0 |
| 9 | Trashcan | Office | Quaternius | CC0 |
| 10 | Phone | Office | Quaternius | CC0 |
| 11 | Mug With Office Tool | Office | CreativeTrio | CC0 |
| 12 | Computer Mouse | Office | CreativeTrio | CC0 |
| 13 | Computer Screen | Office | Kenney | CC0 |
| 14 | Doorway Front | Office | Kenney | CC0 |
| 15 | Rug (Rug Round) | Office | Kenney | CC0 |
| 16 | Ceiling Fan | Office | CreativeTrio | CC0 |
| 17 | Curtains Double | Office | Quaternius | CC0 |
| 18 | Crushed Soda Can | Office | Thermo_DynAmics | CC-BY |
| 19 | Whiteboard | Office | jeremy | CC-BY |
| 20 | Book Stack | Office | Danni Bittman | CC-BY |
| 21 | Mug | Office | Poly by Google | CC-BY |
| 22 | Skateboard | Office | Poly by Google | CC-BY |
| 23 | Keyboard | Office | Poly by Google | CC-BY |
| 24 | Sticky Notes | Office | Nick Slough | CC-BY |
| 25 | Polaroids | Office | Jarlan Perez | CC-BY |
| 26 | Window Blinds | Office | Alex Safayan | CC-BY |
| 27 | Notebook | Office | jeremy | CC-BY |
| 28 | Small Stack of Paper | Office | Jarlan Perez | CC-BY |
| 29 | Light Switch | Office | Jarlan Perez | CC-BY |
| 30 | Laptop / MacBook Pro | Office | Alex Safayan | CC-BY |

CC-BY items require attribution → `CREDITS.md` + in-room Credits card lists each
author, model, license, and source URL. CC0 items credited as courtesy.

## 13. Performance & graceful degradation

- Route-split; `dynamic(ssr:false)` — three.js only loads on `/room`.
- `use-webgl-support.ts`: no WebGL → render `Fallback2D` (scrollable DOM with
  the same station content; also the SEO/AX representation).
- `use-quality-tier.ts`: drei `useDetectGPU` + device signals →
  `high` / `med` / `low`. Controls DPR cap, shadow maps, light count, outline
  effects. Mobile defaults to `med`/`low`.
- drei `PerformanceMonitor` + `AdaptiveDpr` auto-downscale under load.
- `frameloop="demand"` where possible; `ScrollControls`/animations invalidate as
  needed (spinning fan, damping settle). Static idle = no render.
- Suspense + branded loader (`useProgress`) during asset load.
- Dispose GLTF geometries/materials/textures on unmount (`lib/dispose.ts`).

## 14. Accessibility

- All panel/overlay content is real DOM text (drei `Html` / React overlays), not
  baked into the canvas → screen-reader accessible.
- Hotspots are focusable buttons; Tab to move, Enter to activate, Esc to close.
- Section-nav offers non-scroll navigation to each station.
- `prefers-reduced-motion` honored.
- Canvas has `aria-hidden` with an accessible sibling summary; `Fallback2D`
  carries full content for no-WebGL / AT users.
- Color contrast on overlay UI meets WCAG AA using theme tokens.

## 15. React Compiler × R3F

`reactCompiler: true` is on. R3F relies on mutable refs + `useFrame`; the
compiler's memoization can interfere. Mitigation: add `'use no memo';` to
components using `useFrame`/imperative three refs (camera rig, interactive
object, animated stations), and/or exclude `components/room/**` from the
compiler via config. Verified by a passing `npm run build` and correct runtime
behavior.

## 16. Testing strategy

Add Vitest + RTL (no test setup exists yet). Focus on logic/wiring, not pixels:

- **Registry integrity** (`objects.ts`): unique ids; every `station` exists;
  every `panel` maps to a component; every `AssetId` exists in `assets.ts`;
  `tourPoints` threads intro keyframes then station poses in order.
- **Content integrity**: required fields present; every gallery `src` resolves
  to a file in `/public`.
- **`use-quality-tier`**: given mocked GPU/device signals → expected tier.
- **`use-webgl-support`**: unsupported → `RoomExperience` renders `Fallback2D`.
- **Panels**: each panel renders its content (e.g., `about` shows headline;
  `projects-os` lists projects; `contact` shows email).
- **HUD**: discovery counter reflects `visited`; section nav dispatches
  `requestJumpTo`.
- **curve/tour**: sampling at offset 0 / 1 returns path endpoints; derived
  station offsets strictly ascending and after `introEnd`; `nearestStation`
  thresholding.
- Optional **scene smoke** via `@react-three/test-renderer`: scene mounts and
  contains expected interactive object count.
- Gate: `npm run build` (typecheck) + `npm run lint` pass; manual visual QA in
  browser.

## 17. Risks & mitigations

| Risk | Mitigation |
|---|---|
| React Compiler breaks R3F refs | `'use no memo'` / exclude room dir; verify via build + runtime |
| Bundle size (three ~150kb gz) | route-split, `ssr:false`, demand frameloop, compressed GLBs |
| Poly Pizza download/layout changes | script parses embedded JSON defensively; assets committed to repo so build never depends on live fetch |
| CC-BY attribution | generated `CREDITS.md` + in-room Credits card |
| Scroll vs click conflict | click opens DOM overlay; camera stays on rails (no click-camera) |
| Model scale/orientation mismatch between kits | per-object `transform` (scale/rotation) in registry; normalize during placement |
| Mobile perf | quality tiers, `med`/`low` defaults, adaptive DPR, fewer lights/shadows |

## 18. Acceptance criteria

- `/room` loads full-screen with chrome hidden; other routes unaffected.
- The tour opens on an overhead view and dives into the room; scrolling flies
  the camera smoothly up close to each of the six stations; arrival shows
  highlight + floating labels only (content opens on click); section-nav jumps
  work; reduced-motion respected.
- All 8 interactive objects hover-highlight and activate (6 open correct panels;
  light switch toggles day/night; fan spins). Discovery counter updates.
- All 30 requested models load and are placed; CC-BY authors credited in
  `CREDITS.md` and the in-room Credits card.
- No-WebGL → `Fallback2D` with the same content.
- `npm run build` and `npm run lint` pass; test suite passes.
- Content is editable from `room-content.ts`; a new object needs only a model +
  registry entry + content entry.
