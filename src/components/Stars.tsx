type StarIconProps = {
  size?: number
  color?: string
}

export function StarIcon({ size = 16, color = 'var(--pdm-amber)' }: StarIconProps) {
  return (
    <svg
      aria-hidden="true"
      className="block shrink-0"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={color}
      />
    </svg>
  )
}

type StarsProps = {
  value: number
  size?: number
  count?: number
}

const emptyColor = 'rgba(255,255,255,0.16)'
const filledColor = 'var(--pdm-amber)'

/** Read-only fractional star display (e.g. 3.7 / 5). */
export function Stars({ value, size = 16, count }: StarsProps) {
  const clamped = Math.max(0, Math.min(5, value || 0))
  const gap = size * 0.18
  const widthPct = (clamped / 5) * 100

  return (
    <span
      className="inline-flex items-center gap-2"
      aria-label={`Note ${clamped.toFixed(1)} sur 5`}
    >
      <span className="relative inline-flex" style={{ gap, lineHeight: 0 }}>
        {[0, 1, 2, 3, 4].map((index) => (
          <StarIcon color={emptyColor} key={index} size={size} />
        ))}
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${widthPct}%` }}
        >
          <span className="inline-flex w-max" style={{ gap, lineHeight: 0 }}>
            {[0, 1, 2, 3, 4].map((index) => (
              <StarIcon color={filledColor} key={index} size={size} />
            ))}
          </span>
        </span>
      </span>
      {count != null ? (
        <span className="pdm-mono text-xs text-[var(--pdm-mute)]">
          {count > 0
            ? `${clamped.toFixed(1)} · ${count} vote${count > 1 ? 's' : ''}`
            : 'Pas encore note'}
        </span>
      ) : null}
    </span>
  )
}
