"use client";
import aboutData from "../data/about.json";

export default function AboutMe() {
  return (
    <div className="bg-white/10 backdrop-blur-md text-white p-6 rounded-xl max-w-lg shadow-xl space-y-4">
      <h2 className="text-2xl font-bold">{aboutData.name}</h2>
      <p>{aboutData.tagline}</p>
      <div>
        <h3 className="font-semibold">📍 {aboutData.location}</h3>
        <p>📧 {aboutData.email}</p>
        <p>
          🔗{" "}
          <a className="underline" href={aboutData.linkedin} target="_blank">
            LinkedIn
          </a>
        </p>
        <p>
          🐱{" "}
          <a className="underline" href={aboutData.github} target="_blank">
            GitHub
          </a>
        </p>
      </div>
      <div>
        <h3 className="font-semibold">🎓 Education</h3>
        <ul className="list-disc ml-5">
          {aboutData.education.map((edu, i) => (
            <li key={i}>
              {edu.degree} – <strong>{edu.school}</strong> ({edu.date})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
