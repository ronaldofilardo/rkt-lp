/**
 * Bloco emocional (#paixao): vivência autêntica de quadra — calor, torcida,
 * tensão do match tiebreak — conectada à tranquilidade de ter o registro seguro.
 */
export function Paixao() {
  return (
    <section
      id="paixao"
      aria-labelledby="paixao-title"
      className="border-b border-telemetry-border/10 bg-telemetry-base px-3 py-12 sm:px-4 md:py-16 lg:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-container">
        <div className="reveal mx-auto max-w-3xl space-y-4 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
            A paixão de acompanhar o jogo
          </p>
          <h2
            id="paixao-title"
            className="text-2xl font-bold text-telemetry-text-primary sm:text-3xl"
          >
            O calor da quadra, a tensão do match tiebreak — e a tranquilidade de ter tudo registrado.
          </h2>
          <p className="text-sm leading-relaxed text-telemetry-text-muted sm:text-base">
            Quem vive o tênis sabe: o set decide na pressão, o detalhe aparece no rali e a memória
            do pós-jogo é injusta com quem jogou. Enquanto a torcida acompanha cada ponto, o RKT
            mantém o registro contínuo e sem interrupções, mesmo em quadras com sinal instável —
            para que a emoção do jogo continue intacta e a evolução fique guardada em fatos.
          </p>
        </div>
      </div>
    </section>
  );
}
