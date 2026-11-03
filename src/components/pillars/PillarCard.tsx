import type { Pillar } from '@/data/pillars.data';
import type { ReactNode } from 'react';

interface Props {
  pillar: Pillar;
  icon: ReactNode;
  dimmed?: boolean;
}

export function PillarCard({ pillar, icon, dimmed = false }: Props) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-5 sm:p-6 transition-opacity ${dimmed ? 'opacity-60' : ''}`}
      aria-label={`Pilar ${pillar.number}: ${pillar.title}`}
    >
      <div className="flex items-start gap-4">
        {icon}
        <div className="space-y-0.5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry-text-muted">
            {pillar.number}
          </p>
          <h3 className="text-lg font-bold text-telemetry-text-primary">{pillar.title}</h3>
          <p className="text-xs font-medium text-telemetry-volt">{pillar.subtitle}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-telemetry-text-muted">{pillar.description}</p>
    </article>
  );
}
