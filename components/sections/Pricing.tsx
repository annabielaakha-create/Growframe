'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { SectionHeader } from '../ui/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

export interface Plan {
  name: string
  blurb: string
  price: string
  cadence: string
  features: string[]
  cta: string
  featured?: boolean
}

interface PricingProps {
  plans: Plan[]
  className?: string
}

/**
 * Pricing — Pricing cards with monthly/yearly toggle (Sanjaya style)
 */
export function Pricing({ plans, className = '' }: PricingProps) {
  const [isYearly, setIsYearly] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Stagger animation for pricing cards
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
    <section ref={containerRef} className={`section bg-off-white ${className}`} id="pricing">
      <SectionHeader
        eyebrow="Pricing"
        title="Flexible Plans For Your Needs"
        description="No hourly billing, no change orders, no surprise invoices. Pause or cancel anytime."
      />

      {/* Toggle Switch */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={`text-sm font-semibold ${!isYearly ? 'text-text-primary' : 'text-text-secondary'}`}>
          Monthly
        </span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className="relative w-14 h-7 bg-border rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2"
          aria-label="Toggle yearly pricing"
        >
          <div
            className={`absolute top-1 left-1 w-5 h-5 bg-violet rounded-full transition-transform duration-300 ${
              isYearly ? 'translate-x-7' : 'translate-x-0'
            }`}
          />
        </button>
        <span className={`text-sm font-semibold ${isYearly ? 'text-text-primary' : 'text-text-secondary'}`}>
          Yearly
          <span className="ml-1 text-violet">-20%</span>
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            ref={(el) => {
              if (el) cardsRef.current[i] = el
            }}
            className="relative"
          >
            <Card
              variant={plan.featured ? 'elevated' : 'default'}
              hover
              className="h-full flex flex-col p-8"
            >
              {/* Featured Badge */}
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="solid" color="violet">Most Popular</Badge>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-text-primary mb-3">
                {plan.name}
              </h3>

              {/* Blurb */}
              <p className="text-sm text-text-secondary mb-6">
                {plan.blurb}
              </p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-black">
                    {plan.price}
                  </span>
                  <span className="text-text-secondary">
                    {plan.cadence}
                  </span>
                </div>
                {isYearly && (
                  <p className="text-sm text-violet mt-1">
                    Save 20% with yearly billing
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <Button
                variant={plan.featured ? 'primary' : 'secondary'}
                className="w-full mb-6"
                href="/contact"
              >
                {plan.cta}
              </Button>

              {/* Features List */}
              <ul className="space-y-3 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-violet font-semibold mt-0.5">✓</span>
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>

      {/* Bottom Note */}
      <div className="text-center mt-8">
        <p className="text-sm text-text-secondary">
          All plans include unlimited revisions, full commercial rights, and source files on request.
        </p>
      </div>
    </section>
  )
}
