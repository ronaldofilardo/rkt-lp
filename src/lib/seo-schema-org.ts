import { SITE_CONFIG, getCanonicalUrl } from '@/config/site.config';
import { getOgImageUrl } from '@/config/seo.config';
import { COMPANY, FOUNDER_EDUARDO, FOUNDER_RONALDO } from '@/config/entity.config';
import { ABOUT_PAGE } from '@/data/content/about.data';
import { RONALDO_PAGE } from '@/data/content/ronaldo.data';
import { TEAM_MEMBERS } from '@/data/team.data';

export const orgId = () => `${getCanonicalUrl()}/#organization`;
const personId = (slug: string) => `${getCanonicalUrl()}${ABOUT_PAGE.path}#${slug}`;
/** @id canônico do nó Person de Ronaldo — compartilhado com /sobre/ronaldo. */
export const ronaldoPersonId = () => `${getCanonicalUrl()}${RONALDO_PAGE.path}#person`;
const roleOf = (id: string) => TEAM_MEMBERS.find((m) => m.id === id)?.role;

const address = {
  '@type': 'PostalAddress',
  addressLocality: COMPANY.city,
  addressRegion: COMPANY.region,
  addressCountry: COMPANY.country,
} as const;

export function buildOrganizationSchema() {
  const url = getCanonicalUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId(),
    name: SITE_CONFIG.name,
    url,
    logo: `${url}/brand/icon-512.png`,
    image: getOgImageUrl(url),
    description: SITE_CONFIG.description,
    email: COMPANY.supportEmail,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: COMPANY.supportEmail,
      availableLanguage: 'pt-BR',
      areaServed: COMPANY.country,
    },
    address,
    parentOrganization: {
      '@type': 'Organization',
      '@id': `${COMPANY.website}/#organization`,
      name: COMPANY.brandName,
      url: COMPANY.website,
      legalName: COMPANY.legalName,
      taxID: COMPANY.cnpj,
      foundingDate: String(COMPANY.foundedYear),
      email: COMPANY.supportEmail,
      address,
    },
    founder: [
      {
        '@type': 'Person',
        '@id': ronaldoPersonId(),
        name: FOUNDER_RONALDO.name,
        alternateName: FOUNDER_RONALDO.shortName,
        jobTitle: roleOf('ronaldo'),
        description: FOUNDER_RONALDO.bio,
        knowsAbout: [...FOUNDER_RONALDO.knowsAbout],
        sameAs: [FOUNDER_RONALDO.lattesUrl],
      },
      {
        '@type': 'Person',
        '@id': personId(FOUNDER_EDUARDO.slug),
        name: FOUNDER_EDUARDO.name,
        jobTitle: roleOf('eduardo'),
      },
    ],
  };
}
