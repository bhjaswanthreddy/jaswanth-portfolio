// pages/index.tsx
import { useEffect, useState } from "react";
import Head from "next/head";
import CosmicCanvas from "../components/CosmicCanvas";

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
    <>
      <Head>
        <title>Jaswanth Portfolio</title>
      </Head>
      <main className="h-screen w-full bg-black text-green-400 font-mono flex items-center justify-center">
        {!commandExecuted ? (
          <div className="text-lg">
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
    </>
  );
}
