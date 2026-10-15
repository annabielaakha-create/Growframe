'use client'

import Image from 'next/image'

interface CaseStudyCardProps {
  title: string
  category: string
  industry: string
  year: string
  metrics: {
    label: string
    value: string
  }[]
  image?: string
  className?: string
}

/**
 * CaseStudyCard — Portfolio case study card with metrics
 * Inspired by Sanjaya's case study cards
 */
export function CaseStudyCard({
  title,
  category,
  industry,
  year,
  metrics,
  image,
  className = '',
}: CaseStudyCardProps) {
  return (
    <div className={`card overflow-hidden hover ${className}`}>
      {/* Image Section */}
      {image && (
        <div className="relative w-full h-64 bg-light-gray mb-6 overflow-hidden rounded-md">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div>
        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet">
            {category}
          </span>
          <span className="text-xs text-text-secondary">•</span>
          <span className="text-xs text-text-secondary font-medium">{year}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-text-primary mb-2">
          {title}
        </h3>

        {/* Industry */}
        <p className="text-sm text-text-secondary mb-6">{industry}</p>

        {/* Metrics Grid */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
            {metrics.map((metric, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-bold text-black mb-1">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
