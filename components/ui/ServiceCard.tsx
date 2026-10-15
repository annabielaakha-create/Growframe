'use client'

interface ServiceCardProps {
  number: string
  title: string
  description: string
  points: readonly string[]
  icon?: React.ReactNode
  className?: string
}

/**
 * ServiceCard — Numbered service card (Sanjaya style)
 * Format: /01, /02, etc.
 */
export function ServiceCard({
  number,
  title,
  description,
  points,
  icon,
  className = '',
}: ServiceCardProps) {
  return (
    <div className={`card card-sm p-6 md:p-8 ${className}`}>
      {/* Number Label */}
      <div className="text-violet mb-4 text-sm font-semibold tracking-wider">
        / {number}
      </div>

      {/* Icon (optional) */}
      {icon && <div className="mb-6 w-12 h-12">{icon}</div>}

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary mb-6 leading-relaxed">
        {description}
      </p>

      {/* Points List */}
      <ul className="space-y-3">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-violet font-semibold mt-0.5">✓</span>
            <span className="text-sm text-text-secondary">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
