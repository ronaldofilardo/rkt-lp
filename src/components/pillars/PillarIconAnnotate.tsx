/** Mini-SVG animado: toque na quadra → ponto registrado. Decorativo. */
export function PillarIconAnnotate() {
  return (
    <svg viewBox="0 0 64 64" width="48" height="48" aria-hidden="true" className="shrink-0">
      {/* Quadra simplificada */}
      <rect x="8" y="16" width="48" height="32" rx="2" fill="none"
        stroke="rgb(var(--telemetry-volt))" strokeWidth="1.5" opacity=".4" />
      <line x1="32" y1="16" x2="32" y2="48"
        stroke="rgb(var(--telemetry-volt))" strokeWidth="1" opacity=".3" />
      <line x1="8" y1="32" x2="56" y2="32"
        stroke="rgb(var(--telemetry-volt))" strokeWidth="1.5" opacity=".5" strokeDasharray="3 2" />
      {/* Ponto registrado */}
      <circle cx="38" cy="26" r="4"
        fill="rgb(var(--telemetry-volt))"
        className="origin-[38px_26px] animate-[pillar-pulse_2s_ease-in-out_infinite]" />
      <circle cx="38" cy="26" r="7"
        fill="none" stroke="rgb(var(--telemetry-volt))" strokeWidth="1" opacity=".35"
        className="origin-[38px_26px] animate-[pillar-ring_2s_ease-in-out_infinite]" />
    </svg>
  );
}
