'use client';

import { useInViewOnce } from '@/hooks/useInViewOnce';

interface Props {
  totalPoints: number;
  p1Points: number;
  p1Initials: string;
  p2Initials: string;
  longestStreak: number;
}

const DOTS = 20;

export function MomentumDots({ totalPoints, p1Points, p1Initials, p2Initials, longestStreak }: Props) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.2);
  const p1Share = p1Points / (totalPoints || 1);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono font-semibold tabular-nums text-telemetry-volt">{p1Initials}</span>
        <span className="text-telemetry-text-muted">Pontos totais</span>
        <span className="font-mono font-semibold tabular-nums text-telemetry-text-muted">{p2Initials}</span>
      </div>
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: DOTS }, (_, i) => {
          const isP1 = i / DOTS < p1Share;
          return (
            <div
              key={i}
              className={`momentum-dot h-2 flex-1 rounded-full transition-all duration-300 ${isP1 ? 'bg-telemetry-volt' : 'bg-telemetry-border/20'}`}
              style={{
                opacity: inView ? 1 : 0.2,
                transform: inView ? 'scale(1)' : 'scale(0.6)',
                transitionDelay: `${i * 20}ms`,
              }}
            />
          );
        })}
      </div>
      <p className="text-right font-mono text-[10px] text-telemetry-text-muted">
        Maior sequência: {longestStreak} pts
      </p>
    </div>
  );
}
