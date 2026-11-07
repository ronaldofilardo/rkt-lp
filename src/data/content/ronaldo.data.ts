import type { PageMeta, QaItem } from './page.types';

export const RONALDO_PAGE: PageMeta = {
  path: '/sobre/equipe',
  title: 'Equipe e Fundadores do RKT Tennis',
  description:
    'Conheça a equipe RKT Tennis: Ronaldo Filardo, arquiteto desde 1996, e Eduardo Figueiredo, produto. Fundadores da plataforma de telemetria esportiva.',
  ogType: 'website',
};

export const RONALDO_LEAD =
  'Arquiteto de software por trás do RKT Tennis. Atua em engenharia de software desde 1996, é autor de livro acadêmico sobre metodologia de pesquisa científica e criador da metodologia STE-DEV, e traz rigor universitário e disciplina de engenharia para a plataforma de telemetria esportiva.';

export interface TimelineEvent {
  period: string;
  title: string;
  description: string;
  link?: { label: string; url: string };
}

export const RONALDO_TIMELINE: readonly TimelineEvent[] = [
  {
    period: '1996',
    title: 'Pioneirismo em Composição Corporal',
    description:
      'Criação do software ANTHROPO em VBA/Excel, acumulando mais de 50.000 avaliações, mais de 20.000 horas de uso e inúmeras academias adotando para seus respectivos setores de avaliação física.',
  },
  {
    period: '2000 – 2020',
    title: 'Sistemas Corporativos Críticos & Saúde',
    description:
      'Arquitetura de sistemas médicos com laudos automatizados, prontuários eletrônicos em conformidade estrita à LGPD, plataformas de comissionamento e algoritmos de ranking esportivo.',
  },
  {
    period: '2021 – 2023',
    title: 'Segurança Criptográfica & Zero-Trust',
    description:
      'Atuação focada em desenvolvimento de produto e testagem na plataforma Better Use Blockchain, estabelecendo estruturas de dados imutáveis e isolamento no nível DB-Row/DTO.',
  },
  {
    period: '2024 – Presente',
    title: 'Omni Sistemas, STE-DEV & RKT Tennis',
    description:
      'Concepção da metodologia STE-DEV (baseada na ASD-STE100) para engenharia preventiva e arquitetura integral da plataforma RKT Tennis na Omni Sistemas.',
    link: { label: 'Conhecer Projetos Omni', url: 'https://www.omni-sistemas.com/#projetos' },
  },
] as const;

export const RONALDO_QA: readonly QaItem[] = [
  {
    id: 'papel-rkt',
    question: 'Qual é o papel de Ronaldo Filardo no RKT Tennis?',
    answer:
      'É o arquiteto responsável pela concepção e execução de todo o sistema, desenhando o motor de regras oficiais e o pipeline offline-first sob a metodologia STE-DEV.',
  },
  {
    id: 'base-academica',
    question: 'Qual é a base acadêmica e científica?',
    answer:
      'Professor universitário na PUCPR lecionando Metodologia de Pesquisa Científica, autor de livro publicado pela Intersaberes e pesquisas de doutoramento pela Universidade do Porto.',
  },
  {
    id: 'o-que-e-ste-dev',
    question: 'Como a Metodologia STE-DEV protege a integridade do código?',
    answer:
      'Framework de engenharia preventiva baseado na norma aeroespacial ASD-STE100. Elimina dívidas técnicas com arquivos <= 100 linhas, complexidade ciclomática < 10 e tipagem estrita.',
  },
] as const;
