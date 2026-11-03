/**
 * Malha vetorial da quadra de tênis (vista superior simplificada).
 * Usa currentColor para respeitar o dual-theme via CSS sem props extras.
 * É puramente decorativo: aria-hidden em todos os elementos.
 */
export function CourtLines() {
  return (
    <svg
      viewBox="0 0 800 440"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-[0.07]"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Fundo da quadra */}
      <rect x="80" y="40" width="640" height="360" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Linha central (rede) */}
      <line x1="400" y1="40" x2="400" y2="400" stroke="currentColor" strokeWidth="2" />
      {/* Linhas de serviço */}
      <line x1="80" y1="160" x2="400" y2="160" stroke="currentColor" strokeWidth="1.5" />
      <line x1="400" y1="160" x2="720" y2="160" stroke="currentColor" strokeWidth="1.5" />
      <line x1="80" y1="280" x2="400" y2="280" stroke="currentColor" strokeWidth="1.5" />
      <line x1="400" y1="280" x2="720" y2="280" stroke="currentColor" strokeWidth="1.5" />
      {/* Linha central de serviço */}
      <line x1="240" y1="160" x2="240" y2="280" stroke="currentColor" strokeWidth="1.5" />
      <line x1="560" y1="160" x2="560" y2="280" stroke="currentColor" strokeWidth="1.5" />
      {/* Rede */}
      <line x1="80" y1="220" x2="720" y2="220" stroke="currentColor" strokeWidth="3" strokeDasharray="6 4" />
    </svg>
  );
}
