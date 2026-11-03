import type { ReactNode } from 'react';

export function MarkdownView({ html }: { html: string }) {
  return (
    <div
      className="rkt-prose text-sm leading-relaxed text-telemetry-text-muted sm:text-base"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function ContentArticleHeader({
  eyebrow,
  title,
  lead,
  meta,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  meta?: ReactNode;
}) {
  return (
    <header className="space-y-3 border-b border-telemetry-border/10 pb-6">
      <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">{eyebrow}</p>
      <h1 className="font-display text-2xl font-extrabold leading-tight text-telemetry-text-primary sm:text-3xl md:text-4xl">
        {title}
      </h1>
      {lead && <p className="text-base leading-relaxed text-telemetry-text-muted sm:text-lg">{lead}</p>}
      {meta && <div className="pt-2 text-xs text-telemetry-text-muted">{meta}</div>}
    </header>
  );
}

