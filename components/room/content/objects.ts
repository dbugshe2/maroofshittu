import type { AssetId } from "./assets";
import type { ObjectId, StationId } from "@/components/room/state/room-store";

export type PanelKey =
  | "projects-os" | "about" | "gallery" | "hobbies" | "now" | "contact" | "credits";
export const PANEL_KEYS: readonly PanelKey[] = [
  "projects-os", "about", "gallery", "hobbies", "now", "contact", "credits",
];

export interface Vec3 { x: number; y: number; z: number }

export interface InteractiveObject {
  id: ObjectId;
  label: string;
  models: AssetId[];
  transform: { position: Vec3; rotationY?: number; scale?: number };
  hotspot?: Vec3;
  station?: StationId;
  panel?: PanelKey;
  action?: "toggleLighting" | "spin";
}

export interface AmbientObject {
  models: AssetId[];
  transform: { position: Vec3; rotationY?: number; scale?: number };
}

export interface Station {
  id: StationId;
  label: string;
  cameraPos: Vec3;     // close-up camera pose the tour flies to
  lookAt: Vec3;        // world point the camera faces at this station
}

// Overhead establishing shot high above the room, then a dive toward the
// doorway wall down to eye level. Tuned visually in Task 11.
export const introPath: Vec3[] = [
  { x: 0, y: 7.5, z: 0.5 },    // overhead, dollhouse view
  { x: 0.5, y: 5.0, z: 2.8 },  // beginning the dive
  { x: -0.3, y: 2.4, z: 3.4 }, // swooping to eye level near the doorway
];

// Ordered close-up poses; the tour spline threads through each cameraPos so
// the camera arrives near-to. Scroll offsets are DERIVED from arc length in
// lib/tour.ts — never hand-written here.
export const stations: Station[] = [
  { id: "phone",       label: "Nightstand", cameraPos: { x: -1.1, y: 1.2, z: 2.1 },  lookAt: { x: -2.2, y: 0.6, z: 2.6 } },
  { id: "bookcase",    label: "Bookcase",   cameraPos: { x: -2.5, y: 1.4, z: 0.1 },  lookAt: { x: -3.8, y: 1.2, z: 0 } },
  { id: "polaroids",   label: "Wall",       cameraPos: { x: -1.0, y: 1.6, z: -2.5 }, lookAt: { x: -1, y: 1.7, z: -3.85 } },
  { id: "whiteboard",  label: "Whiteboard", cameraPos: { x: 1.0, y: 1.6, z: -2.6 },  lookAt: { x: 1, y: 1.7, z: -3.9 } },
  { id: "workstation", label: "Desk",       cameraPos: { x: 2.3, y: 1.3, z: -2.2 },  lookAt: { x: 2.6, y: 1.1, z: -3.5 } },
  { id: "corner",      label: "Corner",     cameraPos: { x: 2.7, y: 1.0, z: 0.3 },   lookAt: { x: 3.6, y: 0.3, z: 1.2 } },
];

/** Full tour spline control points: overhead intro + each station close-up. */
export const tourPoints: Vec3[] = [...introPath, ...stations.map((s) => s.cameraPos)];

export const interactiveObjects: InteractiveObject[] = [
  {
    id: "workstation",
    label: "My desk",
    models: ["desk", "computer-screen", "keyboard", "computer-mouse", "laptop", "office-chair", "mug"],
    transform: { position: { x: 2.6, y: 0, z: -3.4 }, rotationY: Math.PI, scale: 1 },
    hotspot: { x: 2.6, y: 1.4, z: -3.2 },
    station: "workstation",
    panel: "projects-os",
  },
  {
    id: "bookcase",
    label: "Bookcase",
    models: ["bookcase-books", "book-stack"],
    transform: { position: { x: -3.9, y: 0, z: 0 }, rotationY: Math.PI / 2 },
    hotspot: { x: -3.5, y: 1.4, z: 0 },
    station: "bookcase",
    panel: "about",
  },
  {
    id: "polaroids",
    label: "Photos",
    models: ["polaroids"],
    transform: { position: { x: -1, y: 1.7, z: -3.9 } },
    hotspot: { x: -1, y: 1.8, z: -3.6 },
    station: "polaroids",
    panel: "gallery",
  },
  {
    id: "whiteboard",
    label: "Whiteboard",
    models: ["whiteboard", "sticky-notes"],
    transform: { position: { x: 1, y: 1.6, z: -3.9 } },
    hotspot: { x: 1, y: 1.9, z: -3.6 },
    station: "whiteboard",
    panel: "now",
  },
  {
    id: "corner",
    label: "Skateboard",
    models: ["skateboard"],
    transform: { position: { x: 3.6, y: 0, z: 1.2 }, rotationY: -Math.PI / 4 },
    hotspot: { x: 3.4, y: 0.8, z: 1.2 },
    station: "corner",
    panel: "hobbies",
  },
  {
    id: "phone",
    label: "Phone",
    models: ["phone"],
    transform: { position: { x: -2.2, y: 0.55, z: 2.6 } },
    hotspot: { x: -2.2, y: 0.75, z: 2.6 },
    station: "phone",
    panel: "contact",
  },
  {
    id: "lightswitch",
    label: "Light switch",
    models: ["light-switch"],
    transform: { position: { x: 0.2, y: 1.5, z: 4.4 }, rotationY: Math.PI },
    hotspot: { x: 0.2, y: 1.6, z: 4.2 },
    action: "toggleLighting",
  },
  {
    id: "ceilingfan",
    label: "Ceiling fan",
    models: [],
    transform: { position: { x: 0, y: 3.4, z: 0 } },
    hotspot: { x: 0, y: 3.1, z: 0 },
    action: "spin",
  },
];

// Non-interactive dressing. Transforms tuned in Task 12.
export const ambientObjects: AmbientObject[] = [
  { models: ["bed-double"], transform: { position: { x: -2.4, y: 0, z: 2.6 }, rotationY: Math.PI / 2 } },
  { models: ["night-stand"], transform: { position: { x: -2.2, y: 0, z: 2.6 } } },
  { models: ["closet"], transform: { position: { x: 3.6, y: 0, z: -1 }, rotationY: -Math.PI / 2 } },
  { models: ["chair"], transform: { position: { x: -0.5, y: 0, z: -1 } } },
  { models: ["door"], transform: { position: { x: 0, y: 0, z: 4.6 } } },
  { models: ["doorway-front"], transform: { position: { x: 0, y: 0, z: 4.6 } } },
  { models: ["curtains-double"], transform: { position: { x: -3.9, y: 2, z: -2 }, rotationY: Math.PI / 2 } },
  { models: ["window-blinds"], transform: { position: { x: 3.9, y: 2, z: 2 }, rotationY: -Math.PI / 2 } },
  { models: ["rug"], transform: { position: { x: 0, y: 0.01, z: 0 }, scale: 1.4 } },
  { models: ["trashcan"], transform: { position: { x: 1.8, y: 0, z: -3 } } },
  { models: ["crushed-soda-can"], transform: { position: { x: 1.6, y: 0, z: -2.6 } } },
  { models: ["mug-office-tool"], transform: { position: { x: 2.9, y: 0.75, z: -3.4 } } },
  { models: ["notebook"], transform: { position: { x: 2.2, y: 0.75, z: -3.4 } } },
  { models: ["small-stack-paper"], transform: { position: { x: 2.0, y: 0.75, z: -3.2 } } },
];
