"use client";

interface ProjectCardProps {
  title: string;
  tech: string[];
  summary: string;
}

export default function ProjectCard({
  title,
  tech,
  summary,
}: ProjectCardProps) {
  return (
    <div className="w-full bg-white/5 border border-white/20 rounded-xl p-4 transition hover:bg-white/10 shadow-md hover:shadow-lg backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/80 mt-2">{summary}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {tech.map((item, idx) => (
          <span
            key={idx}
            className="bg-white/10 text-xs text-white px-2 py-1 rounded-full border border-white/20"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
