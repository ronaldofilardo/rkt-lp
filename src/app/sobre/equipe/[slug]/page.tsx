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

      <section className="mx-auto max-w-4xl px-3 py-12 sm:px-4 md:py-20 lg:px-6">
        <div className="rounded-3xl border border-telemetry-border/10 bg-telemetry-card p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
            <div className="flex-shrink-0 self-start sm:self-center">
              <div className="w-20 h-20 rounded-2xl border border-telemetry-border/10 bg-telemetry-surface flex items-center justify-center text-telemetry-volt font-mono font-bold text-2xl">
                {bio.member.initials}
              </div>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">{bio.member.role}</p>
              <h1 className="font-display text-3xl font-extrabold text-telemetry-text-primary sm:text-5xl mt-2 sm:mt-4">
                {bio.member.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-telemetry-text-muted sm:text-lg max-w-2xl">
                {bio.lead}
              </p>
            </div>
          </div>
        </div>
      </section>

      {bio.qa && bio.qa.length > 0 && (
        <section className="mx-auto max-w-4xl px-3 py-12 sm:px-4 md:py-20 lg:px-6">
          <ContentArticle eyebrow="Perguntas frequentes" title={`Sobre ${bio.member.name}`} lead={bio.lead}>
            <QaSections items={bio.qa} />
          </ContentArticle>
        </section>
      )}
    </ContentShell>
  );
}
