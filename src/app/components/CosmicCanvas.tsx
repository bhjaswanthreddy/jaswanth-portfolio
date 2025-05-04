"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Line } from "@react-three/drei";
import { useState } from "react";
import ClickableStar from "./ClickableStar";
import SectionModal from "./SectionModal";
import AboutMe from "./AboutMe";
import ProjectCard from "./ProjectCard";
import SkillCard from "./SkillCard";
import projects from "../data/projects.json";
import skills from "../data/skills.json";
import * as THREE from "three";

export default function CosmicCanvas() {
  const [activeSection, setActiveSection] = useState<null | string>(null);

  // 🌍 Planets with IDs + Planet Types
  const starSections: { label: string; id: string; planetType: string }[] = [
    { label: "Jaswanth", id: "Sun", planetType: "sun" },
    { label: "About", id: "About", planetType: "earth" },
    { label: "Experience", id: "Experience", planetType: "mars" },
    { label: "Projects", id: "Projects", planetType: "jupiter" },
    { label: "Skills", id: "Skills", planetType: "saturn" },
    { label: "Education", id: "Education", planetType: "neptune" },
    { label: "Achievements", id: "Achievements", planetType: "venus" },
    { label: "Certifications", id: "Certifications", planetType: "mercury" },
    { label: "Contact", id: "Contact", planetType: "earth" },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60 }}
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      >
        {/* 🌌 Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffffaa" />

        {/* ✨ Stars */}
        <Stars
          radius={150}
          depth={80}
          count={15000}
          factor={5}
          saturation={0}
          fade
        />

        {/* 🔭 Orbit Controls */}
        <OrbitControls enableZoom enablePan enableRotate />

        {/* 🪐 Render Orbits + Planets */}
        {starSections.map((star, index) => {
          let x = 0,
            y = 0,
            z = 0;

          if (star.planetType === "sun") {
            x = y = z = 0;
          } else {
            const radius = 6 + index * 2;
            const angle = (index / (starSections.length - 1)) * Math.PI * 2;
            x = radius * Math.cos(angle);
            z = radius * Math.sin(angle);
            y = Math.sin(angle * 2) * 1.5;

            // 🌐 Add orbit line
            const orbitPoints: THREE.Vector3[] = [];
            for (let a = 0; a <= Math.PI * 2; a += 0.1) {
              orbitPoints.push(
                new THREE.Vector3(radius * Math.cos(a), 0, radius * Math.sin(a))
              );
            }

            // 🟢 Orbit ring
            return (
              <group key={star.id}>
                <Line
                  points={orbitPoints}
                  color="white"
                  lineWidth={0.5}
                  dashed
                  dashSize={0.3}
                  gapSize={0.2}
                />
                <ClickableStar
                  label={star.label}
                  planetType={star.planetType}
                  position={[x, y, z]}
                  onClick={() => setActiveSection(star.id)}
                />
              </group>
            );
          }

          // ☀️ Center Sun
          return (
            <ClickableStar
              key={star.id}
              label={star.label}
              planetType={star.planetType}
              position={[x, y, z]}
              onClick={() => setActiveSection(star.id)}
            />
          );
        })}
      </Canvas>

      {/* 🧭 Modal Section Content */}
      {activeSection && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <SectionModal onClose={() => setActiveSection(null)}>
            {activeSection === "About" && <AboutMe />}
            {activeSection === "Projects" && (
              <div className="w-full max-h-[70vh] overflow-y-auto space-y-4 pr-2">
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>
            )}
            {activeSection === "Skills" && (
              <div className="max-h-[70vh] overflow-y-auto space-y-4 pr-2">
                <h2 className="text-2xl font-bold mb-4 text-teal-300">
                  ⚙️ Technical Skills
                </h2>
                {Object.entries(skills).map(([category, items], index) => (
                  <SkillCard
                    key={index}
                    category={category}
                    skills={items as string[]}
                  />
                ))}
              </div>
            )}
            {/* You can add additional sections like Education, Contact, etc. here */}
          </SectionModal>
        </div>
      )}
    </div>
  );
}
