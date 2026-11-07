'use client';

import { AUDIENCE_CARDS } from '@/data/audience.data';
import { buildSignupUrl } from '@/config/site.config';

interface Props {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export function AudienceTabs({ activeTab, setActiveTab }: Props) {
  const card = AUDIENCE_CARDS[activeTab];

  return (
    <div className="reveal reveal-delay-1" role="tablist" aria-label="Perfis do RKT">
      <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {AUDIENCE_CARDS.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={activeTab === i}
            aria-controls={`panel-${c.id}`}
            id={`tab-${c.id}`}
            onClick={() => setActiveTab(i)}
            className={`flex-shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue min-h-[44px] min-w-[120px] ${
              activeTab === i
                ? 'bg-telemetry-volt text-black shadow-[0_0_0_1px_rgba(204,255,0,0.3)]'
                : 'bg-telemetry-card border border-telemetry-border/10 text-telemetry-text-primary hover:border-telemetry-border/30'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${card.id}`}
        aria-labelledby={`tab-${card.id}`}
        key={card.id}
        className="audience-tab-pane mt-6 space-y-4 rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-5"
      >
        <div className="space-y-3">
          <dt className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
            O que você resolve
          </dt>
          <dd className="text-sm leading-relaxed text-telemetry-text-primary">{card.answer}</dd>
        </div>
        <div className="space-y-3 border-t border-telemetry-border/10 pt-4">
          <dt className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
            Dor na partida
          </dt>
          <dd className="text-sm leading-relaxed text-telemetry-text-muted">{card.question}</dd>
        </div>
        <div className="pt-4 border-t border-telemetry-border/10">
          <a
            href={buildSignupUrl({ perfil: card.profile, origem: 'lp_audience' })}
            className="inline-flex items-center justify-center rounded-full border border-telemetry-border/20 px-6 py-3 text-xs font-semibold text-telemetry-text-primary transition-all duration-200 ease-out hover:border-telemetry-border/40 hover:bg-telemetry-border/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue min-h-[48px]"
          >
            {card.ctaLabel}
          </a>
        </div>
        {card.path && (
          <a
            href={card.path}
            className="mt-3 block font-mono text-[10px] uppercase tracking-widest text-telemetry-volt underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
          >
            Página dedicada →
          </a>
        )}
      </div>
    </div>
  );
}