export function PartnershipTimeline() {
  return (
    <section
      aria-label="Linha do tempo da parceria"
      className="mt-8 rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-5 sm:p-6"
    >
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-telemetry-volt" />
        <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
          Linha do Tempo da Parceria · Tênis & Engenharia
        </p>
      </div>

      <div className="relative mt-6 space-y-6 border-l-2 border-telemetry-border/20 pl-6 sm:pl-8">
        <div className="relative">
          <span className="absolute -left-[31px] sm:-left-[39px] top-1 h-3.5 w-3.5 rounded-full border-2 border-telemetry-card bg-telemetry-volt" />
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-mono text-sm font-bold text-telemetry-volt">Março / 2006</span>
            <span className="text-xs font-semibold text-telemetry-text-primary">
              · Início da Atuação Conjunta no Tênis
            </span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-telemetry-text-muted sm:text-sm">
            Desde março de 2006, Ronaldo e Eduardo atuam juntos no desenvolvimento de softwares voltados para o desporto tênis, com centenas de avaliações esportivas realizadas por softwares específicos para desempenho físico no tênis.
          </p>
        </div>

        <div className="relative">
          <span className="absolute -left-[31px] sm:-left-[39px] top-1 h-3.5 w-3.5 rounded-full border-2 border-telemetry-card bg-telemetry-volt" />
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-mono text-sm font-bold text-telemetry-volt">2025</span>
            <span className="text-xs font-semibold text-telemetry-text-primary">
              · Desenvolvimento do RKT Tennis
            </span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-telemetry-text-muted sm:text-sm">
            Iniciaram o desenvolvimento do RKT, plataforma que une a experiência de mais de quatro décadas de quadra à engenharia de software preventiva (STE-DEV), transformando anotações de partida em estatísticas estruturadas e evolução por evidências.
          </p>
        </div>
      </div>
    </section>
  );
}

