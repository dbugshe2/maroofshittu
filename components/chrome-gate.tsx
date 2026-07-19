"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { ScrollIndicator } from "@/components/scroll-indicator";

const IMMERSIVE_ROUTES = ["/room"];

/**
 * ChromeGate
 * Renders global site chrome (navbar + scroll indicator) except on immersive
 * full-screen routes like /room, where the 3D canvas owns the viewport.
 */
export function ChromeGate() {
  const pathname = usePathname();
  if (IMMERSIVE_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))) {
    return null;
  }
  return (
    <>
      <Navbar />
      <ScrollIndicator />
    </>
  );
}
