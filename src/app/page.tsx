"use client";

import { useEffect, useState } from "react";
import CosmicCanvas from "./components/CosmicCanvas";

export default function Home() {
  const [typed, setTyped] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [commandExecuted, setCommandExecuted] = useState(false);
  const [jasbotTriggered, setJasbotTriggered] = useState(false);

  const fullPrompt = "jaswanth@portfolio:~$";

  useEffect(() => {
    if (typed.length < fullPrompt.length) {
      const timeout = setTimeout(() => {
        setTyped(fullPrompt.slice(0, typed.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setMenuVisible(true), 600);
    }
  }, [typed]);

  const handleCommand = (type: "portfolio" | "jasbot") => {
    if (type === "portfolio") setCommandExecuted(true);
    if (type === "jasbot") setJasbotTriggered(true);
  };

  return (
    <main className="relative h-screen w-screen bg-black font-mono overflow-hidden text-green-400 flex items-center justify-center px-4">
      {!commandExecuted && !jasbotTriggered ? (
        <div className="space-y-4 text-center">
          <p className="text-lg">
            {typed}
            <span className="animate-pulse">|</span>
          </p>

          {menuVisible && (
            <div className="mt-6 space-y-2 text-left text-sm sm:text-base">
              <p
                className="hover:text-lime-400 cursor-pointer"
                onClick={() => handleCommand("portfolio")}
              >
                [1] show portfolio
              </p>
              <p
                className="hover:text-cyan-300 cursor-pointer"
                onClick={() => handleCommand("jasbot")}
              >
                [2] run jasbot
              </p>
            </div>
          )}
        </div>
      ) : jasbotTriggered ? (
        <div className="flex flex-col items-center justify-center h-full text-white space-y-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            🤖 JasBot Activated
          </h1>
          <p className="text-teal-300 text-lg">
            Hey human, I&apos;m Jaswanth&apos;s AI twin.
          </p>

          <p className="text-white/70 text-sm">
            Conversational interface coming soon...
          </p>
        </div>
      ) : (
        <CosmicCanvas />
      )}
    </main>
  );
}
