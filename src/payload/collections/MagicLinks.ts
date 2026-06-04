import type { CollectionConfig } from 'payload'

import { adminsOnly } from '../access'

export const MagicLinks: CollectionConfig = {
  slug: 'magic-links',
  admin: {
    hidden: true,
  },
  access: {
    read: adminsOnly,
    create: () => true,
    update: () => true,
    delete: adminsOnly,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'tokenHash',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
    },
    {
      name: 'usedAt',
      type: 'date',
    },
  ],
}
