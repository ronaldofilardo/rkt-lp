/**
 * Registro da estrutura de arquivos de conhecimento (RAG / grounding de agentes de IA).
 * Os arquivos ainda NÃO foram gerados (status "planejado"): este registro só reserva nomes,
 * ementas e pendências. Ao produzir um módulo, mude o status e crie o arquivo em KNOWLEDGE_DIR.
 */
export type KnowledgeStatus = 'planejado' | 'rascunho' | 'publicado';

export interface KnowledgeModule {
  readonly id: string;
  readonly file: string;
  readonly title: string;
  readonly summary: string;
  readonly status: KnowledgeStatus;
  readonly openQuestions: readonly string[];
}

export const KNOWLEDGE_DIR = 'content/conhecimento';
export const KNOWLEDGE_ROOT_FILE = 'knowledge-context.md';

export const KNOWLEDGE_MODULES: readonly KnowledgeModule[] = [
  {
    id: 'visao-geral',
    file: '1-visao-geral-e-proposta-de-valor.md',
    title: 'Visão geral e proposta de valor',
    summary: 'O que é o RKT, o problema que resolve (papel → telemetria), modelo de acesso e ecossistema Omni Sistemas.',
    status: 'publicado',
    openQuestions: [],
  },
  {
    id: 'motor-de-regras',
    file: '2-motor-de-regras-e-formatos-itf.md',
    title: 'Motor de regras e formatos ITF',
    summary: 'Formatos de pontuação suportados pelo engine.ts (melhor de 3/5, pro set, no-ad, tiebreak de 7, match tiebreak de 10).',
    status: 'publicado',
    openQuestions: ['O texto fala em 7 formatos mas lista 6: conferir a lista real no engine.ts.'],
  },
  {
    id: 'camadas-de-telemetria',
    file: '3-telemetria-e-analytics-de-partida.md',
    title: 'Telemetria e analytics de partida',
    summary: '8 camadas de telemetria: placar ao vivo, saque, devolução, pontos sob pressão, matriz tática de golpes e rali, momentum, ritmo e transmissão ao vivo com proteção LGPD/ECA.',
    status: 'publicado',
    openQuestions: ['Confirmar as 8 camadas contra o engine.ts real e as fórmulas exatas de hold % e clutch.'],
  },
  {
    id: 'matriz-de-golpes',
    file: '4-matriz-tatica-de-golpes-e-ralis.md',
    title: 'Matriz tática de golpes e rallies',
    summary: 'Golpes, efeitos, direções e classificação de rallies (curtos, médios e longos).',
    status: 'publicado',
    openQuestions: ['Confirmar limites de rally (1–4, 5–8, 9+) e a lista de golpes/direções no sistema.'],
  },
  {
    id: 'pwa-offline',
    file: '5-arquitetura-pwa-e-registro-offline.md',
    title: 'Arquitetura PWA e registro offline',
    summary: 'Como o anotador opera sem internet e como a fila de sincronização reconcilia o estado.',
    status: 'publicado',
    openQuestions: ['Confirmar IndexedDB e o funcionamento real da fila de sincronização no app.'],
  },
  {
    id: 'perfis-e-clubes',
    file: '6-governanca-de-perfis-e-clubes.md',
    title: 'Governança de perfis e clubes',
    summary: 'Responsabilidades de atleta, treinador, gestor de CT e espectador; vínculos com o CT.',
    status: 'publicado',
    openQuestions: ['Decidir se perfis operacionais (anotador, suporte, admin) entram no texto público.'],
  },
  {
    id: 'privacidade',
    file: '7-sobre-ronaldo-domingues-filardo.md',
    title: 'Sobre Ronaldo Domingues Filardo',
    summary: 'Perfil, formação acadêmica e trajetória técnica de Ronaldo Domingues Filardo, fundador de engenharia do RKT.',
    status: 'publicado',
    openQuestions: ['Confirmar a redação "doutoramento em Portugal" (concluído ou em curso).'],
  },
  {
    id: 'autoridade-e-fundadores',
    file: '8-autoridade-tecnica-e-fundadores.md',
    title: 'Autoridade técnica e fundadores',
    summary: 'Perfis de Ronaldo Domingues Filardo e Eduardo Figueiredo e histórico da Omni Sistemas.',
    status: 'publicado',
    openQuestions: [
      'Empresa "desde 1996" vs. "histórico desde 1997": confirmar a qual se refere cada ano.',
      'Falta minibiografia de Eduardo Figueiredo.',
      'Confirmar a redação "doutoramento em Portugal" (concluído ou em curso).',
    ],
  },
] as const;
