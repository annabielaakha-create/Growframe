'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '../ui/Card'
import { SectionHeader } from '../ui/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

export interface Testimonial {
  quote: string
  person: string
  role: string
  avatar: string
}

interface TestimonialsProps {
  testimonials: readonly Testimonial[]
  className?: string
}

/**
 * Testimonials — Client testimonials section
 */
export function Testimonials({ testimonials, className = '' }: TestimonialsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Stagger animation
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 60%',
            scrub: false,
          },
          delay: i * 0.15,
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={containerRef} className={`section bg-white ${className}`}>
      <SectionHeader
        eyebrow="Testimonials"
        title="Their Words, Not Ours"
        description="What our clients say about working with GrowFrame."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardsRef.current[i] = el
            }}
          >
            <Card hover className="h-full flex flex-col p-8">
              {/* Quote */}
              <blockquote className="text-lg text-text-primary mb-6 flex-grow leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-light-gray">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.person}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-text-primary">
                    {testimonial.person}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}
