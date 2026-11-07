import { buildSignupUrl, buildLoginUrl, SITE_CONFIG } from '@/config/site.config';
import { FINAL_CTA_ANSWER } from '@/data/section-answers.data';

export function FinalCTA() {
  return (
    <section
      id="comecar"
      aria-labelledby="final-cta-title"
      className="final-cta-bg px-3 py-16 sm:px-4 md:py-24 lg:px-6"
    >
      <div className="mx-auto max-w-container">
        <div className="max-w-2xl space-y-4">
          <p className="reveal font-mono text-xs uppercase tracking-widest text-telemetry-volt">
            Comece agora
          </p>
          <h2
            id="final-cta-title"
            className="reveal reveal-delay-1 text-3xl font-extrabold leading-tight tracking-tight text-telemetry-text-primary sm:text-4xl"
          >
            {FINAL_CTA_ANSWER.question}
          </h2>
          <p className="reveal reveal-delay-2 text-sm leading-relaxed text-telemetry-text-muted sm:text-base">
            {FINAL_CTA_ANSWER.answer}
          </p>
          <p className="reveal reveal-delay-3 text-sm font-semibold text-telemetry-text-primary">
            Dados que fazem a diferença dentro e fora da quadra.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <a
              href={buildSignupUrl({ origem: 'lp_final_cta' })}
              className="btn-cta-primary rounded-full bg-telemetry-blue px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-telemetry-blue-light active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue-light"
            >
              Criar conta
            </a>
            <a
              href={buildLoginUrl()}
              className="rounded-full border border-telemetry-border/20 px-8 py-3 text-sm font-semibold text-telemetry-text-primary transition-colors hover:border-telemetry-border/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
            >
              Já tenho conta
            </a>
          </div>

          <div className="space-y-2 pt-2">
            <p className="font-mono text-xs text-telemetry-volt">
              Cota inicial de 5 partidas sem custos para experimentar · Políticas e planos comerciais em definição
            </p>

            <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry-text-muted">
              {SITE_CONFIG.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
