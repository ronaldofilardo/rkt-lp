import { Fragment } from 'react';
import Link from 'next/link';
import { GLOSSARY_TERMS } from '@/data/glossary-links.data';

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Termos mais longos primeiro para "break points" vencer "break point". */
const PATTERN = new RegExp(
  `(${[...GLOSSARY_TERMS]
    .sort((a, b) => b.term.length - a.term.length)
    .map((entry) => escapeRegExp(entry.term))
    .join('|')})`,
  'gi',
);

const HREF_BY_TERM = new Map(GLOSSARY_TERMS.map((entry) => [entry.term.toLowerCase(), entry.href]));

const LINK_CLASS =
  'text-telemetry-volt underline-offset-2 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue';

/** Texto puro com hiperlinks automáticos dos termos técnicos para o glossário. */
export function LinkedText({ text }: { text: string }) {
  const parts = text.split(PATTERN);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <Link key={index} href={HREF_BY_TERM.get(part.toLowerCase()) ?? '/glossario'} className={LINK_CLASS}>
            {part}
          </Link>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
