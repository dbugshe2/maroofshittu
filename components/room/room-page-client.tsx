"use client";

import dynamic from "next/dynamic";

const RoomExperience = dynamic(() => import("@/components/room/room-experience"), {
  ssr: false,
});

/**
 * RoomPageClient
 * Client boundary that performs the `ssr: false` dynamic import of the 3D
 * room experience. `next/dynamic(..., { ssr: false })` is not allowed inside
 * a Server Component, so this wrapper exists purely to host that import while
 * `app/room/page.tsx` stays a Server Component (keeping the `metadata` export).
 */
export function RoomPageClient() {
  return <RoomExperience />;
}
