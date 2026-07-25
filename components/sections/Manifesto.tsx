'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stats } from '@/lib/data'

const COPY =
  'Most agencies sell you hours. We sell you momentum — a studio on subscription that turns one idea into a month of cinema, and a month of cinema into growth you can measure.'

/**
 * GSAP scrub: words illuminate as the section is read.
 */
export default function Manifesto() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.mf-word')
      gsap.set(words, { opacity: 0.13 })
      gsap.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.35,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 72%',
          end: 'bottom 62%',
          scrub: 0.6,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="studio" ref={root} className="section">
      <div className="shell">
        <p className="text-[11px] uppercase tracking-[0.24em] text-violet-300/70">The Studio</p>
        <p className="mt-8 max-w-[1000px] text-[clamp(1.65rem,4.1vw,3.4rem)] font-medium leading-[1.22] tracking-[-0.03em] balance">
          {COPY.split(' ').map((w, i) => (
            <span key={`${w}-${i}`} className="mf-word inline-block">
              {w}&nbsp;
            </span>
          ))}
        </p>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-glass border border-white/10 bg-white/[0.06] md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative bg-ink/70 px-6 py-9 backdrop-blur-xl transition-colors duration-500 hover:bg-violet-900/25 md:px-8 md:py-11"
            >
              <span className="block text-[clamp(1.9rem,3.6vw,3rem)] font-semibold tracking-[-0.04em] text-gradient-soft">
                {s.value}
              </span>
              <span className="mt-2 block text-[13px] leading-snug text-white/45">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
