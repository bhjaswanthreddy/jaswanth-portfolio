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

  // 🌍 Load texture dynamically
  const texture = useTexture(`/textures/${planetType}.jpg`);

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
      {/* 🌐 Planet Sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* 🟠 Increased planet size */}
        <sphereGeometry args={[1.0, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={hovered ? "#ffffff" : "#111111"}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* 🪐 Saturn Ring */}
      {planetType === "saturn" && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.7, 64]} />
          <meshBasicMaterial
            color="gold"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* 🏷️ Label */}
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
