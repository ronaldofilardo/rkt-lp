'use client';

import { useEffect, useRef } from 'react';
import type { SimulatedMatchFixture } from '@/types/telemetry.types';
import { HeroScoreboard } from './HeroScoreboard';
import { HeroServeCard } from './HeroServeCard';

interface Props { match: SimulatedMatchFixture }

/**
 * Artefatos flutuantes do Hero.
 * Fade-in via IntersectionObserver; prefers-reduced-motion: animação desativada por CSS global.
 */
export function HeroArtifacts({ match }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('hero-visible');
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('hero-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="hero-artifacts flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center md:absolute md:inset-0 md:flex-col md:items-end md:justify-center md:gap-6 md:pr-4"
    >
      <div className="artifact-a md:translate-x-4">
        <HeroScoreboard match={match} />
      </div>
      <div className="artifact-b md:-translate-x-2 md:translate-y-6">
        <HeroServeCard serve={match.serve.player1} playerInitials={match.player1.initials} />
      </div>
    </div>
  );
}
