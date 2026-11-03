import type { QaItem } from './page.types';

export const MINORS: QaItem = {
  id: 'menores',
  question: 'Como o RKT protege dados de atletas menores de idade?',
  answer:
    'Atletas menores só podem ser cadastrados com consentimento explícito do responsável legal. As partidas de menores são privadas por padrão, e o clube ou treinador controla qualquer eventual publicação. O sistema segue a LGPD e as diretrizes do ECA Digital.',
};

export const REGISTER: QaItem = {
  id: 'como-registrar',
  question: 'Como os pontos são registrados na quadra?',
  answer:
    'Um anotador registra cada ponto no celular, direto no navegador, sem papel e sem interromper o jogo. O registro segue mesmo com sinal instável e é sincronizado automaticamente quando a conexão volta, de modo que a análise fica disponível logo após o encerramento da partida.',
};
