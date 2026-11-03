import type { Metadata } from 'next';
import { ContentShell } from '@/components/content/ContentShell';
import { ContentArticle, QaSections } from '@/components/content/ContentArticle';
import { CompanyFacts } from '@/components/content/CompanyFacts';
import { JsonLd } from '@/components/content/JsonLd';
import { ABOUT_LEAD, ABOUT_PAGE, ABOUT_QA } from '@/data/content/about.data';
import { buildPageMetadata } from '@/lib/page-metadata';
import { buildBreadcrumbListSchema } from '@/lib/seo-schema';
import { buildQaSchema, buildWebPageSchema } from '@/lib/seo-schema-pages';

export const metadata: Metadata = buildPageMetadata(ABOUT_PAGE);

export default function SobrePage() {
  return (
    <ContentShell path={ABOUT_PAGE.path}>
      <JsonLd data={buildWebPageSchema(ABOUT_PAGE, 'AboutPage')} />
      <JsonLd data={buildBreadcrumbListSchema(ABOUT_PAGE.path)} />
      <JsonLd data={buildQaSchema(ABOUT_QA)} />
      <ContentArticle eyebrow="Sobre" title="Sobre o RKT Tennis" lead={ABOUT_LEAD}>
        <QaSections items={ABOUT_QA} />
        <CompanyFacts />
      </ContentArticle>
    </ContentShell>
  );
}
