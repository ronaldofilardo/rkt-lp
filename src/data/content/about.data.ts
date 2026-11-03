import type { PageMeta, QaItem } from './page.types';

export const ABOUT_PAGE: PageMeta = {
  path: '/sobre',
  title: 'Sobre o RKT Tennis: Quem Somos e Como Funciona',
  description:
    'Conheça o RKT Tennis, plataforma de telemetria e análise tática de tênis da Omni Sistemas (Curitiba, PR), fundada por Ronaldo Filardo e Eduardo Figueiredo.',
};

export const ABOUT_LEAD =
  'O RKT Tennis é uma plataforma brasileira de telemetria e inteligência tática para o tênis, desenvolvida pela Omni Sistemas em Curitiba, Paraná. Ela permite anotar partidas ponto a ponto, mesmo offline, e transformar o registro em análise para atletas, treinadores e clubes.';

export const ABOUT_QA: readonly QaItem[] = [
  {
    id: 'o-que-e-o-rkt',
    question: 'O que é o RKT Tennis?',
    answer:
      'O RKT Tennis é uma plataforma web de anotação de partidas e telemetria esportiva. O anotador registra cada ponto no celular e, ao final do jogo, o sistema entrega métricas de saque, devolução, pontos de pressão e matriz de golpes. Há perfis para atleta, treinador, gestor de CT e espectador.',
  },
  {
    id: 'quem-desenvolve',
    question: 'Quem desenvolve o RKT Tennis?',
    answer:
      'O RKT Tennis é desenvolvido pela Omni Sistemas, razão social BE SMART LTDA, empresa de software sediada em Curitiba, no Paraná, que atua desde 1996 no desenvolvimento de software de alta precisão. Os fundadores do RKT são Ronaldo Filardo, em engenharia, e Eduardo Figueiredo, em produto.',
  },
  {
    id: 'quem-e-ronaldo-filardo',
    question: 'Quem é Ronaldo Filardo, fundador de engenharia do RKT?',
    answer:
      'Ronaldo Domingues Filardo é arquiteto de software corporativo, autor do livro Metodologia de Pesquisa Científica (Editora Intersaberes), ex-professor da PUCPR e pesquisador com doutoramento em Portugal. Seu currículo está disponível na Plataforma Lattes do CNPq.',
  },
  {
    id: 'dados-e-privacidade',
    question: 'Como o RKT trata privacidade e dados de menores?',
    answer:
      'Atletas menores só são cadastrados com consentimento explícito do responsável legal, e as partidas de menores são privadas por padrão. O sistema segue a LGPD e as diretrizes do ECA Digital. Os Termos de Uso e a Política de Privacidade ficam disponíveis no domínio do sistema.',
  },
  {
    id: 'suporte',
    question: 'Como falar com o suporte do RKT Tennis?',
    answer:
      'O canal oficial de suporte é o e-mail suporte@omni-sistemas.com. Ele atende dúvidas de atletas, treinadores, gestores de CT e espectadores sobre cadastro, acesso e uso do sistema, e também contatos de imprensa e parcerias com clubes e centros de treinamento.',
  },
] as const;
