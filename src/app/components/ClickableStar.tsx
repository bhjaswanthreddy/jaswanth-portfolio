"use client";

import { useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface ClickableStarProps {
  position: [number, number, number];
  label: string;
  planetType: string;
  onClick: () => void;
}

export default function ClickableStar({
  position,
  label,
  planetType,
  onClick,
}: ClickableStarProps) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const colorMap: Record<string, string> = {
    earth: "#3fa9f5",
    mars: "#d24d4d",
    saturn: "#d8c271",
    neptune: "#406dce",
    venus: "#e3b062",
    mercury: "#999999",
    jupiter: "#f5c07a",
    pluto: "#a0a0ff",
  };

  const emissiveMap: Record<string, string> = {
    earth: "#1c4a6d",
    mars: "#992222",
    saturn: "#87743a",
    neptune: "#1e3b88",
    venus: "#b28640",
    mercury: "#666666",
    jupiter: "#c4903c",
    pluto: "#6666ff",
  };

  const color = colorMap[planetType] || "#00ffff";
  const emissive = emissiveMap[planetType] || "#002233";

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (meshRef.current && groupRef.current) {
      meshRef.current.rotation.y += 0.005;
      groupRef.current.position.y =
        position[1] + Math.sin(t + position[0]) * 0.2;

      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = hovered
        ? 0.9 + Math.sin(t * 3) * 0.3
        : 0.4 + Math.sin(t * 2) * 0.2;
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
          color={color}
          emissive={emissive}
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
