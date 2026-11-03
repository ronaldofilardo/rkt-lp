import { KEY_TAKEAWAYS, KEY_TAKEAWAYS_TITLE } from '@/data/key-takeaways.data';

export function KeyTakeaways() {
  return (
    <section
      id="key-takeaways"
      aria-labelledby="key-takeaways-title"
      className="border-b border-telemetry-border/10 bg-telemetry-base px-3 py-10 sm:px-4 md:py-14 lg:px-6"
    >
      <div className="mx-auto max-w-container">
        <div className="max-w-3xl rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-5 sm:p-6">
          <h2
            id="key-takeaways-title"
            className="text-lg font-bold text-telemetry-text-primary sm:text-xl"
          >
            {KEY_TAKEAWAYS_TITLE}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {KEY_TAKEAWAYS.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-telemetry-text-muted sm:text-base"
              >
                <span aria-hidden="true" className="mt-0.5 text-telemetry-volt">
                  ●
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
