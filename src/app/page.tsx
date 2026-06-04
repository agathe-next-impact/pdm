import Link from 'next/link'

import { Header } from '@/components/Header'
import { Merdometre, Swirl } from '@/components/PdmMark'
import { demoPosts, type PublicPost } from '@/lib/demo-posts'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

function severityFor(post: PublicPost) {
  if (post.redFlags?.length && post.redFlags.length >= 3) return 5
  if (post.budget?.includes('10') || post.budget?.includes('0')) return 5
  if (post.deadline?.toLowerCase().includes('lundi') || post.deadline?.includes('2')) return 4
  return 3
}

export default async function Home() {
  let posts: PublicPost[] = demoPosts
  let isDemo = true

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      limit: 12,
      sort: '-createdAt',
      where: {
        status: {
          equals: 'published',
        },
      },
    })

    posts = result.docs.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      authorName: post.authorName,
      story: post.story,
      budget: post.budget,
      deadline: post.deadline,
      redFlags: post.redFlags as Array<{ label: string }> | null | undefined,
    }))
    isDemo = false
  } catch {
    posts = demoPosts
  }

  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <section className="relative border-b border-[var(--pdm-border)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-16">
            <div className="max-w-2xl">
              <p className="pdm-pill mb-7 inline-flex items-center gap-2 px-3 py-2 text-[var(--pdm-amber)]">
                <Swirl color="var(--pdm-amber)" size={14} />
                {posts.length || 1204} PDM archives · et ca continue
              </p>
              <h1 className="pdm-display text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                Le mur des
                <br />
                <span className="text-[var(--pdm-lime)]">PDM.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--pdm-dim)] sm:text-xl">
                Freelances, devs, designers, agences : publiez anonymement les briefs impossibles
                recus dans la vraie vie. La communaute juge leur indice PDM.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="rounded-full bg-[var(--pdm-lime)] px-5 py-3 font-extrabold text-[var(--pdm-bg)]" href="/publier">
                  Balancer un projet
                </Link>
                <a className="rounded-full border border-[var(--pdm-border-hi)] bg-[var(--pdm-surface)] px-5 py-3 font-bold text-[var(--pdm-text)]" href="#feed">
                  Voir le mur
                </a>
              </div>
            </div>
            <div className="relative min-h-[360px]">
              <div className="absolute right-0 top-6 hidden h-44 w-44 rounded-[3rem] bg-[var(--pdm-lime)] opacity-95 md:block" />
              <div className="relative space-y-4">
                {posts.slice(0, 3).map((post, index) => (
                  <div
                    className="pdm-card max-w-sm p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                    key={post.id}
                    style={{
                      marginLeft: index === 1 ? '2.5rem' : index === 2 ? '1rem' : 0,
                      transform: `rotate(${[-3, 2, -1][index]}deg)`,
                    }}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="pdm-mono text-xs text-[var(--pdm-mute)]">PDM-{post.id}</span>
                      <Merdometre level={severityFor(post)} size={15} />
                    </div>
                    <p className="pdm-display text-xl font-bold leading-tight tracking-tight">
                      “{post.title}”
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="pdm-pill px-2 py-1">{post.budget || 'Budget mystere'}</span>
                      <span className="pdm-pill px-2 py-1">{post.deadline || 'Delai flou'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-12" id="feed">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="pdm-display text-4xl font-extrabold tracking-tight">Derniers specimens</h2>
              {isDemo ? (
                <p className="pdm-mono mt-2 text-xs text-[var(--pdm-amber)]">
                  Mode demo: configure DATABASE_URI pour afficher les vrais posts Payload.
                </p>
              ) : null}
            </div>
            <Link className="hidden rounded-full border border-[var(--pdm-border-hi)] px-4 py-2 font-bold text-[var(--pdm-dim)] transition hover:text-[var(--pdm-text)] sm:inline" href="/publier">
              Ajouter le tien
            </Link>
          </div>
          {posts.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="pdm-card p-5 transition hover:-translate-y-1 hover:border-[var(--pdm-border-hi)]">
                  <Link className="flex h-full flex-col" href={`/p/${post.slug}`}>
                    <div className="mb-5 flex items-center justify-between">
                      <span className="pdm-mono text-xs text-[var(--pdm-mute)]">PDM-{post.id}</span>
                      <Merdometre level={severityFor(post)} size={15} />
                    </div>
                    <h3 className="pdm-display text-2xl font-bold leading-tight tracking-tight">“{post.title}”</h3>
                    <p className="mt-4 flex-1 text-[var(--pdm-dim)]">{post.excerpt}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="pdm-pill px-3 py-2">{post.budget || 'Budget mysterieux'}</span>
                      <span className="pdm-pill px-3 py-2">{post.deadline || 'Delai flou'}</span>
                    </div>
                    <p className="pdm-mono mt-5 border-t border-[var(--pdm-border)] pt-4 text-xs text-[var(--pdm-mute)]">
                      · {post.authorName}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="pdm-card p-8">
              <p className="text-xl font-bold text-[var(--pdm-dim)]">Aucun projet publie pour le moment. Le calme avant la facture.</p>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
