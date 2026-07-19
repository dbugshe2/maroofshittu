import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("./hooks/use-webgl-support", () => ({ useWebGLSupport: () => false }));
// Avoid importing three in this test:
vi.mock("./scene/room-scene", () => ({ default: () => null }));

import RoomExperience from "./room-experience";

describe("RoomExperience", () => {
  it("renders the 2D fallback when WebGL is unsupported", () => {
    render(<RoomExperience />);
    expect(screen.getByText(/my room/i)).toBeInTheDocument();
    // Fallback shows station content (e.g. contact email)
    expect(screen.getByText(/hi@maroofshittu\.com/i)).toBeInTheDocument();
  });
});
