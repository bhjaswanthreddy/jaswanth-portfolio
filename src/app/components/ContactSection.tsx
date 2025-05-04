export default function ContactSection() {
  return (
    <div className="text-white text-center space-y-2">
      <h2 className="text-xl font-bold mb-2">📬 Contact</h2>
      <p>
        Email:{" "}
        <a href="mailto:bhjaswanthreddy@gmail.com" className="underline">
          jaswanth@email.com
        </a>
      </p>
      <p>
        LinkedIn:{" "}
        <a
          href="https://www.linkedin.com/in/bhjaswanthreddy/"
          target="_blank"
          className="underline"
        >
          linkedin.com/in/jaswanth
        </a>
      </p>
    </div>
  );
}
