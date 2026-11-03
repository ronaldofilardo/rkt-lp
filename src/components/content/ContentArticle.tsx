import type { ReactNode } from 'react';
import type { QaItem } from '@/data/content/page.types';
import { LinkedText } from './LinkedText';
import { Heading, Text } from '@/design-system/typography';

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
        <Text variant="body-small" color="volt" as="p" className="font-mono uppercase tracking-widest">
          {eyebrow}
        </Text>
        <Heading as="h1" variant="h1" color="primary">
          {title}
        </Heading>
        <Text variant="body" color="muted" as="p">
          {lead}
        </Text>
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
          <Heading
            as="h2"
            variant="h2"
            color="primary"
            id={`${item.id}-title`}
            className="text-xl font-bold sm:text-2xl"
          >
            {item.question}
          </Heading>
          <Text variant="body-small" color="muted" as="p">
            {glossaryLinks ? <LinkedText text={item.answer} /> : item.answer}
          </Text>
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
