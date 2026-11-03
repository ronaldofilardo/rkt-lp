import type { ServeStats } from '@/types/telemetry.types';

interface Props { serve: ServeStats; playerInitials: string }

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-telemetry-text-muted">{label}</span>
      <span className="font-mono text-xs font-semibold tabular-nums text-telemetry-text-primary">{value}</span>
    </div>
  );
}

export function HeroServeCard({ serve, playerInitials }: Props) {
  return (
    <div className="w-48 rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-4 shadow-telemetry-float">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-telemetry-text-muted">Saque</span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-telemetry-volt text-[9px] font-bold text-black">
          {playerInitials}
        </span>
      </div>
      <div className="space-y-1.5">
        <StatLine label="1º Saque" value={`${serve.firstServePct}%`} />
        <StatLine label="Pontos ganhos" value={`${serve.firstServePointsWonPct}%`} />
        <StatLine label="Aces" value={String(serve.aces)} />
        <StatLine label="BP salvos" value={`${serve.breakPointsSavedPct}%`} />
      </div>
    </div>
  );
}
