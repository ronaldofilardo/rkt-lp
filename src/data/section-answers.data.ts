/** Pergunta no título + resposta direta (40–50 palavras) — formato AEO / Featured Snippet. */
export interface SectionAnswer {
  readonly question: string;
  readonly answer: string;
}

export const PILLARS_ANSWER: SectionAnswer = {
  question: 'O que é o RKT?',
  answer:
    'O RKT é uma plataforma de telemetria e inteligência tática para o tênis. Você registra cada ponto da partida direto no navegador do celular, e o RKT processa esses dados em métricas de saque, devolução, pontos de pressão e matriz de golpes, disponíveis logo após o fim do jogo.',
};

export const HOW_IT_WORKS_ANSWER: SectionAnswer = {
  question: 'Como o RKT transforma anotações em evolução?',
  answer:
    'Você registra cada ponto na quadra, mesmo em sinal instável, e o RKT processa esses registros em telemetria estruturada. Assim, a impressão subjetiva do pós-jogo vira dados claros de rali, pontos de quebra e aproveitamento de saque para orientar seus ajustes técnicos e táticos.',
};

export const AUDIENCE_ANSWER: SectionAnswer = {
  question: 'Quem pode usar o RKT?',
  answer:
    'O RKT Tennis atende atletas que querem entender o próprio jogo, treinadores que acompanham vários atletas, gestores de CT que organizam vínculos e partidas e famílias e amigos que acompanham partidas públicas autorizadas pelo clube. Cada perfil se cadastra em segundos e acessa o que precisa.',
};

export const FINAL_CTA_ANSWER: SectionAnswer = {
  question: 'Como começar a usar o RKT Tennis?',
  answer:
    'Crie sua conta, escolha seu perfil e registre sua primeira partida pelo celular. A telemetria de saque, devolução e pontos de pressão fica disponível em minutos, logo após o encerramento da partida.',
};
