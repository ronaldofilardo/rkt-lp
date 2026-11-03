import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentShell } from '@/components/content/ContentShell';
import { JsonLd } from '@/components/content/JsonLd';
import { MarkdownView, ContentArticleHeader } from '@/components/content/MarkdownView';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';
import { buildArticleSchema } from '@/lib/seo-schema-articles';
import { buildBreadcrumbListSchema } from '@/lib/seo-schema';

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/artigos/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      publishedTime: article.mtime.toISOString(),
      modifiedTime: article.mtime.toISOString(),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const isoDate = article.mtime.toISOString();
  const articleSchema = buildArticleSchema({
    slug: article.slug,
    title: article.title,
    description: article.description,
    datePublished: isoDate,
    dateModified: isoDate,
  });
  const breadcrumb = buildBreadcrumbListSchema(`/artigos/${article.slug}`);

  return (
    <ContentShell path={`/artigos/${article.slug}`}>
      <JsonLd data={articleSchema} />
      {breadcrumb && <JsonLd data={breadcrumb} />}
      <article className="mx-auto max-w-3xl space-y-8 px-3 py-12 sm:px-4 md:py-16 lg:px-6">
        <ContentArticleHeader
          eyebrow="Artigo Técnico"
          title={article.title}
          meta={
            <span>
              {article.readingTimeMinutes} min de leitura · Atualizado em{' '}
              {article.mtime.toLocaleDateString('pt-BR')} · Por Ronaldo Filardo
            </span>
          }
        />
        <MarkdownView html={article.html} />
      </article>
    </ContentShell>
  );
}
