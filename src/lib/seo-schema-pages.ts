import { SITE_CONFIG, getCanonicalUrl } from '@/config/site.config';
import { buildOrganizationSchema, orgId } from './seo-schema-org';
import { getOgImageUrl } from '@/config/seo.config';
import { GLOSSARY, GLOSSARY_PAGE } from '@/data/content/glossary.data';
import { GUIDE_PAGE } from '@/data/content/guide.data';
import { CONTENT_LAST_UPDATED, type PageMeta, type QaItem } from '@/data/content/page.types';

export { buildOrganizationSchema };
const ORG_ID = orgId;

export function buildWebPageSchema(page: PageMeta, type: 'WebPage' | 'AboutPage' = 'WebPage') {
  const url = `${getCanonicalUrl()}${page.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: page.title,
    description: page.description,
    url,
    inLanguage: 'pt-BR',
    dateModified: CONTENT_LAST_UPDATED,
    isPartOf: { '@type': 'WebSite', name: SITE_CONFIG.name, url: getCanonicalUrl() },
    publisher: { '@id': ORG_ID() },
  };
}

export function buildQaSchema(items: readonly QaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'pt-BR',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };
}

export function buildDefinedTermSetSchema() {
  const base = `${getCanonicalUrl()}${GLOSSARY_PAGE.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Glossário de estatísticas de tênis',
    inLanguage: 'pt-BR',
    url: base,
    hasDefinedTerm: GLOSSARY.map((g) => ({
      '@type': 'DefinedTerm',
      name: g.question,
      description: g.answer,
      url: `${base}#${g.id}`,
    })),
  };
}

export function buildArticleSchema() {
  const url = `${getCanonicalUrl()}${GUIDE_PAGE.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: GUIDE_PAGE.title,
    description: GUIDE_PAGE.description,
    inLanguage: 'pt-BR',
    mainEntityOfPage: url,
    image: getOgImageUrl(getCanonicalUrl()),
    datePublished: CONTENT_LAST_UPDATED,
    dateModified: CONTENT_LAST_UPDATED,
    author: { '@id': ORG_ID() },
    publisher: { '@id': ORG_ID() },
  };
}
