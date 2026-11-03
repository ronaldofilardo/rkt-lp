export const SEO = {
  title: 'Análise de Partidas de Tênis e Telemetria Tática | RKT',
  description:
    'Plataforma PWA de telemetria e análise tática para CTs, gestores e famílias. Cota de 5 partidas sem custos para atleta, treinador e espectador. LGPD.',
  ogImage: {
    path: '/og-image.png',
    width: 1200,
    height: 630,
    alt: 'RKT Tennis: telemetria e inteligência tática no tênis',
  },
  featureList: [
    'Anotação de partidas ponto a ponto direto no navegador, com registro offline e sincronização automática',
    'Telemetria de saque: aproveitamento de 1º saque, pontos ganhos e break points salvos',
    'Telemetria de devolução e pontos de pressão',
    'Matriz de golpes: winners, erros forçados e erros não forçados por fundamento',
    'Análise de rally e de aproximações à rede',
    'Perfis de atleta, treinador, gestor de CT e espectador',
    'Proteção de dados de atletas menores com consentimento do responsável (LGPD)',
  ],
  audiences: ['Atleta de tênis', 'Treinador de tênis', 'Gestor de centro de treinamento', 'Espectador'],
} as const;

export function getOgImageUrl(canonicalUrl: string): string {
  return `${canonicalUrl}${SEO.ogImage.path}`;
}
