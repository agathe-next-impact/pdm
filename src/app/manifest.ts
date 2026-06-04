import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Projet de Merde',
    short_name: 'PDM',
    description: 'Publie et lis les projets web les plus absurdes.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0a0a0c',
    theme_color: '#0a0a0c',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
