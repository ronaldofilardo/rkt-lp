import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { buildDescription, cleanTitle } from './content-meta';

export interface KnowledgeMeta {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly mtime: Date;
}

export interface KnowledgeDetail extends KnowledgeMeta {
  readonly html: string;
}

const KNOWLEDGE_DIR = path.join(process.cwd(), 'content', 'conhecimento');

function parseKnowledge(content: string, slug: string): { title: string; description: string } {
  const match = content.match(/^#{1,3}\s+(.+)$/m);
  const title = match ? cleanTitle(match[1]) : slug;
  return { title, description: buildDescription(content, title) };
}

export function getAllKnowledgeDocs(): readonly KnowledgeMeta[] {
  if (!fs.existsSync(KNOWLEDGE_DIR)) return [];
  const files = fs
    .readdirSync(KNOWLEDGE_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .sort();
  return files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const filePath = path.join(KNOWLEDGE_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const stat = fs.statSync(filePath);
    const { title, description } = parseKnowledge(content, slug);
    return {
      slug,
      title,
      description,
      mtime: stat.mtime,
    };
  });
}

export function getKnowledgeDocBySlug(slug: string): KnowledgeDetail | null {
  const filePath = path.join(KNOWLEDGE_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  const stat = fs.statSync(filePath);
  const { title, description } = parseKnowledge(content, slug);
  const html = marked.parse(content, { async: false, gfm: true }) as string;
  return {
    slug,
    title,
    description,
    mtime: stat.mtime,
    html,
  };
}

