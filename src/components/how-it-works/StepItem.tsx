import type { Step } from '@/data/how-it-works.data';

interface Props {
  step: Step;
  isLast: boolean;
}

export function StepItem({ step, isLast }: Props) {
  return (
    <li className="relative flex gap-4 md:flex-col md:gap-0">
      {/* Indicador + linha conectora */}
      <div className="flex flex-col items-center md:flex-row md:items-start">
        {/* Círculo numerado */}
        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-telemetry-volt bg-telemetry-base font-mono text-sm font-bold text-telemetry-volt">
          {step.number}
        </div>
        {/* Linha conectora: vertical no mobile, horizontal no desktop */}
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
