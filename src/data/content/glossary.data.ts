import type { PageMeta, QaItem } from './page.types';

export const GLOSSARY_PAGE: PageMeta = {
  path: '/glossario',
  title: 'Glossário de Estatísticas de Tênis e Telemetria',
  description:
    'Definições diretas de telemetria no tênis, ponto de pressão, break point salvo, matriz de golpes, momentum e outros termos da análise de partidas do RKT.',
};

export const GLOSSARY_LEAD =
  'Termos usados na análise tática de partidas de tênis e nas métricas do RKT Tennis, com definições curtas e diretas.';

export const GLOSSARY: readonly QaItem[] = [
  {
    id: 'telemetria-no-tenis',
    question: 'O que é telemetria no tênis?',
    answer:
      'Telemetria no tênis é a coleta sistemática de dados ponto a ponto durante uma partida, como saque, devolução, golpes vencedores, erros e sequências de pontos. Esses dados são transformados em métricas que mostram padrões táticos e ajudam atletas e treinadores a decidir o que treinar.',
  },
  {
    id: 'ponto-de-pressao',
    question: 'O que é ponto de pressão no tênis?',
    answer:
      'Ponto de pressão é um ponto cujo resultado pesa mais no placar, como break points, game points, set points e pontos de tiebreak. Medir quantos desses pontos o atleta ganha mostra seu desempenho nos momentos decisivos, que muitas vezes difere do desempenho geral da partida.',
  },
  {
    id: 'break-point-salvo',
    question: 'O que é break point salvo?',
    answer:
      'Break point salvo é o ponto em que o sacador, ameaçado de perder o próprio serviço, vence o ponto e evita a quebra. O percentual de break points salvos, calculado sobre os break points enfrentados, indica a solidez do atleta ao sacar sob pressão durante a partida.',
  },
  {
    id: 'aproveitamento-primeiro-saque',
    question: 'O que é aproveitamento de primeiro saque?',
    answer:
      'Aproveitamento de primeiro saque é o percentual de primeiros serviços que entram na quadra em relação ao total de pontos sacados. Ele costuma ser analisado junto dos pontos ganhos com o primeiro e o segundo saque, porque entrar mais bolas só ajuda se o ponto também for vencido.',
  },
  {
    id: 'winner-e-erros',
    question: 'O que são winner, erro forçado e erro não forçado?',
    answer:
      'Winner é o golpe que termina o ponto a favor de quem bateu, sem resposta do adversário. Erro forçado acontece quando a pressão do rival leva ao erro. Erro não forçado ocorre sem pressão real do oponente. A relação entre eles indica quanto o resultado depende de acerto próprio.',
  },
  {
    id: 'matriz-de-golpes',
    question: 'O que é matriz de golpes?',
    answer:
      'Matriz de golpes é o quadro que cruza cada tipo de golpe, como forehand e backhand, com seu resultado: winners, erros forçados e erros não forçados. Com ela, o treinador identifica em qual fundamento o atleta fecha mais pontos e em qual perde mais por erro próprio.',
  },
  {
    id: 'aproximacao-a-rede',
    question: 'O que é aproximação à rede e como medi-la?',
    answer:
      'Aproximação à rede é a subida do jogador para a rede durante o ponto, seja após um golpe agressivo ou uma curta. Mede-se pelo número de subidas e pelo percentual de pontos vencidos nelas, o que mostra se a rede é uma arma eficiente ou um risco para o atleta.',
  },
  {
    id: 'momentum',
    question: 'O que é momentum em uma partida de tênis?',
    answer:
      'Momentum é a tendência de domínio na partida, observada em sequências de pontos consecutivos de um mesmo jogador. Maior sequência vencedora e corridas de pontos ajudam a localizar quando o jogo virou e o que mudou naquele trecho, algo que o placar final sozinho não revela.',
  },
  {
    id: 'pwa-offline',
    question: 'O que é um PWA com registro offline?',
    answer:
      'PWA, ou Progressive Web App, é um aplicativo web que pode ser instalado no celular e funcionar sem recarregar páginas. No registro offline, os pontos ficam guardados no aparelho durante a partida e são sincronizados com o servidor quando a conexão volta, mesmo em quadras com sinal fraco.',
  },
] as const;
