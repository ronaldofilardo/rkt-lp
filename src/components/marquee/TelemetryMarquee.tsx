/**
 * Etapa 9 — faixa técnica com métricas reais da fixture.
 * Animação puramente CSS (sem JS). prefers-reduced-motion: pausa.
 * Apenas nomes de métricas existentes nos contratos de telemetry.types.ts.
 */

const METRICS = [
  '1º Saque %',
  'Pts ganhos no 1S',
  'Aces',
  'Duplas faltas',
  'Break points salvos',
  'Break points convertidos',
  'Ret. 1º Saque %',
  'Ret. 2º Saque %',
  'Games de devolução ganhos',
  'Game points %',
  'Set points %',
  'Tiebreaks vencidos',
  'Winners',
  'Erros não forçados',
  'Abordagens à rede %',
  'Ralis curtos / médios / longos',
  'Pontos totais',
  'Maior sequência',
] as const;

function MetricPill({ label }: { label: string }) {
  return (
    <span className="mx-4 inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-widest text-telemetry-text-muted">
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-telemetry-volt opacity-50" />
      {label}
    </span>
  );
}

export function TelemetryMarquee() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-telemetry-border/10 bg-telemetry-base py-3"
    >
      <div className="marquee-track flex w-max">
        {/* Duplicado para loop contínuo */}
        {[...METRICS, ...METRICS].map((m, i) => (
          <MetricPill key={i} label={m} />
        ))}
      </div>
    </div>
  );
}
