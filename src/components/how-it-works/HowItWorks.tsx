import { HOW_IT_WORKS_STEPS } from '@/data/how-it-works.data';
import { HOW_IT_WORKS_ANSWER } from '@/data/section-answers.data';
import { StepItem } from './StepItem';
import { ProgressLine } from './ProgressLine';

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="how-title"
      className="border-b border-telemetry-border/10 bg-telemetry-base px-3 py-12 sm:px-4 md:py-16 lg:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-container space-y-10">
        <header className="reveal space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
            Registrar, processar, evoluir
          </p>
          <h2 id="how-title" className="text-2xl font-bold text-telemetry-text-primary sm:text-3xl">
            {HOW_IT_WORKS_ANSWER.question}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-telemetry-text-muted sm:text-base">
            {HOW_IT_WORKS_ANSWER.answer}
          </p>
        </header>

        <div className="relative">
          <ProgressLine stepCount={HOW_IT_WORKS_STEPS.length} />

          <ol className="relative flex flex-col gap-0 md:grid md:grid-cols-3 md:gap-6">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <StepItem
                key={step.id}
                step={step}
                isLast={i === HOW_IT_WORKS_STEPS.length - 1}
                index={i}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
