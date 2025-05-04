"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useState } from "react";

import ClickableStar from "./ClickableStar";
import SectionModal from "./SectionModal";
import AboutMe from "./AboutMe";
import ProjectCard from "./ProjectCard";
import SkillCard from "./SkillCard";

import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import AchievementsSection from "./AchievementsSection";
import CertificationsSection from "./CertificationsSection";
import ContactSection from "./ContactSection";

import projects from "../data/projects.json";
import skills from "../data/skills.json";

export default function CosmicCanvas() {
  const [activeSection, setActiveSection] = useState<null | string>(null);

  const starSections: { label: string; id: string; planetType: string }[] = [
    { label: "About", id: "About", planetType: "earth" },
    { label: "Experience", id: "Experience", planetType: "mars" },
    { label: "Projects", id: "Projects", planetType: "jupiter" },
    { label: "Skills", id: "Skills", planetType: "saturn" },
    { label: "Education", id: "Education", planetType: "neptune" },
    { label: "Achievements", id: "Achievements", planetType: "venus" },
    { label: "Certifications", id: "Certifications", planetType: "pluto" },
    { label: "Contact", id: "Contact", planetType: "mercury" },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          touchAction: "none",
        }}
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

        {starSections.map((star, index) => {
          const radius = 4;
          const angle = (index / starSections.length) * Math.PI * 2;
          const x = radius * Math.cos(angle);
          const z = radius * Math.sin(angle);
          const y = Math.sin(angle * 2) * 1.2;

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

            {activeSection === "Experience" && <ExperienceSection />}
            {activeSection === "Education" && <EducationSection />}
            {activeSection === "Achievements" && <AchievementsSection />}
            {activeSection === "Certifications" && <CertificationsSection />}
            {activeSection === "Contact" && <ContactSection />}
          </SectionModal>
        </div>
      )}
    </div>
  );
}
