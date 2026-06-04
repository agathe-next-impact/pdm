import Link from 'next/link'

import { getCurrentUser } from '@/lib/auth'
import { logout } from '@/app/actions'
import { Logo } from './PdmMark'

export async function Header() {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--pdm-border)] bg-[rgba(10,10,12,0.82)] backdrop-blur-xl">
      <div className="pdm-hazard h-1" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link className="flex items-center gap-3" href="/">
          <Logo />
          <span className="leading-none">
            <span className="pdm-display block text-xl font-extrabold tracking-tight">PDM</span>
            <span className="hidden text-[11px] text-[var(--pdm-mute)] sm:block">le mur des briefs</span>
          </span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-bold">
          <Link className="hidden text-[var(--pdm-dim)] transition hover:text-[var(--pdm-text)] sm:inline" href="/">
            Le mur
          </Link>
          {user ? (
            <form action={logout}>
              <button className="rounded-full border border-[var(--pdm-border-hi)] bg-[var(--pdm-surface-2)] px-4 py-2 text-[var(--pdm-text)]" type="submit">
                Sortir
              </button>
            </form>
          ) : (
            <Link className="text-[var(--pdm-dim)] transition hover:text-[var(--pdm-text)]" href="/login">
              Magic link
            </Link>
          )}
          <Link className="rounded-full bg-[var(--pdm-lime)] px-4 py-2 font-extrabold text-[var(--pdm-bg)]" href="/publier">
            Balancer
          </Link>
        </nav>
      </div>
    </header>
  )
}
