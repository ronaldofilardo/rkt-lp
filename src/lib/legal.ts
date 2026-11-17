import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { buildDescription, cleanTitle } from './content-meta';

export interface LegalDoc {
  readonly slug: 'termos' | 'privacidade';
  readonly title: string;
  readonly description: string;
  readonly html: string;
  readonly mtime: Date;
}

const DOCS_DIR = path.join(process.cwd(), 'docs');

const FILE_CANDIDATES: Record<'termos' | 'privacidade', readonly string[]> = {
  termos: ['TERMOS_DE_USO.md', 'termos_de_uso.md'],
  privacidade: ['POLITICA_DE_PRIVACIDADE.md', 'Política_de_Privacidade.md', 'politica_de_privacidade.md'],
};

function readDoc(type: 'termos' | 'privacidade'): { content: string; mtime: Date } | null {
  for (const name of FILE_CANDIDATES[type]) {
    const fullPath = path.join(DOCS_DIR, name);
    if (fs.existsSync(fullPath)) {
      return {
        content: fs.readFileSync(fullPath, 'utf8'),
        mtime: fs.statSync(fullPath).mtime,
      };
    }
  }
  return null;
}

function parseTitle(content: string, fallback: string): string {
  const match = content.match(/^#{1,3}\s+(.+)$/m);
  return match ? cleanTitle(match[1]) : fallback;
}

export function getLegalDoc(type: 'termos' | 'privacidade'): LegalDoc | null {
  const file = readDoc(type);
  if (!file) return null;

  const fallback = type === 'termos' ? 'Termo de Uso da Plataforma' : 'Política de Privacidade Geral';
  const title = parseTitle(file.content, fallback);
  const description = buildDescription(file.content, title);

  const normalized = file.content
    .replace(/\(POLITICA_DE_PRIVACIDADE\.md\)/gi, '(/privacidade)')
    .replace(/\(TERMOS_DE_USO\.md\)/gi, '(/termos)');

  const html = marked.parse(normalized, { async: false, gfm: true }) as string;

  return {
    slug: type,
    title,
    description,
    html,
    mtime: file.mtime,
  };
}
