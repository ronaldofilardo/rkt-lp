import type { SimulatedMatchFixture } from '@/types/telemetry.types';

interface Props { match: SimulatedMatchFixture }

function PlayerRow({ name, sets, isWinner }: { name: string; sets: string; isWinner: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={`truncate text-sm font-semibold ${isWinner ? 'text-telemetry-text-primary' : 'text-telemetry-text-muted'}`}>
        {name}
      </span>
      <span className={`font-mono text-sm tabular-nums ${isWinner ? 'text-telemetry-volt' : 'text-telemetry-text-muted'}`}>
        {sets}
      </span>
    </div>
  );
}

export function HeroScoreboard({ match }: Props) {
  const sets = match.scoreSummary.sets.split(' · ');
  const p1Sets = sets.map(s => parseInt(s[0], 10));
  const p2Sets = sets.map(s => parseInt(s[2], 10));
  const p1Wins = p1Sets.filter((s, i) => s > p2Sets[i]).length;
  const p2Wins = p2Sets.filter((s, i) => s > p1Sets[i]).length;

  return (
    <div className="w-56 rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-4 shadow-telemetry-float">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-telemetry-volt">
        Demonstração · Finalizada
      </p>
      <div className="space-y-2">
        <PlayerRow name={match.player1.name} sets={`${p1Wins} sets`} isWinner={p1Wins > p2Wins} />
        <PlayerRow name={match.player2.name} sets={`${p2Wins} sets`} isWinner={p2Wins > p1Wins} />
      </div>
      <p className="mt-2 text-right font-mono text-[10px] text-telemetry-text-muted">
        {match.scoreSummary.sets}
      </p>
    </div>
  );
}
