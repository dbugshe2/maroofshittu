import { describe, it, expect, vi } from "vitest";
import { render, screen, queryByText } from "@testing-library/react";

let mockWebGLSupport: boolean | null = false;
vi.mock("./hooks/use-webgl-support", () => ({ useWebGLSupport: () => mockWebGLSupport }));
// Avoid importing three in this test:
vi.mock("./scene/room-scene", () => ({ default: () => <div data-testid="room-scene" /> }));

import RoomExperience from "./room-experience";

describe("RoomExperience", () => {
  it("renders the 2D fallback when WebGL is unsupported", () => {
    mockWebGLSupport = false;
    render(<RoomExperience />);
    expect(screen.getByText(/my room/i)).toBeInTheDocument();
    // Fallback shows station content (e.g. contact email)
    expect(screen.getByText(/hi@maroofshittu\.com/i)).toBeInTheDocument();
  });

  it("renders blank aria-hidden div when support is unknown (null)", () => {
    mockWebGLSupport = null;
    const { container } = render(<RoomExperience />);
    const blankDiv = container.querySelector('div[aria-hidden="true"]');
    expect(blankDiv).toBeInTheDocument();
    // No fallback content should be visible
    expect(screen.queryByText(/my room/i)).not.toBeInTheDocument();
  });

  it("renders Canvas scene when WebGL is supported", () => {
    mockWebGLSupport = true;
    render(<RoomExperience />);
    expect(screen.getByTestId("room-scene")).toBeInTheDocument();
    // No fallback content should be visible
    expect(screen.queryByText(/my room/i)).not.toBeInTheDocument();
  });
});
