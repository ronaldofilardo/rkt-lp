'use client';

import { useInViewOnce } from '@/hooks/useInViewOnce';

interface Props {
  label: string;
  p1Value: number;
  p2Value: number;
  p1Label: string;
  p2Label: string;
  format?: 'pct' | 'int';
}

function fmt(v: number, f: 'pct' | 'int') {
  return f === 'pct' ? `${v}%` : String(v);
}

export function StatBar({ label, p1Value, p2Value, p1Label, p2Label, format = 'pct' }: Props) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.15);
  const total = p1Value + p2Value || 1;
  const p1Pct = Math.round((p1Value / total) * 100);
  const p2Pct = 100 - p1Pct;

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono font-semibold tabular-nums text-telemetry-volt">
          {fmt(p1Value, format)}
        </span>
        <span className="text-telemetry-text-muted">{label}</span>
        <span className="font-mono font-semibold tabular-nums text-telemetry-text-muted">
          {fmt(p2Value, format)}
        </span>
      </div>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-telemetry-border/10">
        <div
          className="h-full bg-telemetry-volt transition-[width] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: inView ? `${p1Pct}%` : '0%' }}
          aria-label={`${p1Label}: ${fmt(p1Value, format)}`}
        />
        <div
          className="h-full flex-1 bg-telemetry-border/20"
          aria-label={`${p2Label}: ${fmt(p2Value, format)}`}
        />
      </div>
      <div className="flex items-center justify-between font-mono text-[10px] text-telemetry-text-muted">
        <span>{p1Pct}%</span>
        <span>{p2Pct}%</span>
      </div>
    </div>
  );
}
