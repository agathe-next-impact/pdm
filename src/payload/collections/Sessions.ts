import type { CollectionConfig } from 'payload'

import { adminsOnly } from '../access'

export const Sessions: CollectionConfig = {
  slug: 'sessions',
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
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
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
      name: 'revokedAt',
      type: 'date',
    },
  ],
}
