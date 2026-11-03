import { SITE_CONFIG, getCanonicalUrl } from '@/config/site.config';
import { SEO, getOgImageUrl } from '@/config/seo.config';
import { FAQ_ITEMS } from '@/data/faq.data';
import { BREADCRUMBS } from '@/data/content/breadcrumbs.data';
import { orgId } from './seo-schema-org';

export function buildSoftwareApplicationSchema() {
  const url = getCanonicalUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${url}/#softwareapplication`,
    name: SITE_CONFIG.name,
    applicationCategory: 'SportsApplication',
    applicationSubCategory: 'Sports Analytics',
    operatingSystem: 'All',
    inLanguage: 'pt-BR',
    description: SEO.description,
    url,
    image: getOgImageUrl(url),
    publisher: { '@id': orgId() },
    featureList: [...SEO.featureList],
    audience: SEO.audiences.map((audienceType) => ({ '@type': 'Audience', audienceType })),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
      description: 'Cota de 5 partidas sem custos para atletas, treinadores e anotadores. Políticas e planos em definição.',
    },
  };
}

/** Nó WebSite canônico amarrado à Organization via @id. */
export function buildWebSiteSchema() {
  const url = getCanonicalUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    name: SITE_CONFIG.name,
    url,
    inLanguage: 'pt-BR',
    description: SEO.description,
    publisher: { '@id': orgId() },
  };
}

/** BreadcrumbList de uma rota interna, ancorada na home como posição 1. */
export function buildBreadcrumbListSchema(path: string) {
  const base = getCanonicalUrl();
  const trail = BREADCRUMBS[path] ?? [];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${base}/` },
      ...trail.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: crumb.name,
        item: `${base}${crumb.path}`,
      })),
    ],
  };
}

export function buildFaqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'pt-BR',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** Serializa JSON-LD escapando "<" para impedir fechamento prematuro do <script>. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
