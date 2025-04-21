"use client";

import { useEffect, useState } from "react";
import CosmicCanvas from "./components/CosmicCanvas";

export default function Home() {
  const [typed, setTyped] = useState("");
  const [commandExecuted, setCommandExecuted] = useState(false);
  const fullCommand = "show portfolio";

  useEffect(() => {
    if (typed.length < fullCommand.length) {
      const timeout = setTimeout(() => {
        setTyped(fullCommand.slice(0, typed.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setCommandExecuted(true);
      }, 600);
    }
  }, [typed]);

  return (
    <main className="relative h-screen w-screen bg-black font-mono overflow-hidden">
      {!commandExecuted ? (
        <div className="flex items-center justify-center h-full text-green-400 text-lg">
          <p>
            jaswanth@portfolio:~${" "}
            <span>
              {typed}
              <span className="animate-pulse">|</span>
            </span>
          </p>
        </div>
      ) : (
        <CosmicCanvas />
      )}
    </main>
  );
}
