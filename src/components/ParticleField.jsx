import { useState } from 'react';

export default function ParticleField({ isDark }) {
  const [particles] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 15,
      opacity: Math.random() * 0.4 + 0.1,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-particle-drift"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: isDark
              ? `rgba(245, 136, 64, ${p.opacity})`
              : `rgba(100, 116, 139, ${p.opacity})`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
