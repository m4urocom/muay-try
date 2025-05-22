"use client";

import { useEffect, useState } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          options={{
            fullScreen: { enable: true, zIndex: -10 },
            background: {
              color: { value: "rgba(20,46,71,0.33)" },
            },
            particles: {
              number: {
                value: 80,
                density: { enable: true },
              },
              color: {
                value: ["#21496B", "#fff1e0"],
              },
              shape: {
                type: ["circle", "edge"],
              },
              opacity: {
                value: 0.5,
                animation: { enable: true, speed: 0.5, sync: false },
              },
              size: {
                value: { min: 1, max: 4 },
                animation: { enable: true, speed: 2, sync: false },
              },
              move: {
                enable: true,
                speed: { min: 1, max: 3 },
                direction: "top",
                straight: false,
                outModes: { default: "out" },
                random: true,
              },
            },
            interactivity: {
              detectsOn: "canvas",
              events: {
                onHover: { enable: false, mode: "repulse" },
                onClick: { enable: false, mode: "push" },
                resize: { enable: true },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
} 