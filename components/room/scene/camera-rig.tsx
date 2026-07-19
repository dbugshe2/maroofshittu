"use no memo";
"use client";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import { sampleAt, nearestStation } from "@/components/room/lib/curve";
import { getTour } from "@/components/room/lib/tour";
import { lockScroll } from "@/components/room/lib/scroll-lock";
import { useRoomStore } from "@/components/room/state/room-store";

const ROOM_CENTER = new THREE.Vector3(0, 0.6, 0);

export function CameraRig() {
  const camera = useThree((s) => s.camera);
  const scroll = useScroll();
  const { curve, introEnd, stationEntries } = getTour();
  const lookTarget = useRef(new THREE.Vector3(0, 0.6, 0));
  const setScrollOffset = useRoomStore((s) => s.setScrollOffset);
  const setActiveStation = useRoomStore((s) => s.setActiveStation);
  const lastStation = useRef<string | null>(null);

  useFrame(() => {
    const offset = scroll.offset;
    const reducedMotion = useRoomStore.getState().reducedMotion;

    // position: raw offset everywhere so derived station offsets stay aligned
    const pos = sampleAt(curve, offset);
    camera.position.lerp(pos, reducedMotion ? 1 : 0.12);

    // look target
    const target = new THREE.Vector3();
    let nearId: ReturnType<typeof nearestStation> = null;
    if (offset < introEnd) {
      // dive-in: gaze pinned to the room center while descending overhead,
      // easing toward the first station's subject as the camera levels out
      const p = offset / introEnd;
      const first = stationEntries[0].lookAt;
      target
        .copy(ROOM_CENTER)
        .lerp(
          new THREE.Vector3(first.x, first.y, first.z),
          THREE.MathUtils.smoothstep(p, 0.6, 1),
        );
    } else {
      const ahead = sampleAt(curve, Math.min(1, offset + 0.05));
      target.copy(ahead);
      nearId = nearestStation(offset, stationEntries, 0.1);
      if (nearId) {
        const st = stationEntries.find((s) => s.id === nearId)!;
        target.set(st.lookAt.x, st.lookAt.y, st.lookAt.z);
      }
    }
    lookTarget.current.lerp(target, reducedMotion ? 1 : 0.1);
    camera.lookAt(lookTarget.current);

    // publish state (throttled to station changes + offset)
    setScrollOffset(offset);
    if (nearId !== lastStation.current) {
      lastStation.current = nearId;
      setActiveStation(nearId);
    }
  });

  return null;
}

/**
 * Applies section-nav jump requests to the scroll element and freezes the
 * tour scroll while a modal is open (so it resumes exactly where it froze).
 */
export function ScrollBridge() {
  const scroll = useScroll();
  const requested = useRoomStore((s) => s.requestedOffset);
  const clear = useRoomStore((s) => s.clearRequestedOffset);
  const openObject = useRoomStore((s) => s.openObject);
  const prev = useRef<number | null>(null);

  useEffect(() => {
    if (!openObject) return;
    return lockScroll(scroll.el); // restore runs on close/unmount
  }, [openObject, scroll]);

  useFrame(() => {
    if (requested !== null && requested !== prev.current) {
      prev.current = requested;
      const el = scroll.el;
      const top = requested * (el.scrollHeight - el.clientHeight);
      el.scrollTo({ top, behavior: "smooth" });
      clear();
    }
  });
  return null;
}
