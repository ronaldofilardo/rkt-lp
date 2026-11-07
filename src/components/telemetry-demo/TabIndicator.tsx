'use client';

interface Props {
  tabIndex: number;
  totalTabs: number;
}

/**
 * Pílula deslizante indicadora da aba ativa.
 * Transita suavemente com cubic-bezier de desaceleração de tênis (--rkt-ease-rally).
 */
export function TabIndicator({ tabIndex, totalTabs }: Props) {
  const widthPct = 100 / (totalTabs || 1);
  const leftPct = tabIndex * widthPct;

  return (
    <div
      aria-hidden="true"
      className="tab-indicator pointer-events-none absolute bottom-0 h-0.5 bg-telemetry-volt transition-all duration-200 ease-out"
      style={{
        width: `${widthPct}%`,
        left: `${leftPct}%`,
        boxShadow: '0 0 8px rgba(204,255,0,0.5)',
      }}
    />
  );
}

