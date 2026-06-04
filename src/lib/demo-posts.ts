export type PublicPost = {
  id: string | number
  title: string
  slug: string
  excerpt: string
  story: string
  authorName: string
  budget?: string | null
  deadline?: string | null
  redFlags?: Array<{ label: string }> | null
  ratingSum?: number | null
  ratingCount?: number | null
}

/** Average community rating (0 when nobody voted yet). */
export function ratingAverage(post: Pick<PublicPost, 'ratingSum' | 'ratingCount'>) {
  const count = post.ratingCount ?? 0
  if (count <= 0) return 0
  return (post.ratingSum ?? 0) / count
}

export const demoPosts: PublicPost[] = [
  {
    id: 'demo-bon-coin',
    title: 'Clone du Bon Coin pour 500 EUR',
    slug: 'clone-du-bon-coin-pour-500-eur',
    excerpt:
      'Un classique: marketplace, messagerie, paiement, moderation, SEO national et admin maison. Budget: une chaise de bureau fatiguee.',
    story:
      'Le brief commence par "on a deja tout pense". Il faut refaire Le Bon Coin, mais plus moderne, avec un tunnel de paiement, une messagerie interne, des annonces boostees, une moderation automatique et un back-office simple. Le tout pour 500 EUR, parce que le client a deja le logo et "ca fait gagner du temps".',
    authorName: 'Anonyme',
    budget: '500 EUR',
    deadline: '3 semaines',
    redFlags: [{ label: 'clone' }, { label: 'budget fixe' }, { label: 'admin maison' }],
    ratingSum: 188,
    ratingCount: 41,
  },
  {
    id: 'demo-singe',
    title: 'IA qui imite la pensee du singe',
    slug: 'ia-qui-imite-la-pensee-du-singe',
    excerpt:
      'Le client voulait une IA profonde, instinctive, un peu mystique, avec abonnement SaaS et demo demain matin.',
    story:
      'Objectif declare: creer une IA capable de simuler la pensee du singe pour aider les marques a retrouver leur instinct primaire. Aucun dataset, aucune specification, mais une certitude absolue: "ChatGPT fait deja presque ca". La V1 doit inclure une page pricing, un espace client et une API.',
    authorName: 'Prompt survivant',
    budget: '10% de la future boite',
    deadline: 'Demain',
    redFlags: [{ label: 'IA floue' }, { label: 'equity' }, { label: 'demo demain' }],
    ratingSum: 132,
    ratingCount: 27,
  },
  {
    id: 'demo-facebook',
    title: 'Refaire Facebook mais simple',
    slug: 'refaire-facebook-mais-simple',
    excerpt:
      'Simple: profils, feed, groupes, chat, notifications, app mobile et algo maison. Rien de fou, juste propre.',
    story:
      'Le mot "simple" apparait dix-sept fois dans le brief. Il faut des profils, un feed, des groupes prives, une messagerie, des notifications, une app mobile et un algorithme qui met en avant les bons contenus. Le client precise que Facebook est devenu trop complique, donc ca devrait aller vite.',
    authorName: 'Prestataire rince',
    budget: 'A discuter',
    deadline: 'Avant le salon',
    redFlags: [{ label: 'refaire Facebook' }, { label: 'simple' }, { label: 'avant le salon' }],
    ratingSum: 96,
    ratingCount: 23,
  },
]
