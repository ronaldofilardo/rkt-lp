/** Mini-SVG: barras de telemetria subindo em stagger. Decorativo. */
export function PillarIconAnalyze() {
  const bars = [
    { x: 10, h: 20, delay: '0s'    },
    { x: 22, h: 32, delay: '0.15s' },
    { x: 34, h: 24, delay: '0.3s'  },
    { x: 46, h: 40, delay: '0.45s' },
  ] as const;

  return (
    <svg viewBox="0 0 64 64" width="48" height="48" aria-hidden="true" className="shrink-0">
      <line x1="6" y1="54" x2="58" y2="54"
        stroke="rgb(var(--telemetry-border))" strokeWidth="1" opacity=".2" />
      {bars.map((b) => (
        <rect
          key={b.x}
          x={b.x} y={54 - b.h} width="10" height={b.h} rx="2"
          fill="rgb(var(--telemetry-blue))" opacity=".7"
          style={{ animationDelay: b.delay }}
          className="origin-bottom animate-[pillar-bar_2.4s_ease-in-out_infinite]"
        />
      ))}
    </svg>
  );
}
