import type { FaqItem as FaqItemType } from '@/data/faq.data';

interface Props { item: FaqItemType }

export function FaqItem({ item }: Props) {
  return (
    <details
      className="group border-b border-telemetry-border/10 last:border-0"
      name="rkt-faq"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-telemetry-text-primary transition-colors hover:text-telemetry-volt [&::-webkit-details-marker]:hidden">
        {item.question}
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          className="shrink-0 transition-transform duration-200 group-open:rotate-180"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <p className="pb-4 text-sm leading-relaxed text-telemetry-text-muted">{item.answer}</p>
    </details>
  );
}
