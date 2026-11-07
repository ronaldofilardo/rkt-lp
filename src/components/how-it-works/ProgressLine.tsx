'use client';

import { useEffect, useState } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { ProgressBall } from './ProgressBall';

interface Props { stepCount: number }

/**
 * Linha de progresso animada com o scroll.
 * CSS scroll-timeline é prioritário para zero overhead de re-render.
 * Fallback via useScrollProgress quando scroll-timeline não estiver disponível.
 * prefers-reduced-motion: linha e bola aparecem completas/estáticas de imediato.
 */
export function ProgressLine({ stepCount }: Props) {
  const { ref, progress } = useScrollProgress(0.3);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  const segmentPct = stepCount > 1 ? 100 / (stepCount - 1) : 100;
  const maxPctFactor = (100 - segmentPct) / 100;
  const pct = reducedMotion ? 100 : Math.round(progress * 100 * maxPctFactor);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      aria-hidden="true"
      className="how-progress-line pointer-events-none absolute inset-x-5 top-5 hidden h-px bg-telemetry-border/10 md:block"
      style={{ '--progress-max': String(maxPctFactor) } as React.CSSProperties}
    >
      <div
        className="how-progress-fill h-full bg-telemetry-volt transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
      <ProgressBall progress={reducedMotion ? 1 : progress} />
    </div>
  );
}
