'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  variant?: 'default' | 'bordered' | 'elevated'
}

/**
 * Card — Clean card component for light theme
 * Replaces glassmorphism cards from dark theme
 */
export function Card({ children, className = '', hover = false, variant = 'default' }: CardProps) {
  const baseStyles = 'rounded-lg transition-all duration-300'

  const variantStyles = {
    default: 'bg-white border border-border shadow-sm',
    bordered: 'bg-white border-2 border-border',
    elevated: 'bg-white border border-border shadow-card',
  }

  const hoverStyles = hover
    ? 'hover:border-gray-500 hover:shadow-card-hover hover:-translate-y-1'
    : ''

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  )
}
