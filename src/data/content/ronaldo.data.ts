import type { PageMeta, QaItem } from './page.types';

export const RONALDO_PAGE: PageMeta = {
  path: '/sobre/equipe',
  title: 'Equipe e Fundadores do RKT Tennis',
  description:
    'Conheça a equipe RKT Tennis: Ronaldo Filardo, arquiteto desde 1996, e Eduardo Figueiredo, produto. Fundadores da plataforma de telemetria esportiva.',
  ogType: 'website',
};

export const RONALDO_LEAD =
  'Ronaldo Domingues Filardo é o arquiteto de software por trás do RKT Tennis. Atua em engenharia de software desde 1996, é autor de livro acadêmico sobre metodologia de pesquisa científica e criador da metodologia STE-DEV, e traz rigor universitário e disciplina de engenharia para a plataforma de telemetria esportiva.';

export const RONALDO_QA: readonly QaItem[] = [
  {
    id: 'quem-e-ronaldo-filardo',
    question: 'Quem é Ronaldo Domingues Filardo?',
    answer:
      'Ronaldo Domingues Filardo é fundador da Omni Sistemas e criador da metodologia STE-DEV. Iniciou em 1996 com o software ANTHROPO em VBA, acumulando 30 anos de arquiteturas em saúde, finanças, esportes e blockchain, unindo rigor acadêmico à tecnologia de ponta.',
  },
  {
    id: 'o-que-e-ste-dev',
    question: 'O que é a Metodologia STE-DEV?',
    answer:
      'Framework de engenharia preventiva baseado na norma aeroespacial ASD-STE100. Elimina dívida técnica na origem com módulos de menos de 100 linhas, vocabulário controlado, Clean Architecture e SOLID, zero-any e auditoria formal para sistemas legados.',
  },
  {
    id: 'base-academica',
    question: 'Qual a base acadêmica de Ronaldo Filardo?',
    answer:
      'Professor universitário (graduação e especialização) da Pontifícia Universidade Católica do Paraná, lecionando Metodologia de Pesquisa Científica. Autor do livro *"Metodologia de Pesquisa Científica: fundamentos, princípios e processos"*, Editora Intersaberes. Pesquisas de doutoramento em Portugal.',
  },
  {
    id: 'seguranca-blockchain',
    question: 'Como a experiência com Blockchain contribui para a segurança?',
    answer:
      'A arquitetura da plataforma Better Use Blockchain deu à Omni Sistemas domínio prático de segurança criptográfica e mentalidade Zero-Trust, com isolamento DB-Row/DTO e conformidade estrita com a LGPD.',
  },
] as const;
