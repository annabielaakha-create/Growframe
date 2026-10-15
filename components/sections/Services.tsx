'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ServiceCard } from '../ui/ServiceCard'
import { SectionHeader } from '../ui/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

export interface Service {
  n: string
  slug: string
  title: string
  tagline: string
  body: string
  points: string[]
  icon?: React.ReactNode
  industries: string
}

interface ServicesProps {
  services: Service[]
  className?: string
}

/**
 * Services — Numbered services section (Sanjaya style)
 */
export function Services({ services, className = '' }: ServicesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Animate cards on scroll
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 60%',
            scrub: false,
          },
          delay: i * 0.1,
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
        eyebrow="What We Offer"
        title="Six Disciplines. One Monthly Rate."
        description="Mix and match however your month demands — no scope negotiations, no change orders, no per-asset pricing."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <div
            key={service.slug}
            ref={(el) => {
              if (el) cardsRef.current[i] = el
            }}
          >
            <ServiceCard
              number={service.n}
              title={service.title}
              description={service.body}
              points={service.points}
              icon={service.icon}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
