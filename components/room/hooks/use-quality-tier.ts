"use client";
import { useEffect, useState } from "react";
import type { Quality } from "@/components/room/state/room-store";

export interface DeviceSignals {
  cores: number;
  deviceMemory?: number;
  coarsePointer: boolean;
  dpr: number;
}

export function computeQualityTier(sig: DeviceSignals): Quality {
  // Mobile / touch devices: cap by core count.
  if (sig.coarsePointer) {
    if (sig.cores <= 4 || (sig.deviceMemory ?? 8) <= 3) return "low";
    return "med";
  }
  // Desktop with a pointer.
  if (sig.cores <= 4) return "med";
  return "high";
}

export function readDeviceSignals(): DeviceSignals {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return {
    cores: nav.hardwareConcurrency || 4,
    deviceMemory: nav.deviceMemory,
    coarsePointer: window.matchMedia("(pointer: coarse)").matches,
    dpr: window.devicePixelRatio || 1,
  };
}

export function useQualityTier(): Quality {
  const [tier, setTier] = useState<Quality>("high");
  useEffect(() => {
    setTier(computeQualityTier(readDeviceSignals()));
  }, []);
  return tier;
}
