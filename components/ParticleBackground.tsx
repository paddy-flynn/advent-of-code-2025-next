'use client';
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: { value: "transparent" },
        },
        fpsLimit: 60,
        particles: {
          number: { value: 80, density: { enable: true, width: 1920, height: 1080 } },
          color: { value: ["#d4af37", "#f0f8ff", "#90ee90", "#f4d03f"] },
          shape: {
            type: ["circle", "star"],
            options: {
              star: {
                sides: 6,
              }
            }
          },
          opacity: {
            value: { min: 0.2, max: 0.5 },
            animation: { enable: true, speed: 0.3, sync: false }
          },
          size: {
            value: { min: 2, max: 5 },
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: "bottom",
            outModes: { default: "out" },
            straight: false,
            drift: 0,
          },
          rotate: {
            value: { min: 0, max: 360 },
            direction: "random",
            animation: {
              enable: true,
              speed: 2,
            }
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "bubble" },
          },
          modes: {
            bubble: { distance: 100, size: 8, duration: 2, opacity: 0.8 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );
};

export default ParticleBackground;
