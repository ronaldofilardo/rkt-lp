import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RKT Tennis',
    short_name: 'RKT',
    description: 'Plataforma de estatísticas de partida e evolução por evidências no tênis.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0F1D',
    theme_color: '#0A0F1D',
    icons: [
      {
        src: '/brand/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/brand/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/brand/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}

