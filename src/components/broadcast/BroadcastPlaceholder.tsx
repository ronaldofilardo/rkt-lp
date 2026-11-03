import { buildSignupUrl } from '@/config/site.config';

/**
 * Etapa 8 — placeholder estático.
 * Não simula feed ao vivo, consulta de código nem anonimização.
 * O sistema principal (bkpRKT) é responsável por decidir
 * quais partidas podem ser públicas; a LP apenas comunica
 * que a funcionalidade está em desenvolvimento.
 */
export function BroadcastPlaceholder() {
  return (
    <section
      aria-labelledby="broadcast-title"
      className="border-b border-telemetry-border/10 bg-telemetry-surface px-3 py-12 sm:px-4 md:py-16 lg:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-container">
        <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-telemetry-border/20 bg-telemetry-card p-8 text-center sm:p-10">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-telemetry-blue/20 bg-telemetry-blue/10">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              aria-hidden="true" className="text-telemetry-blue">
              <circle cx="12" cy="12" r="3" />
              <path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4" />
              <path d="M3.5 3.5a14 14 0 0 0 0 17M20.5 3.5a14 14 0 0 1 0 17" />
            </svg>
          </div>

          <h2
            id="broadcast-title"
            className="text-xl font-bold text-telemetry-text-primary"
          >
            Acompanhamento público — em breve
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-telemetry-text-muted">
            Estamos definindo os contratos de privacidade, consentimento e integração antes de
            abrir o acompanhamento de partidas ao público. O clube ou treinador sempre controlará
            quais partidas podem ser visualizadas externamente.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">
            {([
              ['Controle total', 'O clube decide quais partidas são públicas.'],
              ['Privacidade por padrão', 'Partidas novas são privadas até autorização explícita.'],
              ['Cadastre-se já', 'Avisaremos quando o acompanhamento estiver disponível.'],
            ] as const).map(([title, desc]) => (
              <div key={title} className="rounded-xl border border-telemetry-border/10 p-4">
                <p className="text-xs font-semibold text-telemetry-text-primary">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-telemetry-text-muted">{desc}</p>
              </div>
            ))}
          </div>

          <a
            href={buildSignupUrl({ origem: 'lp_broadcast' })}
            className="mt-6 inline-block rounded-full border border-telemetry-border/20 px-5 py-2.5 text-sm font-medium text-telemetry-text-primary transition-colors hover:border-telemetry-blue/40 hover:text-telemetry-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
          >
            Quero ser notificado
          </a>
        </div>
      </div>
    </section>
  );
}
