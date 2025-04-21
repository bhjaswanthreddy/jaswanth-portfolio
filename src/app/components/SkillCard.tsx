"use client";

interface SkillCardProps {
  category: string;
  skills: string[];
}

export default function SkillCard({ category, skills }: SkillCardProps) {
  return (
    <div className="w-full bg-white/5 border border-white/20 rounded-xl p-4 transition hover:bg-white/10 shadow-md hover:shadow-lg backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white">{category}</h3>
      <div className="flex flex-wrap gap-2 mt-3">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-white/10 text-xs text-white px-2 py-1 rounded-full border border-white/20"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
