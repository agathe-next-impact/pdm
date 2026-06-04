const severityColors = ['#8fd14f', '#dcd13a', '#f5a623', '#f5713a', '#f5453c']

type SwirlProps = {
  size?: number
  color?: string
  filled?: boolean
}

export function Swirl({ size = 16, color = 'var(--pdm-amber)', filled = true }: SwirlProps) {
  return (
    <svg
      aria-hidden="true"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      className="block shrink-0"
    >
      <path
        d="M12 3.2c1.5 0 2.5 1.15 2.2 2.5 1.65.2 2.85 1.45 2.85 2.95 0 .4-.08.78-.22 1.12 1.72.42 2.95 1.72 2.95 3.34 0 .47-.1.92-.3 1.32 1.02.5 1.72 1.4 1.72 2.48 0 1.62-1.55 2.9-3.45 2.9H4.27C2.37 19.82.82 18.54.82 16.92c0-1.08.7-1.98 1.72-2.48-.2-.4-.3-.85-.3-1.32 0-1.62 1.23-2.92 2.95-3.34-.14-.34-.22-.72-.22-1.12 0-1.5 1.2-2.75 2.85-2.95C7.5 4.35 8.5 3.2 10 3.2z"
        fill={filled ? color : 'none'}
        stroke={filled ? 'none' : 'rgba(255,255,255,0.16)'}
        strokeWidth={filled ? 0 : 1.6}
      />
    </svg>
  )
}

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center bg-[var(--pdm-lime)]"
      style={{ width: size, height: size, borderRadius: size * 0.28 }}
    >
      <Swirl color="var(--pdm-bg)" size={size * 0.62} />
    </span>
  )
}

export function Merdometre({ level = 4, size = 16 }: { level?: number; size?: number }) {
  const safeLevel = Math.max(1, Math.min(5, level))
  const color = severityColors[safeLevel - 1]

  return (
    <span className="inline-flex items-center gap-1" aria-label={`Indice PDM ${safeLevel} sur 5`}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Swirl color={color} filled={index <= safeLevel} key={index} size={size} />
      ))}
    </span>
  )
}
