'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { StatBox } from '../ui/StatBox'
import { SectionHeader } from '../ui/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

export interface Stat {
  value: string
  label: string
}

interface StatsProps {
  stats: readonly Stat[]
  title?: string
  description?: string
  className?: string
}

/**
 * Stats — Big number stats section (Sanjaya style)
 */
export function Stats({ stats, title, description, className = '' }: StatsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Counter animation on scroll
    statsRef.current.forEach((stat, i) => {
      gsap.fromTo(
        stat,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: stat,
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
      {(title || description) && (
        <SectionHeader
          title={title || 'By The Numbers'}
          description={description}
        />
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) statsRef.current[i] = el
            }}
          >
            <StatBox value={stat.value} label={stat.label} />
          </div>
        ))}
      </div>
    </section>
  )
}
