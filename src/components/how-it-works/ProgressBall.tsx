'use client';

interface Props {
  /** Progresso de 0 a 1 (quando em modo fallback JS) */
  progress?: number;
}

/**
 * ProgressBall — Marcador volt de 8px que percorre a linha como uma bolinha de tênis.
 * Em navegadores com CSS scroll-timeline, a posição é calculada diretamente pelo scroll sem JS.
 * Em navegadores legados, interpola conforme a prop `progress`.
 */
export function ProgressBall({ progress = 0 }: Props) {
  const pct = Math.min(100, Math.max(0, Math.round(progress * 100)));

  return (
    <div
      aria-hidden="true"
      className="progress-ball absolute -top-[3.5px] left-0 h-2 w-2 rounded-full bg-telemetry-volt shadow-[0_0_8px_rgba(204,255,0,0.8)] pointer-events-none transition-transform duration-100 ease-out"
      style={{
        transform: `translateX(calc(${pct}% * var(--progress-max, 1) - 4px))`,
      }}
    />
  );
}

