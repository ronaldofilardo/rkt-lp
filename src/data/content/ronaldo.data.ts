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
    question: 'Quem é Ronaldo Domingues Filardo e qual a origem da Omni Sistemas?',
    answer:
      'Ronaldo Domingues Filardo é o fundador da Omni Sistemas e criador da STE-DEV. Iniciou a trajetória em 1996 com o software ANTHROPO em VBA, acumulando 30 anos de arquiteturas em saúde, finanças, esportes e blockchain, unindo rigor acadêmico à tecnologia de ponta.',
  },
  {
    id: 'o-que-e-ste-dev',
    question: 'O que é a Metodologia STE-DEV?',
    answer:
      'STE-DEV é o framework de engenharia preventiva da Omni Sistemas, baseado na norma aeroespacial ASD-STE100. Elimina dívida técnica na origem em duas frentes: desenvolvimento com módulos de menos de 100 linhas e auditoria com protocolo formal de quatro etapas para sistemas legados.',
  },
  {
    id: 'base-academica',
    question: 'Qual a relação entre a base acadêmica do fundador e a eficácia da STE-DEV?',
    answer:
      'Ronaldo Filardo foi professor universitário (graduação e especialização) da Pontifícia Universidade Católica do Paraná de Metodologia de Pesquisa e autor pela Intersaberes. Essa base científica fundamenta a STE-DEV: semântica estrita conceitual, Clean Architecture como método reprodutível, testes como hipóteses e auditoria de invariantes como revisão por pares.',
  },
  {
    id: 'blockchain-seguranca',
    question: 'Como a experiência com Blockchain contribui para a segurança dos sistemas?',
    answer:
      'A arquitetura da plataforma Better Use Blockchain deu à Omni Sistemas domínio prático de segurança criptográfica e mentalidade Zero-Trust. Em sistemas críticos como Omni Saúde, LWOS e QWork, isso vira proteção contra vazamento, isolamento DB-Row/DTO e conformidade estrita com a LGPD.',
  },
  {
    id: 'asd-ste100',
    question: 'O que é ASD-STE100 e por que ela é aplicada ao código de software?',
    answer:
      'ASD-STE100 é a norma de Inglês Técnico Simplificado criada pela indústria aeroespacial para eliminar ambiguidade em manuais de aeronaves. A STE-DEV a aplica ao software: cada conceito tem um único nome no projeto e termos vagos como handle, process e data são proibidos.',
  },
  {
    id: '100-linhas',
    question: 'Por que a Omni Sistemas adota a regra de menos de 100 linhas por arquivo?',
    answer:
      'Arquivos longos acumulam responsabilidades, misturando regras de negócio, API e tela. O teto de 100 linhas impõe alta coesão e baixo acoplamento: a UI permanece puramente descritiva e a orquestração vive em hooks isolados, testáveis e reutilizáveis sem efeitos colaterais.',
  },
  {
    id: 'engenharia-reversa',
    question: 'Como funciona o processo de Engenharia Reversa e Auditoria STE-DEV?',
    answer:
      'A auditoria STE-DEV é executada em quatro etapas estruturadas: varredura sistemática do repositório para mapear violações, diagnóstico com laudo executivo e inventário por arquivo:linha, matriz de remediação atômica com testes de caracterização prévios, e governança permanente dos módulos extraídos em produção.',
  },
  {
    id: 'modernizacao-legados',
    question: 'Como é feita a modernização de legados sem risco de regressão?',
    answer:
      'A modernização usa Strangler Pattern com testes de caracterização: antes de alterar qualquer linha do legado, criamos testes que blindam o comportamento operacional vigente. Em seguida, os módulos são extraídos cirurgicamente em serviços e componentes atômicos desacoplados, sem interromper a operação.',
  },
  {
    id: 'tempo-auditoria',
    question: 'Quanto tempo dura uma auditoria de código e qual o formato de entrega?',
    answer:
      'A auditoria completa é entregue em até 5 dias úteis. O cliente recebe um Laudo de Conformidade com resumo executivo das métricas, inventário detalhado de dívida técnica com causa raiz e plano de ação atômico e sequencial para refatoração segura.',
  },
  {
    id: 'principio-preventivo',
    question: 'Qual é o princípio fundamental da Engenharia Preventiva?',
    answer:
      'Se o arquivo exigir refatoração posterior, ele não deve ser gerado dessa forma: refatorar no destino prova falha de geração na origem. Por isso desenvolvemos com tipagem forte zero-any, arquitetura limpa e vocabulário controlado desde o primeiro commit do projeto.',
  },
  {
    id: 'iniciar-projeto',
    question: 'Como iniciar um projeto ou auditoria com a Omni Sistemas?',
    answer:
      'Entre em contato pelo formulário ou pelo WhatsApp (41) 99241-5220. Analisamos a demanda técnica e retornamos em até 24 horas úteis com parecer técnico preliminar ou proposta comercial, sempre em atendimento direto do arquiteto responsável, sem intermediários e sem compromisso comercial.',
  },
] as const;
