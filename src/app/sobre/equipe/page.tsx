import type { Metadata } from 'next';
import { ContentShell } from '@/components/content/ContentShell';
import { JsonLd } from '@/components/content/JsonLd';
import { RONALDO_PAGE } from '@/data/content/ronaldo.data';
import { TEAM_MEMBERS } from '@/data/team.data';
import { buildPageMetadata } from '@/lib/page-metadata';
import { buildBreadcrumbListSchema } from '@/lib/seo-schema';
import { buildWebPageSchema } from '@/lib/seo-schema-pages';

export const metadata: Metadata = buildPageMetadata(RONALDO_PAGE);

export default function EquipePage() {
  return (
    <ContentShell path={RONALDO_PAGE.path}>
      <JsonLd data={buildWebPageSchema(RONALDO_PAGE, 'AboutPage')} />
      <JsonLd data={buildBreadcrumbListSchema(RONALDO_PAGE.path)} />
      <article className="mx-auto max-w-4xl px-3 py-12 sm:px-4 md:py-16 lg:px-6">
        <header className="space-y-3 border-b border-telemetry-border/10 pb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">Equipe</p>
          <h1 className="font-display text-3xl font-extrabold text-telemetry-text-primary sm:text-4xl">
            Equipe RKT
          </h1>
          <p className="text-base text-telemetry-text-muted sm:text-lg">
            Pessoas por trás da plataforma de telemetria esportiva do RKT Tennis.
          </p>
        </header>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-6">
              <h2 className="text-lg font-bold text-telemetry-text-primary">{member.name}</h2>
              <p className="mt-1 text-xs font-mono text-telemetry-volt">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-telemetry-text-muted">
                {member.id === 'ronaldo'
                  ? 'Arquiteto de software desde 1996, criador da metodologia STE-DEV e fundador de engenharia do RKT Tennis.'
                  : 'Fundador e produto do RKT Tennis. Mais informações em breve.'
                }
              </p>
            </div>
          ))}
        </div>
      </article>
    </ContentShell>
  );
}
