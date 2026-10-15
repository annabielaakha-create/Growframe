'use client'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'solid' | 'outline'
  color?: 'violet' | 'black'
  className?: string
}

/**
 * Badge — Small label/tag component
 */
export function Badge({
  children,
  variant = 'solid',
  color = 'violet',
  className = ''
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200'

  const variantStyles = {
    solid: {
      violet: 'bg-violet text-white',
      black: 'bg-black text-white',
    },
    outline: {
      violet: 'border border-violet text-violet bg-transparent',
      black: 'border border-black text-black bg-transparent',
    },
  }

  return (
    <span className={`${baseStyles} ${variantStyles[variant][color]} ${className}`}>
      {children}
    </span>
  )
}
