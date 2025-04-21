"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Html } from "@react-three/drei";

interface StarNodeProps {
  position: [number, number, number];
  label: string;
  onClick: () => void;
}

export default function StarNode({ position, label, onClick }: StarNodeProps) {
  const meshRef = useRef<Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          console.log("Clicked:", label);
          onClick();
        }}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial emissive={"#00ffcc"} color={"#00ffff"} />
      </mesh>

      <Html center distanceFactor={10}>
        <div className="text-white text-xs bg-black/70 px-2 py-1 rounded-md pointer-events-none">
          {label}
        </div>
      </Html>
    </group>
  );
}
