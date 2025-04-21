"use client";

import { useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface ClickableStarProps {
  position: [number, number, number];
  label: string;
  onClick: () => void;
}

export default function ClickableStar({
  position,
  label,
  onClick,
}: ClickableStarProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          console.log(`🌟 Star Clicked: ${label}`);
          onClick();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive={hovered ? "#00ccff" : "#002233"}
          emissiveIntensity={0.6}
        />
      </mesh>
      <Html center distanceFactor={10}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            console.log(`📝 Label Clicked: ${label}`);
            onClick();
          }}
          className="text-white text-sm bg-black/80 px-2 py-1 rounded cursor-pointer select-none hover:bg-white/10 transition"
        >
          {label}
        </div>
      </Html>
    </group>
  );
}
