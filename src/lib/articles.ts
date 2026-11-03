import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { buildDescription, stripLeadingH1 } from './content-meta';

export interface ArticleMeta {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly readingTimeMinutes: number;
  readonly mtime: Date;
}

export interface ArticleDetail extends ArticleMeta {
  readonly html: string;
}

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'artigos');

function parseTitleAndDesc(content: string, slug: string): { title: string; description: string } {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].replace(/[*_`]/g, '').trim() : slug;
  return { title, description: buildDescription(content, title) };
}

export function getAllArticles(): readonly ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md')).sort();
  return files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const filePath = path.join(ARTICLES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const stat = fs.statSync(filePath);
    const words = content.split(/\s+/).filter(Boolean).length;
    const { title, description } = parseTitleAndDesc(content, slug);
    return {
      slug,
      title,
      description,
      readingTimeMinutes: Math.max(1, Math.round(words / 200)),
      mtime: stat.mtime,
    };
  });
}

export function getArticleBySlug(slug: string): ArticleDetail | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  const stat = fs.statSync(filePath);
  const words = content.split(/\s+/).filter(Boolean).length;
  const { title, description } = parseTitleAndDesc(content, slug);
  const html = stripLeadingH1(marked.parse(content, { async: false, gfm: true }) as string);
  return {
    slug,
    title,
    description,
    readingTimeMinutes: Math.max(1, Math.round(words / 200)),
    mtime: stat.mtime,
    html,
  };
}

