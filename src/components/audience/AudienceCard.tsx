'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { AudienceCard as AudienceCardType } from '@/data/audience.data';

interface Props {
  card: AudienceCardType;
  signupUrl: string;
}

/**
 * Card com tilt sutil no hover (desktop).
 * No mobile não há tilt: o card é estático dentro do carrossel snap.
 * prefers-reduced-motion: transform desativado via CSS.
 */
export function AudienceCard({ card, signupUrl }: Props) {
  const ref = useRef<HTMLElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 8;
    const y = ((e.clientY - top) / height - 0.5) * -8;
    el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg)`;
  }

  function onMouseLeave() {
    if (ref.current) ref.current.style.transform = '';
  }

  return (
    <article
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="audience-card flex h-full flex-col gap-4 rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-5 transition-transform duration-150 ease-out will-change-transform sm:p-6"
      aria-label={`Perfil: ${card.title}`}
    >
      <p className="font-mono text-xs-extra uppercase tracking-widest text-telemetry-volt">
        {card.path ? (
          <Link
            href={card.path}
            className="underline-offset-2 transition-colors hover:text-telemetry-text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
          >
            {card.title}
          </Link>
        ) : (
          card.title
        )}
      </p>
      <blockquote className="text-base font-semibold leading-snug text-telemetry-text-primary">
        &ldquo;{card.question}&rdquo;
      </blockquote>
      <p className="flex-1 text-sm leading-relaxed text-telemetry-text-muted">{card.answer}</p>
      <a
        href={signupUrl}
        className="mt-auto inline-block rounded-full border border-telemetry-border/20 px-4 py-2 text-center text-sm font-medium text-telemetry-text-primary transition-colors hover:border-telemetry-volt/40 hover:text-telemetry-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry-blue"
      >
        {card.ctaLabel}
      </a>
    </article>
  );
}
