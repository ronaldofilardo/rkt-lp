import Link from 'next/link';
import { MOCK_MATCH_DATA } from '@/data/mock-match.data';
import { buildSignupUrl } from '@/config/site.config';
import { TelemetryPanel } from './TelemetryPanel';

const CONTEXT_LINK =
  'text-telemetry-volt underline-offset-2 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue';

export function TelemetryDemo() {
  const match = MOCK_MATCH_DATA;

  return (
    <section
      id="telemetria"
      aria-labelledby="telemetria-title"
      className="border-b border-telemetry-border/10 bg-telemetry-base px-3 py-12 sm:px-4 md:py-16 lg:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-container space-y-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
              Dados reais · partida demonstrativa
            </p>
            <h2
              id="telemetria-title"
              className="text-2xl font-bold text-telemetry-text-primary sm:text-3xl"
            >
              Veja o que o RKT registra
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-telemetry-border/10 bg-telemetry-card px-4 py-2">
            <div className="text-right">
              <p className="font-mono text-xs text-telemetry-text-muted">Placar final</p>
              <p className="font-mono text-sm font-bold text-telemetry-text-primary">
                {match.scoreSummary.sets}
              </p>
            </div>
            <div className="h-8 w-px bg-telemetry-border/10" />
            <div>
              <p className="font-mono text-xs text-telemetry-text-muted">Duração</p>
              <p className="font-mono text-sm font-bold text-telemetry-text-primary">
                {match.duration.totalMinutes} min
              </p>
            </div>
          </div>
        </header>

        <TelemetryPanel match={match} />

        <p className="text-center text-sm text-telemetry-text-muted">
          Estes dados são simulados para demonstração.{' '}
          <a
            href={buildSignupUrl({ origem: 'lp_telemetria' })}
            className="text-telemetry-volt underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
          >
            Crie sua conta
          </a>{' '}
          para registrar partidas reais.
        </p>

        <p className="text-center text-sm text-telemetry-text-muted">
          <Link href="/guia/estatisticas-de-tenis" className={CONTEXT_LINK}>
            Guia de estatísticas de tênis
          </Link>{' '}
          e{' '}
          <Link href="/glossario" className={CONTEXT_LINK}>
            glossário de telemetria
          </Link>{' '}
          detalham cada métrica exibida acima.
        </p>
      </div>
    </section>
  );
}
