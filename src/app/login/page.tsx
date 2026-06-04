import { AuthForm } from '@/components/AuthForm'
import { Header } from '@/components/Header'
import { Swirl } from '@/components/PdmMark'

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-xl px-4 py-12">
        <p className="pdm-pill mb-5 inline-flex items-center gap-2 px-3 py-2 text-[var(--pdm-amber)]">
          <Swirl color="var(--pdm-amber)" size={14} />
          acces contributeur
        </p>
        <h1 className="pdm-display text-5xl font-extrabold leading-tight tracking-tight">Connexion sans mot de passe</h1>
        <p className="mt-4 mb-8 text-lg leading-8 text-[var(--pdm-dim)]">
          Un email, un lien magique, et tu peux publier ton chef-d&apos;oeuvre de catastrophe.
        </p>
        <section className="pdm-card p-5">
          <AuthForm />
        </section>
      </main>
    </>
  )
}
