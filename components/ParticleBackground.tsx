'use client';
import { useEffect, useState, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = memo(() => {
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
            animation: { enable: true, speed: 0.5, sync: true }
          },
          size: {
            value: { min: 1, max: 6 },
          },
          move: {
            enable: true,
            speed: { min: 0.1, max: 0.3 },
            direction: "bottom",
            outModes: { default: "out" },
            straight: false,
            drift: 0,
            warp: false,
          },
          wobble: {
            enable: true,
            distance: 8,
            speed: 0.3,
          },
          rotate: {
            value: { min: 0, max: 360 },
            direction: "random",
            animation: {
              enable: true,
              speed: 1,
              sync: true,
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
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
