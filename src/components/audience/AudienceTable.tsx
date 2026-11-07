import Link from 'next/link';
import { AUDIENCE_CARDS } from '@/data/audience.data';
import { buildSignupUrl } from '@/config/site.config';

const TH = 'border-b border-telemetry-border/10 px-3 py-3 text-left font-mono text-sm-extra uppercase tracking-widest text-telemetry-volt';
const TD = 'border-b border-telemetry-border/10 px-3 py-4 align-top text-sm leading-relaxed text-telemetry-text-muted';

export function AudienceTable() {
  return (
    <div className="reveal reveal-delay-1 -mx-3 overflow-x-auto px-3 [scrollbar-width:none] sm:-mx-4 sm:px-4 [&::-webkit-scrollbar]:hidden">
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
            <tr key={card.id} className="audience-table-row group transition-colors duration-150 hover:bg-telemetry-border/5">
              <th
                scope="row"
                className="relative border-b border-telemetry-border/10 px-3 py-4 align-top text-sm font-semibold text-telemetry-text-primary transition-transform duration-150 group-hover:translate-x-0.5"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-telemetry-volt opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                />
                {card.title}
                {card.path ? (
                <Link
                  href={card.path}
                  className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-telemetry-volt underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
                >
                  Página dedicada
                </Link>
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
  );
}