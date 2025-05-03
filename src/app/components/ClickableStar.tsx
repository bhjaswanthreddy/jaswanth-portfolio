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
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (meshRef.current && groupRef.current) {
      // 🌀 Slow rotation
      meshRef.current.rotation.y += 0.005;

      // 🌊 Floating (Y axis)
      groupRef.current.position.y =
        position[1] + Math.sin(t + position[0]) * 0.2;

      // 🔆 Pulsing emissive intensity
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = hovered
        ? 0.9 + Math.sin(t * 3) * 0.3 // hover = brighter + animated pulse
        : 0.4 + Math.sin(t * 2) * 0.2; // idle = subtle pulse
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ccff"
          emissiveIntensity={0.6}
        />
      </mesh>

      <Html center distanceFactor={10}>
        <div
          onClick={(e) => {
            e.stopPropagation();
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
