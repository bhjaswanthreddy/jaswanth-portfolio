"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useState } from "react";
import ClickableStar from "./ClickableStar";
import SectionModal from "./SectionModal";
import AboutMe from "./AboutMe";
import projects from "../data/projects.json";
import ProjectCard from "./ProjectCard";
import skills from "../data/skills.json";
import SkillCard from "./SkillCard";
export default function CosmicCanvas() {
  const [activeSection, setActiveSection] = useState<null | string>(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      >
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <Stars
          radius={100}
          depth={50}
          count={10000}
          factor={4}
          saturation={0}
          fade
        />

        <ClickableStar
          label="About"
          position={[2, 1, 0]}
          onClick={() => setActiveSection("About")}
        />
        <ClickableStar
          label="Projects"
          position={[-2, 0, 1]}
          onClick={() => setActiveSection("Projects")}
        />
        <ClickableStar
          label="Skills"
          position={[0, -2, -1]}
          onClick={() => setActiveSection("Skills")}
        />
      </Canvas>

      {activeSection && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <SectionModal onClose={() => setActiveSection(null)}>
            {activeSection === "About" && <AboutMe />}
            {activeSection === "Projects" && (
              <div className="w-full max-h-[70vh] overflow-y-auto space-y-4 pr-2">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    tech={project.tech}
                    summary={project.summary}
                  />
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
          </SectionModal>
        </div>
      )}
    </div>
  );
}
