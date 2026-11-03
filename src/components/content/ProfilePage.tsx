import { buildSignupUrl } from '@/config/site.config';
import type { ProfilePageData } from '@/data/content/profiles.data';
import { buildQaSchema, buildWebPageSchema } from '@/lib/seo-schema-pages';
import { buildBreadcrumbListSchema } from '@/lib/seo-schema';
import { ContentShell } from './ContentShell';
import { ContentArticle, CtaLink, QaSections } from './ContentArticle';
import { JsonLd } from './JsonLd';

export function ProfilePage({ data }: { data: ProfilePageData }) {
  return (
    <ContentShell path={data.path}>
      <JsonLd data={buildWebPageSchema(data)} />
      <JsonLd data={buildQaSchema(data.qa)} />
      <JsonLd data={buildBreadcrumbListSchema(data.path)} />
      <ContentArticle eyebrow="Para quem" title={data.h1} lead={data.lead}>
        <QaSections items={data.qa} />
        <CtaLink
          href={buildSignupUrl({ perfil: data.profile, origem: `lp_perfil_${data.slug}` })}
          label={data.ctaLabel}
        />
      </ContentArticle>
    </ContentShell>
  );
}
