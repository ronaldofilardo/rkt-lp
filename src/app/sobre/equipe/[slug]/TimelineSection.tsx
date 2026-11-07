import { RONALDO_TIMELINE } from '@/data/content/ronaldo.data';

export function TimelineSection() {
  return (
    <section className="mx-auto max-w-5xl px-3 py-10 sm:px-4 md:py-16 lg:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt mb-8 text-center sm:text-left">
        Trajetória técnica e marcos de engenharia
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {RONALDO_TIMELINE.map((item) => (
          <div
            key={item.period}
            className="flex flex-col justify-between rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-6"
          >
            <div>
              <span className="font-mono text-xs font-bold text-telemetry-volt">{item.period}</span>
              <h3 className="mt-2 text-base font-bold text-telemetry-text-primary">{item.title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-telemetry-text-muted">{item.description}</p>
            </div>
            {item.link && (
              <a
                href={item.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-xs font-mono font-semibold text-telemetry-volt hover:underline"
              >
                {item.link.label} →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

