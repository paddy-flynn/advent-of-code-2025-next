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
        fpsLimit: 30,
        particles: {
          number: { value: 80, density: { enable: true, width: 1920, height: 1080 } },
          color: { value: ["#ffffff", "#e8f4f8", "#b8e6f0"] },
          shape: {
            type: "square",
          },
          opacity: {
            value: { min: 0.7, max: 1 },
            animation: { enable: false }
          },
          size: {
            value: { min: 3, max: 8 },
          },
          move: {
            enable: true,
            speed: { min: 0.5, max: 1.5 },
            direction: "bottom",
            outModes: { default: "out" },
            straight: true,
            drift: 0,
            warp: false,
          },
          wobble: {
            enable: false,
          },
          rotate: {
            value: 0,
            direction: "clockwise",
            animation: {
              enable: false,
            }
          },
        },
        interactivity: {
          events: {
            onHover: { enable: false },
          },
        },
        detectRetina: false,
        smooth: false,
      }}
      className="absolute inset-0 -z-10"
      style={{ imageRendering: 'pixelated' }}
    />
  );
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
