import { buildSignupUrl } from '@/config/site.config';
import { MOCK_MATCH_DATA } from '@/data/mock-match.data';
import { CourtLines } from './CourtLines';
import { HeroArtifacts } from './HeroArtifacts';
import { Heading, Text } from '@/design-system/typography';

export function Hero() {
  const signupHero = buildSignupUrl({ origem: 'lp_hero' });

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] overflow-hidden bg-telemetry-base px-3 py-16 sm:px-4 md:py-24 lg:px-6"
    >
      <CourtLines />

      <div className="relative mx-auto flex max-w-container flex-col items-start gap-12 md:flex-row md:items-center md:gap-8">
        {/* Lado esquerdo: texto */}
        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="hero-chip hero-chip-1 rounded-full border border-telemetry-volt/30 bg-telemetry-volt/10 px-3 py-1 font-mono text-xs uppercase tracking-wide text-telemetry-volt">Registro de partidas</span>
            <span className="hero-chip hero-chip-2 rounded-full border border-telemetry-volt/30 bg-telemetry-volt/10 px-3 py-1 font-mono text-xs uppercase tracking-wide text-telemetry-volt">Telemetria tática</span>
            <span className="hero-chip hero-chip-3 rounded-full border border-telemetry-volt/30 bg-telemetry-volt/10 px-3 py-1 font-mono text-xs uppercase tracking-wide text-telemetry-volt">Evolução por dados</span>
          </div>

          <Heading as="h1" variant="h1" color="primary" className="tracking-tight sm:text-5xl lg:text-6xl">
            Você vive o jogo. O{' '}
            <span className="hero-word-wipe text-telemetry-volt">RKT</span> transforma cada{' '}
            <span className="hero-word-wipe hero-word-wipe-delay text-telemetry-volt">anotação</span> em evolução.
          </Heading>

          <Text variant="body" color="muted" as="p" className="max-w-md">
            Substitua a impressão subjetiva do pós-jogo por dados táticos claros de rali, pontos de
            quebra e aproveitamento de saque — para atletas, treinadores e clubes de tênis.
          </Text>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={signupHero}
              className="hero-cta-button rounded-full border border-telemetry-border/20 px-6 py-3 text-sm font-semibold text-telemetry-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
            >
              Experimentar o RKT
            </a>
          </div>

          <p className="font-mono text-xs text-telemetry-volt">
            Cota de 5 partidas sem custos para atletas, treinadores e anotadores · Sem necessidade de cartão.
          </p>
        </div>

        {/* Lado direito: artefatos flutuantes */}
        <div className="relative w-full md:h-80 md:w-72 lg:w-80">
          <HeroArtifacts match={MOCK_MATCH_DATA} />
        </div>
      </div>
    </section>
  );
}
