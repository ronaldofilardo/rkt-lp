export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'o-que-e-telemetria',
    question: 'O que é telemetria esportiva no tênis?',
    answer:
      'Diferente de medições isoladas como velocidade de saque por radar, no RKT a análise consiste na coleta de estatísticas de partida ponto a ponto: saque, devolução, pontos de pressão, ralis e matriz de golpes, gerando relatórios claros para uma verdadeira evolução por evidências.',
  },
  {
    id: 'funciona-offline',
    question: 'Como funciona o registro offline na quadra?',
    answer:
      'O registro é feito direto no navegador do celular do anotador. Durante a partida, os pontos ficam guardados no próprio aparelho, sem depender de conexão. Ao reconectar, os dados são sincronizados automaticamente com o servidor.',
  },
  {
    id: 'privacidade-menores',
    question: 'Como o RKT protege dados de atletas menores de idade?',
    answer:
      'Atletas menores só podem ser cadastrados com consentimento explícito do responsável legal. As partidas de menores são privadas por padrão; o clube ou treinador controla qualquer eventual publicação. O sistema segue a LGPD e as diretrizes do ECA Digital.',
  },
  {
    id: 'modelo-acesso',
    question: 'Como funciona a cota de uso e o modelo de acesso?',
    answer:
      'Atletas, treinadores particulares e anotadores contam com uma cota de 5 partidas para utilizar o sistema sem custos e avaliar as estatísticas de partida na prática, sem precisar de cartão de crédito. As políticas comerciais completas e os planos para academias e clubes estão sendo definidos para o lançamento.',
  },
  {
    id: 'uso-web-imediato',
    question: 'Preciso instalar um aplicativo para usar o RKT?',
    answer:
      'Não. O RKT é uma plataforma web que funciona direto no navegador do celular, como um aplicativo, sem precisar baixar de lojas nem ocupar espaço no aparelho. Você abre o link, cria sua conta em segundos e já pode registrar a primeira partida.',
  },
  {
    id: 'levar-ao-clube',
    question: 'Como levar o RKT para o meu clube ou treinador?',
    answer:
      'Use o botão de compartilhamento desta página para enviar o link ao seu treinador ou gestor da academia ou clube. Ele poderá explorar a demonstração com dados simulados e avaliar como as estatísticas de partida e a evolução por evidências se encaixam na metodologia da academia.',
  },
] as const;
