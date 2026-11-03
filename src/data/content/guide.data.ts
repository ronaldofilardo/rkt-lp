import type { PageMeta, QaItem } from './page.types';

export const GUIDE_PAGE: PageMeta = {
  path: '/guia/estatisticas-de-tenis',
  title: 'Estatísticas de Tênis que o Treinador Deve Acompanhar',
  description:
    'Guia das estatísticas de tênis mais úteis para treinadores: primeiro saque, break points, devolução, winners e erros, rally, rede e momentum.',
  ogType: 'article',
};

export const GUIDE_LEAD =
  'As estatísticas de tênis mais úteis para um treinador são as que explicam como os pontos são ganhos e perdidos, não só o placar: primeiro saque, break points, devolução, winners versus erros não forçados, comprimento dos rallies, rede e sequências de pontos.';

export const GUIDE_SECTIONS: readonly QaItem[] = [
  {
    id: 'primeiro-saque',
    question: 'Como avaliar o saque de um atleta?',
    answer:
      'Observe o percentual de primeiros saques dentro e, principalmente, os pontos ganhos com o primeiro e com o segundo saque. Um atleta pode acertar muitos primeiros serviços e ganhar poucos pontos com eles. Comparar os sets mostra se o saque oscila com o cansaço ou com a pressão.',
  },
  {
    id: 'break-points',
    question: 'Por que os break points importam tanto?',
    answer:
      'Break points concentram os momentos em que um game muda de dono. Acompanhe quantos o atleta enfrentou e salvou ao sacar, e quantas chances criou e converteu ao devolver. Um bom desempenho geral com baixa conversão nesses pontos costuma indicar um problema de tomada de decisão sob pressão.',
  },
  {
    id: 'devolucao',
    question: 'O que a devolução revela sobre o jogo?',
    answer:
      'A devolução mostra quanto o atleta incomoda o saque do adversário. Separe os pontos ganhos contra o primeiro e contra o segundo saque: devolver bem o segundo serviço é sinal de agressividade, e devolver mal o primeiro é esperado. Mudanças ao longo dos sets apontam ajustes táticos.',
  },
  {
    id: 'winners-e-erros',
    question: 'Como interpretar winners e erros não forçados?',
    answer:
      'Compare winners com erros não forçados em vez de olhar cada número isolado. Muitos erros não forçados em um fundamento específico, como o backhand, indicam o que treinar. Muitos erros forçados sugerem que o adversário está impondo o jogo. Por isso a leitura por golpe é mais útil que o total.',
  },
  {
    id: 'rally-e-rede',
    question: 'O comprimento dos rallies e a rede são importantes?',
    answer:
      'Sim. A distribuição de pontos curtos, médios e longos mostra em que tipo de troca o atleta é mais eficiente, e define se ele deve alongar ou encurtar o ponto. As aproximações à rede, com o percentual de pontos vencidos nelas, indicam se subir à rede está compensando.',
  },
  {
    id: 'momentum',
    question: 'Para que serve analisar sequências de pontos?',
    answer:
      'Sequências de pontos mostram quando a partida virou. A maior sequência vencedora e as corridas de pontos de cada lado apontam trechos em que o atleta perdeu o controle ou ganhou confiança, e permitem relacionar esses momentos ao que mudou no saque, na devolução ou no padrão de golpes.',
  },
] as const;

export const GUIDE_CLOSING =
  'O RKT Tennis registra a partida ponto a ponto e entrega essas métricas, de saque a pressão e matriz de golpes, logo após o encerramento do jogo.';
