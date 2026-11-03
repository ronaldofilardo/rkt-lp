/** Mini-SVG estático: ícone de acompanhamento (funcionalidade futura). Decorativo. */
export function PillarIconWatch() {
  return (
    <svg viewBox="0 0 64 64" width="48" height="48" aria-hidden="true" className="shrink-0">
      {/* Olho */}
      <ellipse cx="32" cy="32" rx="20" ry="12"
        fill="none" stroke="rgb(var(--telemetry-blue))" strokeWidth="1.5" opacity=".5" />
      <circle cx="32" cy="32" r="5" fill="rgb(var(--telemetry-blue))" opacity=".6" />
      {/* Traço "em breve" */}
      <line x1="44" y1="20" x2="48" y2="16"
        stroke="rgb(var(--telemetry-blue))" strokeWidth="1.5" opacity=".4" />
      <line x1="48" y1="16" x2="52" y2="20"
        stroke="rgb(var(--telemetry-blue))" strokeWidth="1.5" opacity=".4" />
    </svg>
  );
}
