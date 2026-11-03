import type { Metadata } from 'next';
import { SEO } from '@/config/seo.config';
import { SITE_CONFIG, formatTitle, getCanonicalUrl } from '@/config/site.config';
import type { PageMeta } from '@/data/content/page.types';

export function buildPageMetadata(page: PageMeta): Metadata {
  const image = {
    url: SEO.ogImage.path,
    width: SEO.ogImage.width,
    height: SEO.ogImage.height,
    alt: SEO.ogImage.alt,
  };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: formatTitle(page.title),
      description: page.description,
      url: `${getCanonicalUrl()}${page.path}`,
      siteName: SITE_CONFIG.name,
      locale: 'pt_BR',
      type: page.ogType ?? 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: formatTitle(page.title),
      description: page.description,
      images: [image],
    },
  };
}
