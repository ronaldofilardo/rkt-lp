import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentShell } from '@/components/content/ContentShell';
import { JsonLd } from '@/components/content/JsonLd';
import { MarkdownView, ContentArticleHeader } from '@/components/content/MarkdownView';
import { getAllKnowledgeDocs, getKnowledgeDocBySlug } from '@/lib/knowledge';
import { buildKnowledgeDocSchema } from '@/lib/seo-schema-articles';
import { buildBreadcrumbListSchema } from '@/lib/seo-schema';

export function generateStaticParams() {
  return getAllKnowledgeDocs().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getKnowledgeDocBySlug(slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/conhecimento/${doc.slug}` },
    openGraph: {
      type: 'article',
      title: doc.title,
      description: doc.description,
      modifiedTime: doc.mtime.toISOString(),
    },
  };
}

export default async function KnowledgeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getKnowledgeDocBySlug(slug);
  if (!doc) notFound();

  const isoDate = doc.mtime.toISOString();
  const schema = buildKnowledgeDocSchema({
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    dateModified: isoDate,
  });
  const breadcrumb = buildBreadcrumbListSchema(`/conhecimento/${doc.slug}`);

  return (
    <ContentShell path={`/conhecimento/${doc.slug}`}>
      <JsonLd data={schema} />
      {breadcrumb && <JsonLd data={breadcrumb} />}
      <article className="mx-auto max-w-3xl space-y-8 px-3 py-12 sm:px-4 md:py-16 lg:px-6">
        <ContentArticleHeader
          eyebrow="Módulo de Conhecimento"
          title={doc.title}
          meta={
            <span>
              Documento canônico RKT · Atualizado em {doc.mtime.toLocaleDateString('pt-BR')}
            </span>
          }
        />
        <MarkdownView html={doc.html} />
      </article>
    </ContentShell>
  );
}
