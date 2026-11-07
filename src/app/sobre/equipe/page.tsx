import type { Metadata } from 'next';
import { ContentShell } from '@/components/content/ContentShell';
import { JsonLd } from '@/components/content/JsonLd';
import { RONALDO_PAGE } from '@/data/content/ronaldo.data';
import { TEAM_MEMBERS } from '@/data/team.data';
import { buildPageMetadata } from '@/lib/page-metadata';
import { buildBreadcrumbListSchema } from '@/lib/seo-schema';
import { buildWebPageSchema } from '@/lib/seo-schema-pages';
import { RonaldoDetails } from './RonaldoDetails';

export const metadata: Metadata = buildPageMetadata(RONALDO_PAGE);

export default function EquipePage() {
  return (
    <ContentShell path={RONALDO_PAGE.path}>
      <JsonLd data={buildWebPageSchema(RONALDO_PAGE, 'AboutPage')} />
      <JsonLd data={buildBreadcrumbListSchema(RONALDO_PAGE.path)} />
      <article className="mx-auto max-w-5xl px-3 py-12 sm:px-4 md:py-16 lg:px-6">
        <header className="space-y-3 border-b border-telemetry-border/10 pb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">Equipe</p>
          <h1 className="font-display text-3xl font-extrabold text-telemetry-text-primary sm:text-4xl">
            Equipe RKT
          </h1>
          <p className="text-base text-telemetry-text-muted sm:text-lg">
            Pessoas por trás da plataforma de telemetria esportiva do RKT Tennis.
          </p>
        </header>

        <div className="mt-8 grid items-start gap-8 md:grid-cols-2">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="rounded-3xl border border-telemetry-border/10 bg-telemetry-card p-6 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-telemetry-border/10 bg-telemetry-surface font-mono text-xl font-bold text-telemetry-volt">
                  {member.initials}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-telemetry-text-primary">{member.name}</h2>
                  <p className="font-mono text-xs text-telemetry-volt">{member.role}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-telemetry-text-muted">
                {member.bio ?? 'Biografia e atuação de produto em consolidação.'}
              </p>

              {member.id === 'ronaldo' && <RonaldoDetails />}
            </div>
          ))}
        </div>
      </article>
    </ContentShell>
  );
}
