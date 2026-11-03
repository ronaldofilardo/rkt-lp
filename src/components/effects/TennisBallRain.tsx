'use client';

import { useEffect, useRef, useState } from 'react';
import { TennisBallIcon } from './TennisBallIcon';

interface Ball {
  id: string;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  side: number;
  rot: number;
  fall: number;
}

function createBatch(): Ball[] {
  const count = Math.floor(Math.random() * 5) + 8; // 8 a 12 bolinhas
  const min = Math.floor(Math.random() * 8) + 20; // 20px a 28px
  const dur = 4.8 + Math.random() * 1.6; // 66% mais lenta: ~4.8s a 6.4s de queda
  const sway = 35 + Math.random() * 45;

  return Array.from({ length: count }, (_, i) => ({
    id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
    left: Math.random() * 90 + 5,
    top: -15 - Math.random() * 15,
    size: min + Math.random() * 10,
    delay: Math.random() * 0.7,
    duration: dur + (Math.random() * 0.6 - 0.3),
    side: (Math.random() - 0.5) * sway * 2,
    rot: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 280),
    fall: 105 + Math.random() * 15,
  }));
}

export function TennisBallRain({ targetIds = ['paixao', 'conhecimento-artigos'] }) {
  const [balls, setBalls] = useState<Ball[]>([]);
  const triggered = useRef<Set<string>>(new Set());

  const spawnRain = () => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setBalls((prev) => [...prev, ...createBatch()]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !triggered.current.has(e.target.id)) {
          triggered.current.add(e.target.id);
          spawnRain();
        }
      });
    }, { threshold: 0.3 });

    targetIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [targetIds]);

  if (balls.length === 0) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {balls.map((b) => (
        <span
          key={b.id}
          onAnimationEnd={() => setBalls((prev) => prev.filter((x) => x.id !== b.id))}
          className="tennis-ball-rain"
          style={{
            left: `${b.left}vw`,
            top: `${b.top}vh`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            '--side': `${b.side}px`,
            '--rot': `${b.rot}deg`,
            '--fall': `${b.fall}vh`,
          } as React.CSSProperties}
        >
          <TennisBallIcon size={b.size} />
        </span>
      ))}
    </div>
  );
}
