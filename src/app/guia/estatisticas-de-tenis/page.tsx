import type { Metadata } from 'next';
import { buildSignupUrl } from '@/config/site.config';
import { ContentShell } from '@/components/content/ContentShell';
import { ContentArticle, CtaLink, QaSections } from '@/components/content/ContentArticle';
import { JsonLd } from '@/components/content/JsonLd';
import { GUIDE_CLOSING, GUIDE_LEAD, GUIDE_PAGE, GUIDE_SECTIONS } from '@/data/content/guide.data';
import { buildPageMetadata } from '@/lib/page-metadata';
import { buildBreadcrumbListSchema } from '@/lib/seo-schema';
import { buildArticleSchema, buildQaSchema } from '@/lib/seo-schema-pages';

export const metadata: Metadata = buildPageMetadata(GUIDE_PAGE);

export default function GuiaPage() {
  return (
    <ContentShell path={GUIDE_PAGE.path}>
      <JsonLd data={buildArticleSchema()} />
      <JsonLd data={buildQaSchema(GUIDE_SECTIONS)} />
      <JsonLd data={buildBreadcrumbListSchema(GUIDE_PAGE.path)} />
      <ContentArticle
        eyebrow="Guia para treinadores"
        title="Estatísticas de tênis que todo treinador deveria acompanhar"
        lead={GUIDE_LEAD}
      >
        <QaSections items={GUIDE_SECTIONS} glossaryLinks />
        <p className="text-sm leading-relaxed text-telemetry-text-muted sm:text-base">{GUIDE_CLOSING}</p>
        <CtaLink href={buildSignupUrl({ perfil: 'TREINADOR', origem: 'lp_guia' })} label="Criar conta como treinador" />
      </ContentArticle>
    </ContentShell>
  );
}
