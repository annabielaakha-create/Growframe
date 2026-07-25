'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Marquee from '@/components/ui/Marquee'
import { RevealWords } from '@/components/ui/Reveal'
import { clients, testimonials } from '@/lib/data'

export default function Testimonials() {
  const half = Math.ceil(clients.length / 2)

  return (
    <section className="section overflow-hidden">
      <div className="shell">
        <p className="text-[11px] uppercase tracking-[0.24em] text-violet-300/70">Social proof</p>
        <h2 className="mt-6 max-w-[640px] text-headline font-semibold">
          <RevealWords text="Their words," />{' '}
          <span className="text-gradient">
            <RevealWords text="not ours." delay={0.15} />
          </span>
        </h2>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.person}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass glass-specular glass-hairline flex flex-col justify-between rounded-glass p-8 transition-shadow duration-700 hover:shadow-glass-hover md:p-9"
            >
              <div>
                <div className="flex gap-1 text-violet-300">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} />
                  ))}
                </div>
                <blockquote className="mt-6 text-[15.5px] leading-[1.75] text-white/70 pretty">
                  “{t.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-9 flex items-center gap-3.5 border-t border-white/[0.08] pt-6">
                <Image
                  src={t.avatar}
                  alt=""
                  width={42}
                  height={42}
                  className="h-10 w-10 rounded-full border border-white/15 object-cover"
                />
                <span className="leading-tight">
                  <span className="block text-[14px] font-medium">{t.person}</span>
                  <span className="block text-[12.5px] text-white/40">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <div className="mt-20 space-y-6">
        <Marquee items={clients.slice(0, half)} />
        <Marquee items={clients.slice(half)} reverse slow />
      </div>
    </section>
  )
}

function Star() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5l2.9 5.9 6.6.9-4.8 4.6 1.2 6.5L12 17.3 6.1 20.4l1.2-6.5L2.5 9.3l6.6-.9L12 2.5z" />
    </svg>
  )
}
