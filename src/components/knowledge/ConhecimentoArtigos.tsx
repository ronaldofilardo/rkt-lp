import Link from 'next/link';

const BRIDGE =
  'text-telemetry-volt underline-offset-2 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue';

/**
 * Pontes de aprofundamento (#conhecimento-artigos): leva o leitor da landing
 * para /artigos (análises táticas) e /conhecimento (documentação técnica),
 * absorvendo os links de guia/glossário que saíram do Hero.
 */
export function ConhecimentoArtigos() {
  return (
    <section
      id="conhecimento-artigos"
      aria-labelledby="conhecimento-title"
      className="border-b border-telemetry-border/10 bg-telemetry-surface px-3 py-12 sm:px-4 md:py-16 lg:px-6"
    >
      <div className="mx-auto max-w-container">
        <div className="max-w-3xl space-y-6">
          <header className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
              Continue aprendendo
            </p>
            <h2
              id="conhecimento-title"
              className="text-2xl font-bold text-telemetry-text-primary sm:text-3xl"
            >
              Aprofunde sua leitura do jogo
            </h2>
          </header>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-5">
              <h3 className="font-semibold text-telemetry-text-primary">
                <Link href="/artigos" className={BRIDGE}>
                  Artigos e análises técnicas
                </Link>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-telemetry-text-muted">
                Guias profundos de pontuação, formatos ITF, regras No-Ad/Match Tiebreak e telemetria
                sob pressão — para entender cada métrica por trás dos números.
              </p>
            </div>
            <div className="rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-5">
              <h3 className="font-semibold text-telemetry-text-primary">
                <Link href="/conhecimento" className={BRIDGE}>
                  Base de conhecimento
                </Link>
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-telemetry-text-muted">
                Documentação técnica dos módulos de arquitetura e regras de negócio do RKT, além do{' '}
                <Link href="/guia/estatisticas-de-tenis" className={BRIDGE}>
                  guia de estatísticas de tênis
                </Link>{' '}
                e do{' '}
                <Link href="/glossario" className={BRIDGE}>
                  glossário de telemetria
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
