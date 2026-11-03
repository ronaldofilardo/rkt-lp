/** Termos técnicos do guia e suas âncoras canônicas no /glossario. */
export interface GlossaryTerm {
  readonly term: string;
  readonly href: string;
}

export const GLOSSARY_TERMS: readonly GlossaryTerm[] = [
  { term: 'erros não forçados', href: '/glossario#winner-e-erros' },
  { term: 'erro não forçado', href: '/glossario#winner-e-erros' },
  { term: 'erros forçados', href: '/glossario#winner-e-erros' },
  { term: 'erro forçado', href: '/glossario#winner-e-erros' },
  { term: 'winners', href: '/glossario#winner-e-erros' },
  { term: 'break points', href: '/glossario#break-point-salvo' },
  { term: 'break point', href: '/glossario#break-point-salvo' },
  { term: 'primeiros saques', href: '/glossario#aproveitamento-primeiro-saque' },
  { term: 'primeiro saque', href: '/glossario#aproveitamento-primeiro-saque' },
  { term: 'aproximações à rede', href: '/glossario#aproximacao-a-rede' },
  { term: 'à rede', href: '/glossario#aproximacao-a-rede' },
  { term: 'rede', href: '/glossario#aproximacao-a-rede' },
  { term: 'matriz de golpes', href: '/glossario#matriz-de-golpes' },
  { term: 'pontos de pressão', href: '/glossario#ponto-de-pressao' },
  { term: 'momentum', href: '/glossario#momentum' },
];
