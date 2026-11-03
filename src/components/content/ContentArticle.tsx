import type { ReactNode } from 'react';
import type { QaItem } from '@/data/content/page.types';
import { LinkedText } from './LinkedText';

interface Props {
  eyebrow: string;
  title: string;
  lead: string;
  children?: ReactNode;
}

export function ContentArticle({ eyebrow, title, lead, children }: Props) {
  return (
    <article className="mx-auto max-w-3xl space-y-10 px-3 py-12 sm:px-4 md:py-16 lg:px-6">
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">{eyebrow}</p>
        <h1 className="font-display text-3xl font-extrabold leading-tight text-telemetry-text-primary sm:text-4xl">
          {title}
        </h1>
        <p className="text-base leading-relaxed text-telemetry-text-muted sm:text-lg">{lead}</p>
      </header>
      {children}
    </article>
  );
}

export function QaSections({
  items,
  glossaryLinks = false,
}: {
  items: readonly QaItem[];
  /** Liga termos técnicos às âncoras do /glossario (usado no guia). */
  glossaryLinks?: boolean;
}) {
  return (
    <>
      {items.map((item) => (
        <section key={item.id} id={item.id} aria-labelledby={`${item.id}-title`} className="space-y-2">
          <h2 id={`${item.id}-title`} className="text-xl font-bold text-telemetry-text-primary sm:text-2xl">
            {item.question}
          </h2>
          <p className="text-sm leading-relaxed text-telemetry-text-muted sm:text-base">
            {glossaryLinks ? <LinkedText text={item.answer} /> : item.answer}
          </p>
        </section>
      ))}
    </>
  );
}

export function CtaLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-block rounded-full bg-telemetry-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-telemetry-blue-light active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue-light"
    >
      {label}
    </a>
  );
}
