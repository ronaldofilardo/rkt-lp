import type { MetadataRoute } from 'next';
import { getCanonicalUrl } from '@/config/site.config';
import { ALLOWED_CRAWLERS, DISALLOWED_PATHS } from '@/config/crawlers.config';

export default function robots(): MetadataRoute.Robots {
  const base = getCanonicalUrl();
  const disallow = [...DISALLOWED_PATHS];
  return {
    rules: ['*', ...ALLOWED_CRAWLERS].map((userAgent) => ({
      userAgent,
      allow: '/',
      disallow,
    })),
    sitemap: `${base}/sitemap.xml`,
  };
}
