import { PILLARS } from '@/data/pillars.data';
import { PillarCard } from './PillarCard';
import { PillarIconAnnotate } from './PillarIconAnnotate';
import { PillarIconWatch } from './PillarIconWatch';
import { PillarIconAnalyze } from './PillarIconAnalyze';
import { PILLARS_ANSWER } from '@/data/section-answers.data';
import type { ReactNode } from 'react';

const ICONS: Record<string, ReactNode> = {
  anotar:     <PillarIconAnnotate />,
  acompanhar: <PillarIconWatch />,
  analisar:   <PillarIconAnalyze />,
};

export function TelemetryPillars() {
  return (
    <section
      id="o-que-e"
      aria-labelledby="o-que-e-title"
      className="border-b border-telemetry-border/10 bg-telemetry-surface px-3 py-12 sm:px-4 md:py-16 lg:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-container space-y-10">
        <header className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
            Três pilares, uma partida completa
          </p>
          <h2 id="o-que-e-title" className="text-2xl font-bold text-telemetry-text-primary sm:text-3xl">
            {PILLARS_ANSWER.question}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-telemetry-text-muted sm:text-base">
            {PILLARS_ANSWER.answer}
          </p>
        </header>

        {/* Grid → carrossel snap no mobile */}
        <div className="-mx-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 pb-2 [scrollbar-width:none] sm:-mx-4 sm:px-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden">
          {PILLARS.map((pillar) => (
            <div key={pillar.id} className="w-[80vw] shrink-0 snap-start sm:w-72 md:w-auto">
              <PillarCard
                pillar={pillar}
                icon={ICONS[pillar.id]}
                dimmed={pillar.id === 'acompanhar'}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
