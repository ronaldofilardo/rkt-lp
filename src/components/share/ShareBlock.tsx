'use client';

import { useEffect, useState } from 'react';
import { CopyButton } from './CopyButton';

const REF_URL = 'https://rkt-app.com/?ref=compartilhar';

/** Bloco de compartilhamento (#compartilhar): indicação para clube/treinador. */
export function ShareBlock() {
  const [status, setStatus] = useState('');
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && 'share' in navigator);
  }, []);

  async function handleShare() {
    try {
      await navigator.share({ title: 'RKT Tennis', url: REF_URL });
      setStatus('Compartilhamento aberto.');
    } catch {
      setStatus('Compartilhamento cancelado.');
    }
  }

  return (
    <section
      id="compartilhar"
      aria-labelledby="compartilhar-title"
      className="border-b border-telemetry-border/10 bg-telemetry-base px-3 py-12 sm:px-4 md:py-16 lg:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-container">
        <div className="mx-auto max-w-2xl space-y-4 rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
            Leve o RKT para o seu clube
          </p>
          <h2
            id="compartilhar-title"
            className="text-xl font-bold text-telemetry-text-primary sm:text-2xl"
          >
            Conhece um treinador ou gestor de centro de treinamento?
          </h2>
          <p className="text-sm leading-relaxed text-telemetry-text-muted">
            Compartilhe a demonstração com dados simulados: ele explora a telemetria em minutos e
            avalia como o registro ponto a ponto se encaixa na metodologia do clube.
          </p>

          {/* Fallback sem JS: link selecionável renderizado no HTML estático */}
          <label className="block">
            <span className="sr-only">Link da landing page para compartilhar</span>
            <input
              readOnly
              value={REF_URL}
              className="w-full rounded-full border border-telemetry-border/20 bg-telemetry-base px-4 py-2 text-center font-mono text-xs text-telemetry-text-muted focus:outline focus:outline-2 focus:outline-offset-2 focus-outline-telemetry-blue"
            />
          </label>

          <div className="flex flex-wrap items-center justify-start gap-3">
            <CopyButton onStatusChange={setStatus} />
            {canShare ? (
              <button
                type="button"
                onClick={handleShare}
                className="rounded-full border border-telemetry-border/20 px-5 py-2.5 text-sm font-semibold text-telemetry-text-primary transition-colors hover:border-telemetry-border/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
              >
                Compartilhar
              </button>
            ) : null}
          </div>

          <p role="status" aria-live="polite" className="min-h-5 text-sm text-telemetry-volt">
            {status}
          </p>
        </div>
      </div>
    </section>
  );
}