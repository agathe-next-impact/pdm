import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

import { Admins } from './payload/collections/Admins'
import { MagicLinks } from './payload/collections/MagicLinks'
import { Media } from './payload/collections/Media'
import { Posts } from './payload/collections/Posts'
import { Sessions } from './payload/collections/Sessions'
import { Users } from './payload/collections/Users'

export default buildConfig({
  admin: {
    user: Admins.slug,
    meta: {
      titleSuffix: ' - PDM',
    },
  },
  collections: [Admins, Users, Posts, Media, MagicLinks, Sessions],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  editor: lexicalEditor(),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  typescript: {
    outputFile: './payload-types.ts',
  },
})
