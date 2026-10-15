'use client'

interface StatBoxProps {
  value: string
  label: string
  className?: string
}

/**
 * StatBox — Big number display for stats section
 * Inspired by Sanjaya's metrics display
 */
export function StatBox({ value, label, className = '' }: StatBoxProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className="text-6xl md:text-7xl font-bold text-black leading-none mb-4">
        {value}
      </div>
      <div className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
        {label}
      </div>
    </div>
  )
}
