'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '../ui/Button'

interface CTAProps {
  title: string
  description?: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  className?: string
}

/**
 * CTA — Call-to-action closing section
 */
export function CTA({
  title,
  description,
  primaryCta,
  secondaryCta,
  className = '',
}: CTAProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'top 50%',
        scrub: false,
      },
    })

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      0
    )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.1
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.2
      )
  }, [])

  return (
    <section
      ref={containerRef}
      className={`section bg-black text-white py-20 md:py-32 ${className}`}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
        >
          {title}
        </h2>

        {description && (
          <p
            ref={descRef}
            className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed"
          >
            {description}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {primaryCta && (
              <Button
                href={primaryCta.href}
                variant="primary"
                size="lg"
              >
                {primaryCta.text}
              </Button>
            )}
            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {secondaryCta.text}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
