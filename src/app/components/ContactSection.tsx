import aboutData from "../data/about.json";

export default function ContactSection() {
  return (
    <div className="text-white text-center space-y-2">
      <h2 className="text-xl font-bold mb-2">📬 Contact</h2>
      <p>
        Email:{" "}
        <a href={`mailto:${aboutData.email}`} className="underline">
          {aboutData.email}
        </a>
      </p>
      <p>
        LinkedIn:{" "}
        <a
          href={aboutData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {aboutData.linkedin.replace("https://", "")}
        </a>
      </p>
    </div>
  );
}
