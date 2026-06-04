'use client'

import { useState, useTransition } from 'react'

import { ratePost } from '@/app/actions'
import { StarIcon, Stars } from '@/components/Stars'

type StarRatingProps = {
  slug: string
  average: number
  count: number
  hasVoted: boolean
  size?: number
}

/** Interactive 1-5 community vote. Falls back to a read-only display once voted. */
export function StarRating({ slug, average, count, hasVoted, size = 30 }: StarRatingProps) {
  const [hover, setHover] = useState(0)
  const [voted, setVoted] = useState(hasVoted)
  const [avg, setAvg] = useState(average)
  const [votes, setVotes] = useState(count)
  const [message, setMessage] = useState('')
  const [pending, startTransition] = useTransition()

  function vote(rating: number) {
    if (voted || pending) return
    startTransition(async () => {
      const result = await ratePost(slug, rating)
      setMessage(result.message)
      if (result.ok) {
        setVoted(true)
        if (typeof result.average === 'number') setAvg(result.average)
        if (typeof result.count === 'number') setVotes(result.count)
      }
    })
  }

  if (voted) {
    return (
      <div className="flex flex-col gap-2">
        <Stars count={votes} size={22} value={avg} />
        <p className="pdm-mono text-xs text-[var(--pdm-lime)]">
          {message || 'Vote enregistre. Merci pour le service public.'}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            aria-label={`Noter ${n} sur 5`}
            className="cursor-pointer rounded p-0.5 transition disabled:cursor-progress disabled:opacity-60"
            disabled={pending}
            key={n}
            onClick={() => vote(n)}
            onFocus={() => setHover(n)}
            onMouseEnter={() => setHover(n)}
            type="button"
          >
            <StarIcon
              color={n <= hover ? 'var(--pdm-amber)' : 'rgba(255,255,255,0.18)'}
              size={size}
            />
          </button>
        ))}
      </div>
      <p className="pdm-mono text-xs text-[var(--pdm-mute)]">
        {message ||
          (votes > 0
            ? `${avg.toFixed(1)}/5 · ${votes} vote${votes > 1 ? 's' : ''} · donne ton verdict`
            : 'Sois le premier a juger ce projet')}
      </p>
    </div>
  )
}
