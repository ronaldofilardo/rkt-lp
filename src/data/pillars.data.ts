export interface Pillar {
  readonly id: string;
  readonly number: '01' | '02' | '03';
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
}

export const PILLARS: readonly Pillar[] = [
  {
    id: 'anotar',
    number: '01',
    title: 'Anotar',
    subtitle: 'Ponto a ponto, na quadra',
    description:
      'Registre cada ponto em tempo real no celular, na quadra, sem papel e sem interrupção de jogo. Os dados entram estruturados desde o primeiro saque.',
  },
  {
    id: 'acompanhar',
    number: '02',
    title: 'Acompanhar',
    subtitle: 'Partidas públicas (em breve)',
    description:
      'Familiares e amigos poderão seguir partidas públicas em tempo real. A publicação de cada partida é controlada pelo clube ou treinador responsável.',
  },
  {
    id: 'analisar',
    number: '03',
    title: 'Analisar',
    subtitle: 'Inteligência tática',
    description:
      'Telemetria de saque, devolução, pontos de pressão e matriz de golpes — tudo disponível durante e logo após o encerramento da partida.',
  },
] as const;
