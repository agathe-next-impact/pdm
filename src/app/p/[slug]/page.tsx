import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Header } from '@/components/Header'
import { Merdometre } from '@/components/PdmMark'
import { StarRating } from '@/components/StarRating'
import { demoPosts, ratingAverage, type PublicPost } from '@/lib/demo-posts'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

function severityFor(post: PublicPost) {
  if (post.redFlags?.length && post.redFlags.length >= 3) return 5
  if (post.budget?.includes('10') || post.budget?.includes('0')) return 5
  if (post.deadline?.toLowerCase().includes('lundi') || post.deadline?.includes('2')) return 4
  return 3
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let post: PublicPost | null = null

  try {
    const payload = await getPayloadClient()
    const posts = await payload.find({
      collection: 'posts',
      limit: 1,
      where: {
        and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
      },
    })
    const found = posts.docs[0]

    if (found) {
      post = {
        id: found.id,
        title: found.title,
        slug: found.slug,
        excerpt: found.excerpt,
        story: found.story,
        authorName: found.authorName,
        budget: found.budget,
        deadline: found.deadline,
        redFlags: found.redFlags as Array<{ label: string }> | null | undefined,
        ratingSum: found.ratingSum,
        ratingCount: found.ratingCount,
      }
    }
  } catch {
    post = demoPosts.find((item) => item.slug === slug) || null
  }

  if (!post) notFound()

  const redFlags = post.redFlags
  const cookieStore = await cookies()
  const hasVoted = (cookieStore.get('pdm_votes')?.value ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .includes(post.slug)

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Link className="pdm-mono text-sm font-bold text-[var(--pdm-dim)] transition hover:text-[var(--pdm-text)]" href="/">
          Tous les projets
        </Link>
        <article className="pdm-card mt-6 overflow-hidden">
          <div className="h-1.5" style={{ background: `linear-gradient(90deg, #f5453c, var(--pdm-amber), var(--pdm-lime))` }} />
          <div className="p-6 sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <span className="pdm-mono text-xs text-[var(--pdm-mute)]">PDM-{post.id}</span>
            <Merdometre level={severityFor(post)} size={18} />
          </div>
          <h1 className="pdm-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">“{post.title}”</h1>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="pdm-pill px-3 py-2">budget {post.budget || 'mysterieux'}</span>
            <span className="pdm-pill px-3 py-2">delai {post.deadline || 'flou'}</span>
          </div>
          <p className="mt-8 text-xl leading-8 text-[var(--pdm-text)]">{post.excerpt}</p>
          <div className="mt-8 whitespace-pre-wrap text-lg leading-8 text-[var(--pdm-dim)]">{post.story}</div>
          {redFlags?.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {redFlags.map((flag, index) => (
                <span className="rounded-md border border-[rgba(205,250,62,0.24)] bg-[rgba(205,250,62,0.1)] px-3 py-1 font-bold text-[var(--pdm-lime)]" key={index}>
                  {flag.label}
                </span>
              ))}
            </div>
          ) : null}
          <div className="mt-8 border-t border-[var(--pdm-border)] pt-6">
            <p className="pdm-display text-lg font-bold tracking-tight">
              Note ce projet de merde
            </p>
            <p className="pdm-mono mt-1 text-xs text-[var(--pdm-mute)]">
              5 etoiles = chef-d&apos;oeuvre de l&apos;enfer. Un seul vote par projet.
            </p>
            <div className="mt-4">
              <StarRating
                average={ratingAverage(post)}
                count={post.ratingCount ?? 0}
                hasVoted={hasVoted}
                slug={post.slug}
              />
            </div>
          </div>
          <p className="pdm-mono mt-8 border-t border-[var(--pdm-border)] pt-5 text-sm text-[var(--pdm-mute)]">Signe: {post.authorName}</p>
          </div>
        </article>
      </main>
    </>
  )
}
