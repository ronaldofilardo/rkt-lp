'use client';

import { useState, useEffect } from 'react';
import { AUDIENCE_ANSWER } from '@/data/section-answers.data';
import { AudienceTabs } from './AudienceTabs';
import { AudienceTable } from './AudienceTable';

const DISCLAIMER = (
  <p className="font-mono text-xs text-telemetry-text-muted">
    * Atletas, treinadores particulares e anotadores contam com uma cota de 5 partidas sem custos para experimentar. Políticas e planos para clubes estão em definição.
  </p>
);

export function TargetAudience() {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="para-quem"
      aria-labelledby="para-quem-title"
      className="border-b border-telemetry-border/10 bg-telemetry-surface px-3 py-12 sm:px-4 md:py-16 lg:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-container space-y-8">
        <header className="reveal space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
            Para quem
          </p>
          <h2
            id="para-quem-title"
            className="text-2xl font-bold text-telemetry-text-primary sm:text-3xl"
          >
            {AUDIENCE_ANSWER.question}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-telemetry-text-muted sm:text-base">
            {AUDIENCE_ANSWER.answer}
          </p>
        </header>

        {isMobile ? (
          <AudienceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <AudienceTable />
        )}

        {DISCLAIMER}
      </div>
    </section>
  );
}