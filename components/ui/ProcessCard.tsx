'use client'

import Image from 'next/image'

interface ProcessCardProps {
  number: string
  title: string
  description: string
  mockupImage?: string
  className?: string
}

/**
 * ProcessCard — Process step card with optional mockup preview
 * Inspired by Sanjaya's process section
 */
export function ProcessCard({
  number,
  title,
  description,
  mockupImage,
  className = '',
}: ProcessCardProps) {
  return (
    <div className={`card p-8 md:p-10 flex flex-col h-full ${className}`}>
      {/* Step Number */}
      <div className="text-violet text-sm font-semibold tracking-wider mb-4">
        / {number}
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary mb-8 flex-grow">
        {description}
      </p>

      {/* Mockup Preview */}
      {mockupImage && (
        <div className="relative w-full h-48 bg-light-gray rounded-md overflow-hidden -mx-8 -mb-8 md:-mx-10 md:-mb-10 mt-auto">
          <Image
            src={mockupImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
    </div>
  )
}
