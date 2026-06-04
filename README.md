# Projet de Merde

PDM est une PWA Next.js + Payload CMS v3 pour publier et moderer des briefs web absurdes.

## Stack

- Next.js App Router
- TypeScript
- Payload CMS v3
- PostgreSQL
- Tailwind CSS
- Vercel Blob pour les medias
- SMTP configurable pour les magic links

## Demarrage

1. Copier `.env.example` vers `.env`
2. Configurer `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL` et le SMTP
3. Installer les dependances avec `npm install`
4. Lancer `npm run dev`
5. Ouvrir `/admin` pour creer/moderer les contenus

Sans `SMTP_HOST`, les magic links sont affiches dans les logs serveur en local.
