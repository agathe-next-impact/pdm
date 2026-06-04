import type { CollectionConfig } from 'payload'

import { adminsOnly } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'email', 'createdAt'],
  },
  access: {
    read: adminsOnly,
    create: () => true,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      admin: {
        description: 'Utilise uniquement pour le magic link, jamais affiche publiquement.',
      },
    },
    {
      name: 'displayName',
      type: 'text',
      required: true,
      defaultValue: 'Anonyme courageux',
    },
  ],
}
