import { create } from "zustand";

export type StationId =
  | "workstation" | "bookcase" | "polaroids" | "corner" | "whiteboard" | "phone";
export type ObjectId = StationId | "lightswitch" | "ceilingfan";
export type Quality = "high" | "med" | "low";

export interface RoomState {
  phase: "loading" | "ready";
  quality: Quality;
  reducedMotion: boolean;
  lighting: "day" | "night";
  scrollOffset: number;
  requestedOffset: number | null;
  activeStation: StationId | null;
  openObject: ObjectId | "credits" | null;
  visited: ReadonlySet<ObjectId>;
  setPhase(p: RoomState["phase"]): void;
  setQuality(q: Quality): void;
  setReducedMotion(v: boolean): void;
  toggleLighting(): void;
  setScrollOffset(o: number): void;
  requestJumpTo(offset: number): void;
  clearRequestedOffset(): void;
  setActiveStation(id: StationId | null): void;
  markVisited(id: ObjectId): void;
  openObjectPanel(id: ObjectId | "credits"): void;
  closeObjectPanel(): void;
}

export const useRoomStore = create<RoomState>((set) => ({
  phase: "loading",
  quality: "high",
  reducedMotion: false,
  lighting: "day",
  scrollOffset: 0,
  requestedOffset: null,
  activeStation: null,
  openObject: null,
  visited: new Set<ObjectId>(),
  setPhase: (phase) => set({ phase }),
  setQuality: (quality) => set({ quality }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  toggleLighting: () => set((s) => ({ lighting: s.lighting === "day" ? "night" : "day" })),
  setScrollOffset: (scrollOffset) => set({ scrollOffset }),
  requestJumpTo: (requestedOffset) => set({ requestedOffset }),
  clearRequestedOffset: () => set({ requestedOffset: null }),
  setActiveStation: (activeStation) => set({ activeStation }),
  markVisited: (id) =>
    set((s) => {
      if (s.visited.has(id)) return s;
      const visited = new Set(s.visited);
      visited.add(id);
      return { visited };
    }),
  openObjectPanel: (id) =>
    set((s) => {
      if (id === "credits") return { openObject: id };
      const visited = new Set(s.visited);
      visited.add(id);
      return { openObject: id, visited };
    }),
  closeObjectPanel: () => set({ openObject: null }),
}));
