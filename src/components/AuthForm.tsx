'use client'

import { useActionState } from 'react'

import { requestMagicLink, type ActionState } from '@/app/actions'

export function AuthForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(requestMagicLink, {})

  return (
    <form action={action} className="grid gap-3">
      <input
        className="rounded-xl border border-[var(--pdm-border-hi)] bg-[var(--pdm-bg-2)] px-4 py-3 text-[var(--pdm-text)] outline-none transition placeholder:text-[var(--pdm-mute)] focus:border-[var(--pdm-lime)]"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="email@exemple.com"
        required
      />
      <input
        className="rounded-xl border border-[var(--pdm-border-hi)] bg-[var(--pdm-bg-2)] px-4 py-3 text-[var(--pdm-text)] outline-none transition placeholder:text-[var(--pdm-mute)] focus:border-[var(--pdm-lime)]"
        name="displayName"
        type="text"
        maxLength={60}
        placeholder="Pseudo public optionnel"
      />
      <button
        className="rounded-full bg-[var(--pdm-lime)] px-5 py-3 font-extrabold text-[var(--pdm-bg)] transition hover:brightness-110 disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        {pending ? 'Envoi...' : 'Recevoir le lien magique'}
      </button>
      {state.message ? (
        <p className={state.ok ? 'font-bold text-[var(--pdm-lime)]' : 'font-bold text-[var(--pdm-coral)]'}>
          {state.message}
        </p>
      ) : null}
    </form>
  )
}
