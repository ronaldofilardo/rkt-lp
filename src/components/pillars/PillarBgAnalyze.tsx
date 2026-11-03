/**
 * Fundo animado — Card 03 ANALISAR.
 * Barras de gráfico crescendo em stagger + linha de dados correndo
 * da esquerda para a direita, como um feed de telemetria.
 * Cor: azul + volt no destaque.
 */
export function PillarBgAnalyze() {
  return (
    <svg
      viewBox="0 0 200 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="pillar-card-bg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Linha de eixo X */}
      <line x1="20" y1="80" x2="180" y2="80" stroke="white" strokeWidth="0.5" opacity="0.07" />

      {/* Barras crescendo */}
      <rect x="22"  y="50" width="14" height="30" rx="2" fill="#2563eb" opacity="0.18" className="pc-bar-1" />
      <rect x="42"  y="38" width="14" height="42" rx="2" fill="#2563eb" opacity="0.18" className="pc-bar-2" />
      <rect x="62"  y="55" width="14" height="25" rx="2" fill="#2563eb" opacity="0.18" className="pc-bar-3" />
      <rect x="82"  y="30" width="14" height="50" rx="2" fill="#ccff00" opacity="0.15" className="pc-bar-4" />

      {/* Linha de dados correndo — primeiro traçado */}
      <polyline
        points="20,72 50,55 80,65 110,40 140,50 170,30 190,38"
        fill="none"
        stroke="#ccff00"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.22"
        className="pc-data-line"
      />
      {/* Segundo traçado com delay — cria sensação de atualização */}
      <polyline
        points="20,72 50,60 80,50 110,58 140,35 170,42 190,28"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.14"
        className="pc-data-line-2"
      />

      {/* Ponto de destaque no pico */}
      <circle cx="110" cy="40" r="2.5" fill="#ccff00" opacity="0.3" />
    </svg>
  );
}
