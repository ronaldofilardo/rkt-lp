import { statSync } from 'node:fs';
import { join } from 'node:path';
import type { MetadataRoute } from 'next';
import { getCanonicalUrl } from '@/config/site.config';
import { CONTENT_LAST_UPDATED } from '@/data/content/page.types';
import { SITE_PAGES } from '@/data/content/pages.data';
import { getAllArticles } from '@/lib/articles';
import { getAllKnowledgeDocs } from '@/lib/knowledge';

function routeFile(path: string): string {
  const rel = path === '/' ? 'page.tsx' : `${path.replace(/^\//, '')}/page.tsx`;
  return join(process.cwd(), 'src', 'app', rel);
}

function lastModified(path: string): Date {
  try {
    return statSync(routeFile(path)).mtime;
  } catch {
    return new Date(CONTENT_LAST_UPDATED);
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getCanonicalUrl();
  const articles = getAllArticles().map((a) => ({
    url: `${base}/artigos/${a.slug}`,
    lastModified: a.mtime,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  const knowledge = getAllKnowledgeDocs().map((k) => ({
    url: `${base}/conhecimento/${k.slug}`,
    lastModified: k.mtime,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: lastModified('/'), changeFrequency: 'monthly', priority: 1 },
    ...SITE_PAGES.map((page) => ({
      url: `${base}${page.path}`,
      lastModified: lastModified(page.path),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...articles,
    ...knowledge,
  ];
}
