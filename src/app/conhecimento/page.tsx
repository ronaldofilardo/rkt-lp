import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentShell } from '@/components/content/ContentShell';
import { JsonLd } from '@/components/content/JsonLd';
import { getAllKnowledgeDocs } from '@/lib/knowledge';
import { buildBreadcrumbListSchema } from '@/lib/seo-schema';
import { buildPageMetadata } from '@/lib/page-metadata';
import { CONHECIMENTO_HUB_PAGE } from '@/data/content/pages.data';

export const metadata: Metadata = buildPageMetadata(CONHECIMENTO_HUB_PAGE);

export default function ConhecimentoIndexPage() {
  const docs = getAllKnowledgeDocs();
  const breadcrumb = buildBreadcrumbListSchema('/conhecimento');

  return (
    <ContentShell path="/conhecimento">
      <JsonLd data={breadcrumb} />
      <article className="mx-auto max-w-4xl px-3 py-12 sm:px-4 md:py-16 lg:px-6">
        <header className="space-y-3 border-b border-telemetry-border/10 pb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">Base de Conhecimento</p>
          <h1 className="font-display text-3xl font-extrabold text-telemetry-text-primary sm:text-4xl">
            Arquitetura e Fundamentos do RKT
          </h1>
          <p className="text-base text-telemetry-text-muted sm:text-lg">
            Módulos atômicos que documentam a engenharia de telemetria, motor de pontuação e conformidade do RKT.
          </p>
        </header>

        <div className="mt-8 space-y-4">
          {docs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/conhecimento/${doc.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-telemetry-border/10 bg-telemetry-card/50 p-6 transition-all hover:border-telemetry-volt/40 hover:bg-telemetry-card sm:flex-row sm:items-center"
            >
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-telemetry-text-primary group-hover:text-telemetry-volt">
                  {doc.title}
                </h2>
                <p className="text-sm text-telemetry-text-muted line-clamp-2">{doc.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </article>
    </ContentShell>
  );
}
