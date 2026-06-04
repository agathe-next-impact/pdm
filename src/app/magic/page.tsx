import { consumeMagicLink } from '../actions'

export default async function MagicPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams

  if (params.token) {
    await consumeMagicLink(params.token)
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-3xl font-black">Lien invalide</h1>
      <p className="mt-3">Demande un nouveau magic link pour continuer.</p>
    </main>
  )
}
