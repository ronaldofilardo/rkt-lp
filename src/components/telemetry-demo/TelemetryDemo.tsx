'use client';

/**
 * TelemetryDemo.tsx  —  ALTERADO na Etapa D
 *
 * Mudanças em relação ao original:
 *   - Adicionado 'use client' (necessário para useState do modal)
 *   - TelemetryPanel substituído por MatchReplay (replay ao vivo em loop)
 *   - Badge de cabeçalho atualizado para dados da partida real (Super TB · 4–10)
 *   - Botão "Ver relatório desta partida" adicionado abaixo do replay
 *   - ReportModal renderizado condicionalmente pelo estado modalOpen
 *
 * Preservado intacto:
 *   - Estrutura da section, id, aria-labelledby, classes de layout
 *   - Links do rodapé (guia + glossário)
 *   - TelemetryPanel, StatBar, MomentumDots, TabIndicator (não importados aqui,
 *     mas os arquivos originais não foram tocados)
 */

import { useState } from 'react';
import Link from 'next/link';
import { buildSignupUrl } from '@/config/site.config';
import { MATCH_REPLAY_DATA } from '@/data/match-replay.data';
import { MatchReplay } from './MatchReplay';
import { ReportModal } from './ReportModal';

const CONTEXT_LINK =
  'text-telemetry-volt underline-offset-2 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue';

export function TelemetryDemo() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="telemetria"
        aria-labelledby="telemetria-title"
        className="border-b border-telemetry-border/10 bg-telemetry-base px-3 py-10 sm:px-4 md:py-14 lg:px-6"
      >
        <div className="mx-auto max-w-container space-y-10">

          {/* ── Cabeçalho ─────────────────────────────────────── */}
          <header>
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
                Dados reais · partida demonstrativa
              </p>
              <h2
                id="telemetria-title"
                className="text-2xl font-bold text-telemetry-text-primary sm:text-3xl"
              >
                Acompanhe o replay de uma partida RKT
              </h2>
            </div>
          </header>

          {/* ── Informações da partida e replay demonstrativo ───── */}
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6 lg:py-4">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
                  Sobre a partida
                </p>
                <p className="max-w-prose text-sm leading-relaxed text-telemetry-text-muted">
                  Replay demonstrativo de uma partida registrada no RKT. Os nomes dos
                  jogadores aparecem anonimizados; os pontos são reproduzidos em sequência
                  para mostrar a evolução do placar.
                </p>
              </div>

              <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <dt className="font-mono text-xs text-telemetry-text-muted">Confronto</dt>
                  <dd className="font-mono text-sm font-semibold text-telemetry-text-primary">
                    {MATCH_REPLAY_DATA.p1.name} × {MATCH_REPLAY_DATA.p2.name}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="font-mono text-xs text-telemetry-text-muted">Formato</dt>
                  <dd className="font-mono text-sm font-semibold text-telemetry-text-primary">
                    {MATCH_REPLAY_DATA.formatLabel}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="font-mono text-xs text-telemetry-text-muted">Placar final</dt>
                  <dd className="font-mono text-sm font-semibold tabular-nums text-telemetry-text-primary">
                    {MATCH_REPLAY_DATA.finalScore}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="font-mono text-xs text-telemetry-text-muted">Vencedor</dt>
                  <dd className="font-mono text-sm font-semibold text-telemetry-text-primary">
                    {MATCH_REPLAY_DATA.winner === 'p1'
                      ? MATCH_REPLAY_DATA.p1.name
                      : MATCH_REPLAY_DATA.p2.name}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="font-mono text-xs text-telemetry-text-muted">
                    Pontos registrados
                  </dt>
                  <dd className="font-mono text-sm font-semibold tabular-nums text-telemetry-text-primary">
                    {MATCH_REPLAY_DATA.events.length}
                  </dd>
                </div>
              </dl>
            </div>

            <MatchReplay fixture={MATCH_REPLAY_DATA} />
          </div>

          {/* ── Botão "Ver relatório" — disponível a qualquer momento ── */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-telemetry-text-muted">
              Este replay demonstrativo usa dados de uma partida registrada no RKT.{' '}
              <a
                href={buildSignupUrl({ origem: 'lp_telemetria' })}
                className="text-telemetry-volt underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
              >
                Crie sua conta
              </a>{' '}
              para registrar as suas.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="flex shrink-0 items-center gap-2 rounded-full border border-telemetry-border/20 bg-telemetry-card px-4 py-2 font-mono text-xs font-semibold text-telemetry-text-primary transition-colors hover:border-telemetry-volt/40 hover:text-telemetry-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
            >
              Ver relatório desta partida
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* ── Links de contexto (preservados do original) ───── */}
          <p className="text-sm text-telemetry-text-muted">
            <Link href="/guia/estatisticas-de-tenis" className={CONTEXT_LINK}>
              Guia de estatísticas de tênis
            </Link>{' '}
            e{' '}
            <Link href="/glossario" className={CONTEXT_LINK}>
              glossário de telemetria
            </Link>{' '}
            detalham cada métrica registrada pelo RKT.
          </p>

        </div>
      </section>

      {/* ── Modal (fora da section para evitar z-index aninhado) ── */}
      {modalOpen && <ReportModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
