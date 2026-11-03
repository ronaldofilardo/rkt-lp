import { ContentShell } from '@/components/content/ContentShell';

export function BioNotFound() {
  return (
    <ContentShell path="/sobre/equipe">
      <article className="mx-auto max-w-4xl px-3 py-12 sm:px-4 md:py-16 lg:px-6">
        <h1 className="font-display text-3xl font-extrabold text-telemetry-text-primary">
          Biografia não encontrada
        </h1>
      </article>
    </ContentShell>
  );
}
