import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentShell } from '@/components/content/ContentShell';
import { JsonLd } from '@/components/content/JsonLd';
import { MarkdownView, ContentArticleHeader } from '@/components/content/MarkdownView';
import { getLegalDoc } from '@/lib/legal';
import { buildBreadcrumbListSchema } from '@/lib/seo-schema';
import { buildWebPageSchema } from '@/lib/seo-schema-pages';
import { TERMOS_PAGE } from '@/data/content/legal.data';
import { buildPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = buildPageMetadata(TERMOS_PAGE);

export default function TermosPage() {
  const doc = getLegalDoc('termos');
  if (!doc) notFound();

  const breadcrumb = buildBreadcrumbListSchema('/termos');
  const schema = buildWebPageSchema(
    { path: '/termos', title: doc.title, description: doc.description },
    'WebPage',
  );

  return (
    <ContentShell path="/termos">
      <JsonLd data={schema} />
      {breadcrumb && <JsonLd data={breadcrumb} />}
      <article className="mx-auto max-w-3xl space-y-8 px-3 py-12 sm:px-4 md:py-16 lg:px-6">
        <ContentArticleHeader
          eyebrow="Documento Legal"
          title={doc.title}
          meta={
            <span>
              BE SMART LTDA · Versão 2.0 · Atualizada em {doc.mtime.toLocaleDateString('pt-BR')}
            </span>
          }
        />
        <MarkdownView html={doc.html} />
      </article>
    </ContentShell>
  );
}
