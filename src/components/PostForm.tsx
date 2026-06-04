'use client'

import { useActionState } from 'react'

import { submitPost, type ActionState } from '@/app/actions'

export function PostForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(submitPost, {})

  return (
    <form action={action} className="grid gap-4">
      <label className="grid gap-2 font-bold text-[var(--pdm-text)]">
        Titre
        <input className="rounded-xl border border-[var(--pdm-border-hi)] bg-[var(--pdm-bg-2)] px-4 py-3 font-normal outline-none placeholder:text-[var(--pdm-mute)] focus:border-[var(--pdm-lime)]" name="title" required />
      </label>
      <label className="grid gap-2 font-bold text-[var(--pdm-text)]">
        Pitch court
        <textarea className="min-h-24 rounded-xl border border-[var(--pdm-border-hi)] bg-[var(--pdm-bg-2)] px-4 py-3 font-normal outline-none placeholder:text-[var(--pdm-mute)] focus:border-[var(--pdm-lime)]" name="excerpt" required />
      </label>
      <label className="grid gap-2 font-bold text-[var(--pdm-text)]">
        L&apos;histoire complete
        <textarea className="min-h-44 rounded-xl border border-[var(--pdm-border-hi)] bg-[var(--pdm-bg-2)] px-4 py-3 font-normal outline-none placeholder:text-[var(--pdm-mute)] focus:border-[var(--pdm-lime)]" name="story" required />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 font-bold text-[var(--pdm-text)]">
          Budget annonce
          <input className="rounded-xl border border-[var(--pdm-border-hi)] bg-[var(--pdm-bg-2)] px-4 py-3 font-normal outline-none placeholder:text-[var(--pdm-mute)] focus:border-[var(--pdm-lime)]" name="budget" placeholder="500 EUR" />
        </label>
        <label className="grid gap-2 font-bold text-[var(--pdm-text)]">
          Delai annonce
          <input className="rounded-xl border border-[var(--pdm-border-hi)] bg-[var(--pdm-bg-2)] px-4 py-3 font-normal outline-none placeholder:text-[var(--pdm-mute)] focus:border-[var(--pdm-lime)]" name="deadline" placeholder="Avant lundi" />
        </label>
      </div>
      <label className="grid gap-2 font-bold text-[var(--pdm-text)]">
        Red flags, separes par des virgules
        <input
          className="rounded-xl border border-[var(--pdm-border-hi)] bg-[var(--pdm-bg-2)] px-4 py-3 font-normal outline-none placeholder:text-[var(--pdm-mute)] focus:border-[var(--pdm-lime)]"
          name="redFlags"
          placeholder="equity, urgence, clone, budget magique"
        />
      </label>
      <label className="grid gap-2 font-bold text-[var(--pdm-text)]">
        Signature publique
        <input className="rounded-xl border border-[var(--pdm-border-hi)] bg-[var(--pdm-bg-2)] px-4 py-3 font-normal outline-none placeholder:text-[var(--pdm-mute)] focus:border-[var(--pdm-lime)]" name="authorName" defaultValue="Anonyme" />
      </label>
      <button className="rounded-full bg-[var(--pdm-lime)] px-5 py-3 font-extrabold text-[var(--pdm-bg)] transition hover:brightness-110 disabled:opacity-60" disabled={pending}>
        {pending ? 'Moderation...' : 'Balancer le projet'}
      </button>
      {state.message ? (
        <p className={state.ok ? 'font-bold text-[var(--pdm-lime)]' : 'font-bold text-[var(--pdm-coral)]'}>
          {state.message}
        </p>
      ) : null}
    </form>
  )
}
