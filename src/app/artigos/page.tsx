import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentShell } from '@/components/content/ContentShell';
import { JsonLd } from '@/components/content/JsonLd';
import { getAllArticles } from '@/lib/articles';
import { buildBreadcrumbListSchema } from '@/lib/seo-schema';
import { buildPageMetadata } from '@/lib/page-metadata';
import { ARTIGOS_HUB_PAGE } from '@/data/content/pages.data';

export const metadata: Metadata = buildPageMetadata(ARTIGOS_HUB_PAGE);

export default function ArtigosIndexPage() {
  const articles = getAllArticles();
  const breadcrumb = buildBreadcrumbListSchema('/artigos');

  return (
    <ContentShell path="/artigos">
      <JsonLd data={breadcrumb} />
      <article className="mx-auto max-w-4xl px-3 py-12 sm:px-4 md:py-16 lg:px-6">
        <header className="space-y-3 border-b border-telemetry-border/10 pb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">Biblioteca Técnica</p>
          <h1 className="font-display text-3xl font-extrabold text-telemetry-text-primary sm:text-4xl">
            Artigos e Análises Técnicas
          </h1>
          <p className="text-base text-telemetry-text-muted sm:text-lg">
            Guias completos e análises de telemetria baseados nas regras oficiais da ITF e no motor de dados do RKT.
          </p>
        </header>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {articles.map((art) => (
            <Link
              key={art.slug}
              href={`/artigos/${art.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-telemetry-border/10 bg-telemetry-card/50 p-6 transition-all hover:border-telemetry-volt/40 hover:bg-telemetry-card"
            >
              <div className="space-y-2">
                <span className="font-mono text-xs text-telemetry-volt">
                  {art.readingTimeMinutes} min de leitura
                </span>
                <h2 className="text-lg font-bold text-telemetry-text-primary group-hover:text-telemetry-volt">
                  {art.title}
                </h2>
                <p className="text-sm text-telemetry-text-muted line-clamp-3">
                  {art.description}
                </p>
              </div>
              <span className="mt-4 text-xs font-semibold text-telemetry-blue-light group-hover:underline">
                Ler artigo completo →
              </span>
            </Link>
          ))}
        </div>
      </article>
    </ContentShell>
  );
}
