/**
 * ReplayEvent.tsx
 * Linha individual da timeline do replay.
 * Componente puro — sem estado, sem efeitos.
 * Aparece com fade-in via classe CSS do design system (tab-pane-enter).
 */

import type { ReplayEvent as TReplayEvent } from '@/types/replay.types';

interface Props {
  event: TReplayEvent;
  /** Placar do ponto (ex: '0–1') exibido na coluna esquerda */
  score: string;
  /** Iniciais de quem ganhou (ex: 'S') */
  winnerInitials: string;
  /** Índice na lista visível — usado para atraso escalonado na entrada */
  index: number;
}

/** Cor do badge por conteúdo */
function badgeClass(tag: string): string {
  if (tag === 'ACE') return 'bg-telemetry-volt/20 text-telemetry-volt border-telemetry-volt/30';
  if (tag === 'W')   return 'bg-telemetry-volt/10 text-telemetry-volt border-telemetry-volt/20';
  if (tag === 'DF')  return 'bg-telemetry-error/15 text-telemetry-error border-telemetry-error/25';
  if (tag === 'EF')  return 'bg-telemetry-orange/15 text-telemetry-orange border-telemetry-orange/25';
  return 'bg-telemetry-elevated text-telemetry-text-muted border-telemetry-border/10';
}

export function ReplayEvent({ event, score, winnerInitials, index }: Props) {
  const delayMs = index * 40; // escalonamento suave entre linhas simultâneas

  return (
    <div
      className="tab-pane-enter flex items-start gap-3 py-2"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {/* Coluna esquerda: placar */}
      <span className="w-10 shrink-0 font-mono text-xs tabular-nums text-telemetry-text-muted">
        {score}
      </span>

      {/* Corpo: vencedor + label + badges */}
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="truncate font-mono text-xs text-telemetry-text-primary">
          <span className="font-semibold text-telemetry-volt">{winnerInitials}***</span>
          {' · '}
          <span>{event.label.split(' · ')[1] ?? event.label}</span>
        </p>

        {/* Badges */}
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] font-medium leading-none ${badgeClass(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
