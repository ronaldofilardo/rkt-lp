import { getCanonicalUrl } from '@/config/site.config';
import { FOUNDER_RONALDO } from '@/config/entity.config';
import { RONALDO_PAGE } from '@/data/content/ronaldo.data';
import { orgId, ronaldoPersonId } from './seo-schema-org';

/**
 * ProfilePage + nó Person canônico de Ronaldo Filardo.
 * O @id é o mesmo usado pelo `founder` da Organization (grafo unificado).
 * Instituições declaradas apenas quando documentadas: doutoramento na
 * Universidade do Porto e PUCPR como instituição de docência.
 */
export function buildRonaldoProfileSchema() {
  const url = `${getCanonicalUrl()}${RONALDO_PAGE.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: RONALDO_PAGE.title,
    description: RONALDO_PAGE.description,
    url,
    inLanguage: 'pt-BR',
    mainEntity: {
      '@type': 'Person',
      '@id': ronaldoPersonId(),
      name: FOUNDER_RONALDO.name,
      alternateName: FOUNDER_RONALDO.shortName,
      jobTitle: 'Fundador de Engenharia e Arquiteto de Software',
      worksFor: { '@id': orgId() },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidade do Porto' },
      knowsAbout: ['ASD-STE100', 'Engenharia Preventiva', 'Tênis', 'Telemetria Esportiva'],
      sameAs: [FOUNDER_RONALDO.lattesUrl],
    },
  };
}
