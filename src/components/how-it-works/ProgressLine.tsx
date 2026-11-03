'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

interface Props { stepCount: number }

/**
 * Linha de progresso animada com o scroll.
 * Desktop: horizontal. Mobile: vertical (posicionada pelo pai).
 * prefers-reduced-motion: linha aparece completa de imediato.
 */
export function ProgressLine({ stepCount }: Props) {
  const { ref, progress } = useScrollProgress(0.3);

  const reducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const pct = reducedMotion ? 100 : Math.round(progress * 100);
  const segmentPct = stepCount > 1 ? 100 / (stepCount - 1) : 100;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-5 top-5 hidden h-px bg-telemetry-border/10 md:block"
    >
      <div
        className="h-full bg-telemetry-volt transition-[width] duration-300 ease-out"
        style={{ width: `${Math.min(pct, 100 - segmentPct)}%` }}
      />
    </div>
  );
}
