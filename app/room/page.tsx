import type { Metadata } from "next";
import { RoomPageClient } from "@/components/room/room-page-client";

export const metadata: Metadata = {
  title: "My Room | Maroof Shittu",
  description: "Step into Maroof's room — an explorable 3D space.",
};

export default function RoomPage() {
  return <RoomPageClient />;
}
