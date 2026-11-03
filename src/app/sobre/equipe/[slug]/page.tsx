import type { Metadata } from 'next';
import { ContentShell } from '@/components/content/ContentShell';
import { JsonLd } from '@/components/content/JsonLd';
import { ContentArticle } from '@/components/content/ContentArticle';
import { QaSections } from '@/components/content/ContentArticle';
import { RONALDO_LEAD, RONALDO_QA } from '@/data/content/ronaldo.data';
import { TEAM_MEMBERS } from '@/data/team.data';
import { buildPageMetadata } from '@/lib/page-metadata';
import { buildBreadcrumbListSchema } from '@/lib/seo-schema';
import { buildWebPageSchema } from '@/lib/seo-schema-pages';
import { buildQaSchema } from '@/lib/seo-schema-pages';

const EDUARDO_LEAD =
  'Eduardo Figueiredo é fundador de produto do RKT Tennis. Cuida da estratégia de produto, experiência do usuário e crescimento da plataforma de telemetria esportiva. Mais informações em breve.';

function bioForSlug(slug: string) {
  const member = TEAM_MEMBERS.find((m) => m.slug === slug);
  if (!member) return null;

  const isRonaldo = member.id === 'ronaldo';
  const lead = isRonaldo ? RONALDO_LEAD : EDUARDO_LEAD;
  const qa = isRonaldo ? RONALDO_QA : undefined;

  return { member, lead, qa };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const bio = bioForSlug(slug);
  if (!bio) {
    return { title: 'Biografia não encontrada' };
  }
  return buildPageMetadata({
    path: `/sobre/equipe/${slug}`,
    title: `${bio.member.name} — Biografia`,
    description: bio.lead,
    ogType: 'profile',
  });
}

export default async function EquipeBioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bio = bioForSlug(slug);
  if (!bio) {
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

  return (
    <ContentShell path={`/sobre/equipe/${slug}`}>
      <JsonLd data={buildWebPageSchema({ path: `/sobre/equipe/${slug}`, title: `${bio.member.name} — Biografia`, description: bio.lead } as never)} />
      <JsonLd data={buildBreadcrumbListSchema(`/sobre/equipe/${slug}`)} />
      {bio.qa && <JsonLd data={buildQaSchema(bio.qa)} />}
      <article className="mx-auto max-w-4xl px-3 py-12 sm:px-4 md:py-16 lg:px-6">
        <p className="text-xs font-mono uppercase tracking-widest text-telemetry-volt mb-2">{bio.member.role}</p>
        <ContentArticle eyebrow="Biografia" title={bio.member.name} lead={bio.lead}>
          {bio.qa && <QaSections items={bio.qa} />}
        </ContentArticle>
      </article>
    </ContentShell>
  );
}
