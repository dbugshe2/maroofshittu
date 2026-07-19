"use client";

/** Procedural cozy room: floor, back + two side walls, ceiling, window gap. */
export function RoomShell() {
  const wall = "#efe7d6";
  const floor = "#caa87e";
  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial color={floor} />
      </mesh>
      {/* ceiling */}
      <mesh position={[0, 3.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 9]} />
        <meshStandardMaterial color={wall} />
      </mesh>
      {/* back wall (z = -4.5) */}
      <mesh position={[0, 1.8, -4.5]} receiveShadow>
        <planeGeometry args={[9, 3.6]} />
        <meshStandardMaterial color={wall} />
      </mesh>
      {/* left wall (x = -4.5) */}
      <mesh position={[-4.5, 1.8, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[9, 3.6]} />
        <meshStandardMaterial color={wall} />
      </mesh>
      {/* right wall (x = 4.5) with a window frame accent */}
      <mesh position={[4.5, 1.8, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[9, 3.6]} />
        <meshStandardMaterial color={wall} />
      </mesh>
    </group>
  );
}
