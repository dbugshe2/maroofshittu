import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

let mockPath = "/";
vi.mock("next/navigation", () => ({ usePathname: () => mockPath }));

import { ChromeGate } from "./chrome-gate";

describe("ChromeGate", () => {
  it("renders chrome on normal routes", () => {
    mockPath = "/";
    render(<ChromeGate />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("hides chrome on /room", () => {
    mockPath = "/room";
    render(<ChromeGate />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
