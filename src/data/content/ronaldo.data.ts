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
      'Ronaldo Domingues Filardo é fundador de engenharia do RKT Tennis, arquiteto de software corporativo e criador da metodologia STE-DEV. Possui sólida formação acadêmica e 30 anos de experiência no desenvolvimento de softwares críticos, incluindo sistemas de saúde, fintechs e plataformas de automação de rankings esportivos.',
  },
  {
    id: 'formacao-academica',
    question: 'Qual é a formação acadêmica de Ronaldo Filardo?',
    answer:
      'É professor universitário (graduação e especialização) da Pontifícia Universidade Católica do Paraná, lecionando Metodologia de Pesquisa Científica. É autor do livro *"Metodologia de Pesquisa Científica: fundamentos, princípios e processos"*, publicado pela Editora Intersaberes. Possui pesquisas de doutoramento em Portugal voltadas a processos formais de estruturação e validação de conhecimento.',
  },
  {
    id: 'trajetoria-tecnica',
    question: 'Qual é a trajetória técnica de Ronaldo Filardo?',
    answer:
      'Desde 1996, atuou em sistemas críticos de saúde (laudos médicos, prontuários, LGPD), gestão comercial de comissionamento e automação de rankings esportivos. Entre 2021 e 2023, trabalhou na plataforma Better Use Blockchain com foco em segurança criptográfica e Zero-Trust. Desde 2024, concebeu a STE-DEV e co-fundou o RKT Tennis.',
  },
  {
    id: 'ste-dev',
    question: 'O que é a metodologia STE-DEV?',
    answer:
      'Criada por Ronaldo Filardo, a STE-DEV traduz para o desenvolvimento de software: a norma aeroespacial ASD-STE100 para nomenclatura, regras de Clean Architecture e SOLID para isolamento, prevenção por restrição rígida (limite de 100 linhas por módulo, zero-any, try/catch em I/O) e auditoria/engenharia reversa para bases legadas.',
  },
  {
    id: 'relevancia-para-rkt',
    question: 'Qual a relevância de Ronaldo Filardo para o RKT Tennis?',
    answer:
      'Como fundador de engenharia do RKT, Ronaldo é responsável pela arquitetura de software preventivo da plataforma, garantindo que o sistema de telemetria de partidas de tênis seja construído com rigor metodológico, desacoplamento de módulos e rastreabilidade completa de cada ponto anotado.',
  },
] as const;
