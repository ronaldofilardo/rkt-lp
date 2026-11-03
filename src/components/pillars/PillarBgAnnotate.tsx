/**
 * Fundo animado — Card 01 ANOTAR.
 * Simula a trajetória de uma bolinha num rali (dois segmentos em V),
 * com anel de impacto e ponto registrado ao final.
 * Cor: volt (#ccff00), opacidade muito baixa para não competir com o texto.
 */
export function PillarBgAnnotate() {
  return (
    <svg
      viewBox="0 0 200 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="pillar-card-bg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Linhas de rali: ida e volta em V */}
      <polyline
        points="10,100 100,20 190,100"
        fill="none"
        stroke="#ccff00"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.18"
        className="pc-rally-a"
      />
      <polyline
        points="10,100 100,20 190,100"
        fill="none"
        stroke="#ccff00"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.10"
        className="pc-rally-b"
      />

      {/* Anel de impacto no ponto final */}
      <circle cx="190" cy="100" r="0" fill="none" stroke="#ccff00" strokeWidth="1" opacity="0.4" className="pc-ring-a" />

      {/* Ponto registrado */}
      <circle cx="190" cy="100" r="0" fill="#ccff00" opacity="0.5" className="pc-dot-a" />

      {/* Grade de quadra levíssima */}
      <line x1="0" y1="60" x2="200" y2="60" stroke="#ccff00" strokeWidth="0.5" opacity="0.06" />
      <line x1="100" y1="0" x2="100" y2="120" stroke="#ccff00" strokeWidth="0.5" opacity="0.06" />
    </svg>
  );
}
