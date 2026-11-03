/**
 * Fundo animado — Card 02 ACOMPANHAR.
 * Ondas de ripple saindo do centro, como sinal de transmissão ao vivo.
 * Cor: azul (telemetry-blue), opacidade muito baixa.
 */
export function PillarBgWatch() {
  return (
    <svg
      viewBox="0 0 200 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="pillar-card-bg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Três ondas concêntricas */}
      <circle cx="160" cy="60" r="4" fill="none" stroke="#2563eb" strokeWidth="1.5" className="pc-ripple-1" />
      <circle cx="160" cy="60" r="4" fill="none" stroke="#2563eb" strokeWidth="1.5" className="pc-ripple-2" />
      <circle cx="160" cy="60" r="4" fill="none" stroke="#2563eb" strokeWidth="1.5" className="pc-ripple-3" />

      {/* Ponto central pulsando */}
      <circle cx="160" cy="60" r="4" fill="#2563eb" opacity="0.5" className="pc-center-dot" />

      {/* Linhas de sinal — decorativas */}
      <line x1="100" y1="30" x2="135" y2="55" stroke="#2563eb" strokeWidth="0.5" opacity="0.08" />
      <line x1="100" y1="90" x2="135" y2="65" stroke="#2563eb" strokeWidth="0.5" opacity="0.08" />
    </svg>
  );
}
