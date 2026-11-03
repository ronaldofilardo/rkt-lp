import { getCanonicalUrl } from '@/config/site.config';
import { orgId, ronaldoPersonId } from './seo-schema-org';

export function buildArticleSchema({
  slug,
  title,
  description,
  datePublished,
  dateModified,
}: {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
}) {
  const url = `${getCanonicalUrl()}/artigos/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    isPartOf: { '@id': `${getCanonicalUrl()}/#website` },
    headline: title,
    description,
    inLanguage: 'pt-BR',
    mainEntityOfPage: url,
    url,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      '@id': ronaldoPersonId(),
      name: 'Ronaldo Domingues Filardo',
    },
    publisher: {
      '@type': 'Organization',
      '@id': orgId(),
    },
  };
}

export function buildKnowledgeDocSchema({
  slug,
  title,
  description,
  dateModified,
}: {
  slug: string;
  title: string;
  description: string;
  dateModified: string;
}) {
  const url = `${getCanonicalUrl()}/conhecimento/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${url}#techarticle`,
    isPartOf: { '@id': `${getCanonicalUrl()}/#website` },
    headline: title,
    description,
    inLanguage: 'pt-BR',
    mainEntityOfPage: url,
    url,
    dateModified,
    publisher: {
      '@type': 'Organization',
      '@id': orgId(),
    },
  };
}
