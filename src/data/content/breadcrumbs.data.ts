/** Trilha de BreadcrumbList por rota interna (exclui a home, que é a raiz). */
export interface Crumb {
  readonly name: string;
  readonly path: string;
}

export const BREADCRUMBS: Readonly<Record<string, readonly Crumb[]>> = {
  '/sobre': [{ name: 'Sobre', path: '/sobre' }],
  '/sobre/equipe': [
    { name: 'Sobre', path: '/sobre' },
    { name: 'Equipe', path: '/sobre/equipe' },
  ],
  '/glossario': [{ name: 'Glossário', path: '/glossario' }],
  '/guia/estatisticas-de-tenis': [
    { name: 'Guia de estatísticas de tênis', path: '/guia/estatisticas-de-tenis' },
  ],
  '/para-atletas': [{ name: 'Para atletas', path: '/para-atletas' }],
  '/para-treinadores': [{ name: 'Para treinadores', path: '/para-treinadores' }],
  '/para-gestores': [{ name: 'Para gestores de CT', path: '/para-gestores' }],
  '/artigos': [{ name: 'Artigos', path: '/artigos' }],
  '/conhecimento': [{ name: 'Conhecimento', path: '/conhecimento' }],
};
