import { AUDIENCE_CARDS } from '@/data/audience.data';
import { AUDIENCE_ANSWER } from '@/data/section-answers.data';
import { buildSignupUrl } from '@/config/site.config';

const TH = 'border-b border-telemetry-border/10 px-3 py-3 text-left font-mono text-[11px] uppercase tracking-widest text-telemetry-volt';
const TD = 'border-b border-telemetry-border/10 px-3 py-4 align-top text-sm leading-relaxed text-telemetry-text-muted';

export function TargetAudience() {
  return (
    <section
      id="para-quem"
      aria-labelledby="para-quem-title"
      className="border-b border-telemetry-border/10 bg-telemetry-surface px-3 py-12 sm:px-4 md:py-16 lg:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-container space-y-8">
        <header className="space-y-2">
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

        <div className="-mx-3 overflow-x-auto px-3 [scrollbar-width:none] sm:-mx-4 sm:px-4 [&::-webkit-scrollbar]:hidden">
          <table className="w-full min-w-[40rem] border-collapse">
            <caption className="sr-only">
              Perfis do RKT e o que cada um resolve na quadra
            </caption>
            <thead>
              <tr>
                <th scope="col" className={TH}>Perfil</th>
                <th scope="col" className={TH}>O que você resolve</th>
                <th scope="col" className={TH}>Dor na partida</th>
                <th scope="col" className={TH}>Começar</th>
              </tr>
            </thead>
            <tbody>
              {AUDIENCE_CARDS.map((card) => (
                <tr key={card.id}>
                  <th
                    scope="row"
                    className="border-b border-telemetry-border/10 px-3 py-4 align-top text-sm font-semibold text-telemetry-text-primary"
                  >
                    {card.title}
                    {card.path ? (
                      <a
                        href={card.path}
                        className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-telemetry-volt underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
                      >
                        Página dedicada
                      </a>
                    ) : null}
                  </th>
                  <td className={TD}>{card.answer}</td>
                  <td className={TD}>{card.question}</td>
                  <td className={TD}>
                    <a
                      href={buildSignupUrl({ perfil: card.profile, origem: 'lp_audience' })}
                      className="inline-block rounded-full border border-telemetry-border/20 px-4 py-2 text-xs font-semibold text-telemetry-text-primary transition-colors hover:border-telemetry-border/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
                    >
                      {card.ctaLabel}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
