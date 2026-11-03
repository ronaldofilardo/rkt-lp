export interface Step {
  readonly id: string;
  readonly number: '01' | '02' | '03';
  readonly title: string;
  readonly description: string;
}

export const HOW_IT_WORKS_STEPS: readonly Step[] = [
  {
    id: 'registrar',
    number: '01',
    title: 'Registrar',
    description:
      'Você registra cada ponto no celular, direto na quadra — funciona mesmo com sinal instável e sincroniza ao reconectar.',
  },
  {
    id: 'processar',
    number: '02',
    title: 'Processar',
    description:
      'O RKT processa os registros em telemetria estruturada: mapas de consistência, erros não forçados e break points.',
  },
  {
    id: 'evoluir',
    number: '03',
    title: 'Evoluir',
    description:
      'Ajustes técnicos e táticos guiados pelo histórico real das partidas — você evolui com fatos, não com impressões.',
  },
] as const;
