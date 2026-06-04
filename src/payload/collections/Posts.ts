import type { CollectionConfig } from 'payload'

import { adminsOnly, anyone } from '../access'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'budget', 'deadline', 'createdAt'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return {
        status: {
          equals: 'published',
        },
      }
    },
    create: anyone,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 120,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 280,
    },
    {
      name: 'story',
      type: 'textarea',
      required: true,
      maxLength: 2400,
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      defaultValue: 'Anonyme',
      maxLength: 60,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'En attente', value: 'pending' },
        { label: 'Publie', value: 'published' },
        { label: 'Rejete', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'budget',
      type: 'text',
      maxLength: 80,
    },
    {
      name: 'deadline',
      type: 'text',
      maxLength: 80,
    },
    {
      name: 'redFlags',
      type: 'array',
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          maxLength: 80,
        },
      ],
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ratingSum',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Somme des votes communautaires (sur 5). Calcule automatiquement.',
      },
    },
    {
      name: 'ratingCount',
      type: 'number',
      defaultValue: 0,
      min: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Nombre de votes recus.',
      },
    },
  ],
}
