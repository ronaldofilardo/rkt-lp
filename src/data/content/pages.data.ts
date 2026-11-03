import { ABOUT_PAGE } from './about.data';
import { GLOSSARY_PAGE } from './glossary.data';
import { GUIDE_PAGE } from './guide.data';
import { RONALDO_PAGE } from './ronaldo.data';
import { PROFILE_PAGES } from './profiles.data';
import type { PageMeta } from './page.types';

export const ARTIGOS_HUB_PAGE: PageMeta = {
  path: '/artigos',
  title: 'Artigos e Análises Técnicas',
  description:
    'Biblioteca de artigos e análises táticas aprofundadas sobre tênis competitivo, regras oficiais da ITF, métricas de saque e desempenho sob pressão.',
};

export const CONHECIMENTO_HUB_PAGE: PageMeta = {
  path: '/conhecimento',
  title: 'Base de Conhecimento e Arquitetura',
  description:
    'Documentação técnica dos fundamentos, motor de regras ITF, arquitetura PWA offline e matriz tática do sistema RKT para tênis de alta performance.',
};

/** Páginas de conteúdo além da home — fonte única para sitemap, llms.txt e testes. */
export const SITE_PAGES: readonly PageMeta[] = [
  ABOUT_PAGE,
  RONALDO_PAGE,
  GLOSSARY_PAGE,
  GUIDE_PAGE,
  ...PROFILE_PAGES,
  ARTIGOS_HUB_PAGE,
  CONHECIMENTO_HUB_PAGE,
];
