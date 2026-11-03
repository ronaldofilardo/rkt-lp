import type { UserProfile } from '@/config/site.config';

export interface AudienceCard {
  readonly id: string;
  readonly profile: UserProfile;
  /** Rota interna da página dedicada do perfil (quando existir). */
  readonly path?: string;
  readonly title: string;
  readonly question: string;
  readonly answer: string;
  readonly ctaLabel: string;
}

export const AUDIENCE_CARDS: readonly AudienceCard[] = [
  {
    id: 'atleta',
    profile: 'ATLETA',
    path: '/para-atletas',
    title: 'Atletas',
    question: 'Por que meu 1º saque oscila no 3º set?',
    answer:
      'Deixa de depender da memória pós-jogo e enxerga onde os pontos foram perdidos: saque set a set, aproveitamento e break points.',
    ctaLabel: 'Criar conta como atleta',
  },
  {
    id: 'treinador',
    profile: 'TREINADOR',
    path: '/para-treinadores',
    title: 'Treinadores',
    question: 'Onde meu atleta cedeu os pontos decisivos?',
    answer:
      'Recebe relatórios precisos do desempenho dos alunos em torneios, com matriz de golpes, pontos de pressão e sequências.',
    ctaLabel: 'Criar conta como treinador',
  },
  {
    id: 'gestor',
    profile: 'GESTOR',
    path: '/para-gestores',
    title: 'Centros de Treinamento e Clubes',
    question: 'Como organizar atletas, treinadores e partidas do clube?',
    answer:
      'Padroniza o acompanhamento metodológico das equipes: vínculos, aprovações e histórico de partidas em um painel centralizado.',
    ctaLabel: 'Solicitar cadastro do clube',
  },
  {
    id: 'espectador',
    profile: 'ESPECTADOR',
    title: 'Famílias e Pais',
    question: 'Como familiares e amigos acompanham a evolução do tenista?',
    answer:
      'Apoia o desenvolvimento esportivo com dados claros e incentivo positivo, acompanhando partidas públicas autorizadas pelo clube.',
    ctaLabel: 'Criar conta para acompanhar',
  },
] as const;
