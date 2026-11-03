import type { UserProfile } from '@/config/site.config';
import type { PageMeta, QaItem } from './page.types';
import { MINORS, REGISTER } from './profiles.shared';

export interface ProfilePageData extends PageMeta {
  readonly slug: 'atletas' | 'treinadores' | 'gestores';
  readonly profile: UserProfile;
  readonly h1: string;
  readonly lead: string;
  readonly ctaLabel: string;
  readonly qa: readonly QaItem[];
}

export const PROFILE_PAGES: readonly ProfilePageData[] = [
  {
    slug: 'atletas',
    profile: 'ATLETA',
    path: '/para-atletas',
    title: 'Estatísticas de Tênis para Atletas',
    description:
      'Veja sua telemetria de saque, devolução, break points e golpes set a set. O RKT Tennis transforma a anotação da partida em análise tática para o atleta.',
    h1: 'Estatísticas de tênis para atletas',
    lead: 'O RKT Tennis mostra ao atleta, ponto a ponto, onde o jogo se decide: aproveitamento de primeiro saque, pontos ganhos na devolução, break points salvos e convertidos, winners e erros. Os dados vêm da anotação feita na quadra e ficam disponíveis logo após o fim da partida.',
    ctaLabel: 'Criar conta como atleta',
    qa: [
      {
        id: 'que-estatisticas',
        question: 'Que estatísticas o atleta vê no RKT?',
        answer:
          'O atleta vê a telemetria de saque set a set, com aproveitamento e pontos ganhos, além de devolução, pontos de pressão como break points salvos e convertidos, e a matriz de golpes com winners, erros forçados e erros não forçados por fundamento.',
      },
      REGISTER,
      MINORS,
    ],
  },
  {
    slug: 'treinadores',
    profile: 'TREINADOR',
    path: '/para-treinadores',
    title: 'Análise de Partidas de Tênis para Treinadores',
    description:
      'Matriz de golpes, pontos de pressão e sequências de cada atleta vinculado, anotados na quadra. O RKT Tennis ajuda o treinador a decidir o que treinar.',
    h1: 'Análise de partidas de tênis para treinadores',
    lead: 'O RKT Tennis reúne para o treinador a matriz de golpes, os pontos de pressão e as sequências de pontos de cada atleta vinculado. Tudo é anotado na quadra e fica disponível na hora, para apontar onde o atleta cedeu pontos decisivos e o que priorizar no treino.',
    ctaLabel: 'Criar conta como treinador',
    qa: [
      {
        id: 'onde-cedeu',
        question: 'Como o treinador descobre onde o atleta cedeu pontos decisivos?',
        answer:
          'Pela telemetria de pressão e pela matriz de golpes. Os pontos de pressão mostram como o atleta se saiu em break points, game points, set points e tiebreaks, e a matriz de golpes aponta em qual fundamento ele erra ou fecha mais pontos.',
      },
      {
        id: 'vinculo',
        question: 'O treinador pode trabalhar de forma avulsa ou vinculado a um CT?',
        answer:
          'Sim. Atletas e treinadores podem se vincular a um clube ou trabalhar de forma avulsa. Quando há vínculo com um CT, o gestor aprova os vínculos. O treinador acompanha a telemetria dos atletas que estão vinculados a ele.',
      },
      REGISTER,
    ],
  },
  {
    slug: 'gestores',
    profile: 'GESTOR',
    path: '/para-gestores',
    title: 'Gestão de Atletas e Partidas de Tênis para CTs',
    description:
      'Gerencie vínculos, aprovações e o histórico de partidas do seu centro de treinamento de tênis em um painel centralizado com o RKT Tennis.',
    h1: 'Gestão de atletas, treinadores e partidas do CT',
    lead: 'O RKT Tennis permite ao gestor de um centro de treinamento organizar atletas, treinadores e partidas em um painel centralizado: aprovar vínculos, acompanhar o histórico de partidas do CT e controlar a publicação das partidas, inclusive as de atletas menores.',
    ctaLabel: 'Solicitar cadastro do clube',
    qa: [
      {
        id: 'o-que-gerencia',
        question: 'O que o gestor de CT gerencia no RKT?',
        answer:
          'O gestor gerencia os vínculos de atletas e treinadores ao CT, aprova solicitações e acompanha o histórico de partidas do centro de treinamento em um painel centralizado, mantendo a organização dos dados em um só lugar.',
      },
      MINORS,
      {
        id: 'modelos-de-acesso',
        question: 'Como funciona o modelo de acesso ao RKT para clubes?',
        answer:
          'O RKT está em fase de demonstração aberta: explore recursos e painéis sem cartão de crédito. Os planos de acesso para clubes, equipes e atletas estão sendo definidos para a fase de lançamento comercial.',
      },
    ],
  },
] as const;
