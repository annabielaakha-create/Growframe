'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProcessCard } from '../ui/ProcessCard'
import { SectionHeader } from '../ui/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

export interface ProcessStep {
  step: string
  title: string
  body: string
  mockupImage?: string
}

interface ProcessProps {
  steps: readonly ProcessStep[]
  className?: string
}

/**
 * Process — Four-step process section
 * Inspired by Sanjaya's process section layout
 */
export function Process({ steps, className = '' }: ProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Stagger animation for process cards
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
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
    <section ref={containerRef} className={`section bg-off-white ${className}`}>
      <SectionHeader
        eyebrow="How We Work"
        title="A Simple, Structured Approach"
        description="We design creative systems that remove friction and help your team ship faster."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <div
            key={step.step}
            ref={(el) => {
              if (el) cardsRef.current[i] = el
            }}
          >
            <ProcessCard
              number={String(i + 1).padStart(2, '0')}
              title={step.title}
              description={step.body}
              mockupImage={step.mockupImage}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
