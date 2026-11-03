import type { Metadata } from 'next';
import { ContentShell } from '@/components/content/ContentShell';
import { JsonLd } from '@/components/content/JsonLd';
import { RONALDO_QA } from '@/data/content/ronaldo.data';
import { buildPageMetadata } from '@/lib/page-metadata';
import { buildBreadcrumbListSchema } from '@/lib/seo-schema';
import { buildWebPageSchema } from '@/lib/seo-schema-pages';
import { bioForSlug } from '@/lib/team';
import { CredentialCard } from './CredentialCard';
import { FaqCard } from './FaqCard';
import { BioNotFound } from './BioNotFound';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const bio = bioForSlug(slug);
  if (!bio) {
    return { title: 'Biografia não encontrada' };
  }
  return buildPageMetadata({
    path: `/sobre/equipe/${slug}`,
    title: `${bio.member.name} — Biografia`,
    description: bio.member.bio ?? '',
    ogType: 'profile',
  });
}

export default async function EquipeBioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bio = bioForSlug(slug);
  if (!bio) {
    return <BioNotFound />;
  }

  const member = bio.member;

  return (
    <ContentShell path={`/sobre/equipe/${slug}`}>
      <JsonLd data={buildWebPageSchema({ path: `/sobre/equipe/${slug}`, title: `${member.name} — Biografia`, description: member.bio ?? '' } as never)} />
      <JsonLd data={buildBreadcrumbListSchema(`/sobre/equipe/${slug}`)} />

      <section className="mx-auto max-w-4xl px-3 py-12 sm:px-4 md:py-20 lg:px-6">
        <div className="rounded-3xl border border-telemetry-border/10 bg-telemetry-card p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
            <div className="flex-shrink-0 self-start sm:self-center">
              <div className="w-20 h-20 rounded-2xl border border-telemetry-border/10 bg-telemetry-surface flex items-center justify-center text-telemetry-volt font-mono font-bold text-2xl">
                {member.initials}
              </div>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt">{member.role}</p>
              <h1 className="font-display text-3xl font-extrabold text-telemetry-text-primary sm:text-5xl mt-2 sm:mt-4">
                {member.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-telemetry-text-muted sm:text-lg max-w-2xl">
                {member.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-3 py-12 sm:px-4 md:py-20 lg:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt mb-8 text-center sm:text-left">
          Credenciais e formação profissional
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CredentialCard
            title="Formação acadêmica"
            body="Professor universitário (graduação e especialização) da Pontifícia Universidade Católica do Paraná, lecionando Metodologia de Pesquisa Científica. Autor do livro “Metodologia de Pesquisa Científica: fundamentos, princípios e processos”, Editora Intersaberes. Pesquisas de doutoramento em Portugal."
          />
          <CredentialCard
            body="Fundador da Omni Sistemas e criador da STE-DEV. Iniciou em 1996 com o software ANTHROPO em VBA, acumulando 30 anos de arquiteturas em saúde, finanças, esportes e blockchain. Domínio prático de segurança criptográfica e mentalidade Zero-Trust."
            title="Trajetória técnica"
          />
          <CredentialCard
            body="Framework de engenharia preventiva baseado na norma aeroespacial ASD-STE100. Elimina dívida técnica na origem com módulos de menos de 100 linhas, vocabulário controlado, Clean Architecture e SOLID, zero-any e auditoria formal para sistemas legados."
            title="Metodologia STE-DEV"
          />
          <CredentialCard
            body="Semântica ASD-STE100 (um conceito, um nome), Arquitetura Limpa & SOLID (camadas desacopladas), Desenvolvimento Preventivo (máximo 100 linhas por arquivo, zero-any, try/catch em I/O) e Engenharia Reversa & Auditoria (inventário de violações por linha, plano atômico em 5 passos)."
            title="4 pilares da engenharia preventiva"
          />
        </div>
      </section>

      {member.id === 'ronaldo' && RONALDO_QA.length > 0 && (
        <section className="mx-auto max-w-5xl px-3 py-12 sm:px-4 md:py-20 lg:px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-telemetry-volt mb-8 text-center sm:text-left">
            Perguntas frequentes
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RONALDO_QA.map((item) => (
              <FaqCard key={item.id} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>
      )}
    </ContentShell>
  );
}
