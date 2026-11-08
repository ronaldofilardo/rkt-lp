import { EDUARDO_TIMELINE } from '@/data/content/eduardo.data';

export function EduardoDetails() {
  return (
    <div className="mt-6 space-y-6 border-t border-telemetry-border/10 pt-6 text-left">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry-volt mb-2">
          Trajetória no Tênis
        </p>
        <div className="space-y-3">
          {EDUARDO_TIMELINE.map((item) => (
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
            Academia de Tênis Figueiredo & Eco Tênis
          </p>
          <p className="text-[11px] leading-relaxed text-telemetry-text-muted">
            A Academia de Tênis Figueiredo (registrada formalmente como Academia de Tênis Figueiredo Ltda.) é historicamente associada e integrada à estrutura da Eco Tênis Academia em Curitiba. Informações do Local: Rua Brasílio Cuman, 1324 - São Braz, Curitiba - PR, 82315-010 (com registros antigos vinculados também à Rua Gardênio Scorzato no Pilarzinho/Vista Alegre).
          </p>
        </div>

        <div className="rounded-xl border border-telemetry-border/10 bg-telemetry-surface/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry-volt mb-1">
            Certificações Internacionais
          </p>
          <p className="text-[11px] leading-relaxed text-telemetry-text-muted">
            Treinador ITF nível 1 e 2 · CBT Técnico Master · DTB (Alemanha) licença A, B e C.
            Capacitador da Confederação Brasileira de Tênis desde 1998 e ex-Diretor Técnico da Federação Paranaense de Tênis.
            Tradutor de 5 livros da ITF para o português.
          </p>
        </div>

        <div className="rounded-xl border border-telemetry-border/10 bg-telemetry-surface/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry-volt mb-1">
            Canais & Presença Digital
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href="https://www.instagram.com/tenisintegrativo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-mono text-telemetry-volt hover:underline"
            >
              📷 Instagram (@tenisintegrativo) →
            </a>
            <a
              href="https://www.youtube.com/@academiadetenisfigueiredo8949"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-mono text-telemetry-volt hover:underline"
            >
              ▶️ YouTube (@academiadetenisfigueiredo8949) →
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-telemetry-border/10 bg-telemetry-surface/50 p-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry-volt mb-1">
            Visão de Produto & RKT
          </p>
          <p className="text-[11px] leading-relaxed text-telemetry-text-muted">
            A experiência de mais de 45 anos na quadra orienta cada decisão de produto do RKT Tennis:
            quais métricas têm valor real para o treinador, como os formatos oficiais são representados
            e o que a linguagem da plataforma precisa dizer para fazer sentido a quem vive o jogo.
          </p>
        </div>
      </div>
    </div>
  );
}
