import { RONALDO_TIMELINE } from '@/data/content/ronaldo.data';

export function RonaldoDetails() {
  return (
    <div className="mt-6 space-y-6 border-t border-telemetry-border/10 pt-6 text-left">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry-volt mb-2">
          Marcos de Engenharia
        </p>
        <div className="space-y-3">
          {RONALDO_TIMELINE.map((item) => (
            <div key={item.period} className="rounded-xl border border-telemetry-border/10 bg-telemetry-surface/50 p-3">
              <span className="font-mono text-xs font-bold text-telemetry-volt">{item.period}</span>
              <h4 className="text-xs font-bold text-telemetry-text-primary mt-0.5">{item.title}</h4>
              <p className="text-[11px] leading-relaxed text-telemetry-text-muted mt-1">{item.description}</p>
              {item.link && (
                <a
                  href={item.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center text-[10px] font-mono text-telemetry-volt hover:underline"
                >
                  {item.link.label} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-telemetry-border/10 bg-telemetry-surface/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry-volt mb-1">
            Formação Acadêmica & Científica
          </p>
          <p className="text-[11px] leading-relaxed text-telemetry-text-muted">
            Professor universitário (graduação e especialização) na PUCPR, lecionando Metodologia de Pesquisa Científica. Autor de livro nacional pela Editora Intersaberes e pesquisas de doutoramento pela Universidade do Porto (Portugal).
          </p>
        </div>

        <div className="rounded-xl border border-telemetry-border/10 bg-telemetry-surface/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry-volt mb-1">
            Metodologia STE-DEV & RKT
          </p>
          <p className="text-[11px] leading-relaxed text-telemetry-text-muted">
            Criador do framework preventivo STE-DEV (baseado na norma ASD-STE100). Responsável pela concepção e execução de todo o sistema RKT Tennis, motor de regras puro (<code className="text-telemetry-volt">engine.ts</code>) e arquitetura offline-first.
          </p>
        </div>
      </div>
    </div>
  );
}

