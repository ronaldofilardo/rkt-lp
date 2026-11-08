/** Pergunta no título + resposta direta (40–50 palavras) — formato AEO / Featured Snippet. */
export interface SectionAnswer {
  readonly question: string;
  readonly answer: string;
}

export const PILLARS_ANSWER: SectionAnswer = {
  question: 'O que é o RKT?',
  answer:
    'O RKT é uma plataforma de inteligência tática para o tênis. Você registra cada ponto da partida direto no navegador do celular, e o RKT processa esses dados em métricas de saque, devolução, pontos de pressão e situações de jogo — disponíveis logo após o fim da partida.',
};

export const HOW_IT_WORKS_ANSWER: SectionAnswer = {
  question: 'Como o RKT transforma anotações em evolução?',
  answer:
    'Você registra cada ponto na quadra, mesmo em sinal instável, e o RKT processa esses registros em métricas estruturadas. Assim, as impressões subjetivas após o jogo, viram dados claros dentro de cada situação de jogo para ajustes técnicos e táticos.',
};

export const AUDIENCE_ANSWER: SectionAnswer = {
  question: 'Quem pode usar o RKT?',
  answer:
    'O RKT Tennis atende atletas que querem entender o próprio jogo, treinadores que acompanham vários atletas, gestores de clube que organizam atletas e partidas e famílias e amigos que acompanham partidas autorizadas pelo clube. Cada perfil se cadastra em segundos e acessa o que precisa.',
};

export const FINAL_CTA_ANSWER: SectionAnswer = {
  question: 'Como começar a usar o RKT Tennis?',
  answer:
    'Crie sua conta, escolha seu perfil e registre sua primeira partida pelo celular. As estatísticas de partida de saque, devolução e pontos de pressão ficam disponíveis em minutos, logo após o encerramento da partida.',
};
