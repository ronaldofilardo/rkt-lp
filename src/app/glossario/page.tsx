import type { Metadata } from 'next';
import { ContentShell } from '@/components/content/ContentShell';
import { ContentArticle, QaSections } from '@/components/content/ContentArticle';
import { JsonLd } from '@/components/content/JsonLd';
import { GLOSSARY, GLOSSARY_LEAD, GLOSSARY_PAGE } from '@/data/content/glossary.data';
import { buildPageMetadata } from '@/lib/page-metadata';
import { buildBreadcrumbListSchema } from '@/lib/seo-schema';
import { buildDefinedTermSetSchema, buildWebPageSchema } from '@/lib/seo-schema-pages';

export const metadata: Metadata = buildPageMetadata(GLOSSARY_PAGE);

export default function GlossarioPage() {
  return (
    <ContentShell path={GLOSSARY_PAGE.path}>
      <JsonLd data={buildWebPageSchema(GLOSSARY_PAGE)} />
      <JsonLd data={buildDefinedTermSetSchema()} />
      <JsonLd data={buildBreadcrumbListSchema(GLOSSARY_PAGE.path)} />
      <ContentArticle eyebrow="Glossário" title="Glossário de estatísticas de tênis" lead={GLOSSARY_LEAD}>
        <QaSections items={GLOSSARY} />
      </ContentArticle>
    </ContentShell>
  );
}
