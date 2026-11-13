import { describe, it, expect, beforeEach } from "vitest";
import { useRoomStore } from "./room-store";

const reset = () =>
  useRoomStore.setState({
    phase: "loading",
    lighting: "day",
    scrollOffset: 0,
    requestedOffset: null,
    activeStation: null,
    openObject: null,
    visited: new Set(),
  });

describe("room-store", () => {
  beforeEach(reset);

  it("toggles lighting", () => {
    expect(useRoomStore.getState().lighting).toBe("day");
    useRoomStore.getState().toggleLighting();
    expect(useRoomStore.getState().lighting).toBe("night");
  });

  it("opening a panel sets openObject and marks visited", () => {
    useRoomStore.getState().openObjectPanel("bookcase");
    const s = useRoomStore.getState();
    expect(s.openObject).toBe("bookcase");
    expect(s.visited.has("bookcase")).toBe(true);
  });

  it("markVisited records without opening a panel", () => {
    useRoomStore.getState().markVisited("lightswitch");
    const s = useRoomStore.getState();
    expect(s.visited.has("lightswitch")).toBe(true);
    expect(s.openObject).toBeNull();
  });

  it("requestJumpTo/clear round-trips", () => {
    useRoomStore.getState().requestJumpTo(0.5);
    expect(useRoomStore.getState().requestedOffset).toBe(0.5);
    useRoomStore.getState().clearRequestedOffset();
    expect(useRoomStore.getState().requestedOffset).toBeNull();
  });

  it("closeObjectPanel clears openObject", () => {
    useRoomStore.getState().openObjectPanel("phone");
    useRoomStore.getState().closeObjectPanel();
    expect(useRoomStore.getState().openObject).toBeNull();
  });

  it("opening credits does not mark anything visited", () => {
    useRoomStore.getState().openObjectPanel("credits");
    const s = useRoomStore.getState();
    expect(s.openObject).toBe("credits");
    expect(s.visited.size).toBe(0);
  });
});
