import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import { useRoomStore } from "@/components/room/state/room-store";
import { RoomHud } from "./room-hud";

beforeEach(() =>
  useRoomStore.setState({ visited: new Set(), lighting: "day", requestedOffset: null }),
);

describe("RoomHud", () => {
  it("shows discovery progress out of total interactive objects", () => {
    render(<RoomHud />);
    expect(screen.getByText(/0\s*\/\s*8/)).toBeInTheDocument();
    act(() => {
      useRoomStore.getState().markVisited("bookcase");
    });
    expect(screen.getByText(/1\s*\/\s*8/)).toBeInTheDocument();
  });

  it("section nav dispatches a jump request", () => {
    render(<RoomHud />);
    fireEvent.click(screen.getByRole("button", { name: /bookcase/i }));
    expect(useRoomStore.getState().requestedOffset).not.toBeNull();
  });

  it("day/night toggle flips lighting", () => {
    render(<RoomHud />);
    fireEvent.click(screen.getByRole("button", { name: /toggle lights/i }));
    expect(useRoomStore.getState().lighting).toBe("night");
  });
});
