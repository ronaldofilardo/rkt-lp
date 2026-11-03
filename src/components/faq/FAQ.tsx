import { FAQ_ITEMS } from '@/data/faq.data';
import { FaqItem } from './FaqItem';

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-b border-telemetry-border/10 bg-telemetry-base px-3 py-12 sm:px-4 md:py-16 lg:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-container">
        <div className="max-w-2xl space-y-8">
          <header className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">
              Dúvidas frequentes
            </p>
            <h2
              id="faq-title"
              className="text-2xl font-bold text-telemetry-text-primary sm:text-3xl"
            >
              Perguntas frequentes
            </h2>
          </header>

          <div className="rounded-2xl border border-telemetry-border/10 bg-telemetry-card px-5 sm:px-6 grid gap-4 sm:grid-cols-2">
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
