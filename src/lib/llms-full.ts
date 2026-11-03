import { getCanonicalUrl } from '@/config/site.config';
import { COMPANY } from '@/config/entity.config';
import { SEO } from '@/config/seo.config';
import { FAQ_ITEMS } from '@/data/faq.data';
import { KEY_TAKEAWAYS } from '@/data/key-takeaways.data';
import { PILLARS } from '@/data/pillars.data';
import { HOW_IT_WORKS_STEPS } from '@/data/how-it-works.data';
import { AUDIENCE_CARDS } from '@/data/audience.data';
import { ABOUT_LEAD, ABOUT_QA } from '@/data/content/about.data';
import { RONALDO_LEAD, RONALDO_PAGE, RONALDO_QA } from '@/data/content/ronaldo.data';
import { GLOSSARY } from '@/data/content/glossary.data';
import { GUIDE_LEAD, GUIDE_PAGE, GUIDE_SECTIONS } from '@/data/content/guide.data';
import { PROFILE_PAGES } from '@/data/content/profiles.data';
import { getAllArticles } from './articles';
import { getAllKnowledgeDocs } from './knowledge';
import type { QaItem } from '@/data/content/page.types';

const qa = (items: readonly QaItem[]) => items.map((i) => `### ${i.question}\n${i.answer}`).join('\n\n');

export function buildLlmsFull(): string {
  const base = getCanonicalUrl();
  const articles = getAllArticles().map((a) => `- [${a.title}](${base}/artigos/${a.slug}): ${a.description}`).join('\n');
  const knowledge = getAllKnowledgeDocs().map((k) => `- [${k.title}](${base}/conhecimento/${k.slug}): ${k.description}`).join('\n');

  const parts = [
    `# RKT Tennis — conteúdo completo\n\n> ${SEO.description}\n\nFonte: ${base}/ (pt-BR). Suporte oficial: ${COMPANY.supportEmail}. Os números exibidos na landing page são de uma partida demonstrativa com dados simulados.`,
    `## Resumo\n${KEY_TAKEAWAYS.map((t) => `- ${t}`).join('\n')}`,
    `## Pilares\n${PILLARS.map((p) => `### ${p.title} — ${p.subtitle}\n${p.description}`).join('\n\n')}`,
    `## Como funciona\n${HOW_IT_WORKS_STEPS.map((s) => `${s.number}. **${s.title}**: ${s.description}`).join('\n')}`,
    `## Para quem\n${AUDIENCE_CARDS.map((a) => `### ${a.title}\nPergunta: ${a.question}\n${a.answer}`).join('\n\n')}`,
    `## Perguntas frequentes\n${qa(FAQ_ITEMS)}`,
    `## Sobre\n${ABOUT_LEAD}\n\n${qa(ABOUT_QA)}`,
    `## ${RONALDO_PAGE.title} (${base}${RONALDO_PAGE.path})\n${RONALDO_LEAD}\n\n${qa(RONALDO_QA)}`,
    ...PROFILE_PAGES.map((p) => `## ${p.h1} (${base}${p.path})\n${p.lead}\n\n${qa(p.qa)}`),
    `## Guia: ${GUIDE_PAGE.title.split(' | ')[0]} (${base}${GUIDE_PAGE.path})\n${GUIDE_LEAD}\n\n${qa(GUIDE_SECTIONS)}`,
    `## Glossário (${base}/glossario)\n${qa(GLOSSARY)}`,
    `## Artigos e Análises Técnicas (${base}/artigos)\n${articles}`,
    `## Base de Conhecimento e Arquitetura (${base}/conhecimento)\n${knowledge}`,
  ];
  return `${parts.join('\n\n')}\n`;
}
