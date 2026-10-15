'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeader } from './SectionHeader'

gsap.registerPlugin(ScrollTrigger)

export interface FAQ {
  q: string
  a: string
}

interface FAQProps {
  faqs: FAQ[]
  className?: string
}

/**
 * FAQ — Frequently asked questions accordion
 */
export function FAQ({ faqs, className = '' }: FAQProps) {
  const [openId, setOpenId] = useState<number | null>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const answersRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Animate items on scroll
    itemsRef.current.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'top 65%',
            scrub: false,
          },
          delay: i * 0.08,
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Animate answer height on toggle
  useEffect(() => {
    answersRef.current.forEach((answer, i) => {
      if (answer) {
        const isOpen = openId === i
        gsap.to(answer, {
          height: isOpen ? answer.scrollHeight : 0,
          opacity: isOpen ? 1 : 0,
          duration: 0.3,
          ease: 'power2.inOut',
        })
      }
    })
  }, [openId])

  return (
    <section ref={containerRef} className={`section bg-off-white ${className}`}>
      <SectionHeader
        eyebrow="FAQs"
        title="Good Questions"
        description="Can't find what you're looking for? Email us — a human replies within the hour."
      />

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) itemsRef.current[i] = el
            }}
            className="card p-6 cursor-pointer"
            onClick={() => setOpenId(openId === i ? null : i)}
          >
            {/* Question */}
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-text-primary pr-4">
                {faq.q}
              </h3>
              <div
                className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                  openId === i ? 'rotate-180' : ''
                }`}
              >
                <svg
                  className="w-5 h-5 text-violet"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>

            {/* Answer */}
            <div
              ref={(el) => {
                if (el) answersRef.current[i] = el
              }}
              className="overflow-hidden"
              style={{ height: 0 }}
            >
              <p className="text-text-secondary pt-4 leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
