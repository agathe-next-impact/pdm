import type { Metadata, Viewport } from 'next'

import './globals.css'
import { ServiceWorker } from './service-worker'

export const metadata: Metadata = {
  title: {
    default: 'Projet de Merde',
    template: '%s - Projet de Merde',
  },
  description: 'La PWA des projets web absurdes, anonymes et terriblement plausibles.',
  applicationName: 'PDM',
  manifest: '/manifest.webmanifest',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Projet de Merde',
    description: 'Publie anonymement les briefs web les plus lunaires.',
    siteName: 'Projet de Merde',
    type: 'website',
    url: '/',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0c',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <ServiceWorker />
      </body>
    </html>
  )
}
