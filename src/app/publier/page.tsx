import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Header } from '@/components/Header'
import { PostForm } from '@/components/PostForm'
import { Swirl } from '@/components/PdmMark'
import { getCurrentUser } from '@/lib/auth'

export default async function PublishPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-[0.75fr_1.25fr]">
        <aside>
          <p className="pdm-pill mb-5 inline-flex items-center gap-2 px-3 py-2 text-[var(--pdm-amber)]">
            <Swirl color="var(--pdm-amber)" size={14} />
            formulaire de signalement
          </p>
          <h1 className="pdm-display text-5xl font-extrabold leading-tight tracking-tight">Publier un PDM</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--pdm-dim)]">
            Pas de noms de clients, pas de doxxing, pas de pieces confidentielles. Juste le brief,
            l&apos;absurde, et la morale.
          </p>
          <Link className="pdm-mono mt-6 inline-block text-sm font-bold text-[var(--pdm-dim)] transition hover:text-[var(--pdm-text)]" href="/">
            Retour aux specimens
          </Link>
        </aside>
        <section className="pdm-card p-5">
          <PostForm />
        </section>
      </main>
    </>
  )
}
