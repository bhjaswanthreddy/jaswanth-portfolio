"use client";

export default function SunContent() {
  return (
    <div className="text-white max-w-xl mx-auto text-center space-y-6">
      <h2 className="text-3xl sm:text-4xl font-bold text-yellow-300">
        Jaswanth Reddy Bhimavarapu
      </h2>

      <p className="text-sm sm:text-base text-white/80 leading-relaxed">
        I’m a graduate student in Information Systems at Saint Louis University,
        with a background in Computer Science and hands-on experience in machine
        learning, full-stack development, and data analysis. My work spans
        across AI-based projects, sentiment analysis, and cloud-based app
        development.
      </p>

      <div className="text-left space-y-3 text-white/70 text-sm sm:text-base">
        <div>
          <span className="font-semibold text-white">Current Program:</span>
          <br />
          MS in Information Systems, Saint Louis University (GPA: 3.60)
        </div>

        <div>
          <span className="font-semibold text-white">Previous Education:</span>
          <br />
          B.Tech in Computer Science, GITAM University (GPA: 3.15)
        </div>

        <div>
          <span className="font-semibold text-white">Work Experience:</span>
          <br />
          Software Engineer Intern – Verzeo (India)
          <br />
          Focused on sentiment analysis and predictive modeling
        </div>

        <div>
          <span className="font-semibold text-white">Skills:</span>
          <br />
          Python, Java, SQL, React, Node.js, Docker, GCP, Agile, MATLAB,
          Jenkinsfile
        </div>

        <div>
          <span className="font-semibold text-white">Projects:</span>
          <br />
          Fault Diagnosis in Power Systems, Generative AI in BI, Lab Equipment
          Manager, Dynamic Marketing Analysis
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <a
          href="/Jaswanth_Resume.pdf"
          download
          className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded font-semibold text-sm"
        >
          View Resume
        </a>
        <a
          href="https://linkedin.com/in/bhjaswanthreddy"
          target="_blank"
          className="border border-white/30 hover:bg-white/10 px-4 py-2 rounded text-sm"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/bhjaswanthreddy"
          target="_blank"
          className="border border-white/30 hover:bg-white/10 px-4 py-2 rounded text-sm"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
