'use client';

import { useInViewOnce } from '@/hooks/useInViewOnce';
import type { Step } from '@/data/how-it-works.data';

interface Props {
  step: Step;
  isLast: boolean;
  index: number;
}

const CIRCLE_CLASS: Record<number, string> = {
  0: 'step-circle',
  1: 'step-circle-delay-1',
  2: 'step-circle-delay-2',
};

export function StepItem({ step, isLast, index }: Props) {
  const { ref, inView } = useInViewOnce<HTMLLIElement>(0.2);
  const circleClass = CIRCLE_CLASS[index] ?? 'step-circle';

  return (
    <li ref={ref} className={`relative flex gap-4 md:flex-col md:gap-0 ${inView ? 'step-item-active' : ''}`}>
      {/* Indicador + linha conectora */}
      <div className="flex flex-col items-center md:flex-row md:items-start">
        {/* Círculo numerado com borda e preenchimento */}
        <div
          className={`${circleClass} relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-telemetry-volt bg-telemetry-base font-mono text-sm font-bold text-telemetry-volt transition-colors duration-300`}
        >
          <span className="step-number">{step.number}</span>
        </div>
        {/* Linha conectora */}
        {!isLast && (
          <div className="step-line ml-[19px] mt-0 h-full w-px bg-telemetry-border/10 md:ml-0 md:mt-[19px] md:h-px md:w-full md:flex-1" />
        )}
      </div>

      {/* Conteúdo */}
      <div className="pb-8 md:pt-4 md:pb-0">
        <h3 className="text-base font-semibold text-telemetry-text-primary">{step.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-telemetry-text-muted">{step.description}</p>
      </div>
    </li>
  );
}
