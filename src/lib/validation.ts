import { z } from 'zod'

export const magicLinkSchema = z.object({
  email: z.email().max(160),
  displayName: z.string().trim().min(2).max(60).optional(),
})

export const postSchema = z.object({
  title: z.string().trim().min(8).max(120),
  excerpt: z.string().trim().min(20).max(280),
  story: z.string().trim().min(80).max(2400),
  authorName: z.string().trim().min(2).max(60).default('Anonyme'),
  budget: z.string().trim().max(80).optional(),
  deadline: z.string().trim().max(80).optional(),
  redFlags: z.string().trim().max(400).optional(),
})
