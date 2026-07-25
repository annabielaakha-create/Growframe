'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Aurora from '@/components/ui/Aurora'
import Reveal, { RevealWords } from '@/components/ui/Reveal'
import MagneticButton from '@/components/ui/MagneticButton'
import GlassIcon from '@/components/ui/GlassIcon'
import { services } from '@/lib/data'

/**
 * Six-service showcase. Liquid-glass cards with a cursor-tracked
 * specular bloom, staggered on scroll.
 */
export default function Services() {
  return (
    <section id="services" className="section overflow-hidden">
      <Aurora intensity={0.55} />
      <div className="shell relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-[660px]">
            <p className="kicker text-[11px] uppercase tracking-[0.24em] text-violet-300/70">
              What we do
            </p>
            <h2 className="mt-6 text-headline font-semibold">
              <RevealWords text="Six disciplines." />{' '}
              <span className="text-gradient">
                <RevealWords text="One monthly rate." delay={0.18} />
              </span>
            </h2>
          </div>
          <Reveal delay={2}>
            <p className="max-w-[360px] text-[15px] leading-relaxed text-white/50">
              Mix and match them however the month demands — no scope negotiations, no change
              orders, no per-asset pricing.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>

        <Reveal delay={1}>
          <div className="glass glass-specular glass-hairline mt-6 flex flex-col items-center justify-between gap-6 rounded-glass px-8 py-8 text-center md:flex-row md:px-11 md:text-left">
            <GlassIcon name="cursor" size={64} className="hidden shrink-0 md:block" tilt={-8} />
            <div>
              <h3 className="text-[19px] font-semibold tracking-tight md:text-[21px]">
                Not sure which you need?
              </h3>
              <p className="mt-2 max-w-[520px] text-[14.5px] leading-relaxed text-white/50">
                Send the brief. We’ll tell you which mix of the six gets you there fastest — before
                you spend anything.
              </p>
            </div>
            <MagneticButton href="/contact">Get a recommendation</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, delay: (index % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="glass glass-specular glass-hairline group relative flex flex-col overflow-hidden rounded-glass p-8 transition-shadow duration-700 ease-apple hover:shadow-glass-hover md:p-9"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${pos.x}% ${pos.y}%, rgba(139,92,246,0.20), transparent 62%)`,
        }}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <span className="mt-1 text-[11px] tracking-[0.3em] text-violet-300/60">{service.n}</span>
          <GlassIcon
            name={service.icon}
            size={92}
            delay={index * 0.12}
            tilt={index % 2 === 0 ? -5 : 5}
            className="-mr-2 -mt-3 transition-transform duration-700 ease-apple group-hover:scale-110"
          />
        </div>

        <h3 className="mt-4 text-[22px] font-semibold leading-tight tracking-[-0.03em] md:text-[24px]">
          {service.title}
        </h3>
        <p className="mt-3 text-[14.5px] font-medium leading-snug text-violet-200/80">
          {service.tagline}
        </p>
        <p className="mt-4 text-[14.5px] leading-[1.7] text-white/50">{service.body}</p>

        <ul className="mt-7 flex flex-wrap gap-2">
          {service.points.map((p) => (
            <li
              key={p}
              className="rounded-pill border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12.5px] text-white/55"
            >
              {p}
            </li>
          ))}
        </ul>

        <p className="mt-auto pt-8 text-[11.5px] uppercase tracking-[0.16em] text-white/30">
          {service.industries}
        </p>
      </div>
    </motion.div>
  )
}
