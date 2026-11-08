import type { QaItem } from './page.types';
import type { TimelineEvent } from './ronaldo.data';

export const EDUARDO_LEAD =
  'Profissional de Educação Física e co-fundador do RKT Tennis. Com mais de 45 anos de experiência no tênis brasileiro e internacional, é professor, gestor de academia e referência técnica que orienta as decisões de produto da plataforma.';

export const EDUARDO_TIMELINE: readonly TimelineEvent[] = [
  {
    period: '1979 – Presente',
    title: 'Academia de Tênis Figueiredo & Eco Tênis',
    description:
      'A Academia de Tênis Figueiredo (registrada formalmente como Academia de Tênis Figueiredo Ltda.) é historicamente associada e integrada à estrutura da Eco Tênis Academia em Curitiba. Informações do Local: Rua Brasílio Cuman, 1324 - São Braz, Curitiba - PR, 82315-010 (com registros antigos vinculados também à Rua Gardênio Scorzato no Pilarzinho/Vista Alegre). Mais de quatro décadas gerenciando atletas, equipes e metodologias de treinamento.',
  },
  {
    period: '1980s',
    title: 'Formação Acadêmica & Pós-Graduação',
    description:
      'Graduado em Educação Física pela Universidade Federal do Paraná (1986). Pós-graduado em Fisiologia do Exercício (PUC-PR, 1986) e em "Exercício e Saúde" (UFPR, 1988). Mestre em Educação Física pela UFPR na área de Psicologia do Esporte.',
  },
  {
    period: '1990s – 2000s',
    title: 'Alemanha & Certificações Internacionais',
    description:
      'Sete anos de experiência em ensino e treinamento de tênis na Alemanha. Treinador ITF nível 1 e 2; CBT Técnico Master; licenças A, B e C pela Federação Alemã de Tênis (DTB). Tradutor de 5 livros da ITF para o português.',
  },
  {
    period: '1998 – Presente',
    title: 'Confederação & Federação',
    description:
      'Capacitador da Confederação Brasileira de Tênis (CBT) desde 1998. Cinco anos como Diretor Técnico da Federação Paranaense de Tênis.',
  },
  {
    period: '2024 – Presente',
    title: 'Co-fundador & Produto RKT Tennis',
    description:
      'Responsável técnico do domínio tênis no RKT. A experiência de quadra e a visão pedagógica de Eduardo guiam as decisões de produto: formatos de jogo, métricas relevantes e linguagem da plataforma.',
  },
] as const;

export const EDUARDO_QA: readonly QaItem[] = [
  {
    id: 'papel-rkt-eduardo',
    question: 'Qual é o papel de Eduardo Figueiredo no RKT Tennis?',
    answer:
      'É o co-fundador responsável pelo domínio tênis. Sua experiência de mais de 45 anos orienta as decisões de produto: quais métricas importam, como os formatos de jogo são representados e o que faz sentido na quadra.',
  },
  {
    id: 'formacao-eduardo',
    question: 'Qual é a formação de Eduardo Figueiredo?',
    answer:
      'Graduado em Educação Física pela UFPR, com pós-graduação em Fisiologia do Exercício e Mestre em Psicologia do Esporte. Treinador ITF nível 1 e 2, CBT Técnico Master e licenças A, B e C pela DTB (Alemanha).',
  },
  {
    id: 'experiencia-eduardo',
    question: 'Qual é a experiência prática de Eduardo Figueiredo no tênis?',
    answer:
      'Proprietário da Academia de Tênis Figueiredo desde 1979 (integrada à estrutura da Eco Tênis Academia em Curitiba), sete anos de atuação na Alemanha, Capacitador da CBT desde 1998, ex-Diretor Técnico da Federação Paranaense de Tênis e tradutor de 5 livros da ITF.',
  },
] as const;
