'use client';
import { useEffect, useState, memo } from "react";

const FlyingSanta = memo(() => {
  const [santa, setSanta] = useState<{
    fromLeft: boolean;
    top: number;
    duration: number;
    key: number;
  } | null>(null);

  useEffect(() => {
    const spawnSanta = () => {
      const fromLeft = Math.random() < 0.5;
      const top = Math.random() * 80;
      const duration = 8000 + Math.random() * 7000;

      setSanta({
        fromLeft,
        top,
        duration,
        key: Date.now(),
      });

      setTimeout(() => {
        setSanta(null);
        setTimeout(spawnSanta, 1000);
      }, duration);
    };

    spawnSanta();
  }, []);

  if (!santa) {
    return null;
  }

  const startX = santa.fromLeft ? '-450px' : 'calc(100vw + 450px)';

  return (
    <div
      key={santa.key}
      className="fixed -z-10 pointer-events-none"
      style={{
        top: `${santa.top}%`,
        left: startX,
        animation: `flyAcross ${santa.duration}ms linear`,
        width: '450px',
        height: '200px',
      }}
    >
      <img
        src="/santa.png"
        alt=""
        style={{
          width: '100%',
          height: '100%',
          transform: santa.fromLeft ? 'scaleX(1)' : 'scaleX(-1)',
          imageRendering: 'pixelated',
        }}
      />
      <style jsx>{`
        @keyframes flyAcross {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(${santa.fromLeft ? 'calc(100vw + 900px)' : 'calc(-100vw - 900px)'});
          }
        }
      `}</style>
    </div>
  );
});

FlyingSanta.displayName = 'FlyingSanta';

export default FlyingSanta;
