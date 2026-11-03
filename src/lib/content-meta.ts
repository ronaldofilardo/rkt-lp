/** Utilitários de metadados para conteúdo em Markdown (artigos e base de conhecimento). */

const MAX_DESCRIPTION = 155;

function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Corta em limite de palavra (nunca no meio dela) e acrescenta reticências quando necessário. */
export function truncateAtWord(text: string, max = MAX_DESCRIPTION): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const base = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${base.replace(/[\s,;:.\-–—]+$/, '')}…`;
}

/** Remove numeração ("1. ") e sufixo de marca ("— RKT") do título; o template do layout já acrescenta " | RKT". */
export function cleanTitle(raw: string): string {
  return stripMarkdown(raw)
    .replace(/^\d+\.\s+/, '')
    .replace(/\s*[—–-]\s*RKT(\s+Tennis)?$/i, '')
    .trim();
}

/** Remove linhas de título do bloco (o parágrafo pode vir colado ao "#### Título" sem linha em branco). */
function withoutHeadings(block: string): string {
  return block
    .split('\n')
    .filter((line) => !/^#{1,6}\s/.test(line))
    .join('\n')
    .trim();
}

function isProse(block: string): boolean {
  if (/^(>|\||[-*+]\s|\d+\.\s|```|-{3,}|={3,})/.test(block)) return false;
  return stripMarkdown(block).length >= 60;
}

/** Primeiro parágrafo de texto corrido (ignora títulos, tabelas, listas, citações, linhas "-----" e código). */
export function firstProseParagraph(content: string): string | null {
  const blocks = content.split(/\n\s*\n/).map(withoutHeadings);
  const block = blocks.find(isProse);
  return block ? stripMarkdown(block) : null;
}

/** Descrição: resposta direta (AEO) se existir; senão o primeiro parágrafo real; senão o título. */
export function buildDescription(content: string, fallback: string): string {
  const aeo = content.match(/>\s*\*\*Resposta Direta[^:]*:\*\*\s*([^\n]+)/i);
  const text = aeo ? stripMarkdown(aeo[1]) : (firstProseParagraph(content) ?? fallback);
  return truncateAtWord(text);
}

/** Remove o primeiro <h1> do HTML renderizado: a página já emite o H1 no cabeçalho (evita H1 duplicado). */
export function stripLeadingH1(html: string): string {
  return html.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/, '');
}
