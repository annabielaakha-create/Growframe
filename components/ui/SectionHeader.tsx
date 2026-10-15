'use client'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

/**
 * SectionHeader — Consistent section header component
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left'

  return (
    <div className={`mb-12 md:mb-16 ${alignClass} ${className}`}>
      {eyebrow && (
        <div className="eyebrow text-violet mb-4">
          {eyebrow}
        </div>
      )}

      <h2 className="text-display-lg md:text-display-xl font-bold text-text-primary mb-6">
        {title}
      </h2>

      {description && (
        <p className="text-lg text-text-secondary leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
