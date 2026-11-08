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
    subtitle: 'Acompanhamento ao vivo (em breve)',
    description:
      'Familiares e amigos contam com acompanhamento ao vivo das partidas em tempo real. A publicação de cada partida é controlada pelo clube, treinador ou atleta responsável.',
  },
  {
    id: 'analisar',
    number: '03',
    title: 'Analisar',
    subtitle: 'Evolução por evidências',
    description:
      'Análise das inúmeras situações de jogo, pontos sob pressão, rendimentos de todos os golpes e jogadas – tudo disponível durante e depois da partida.',
  },
] as const;
