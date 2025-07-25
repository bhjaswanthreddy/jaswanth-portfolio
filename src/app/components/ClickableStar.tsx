"use client";

import { useRef, useState } from "react";
import { Html, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";

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

  const texture = useTexture(`/textures/${planetType}.jpg`);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (meshRef.current && groupRef.current) {
      meshRef.current.rotation.y += 0.005;
      groupRef.current.position.y =
        position[1] + Math.sin(t + position[0]) * 0.3;

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
        {/* Increased size from 1.0 to 1.8 */}
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={"#222222"}
          emissiveIntensity={hovered ? 0.9 : 0.4}
        />
      </mesh>

      {/* Saturn ring */}
      {planetType === "saturn" && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.2, 3.1, 64]} />
          <meshBasicMaterial
            color="gold"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      <Html center distanceFactor={10}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="text-white text-lg font-semibold bg-black/70 px-3 py-1.5 rounded-md cursor-pointer select-none hover:bg-white/10 hover:shadow-inner transition"
        >
          {label}
        </div>
      </Html>
    </group>
  );
}
