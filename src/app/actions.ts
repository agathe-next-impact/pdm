'use server'

import { redirect } from 'next/navigation'

import { createSession, clearSession } from '@/lib/auth'
import { createToken, hashToken } from '@/lib/crypto'
import { sendMagicLink } from '@/lib/email'
import { getPayloadClient } from '@/lib/payload'
import { slugify } from '@/lib/slugs'
import { magicLinkSchema, postSchema } from '@/lib/validation'

export type ActionState = {
  ok?: boolean
  message?: string
}

export async function requestMagicLink(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = magicLinkSchema.safeParse({
    email: formData.get('email'),
    displayName: formData.get('displayName') || undefined,
  })

  if (!parsed.success) {
    return { message: 'Email ou pseudo invalide.' }
  }

  const payload = await getPayloadClient()
  const email = parsed.data.email.toLowerCase()
  const existing = await payload.find({
    collection: 'users',
    limit: 1,
    where: {
      email: {
        equals: email,
      },
    },
  })

  if (!existing.docs[0]) {
    await payload.create({
      collection: 'users',
      data: {
        email,
        displayName: parsed.data.displayName || 'Anonyme courageux',
      },
    })
  }

  const token = createToken()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  await payload.create({
    collection: 'magic-links',
    data: {
      email,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + 1000 * 60 * 20).toISOString(),
    },
  })

  await sendMagicLink({
    email,
    url: `${siteUrl}/magic?token=${token}`,
  })

  return { ok: true, message: 'Lien envoye. Regarde ta boite mail.' }
}

export async function consumeMagicLink(token: string) {
  const payload = await getPayloadClient()
  const links = await payload.find({
    collection: 'magic-links',
    limit: 1,
    where: {
      and: [
        { tokenHash: { equals: hashToken(token) } },
        { usedAt: { exists: false } },
        { expiresAt: { greater_than: new Date().toISOString() } },
      ],
    },
  })

  const link = links.docs[0]
  if (!link) redirect('/login?error=expired')

  await payload.update({
    collection: 'magic-links',
    id: link.id,
    data: {
      usedAt: new Date().toISOString(),
    },
  })

  const users = await payload.find({
    collection: 'users',
    limit: 1,
    where: {
      email: {
        equals: link.email,
      },
    },
  })

  const user = users.docs[0]
  if (!user) redirect('/login?error=user')

  await createSession(user.id)
  redirect('/publier')
}

export async function submitPost(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = postSchema.safeParse({
    title: formData.get('title'),
    excerpt: formData.get('excerpt'),
    story: formData.get('story'),
    authorName: formData.get('authorName') || 'Anonyme',
    budget: formData.get('budget') || undefined,
    deadline: formData.get('deadline') || undefined,
    redFlags: formData.get('redFlags') || undefined,
  })

  if (!parsed.success) {
    return { message: 'Le brief est incomplet ou trop court.' }
  }

  const payload = await getPayloadClient()
  const baseSlug = slugify(parsed.data.title) || 'projet'
  const slug = `${baseSlug}-${Date.now().toString(36)}`
  const flags = parsed.data.redFlags
    ?.split(',')
    .map((flag) => flag.trim())
    .filter(Boolean)
    .slice(0, 8)
    .map((label) => ({ label }))

  await payload.create({
    collection: 'posts',
    data: {
      ...parsed.data,
      slug,
      status: 'pending',
      redFlags: flags,
    },
  })

  return { ok: true, message: 'Projet envoye en moderation. Le monde devait savoir.' }
}

export async function logout() {
  await clearSession()
  redirect('/')
}
