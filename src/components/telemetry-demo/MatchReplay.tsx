'use client';

/**
 * MatchReplay.tsx
 * Simula a tela /matches/acompanhar rodando em loop infinito na LP.
 * Sem controles de usuário — apenas vitrine passiva.
 *
 * Ciclo:
 *   1. Exibe eventos um a um, respeitando o delta tMs de cada evento.
 *   2. Após o último evento, aguarda FINISH_PAUSE_MS exibindo "Encerrada".
 *   3. Fade-out suave (FADE_OUT_MS).
 *   4. Reinicia do zero — loop infinito.
 *
 * Respeita prefers-reduced-motion: sem fade-out, reinício imediato.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import type { MatchReplayFixture, ReplayEvent } from '@/types/replay.types';
import { ReplayEvent as ReplayEventRow } from './ReplayEvent';

/** ms de pausa exibindo "Encerrada" antes do fade-out */
const FINISH_PAUSE_MS = 3500;
/** ms do fade-out antes de reiniciar */
const FADE_OUT_MS = 700;
/** Máximo de eventos visíveis na timeline ao mesmo tempo */
const MAX_VISIBLE = 6;
/** ms iniciais antes do primeiro evento (simula "partida começando") */
const INITIAL_DELAY_MS = 1800;

interface Props {
  fixture: MatchReplayFixture;
  onReportClick?: () => void;
}

type Phase = 'playing' | 'finished' | 'fading';

export function MatchReplay({ fixture, onReportClick }: Props) {
  const { p1, p2, events, finalScore, winner, formatLabel } = fixture;

  const [visibleEvents, setVisibleEvents] = useState<ReplayEvent[]>([]);
  const [currentScore, setCurrentScore] = useState('0–0');
  const [phase, setPhase] = useState<Phase>('playing');
  const [elapsedSec, setElapsedSec] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (elapsedRef.current) clearInterval(elapsedRef.current);
  }, []);

  const startElapsedCounter = useCallback(() => {
    setElapsedSec(0);
    if (elapsedRef.current) clearInterval(elapsedRef.current);
    elapsedRef.current = setInterval(() => {
      setElapsedSec((s) => s + 1);
    }, 1000);
  }, []);

  const runReplay = useCallback(() => {
    setVisibleEvents([]);
    setCurrentScore('0–0');
    setPhase('playing');
    setOpacity(1);
    startElapsedCounter();

    let idx = 0;

    const scheduleNext = (delayMs: number) => {
      timerRef.current = setTimeout(() => {
        const ev = events[idx];
        idx++;

        setVisibleEvents((prev) => {
          const next = [...prev, ev];
          return next.length > MAX_VISIBLE ? next.slice(next.length - MAX_VISIBLE) : next;
        });
        setCurrentScore(ev.scoreAfter);
        startElapsedCounter();

        if (idx < events.length) {
          scheduleNext(ev.tMs);
        } else {
          // Último evento — entrar em "finished"
          timerRef.current = setTimeout(() => {
            setPhase('finished');

            timerRef.current = setTimeout(() => {
              if (reducedMotion.current) {
                runReplay();
              } else {
                setPhase('fading');
                setOpacity(0);
                timerRef.current = setTimeout(runReplay, FADE_OUT_MS);
              }
            }, FINISH_PAUSE_MS);
          }, ev.tMs);
        }
      }, delayMs);
    };

    scheduleNext(INITIAL_DELAY_MS);
  }, [events, startElapsedCounter]);

  useEffect(() => {
    runReplay();
    return clearTimers;
  }, [runReplay, clearTimers]);

  const isFinished = phase === 'finished' || phase === 'fading';
  const winnerName = winner === 'p1' ? p1.name : p2.name;

  return (
    <div
      className="rounded-2xl border border-telemetry-border/10 bg-telemetry-card"
      style={{
        opacity,
        transition: phase === 'fading' ? `opacity ${FADE_OUT_MS}ms var(--rkt-ease-exit)` : 'none',
      }}
      aria-label="Simulação de transmissão ao vivo de partida RKT"
      aria-live="polite"
      aria-atomic="false"
    >
      {/* ── Cabeçalho ─────────────────────────────────────────── */}
      <div className="space-y-2 border-b border-telemetry-border/10 px-4 py-3">
        <div className="text-center">
          <p className="truncate font-mono text-base font-semibold">
            <span className="text-telemetry-text-primary">{p1.name}</span>
            <span className="text-telemetry-text-muted"> × </span>
            <span className="text-telemetry-volt">{p2.name}</span>
          </p>
          <p className="font-mono text-xs text-telemetry-text-muted">{formatLabel}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Badge ao vivo / encerrada */}
          {isFinished ? (
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-telemetry-elevated px-2.5 py-1 font-mono text-xs font-semibold text-telemetry-text-muted">
              Encerrada
            </span>
          ) : (
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-telemetry-error/10 px-2.5 py-1 font-mono text-xs font-semibold text-telemetry-error">
              <span
                className="h-1.5 w-1.5 rounded-full bg-telemetry-error"
                style={{ animation: 'pillar-pulse 1.4s ease-in-out infinite' }}
                aria-hidden="true"
              />
              Ao vivo
            </span>
          )}

          {onReportClick && (
            <button
              type="button"
              onClick={onReportClick}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-telemetry-border/20 bg-telemetry-active px-2.5 py-1.5 font-mono text-xs font-semibold text-telemetry-text-primary transition-colors hover:border-telemetry-volt/40 hover:text-telemetry-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
            >
              Ver relatório
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
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
          )}
        </div>
      </div>

      {/* ── Placar ────────────────────────────────────────────── */}
      <div className="border-b border-telemetry-border/10 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Jogador 1 */}
          <div className="text-left">
            <p className="font-mono text-sm text-telemetry-text-muted">{p1.name}</p>
            <p
              className={`font-mono text-2xl font-bold tabular-nums ${
                isFinished && winner === 'p1'
                  ? 'text-telemetry-volt'
                  : 'text-telemetry-text-primary'
              }`}
            >
              {currentScore.split('–')[0] ?? '0'}
            </p>
          </div>

          {/* Separador */}
          <div className="text-center">
            <p className="font-mono text-sm text-telemetry-text-muted">
              {isFinished ? 'Final' : `Atualizado há ${elapsedSec}s`}
            </p>
            <p className="font-mono text-lg text-telemetry-text-muted">–</p>
          </div>

          {/* Jogador 2 */}
          <div className="text-right">
            <p className="font-mono text-sm text-telemetry-volt">{p2.name}</p>
            <p
              className="font-mono text-2xl font-bold tabular-nums text-telemetry-volt"
            >
              {currentScore.split('–')[1] ?? '0'}
            </p>
          </div>
        </div>

        {/* Banner de encerramento */}
        {isFinished && (
          <p className="tab-pane-enter mt-2 text-center font-mono text-xs text-telemetry-volt">
            {winnerName} venceu · {finalScore}
          </p>
        )}
      </div>

      {/* ── Último ponto ──────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 border-b border-telemetry-border/10 px-4 py-2">
        <span className="shrink-0 font-mono text-sm text-telemetry-text-muted">
          Último ponto
        </span>
        {visibleEvents.length > 0 ? (
          <p className="flex min-w-0 items-center justify-end gap-1.5 font-mono text-sm text-telemetry-text-primary">
            <span className="truncate">
              {visibleEvents[visibleEvents.length - 1].label}
            </span>
            {!isFinished && (
              <span
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-telemetry-volt"
                style={{ animation: 'pillar-pulse 1.4s ease-in-out infinite' }}
                aria-hidden="true"
              />
            )}
          </p>
        ) : (
          <p className="truncate font-mono text-xs text-telemetry-text-muted">Aguardando pontos…</p>
        )}
      </div>

      {/* ── Timeline de pontos ────────────────────────────────── */}
      <div
        className="divide-y divide-telemetry-border/5 px-4"
        aria-label="Linha do tempo de pontos"
      >
        {visibleEvents.length === 0 ? (
          <div className="py-6 text-center font-mono text-xs text-telemetry-text-muted">
            Partida iniciando…
          </div>
        ) : (
          [...visibleEvents].reverse().map((ev, i) => (
            <ReplayEventRow
              key={`${ev.seq}-${ev.scoreAfter}`}
              event={ev}
              score={ev.scoreAfter}
              winnerInitials={ev.winner === 'p1' ? p1.initials : p2.initials}
              index={i}
            />
          ))
        )}
      </div>

      {/* ── Rodapé discreto ───────────────────────────────────── */}
      <div className="border-t border-telemetry-border/10 px-4 py-2">
        <p className="font-mono text-[10px] text-telemetry-text-muted/50">
          Partida demonstrativa · dados reais · CT RKT
        </p>
      </div>
    </div>
  );
}
