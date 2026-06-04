import { cookies } from 'next/headers'

import { createToken, hashToken } from './crypto'
import { getPayloadClient } from './payload'

const sessionCookie = 'pdm_session'

export async function createSession(userId: number) {
  const payload = await getPayloadClient()
  const token = createToken()
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)

  await payload.create({
    collection: 'sessions',
    data: {
      user: userId,
      tokenHash: hashToken(token),
      expiresAt: expiresAt.toISOString(),
    },
  })

  const cookieStore = await cookies()
  cookieStore.set(sessionCookie, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  })
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get(sessionCookie)?.value
  if (!token) return null

  try {
    const payload = await getPayloadClient()
    const sessions = await payload.find({
      collection: 'sessions',
      limit: 1,
      depth: 1,
      where: {
        and: [
          { tokenHash: { equals: hashToken(token) } },
          { revokedAt: { exists: false } },
          { expiresAt: { greater_than: new Date().toISOString() } },
        ],
      },
    })

    const session = sessions.docs[0]
    if (!session || typeof session.user !== 'object') return null
    return session.user
  } catch {
    return null
  }
}

export async function clearSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(sessionCookie)?.value
  cookieStore.delete(sessionCookie)

  if (!token) return
  const payload = await getPayloadClient()
  const sessions = await payload.find({
    collection: 'sessions',
    limit: 1,
    where: {
      tokenHash: {
        equals: hashToken(token),
      },
    },
  })

  const session = sessions.docs[0]
  if (session) {
    await payload.update({
      collection: 'sessions',
      id: session.id,
      data: {
        revokedAt: new Date().toISOString(),
      },
    })
  }
}
