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

const RONALDO_CREDENTIALS = [
  {
    id: 'formacao',
    title: 'Formação acadêmica',
    body:
      'Professor universitário (graduação e especialização) da Pontifícia Universidade Católica do Paraná, lecionando Metodologia de Pesquisa Científica. Autor do livro *"Metodologia de Pesquisa Científica: fundamentos, princípios e processos"*, Editora Intersaberes. Pesquisas de doutoramento em Portugal voltadas a processos formais de estruturação e validação de conhecimento.',
  },
  {
    id: 'trajetoria',
    title: 'Trajetória técnica',
    body:
      'Fundador da Omni Sistemas e criador da STE-DEV. Iniciou em 1996 com o software ANTHROPO em VBA, acumulando 30 anos de arquiteturas em saúde, finanças, esportes e blockchain. Domínio prático de segurança criptográfica e mentalidade Zero-Trust, com isolamento DB-Row/DTO e conformidade estrita com a LGPD.',
  },
  {
    id: 'metodologia',
    title: 'Metodologia STE-DEV',
    body:
      'Framework de engenharia preventiva baseado na norma aeroespacial ASD-STE100. Elimina dívida técnica na origem com módulos de menos de 100 linhas, vocabulário controlado, Clean Architecture e SOLID, zero-any e auditoria formal de quatro etapas para sistemas legados.',
  },
  {
    id: 'pilares',
    title: '4 pilares da engenharia preventiva',
    body:
      'Semântica ASD-STE100 (um conceito, um nome), Arquitetura Limpa & SOLID (camadas desacopladas), Desenvolvimento Preventivo (máximo 100 linhas por arquivo, zero-any, try/catch em I/O) e Engenharia Reversa & Auditoria (inventário de violações por linha, plano atômico em 5 passos).',
  },
] as const;

const EDUARDO_CREDENTIALS = [
  {
    id: 'produto',
    title: 'Produto',
    body: 'Estratégia de produto, experiência do usuário e crescimento da plataforma de telemetria esportiva do RKT Tennis.',
  },
  {
    id: 'breve',
    title: 'Mais informações',
    body: 'Biografia em breve.',
  },
] as const;

function bioForSlug(slug: string) {
  const member = TEAM_MEMBERS.find((m) => m.slug === slug);
  if (!member) return null;

  const isRonaldo = member.id === 'ronaldo';
  const lead = isRonaldo ? RONALDO_LEAD : EDUARDO_LEAD;
  const credentials = isRonaldo ? RONALDO_CREDENTIALS : EDUARDO_CREDENTIALS;
  const qa = isRonaldo ? RONALDO_QA : undefined;

  return { member, lead, credentials, qa };
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

function CredentialCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-telemetry-border/10 bg-telemetry-card p-6">
      <h3 className="text-lg font-bold text-telemetry-text-primary mb-2">{title}</h3>
      <p className="text-sm leading-relaxed text-telemetry-text-muted">{body}</p>
    </div>
  );
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

  const initials = bio.member.initials;

  return (
    <ContentShell path={`/sobre/equipe/${slug}`}>
      <JsonLd data={buildWebPageSchema({ path: `/sobre/equipe/${slug}`, title: `${bio.member.name} — Biografia`, description: bio.lead } as never)} />
      <JsonLd data={buildBreadcrumbListSchema(`/sobre/equipe/${slug}`)} />
      {bio.qa && <JsonLd data={buildQaSchema(bio.qa)} />}

      {/* Card principal — identidade */}
      <section className="mx-auto max-w-5xl px-3 py-12 sm:px-4 md:py-20 lg:px-6">
        <div className="rounded-3xl border border-telemetry-border/10 bg-telemetry-card p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
            <div className="flex-shrink-0 self-start sm:self-center">
              <div className="w-20 h-20 rounded-2xl border border-telemetry-border/10 bg-telemetry-surface flex items-center justify-center text-telemetry-volt font-mono font-bold text-2xl">
                {initials}
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

      {/* Grid de credenciais */}
      <section className="mx-auto max-w-5xl px-3 py-12 sm:px-4 md:py-20 lg:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt mb-8 text-center sm:text-left">
          Credenciais e formação profissional
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bio.credentials.map((card) => (
            <CredentialCard key={card.id} title={card.title} body={card.body} />
          ))}
        </div>
      </section>

      {/* Perguntas frequentes */}
      {bio.qa && (
        <section className="mx-auto max-w-5xl px-3 py-12 sm:px-4 md:py-20 lg:px-6">
          <ContentArticle eyebrow="Perguntas Frequentes" title={`Sobre ${bio.member.name}`} lead={bio.lead}>
            <QaSections items={bio.qa} />
          </ContentArticle>
        </section>
      )}
    </ContentShell>
  );
}
