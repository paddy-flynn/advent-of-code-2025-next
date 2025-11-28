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
          number: { value: 120, density: { enable: true, width: 1920, height: 1080 } },
          color: { value: ["#ffffff", "#f0f8ff", "#e6f3ff", "#d4e9ff"] },
          shape: {
            type: "star",
            options: {
              star: {
                sides: 6,
              }
            }
          },
          opacity: {
            value: { min: 0.3, max: 0.8 },
            animation: { enable: true, speed: 0.1, sync: false }
          },
          size: {
            value: { min: 1, max: 6 },
          },
          move: {
            enable: true,
            speed: 0.2,
            direction: "bottom",
            outModes: { default: "out" },
            straight: false,
            drift: { min: -0.5, max: 0.5 },
            warp: false,
          },
          wobble: {
            enable: true,
            distance: 10,
            speed: { min: 0.2, max: 0.6 },
          },
          rotate: {
            value: { min: 0, max: 360 },
            direction: "random",
            animation: {
              enable: true,
              speed: 0.2,
            }
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "bubble" },
          },
          modes: {
            bubble: { distance: 150, size: 10, duration: 2, opacity: 1 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );
};

export default ParticleBackground;
