import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

let mockProgress = { active: false, progress: 0 };
vi.mock("@react-three/drei", () => ({ useProgress: () => mockProgress }));

import { RoomLoader } from "./loader";

describe("RoomLoader", () => {
  it("is hidden when no loading has started", () => {
    mockProgress = { active: false, progress: 0 };
    const { container } = render(<RoomLoader />);
    expect(container).toBeEmptyDOMElement();
  });
  it("shows during an active load with the percentage", () => {
    mockProgress = { active: true, progress: 37 };
    render(<RoomLoader />);
    expect(screen.getByText(/37%/)).toBeInTheDocument();
  });
  it("is hidden after loading completes", () => {
    mockProgress = { active: false, progress: 100 };
    const { container } = render(<RoomLoader />);
    expect(container).toBeEmptyDOMElement();
  });
});
