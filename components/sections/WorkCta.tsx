'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import { RevealWords } from '@/components/ui/Reveal'
import GlassIcon from '@/components/ui/GlassIcon'
import { projects } from '@/lib/data'

/**
 * Replaces the on-homepage gallery: a single glass band that teases
 * a few frames and sends people to the dedicated portfolio page.
 */
export default function WorkCta() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const driftUp = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const driftDown = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const peek = projects.filter((p) => p.featured && p.format === 'Image').slice(0, 6)

  return (
    <section ref={ref} id="work" className="section overflow-hidden">
      <div className="shell">
        <div className="glass glass-specular glass-hairline relative overflow-hidden rounded-[28px] px-5 py-12 xs:px-7 xs:py-14 md:rounded-[36px] md:px-14 md:py-20">
          {/* ambient bloom */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-1/4 top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 rounded-full bg-violet-700/25 blur-[130px]"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* copy */}
            <div>
              <div className="flex items-center gap-5">
                <span className="eyebrow">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-300 animate-blink" />
                  The portfolio
                </span>
                <GlassIcon name="cursor" size={62} tilt={-10} />
              </div>

              <h2 className="mt-7 text-headline font-semibold">
                <RevealWords text="Work that stops thumbs," />{' '}
                <span className="text-gradient">
                  <RevealWords text="frame after frame." delay={0.18} />
                </span>
              </h2>

              <p className="mt-7 max-w-[480px] text-[16px] leading-[1.72] text-white/55">
                AI ambassadors, product films, campaign stills and graded brand work — across
                skincare, fashion, technology, food and automotive. The full archive lives on its own
                page.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <MagneticButton href="/work">View Our Work</MagneticButton>
                <span className="text-[13px] text-white/35">
                  {projects.length} projects · 6 disciplines
                </span>
              </div>
            </div>

            {/* peek stack */}
            <div className="relative grid grid-cols-2 gap-3 xs:grid-cols-3 md:gap-4">
              {[peek.slice(0, 2), peek.slice(2, 4), peek.slice(4, 6)].map((col, ci) => (
                <motion.div
                  key={ci}
                  style={{ y: ci % 2 === 0 ? driftUp : driftDown }}
                  className={`flex flex-col gap-3 md:gap-4 ${
                    // third column only once there's room for it
                    ci === 2 ? 'hidden xs:flex' : ''
                  }`}
                >
                  {col.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{
                        duration: 0.9,
                        delay: ci * 0.08 + i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`relative aspect-[2/3] overflow-hidden rounded-[18px] border border-white/10 ${
                        // one frame per column on phones so they aren't postage stamps
                        i === 1 ? 'hidden xs:block' : ''
                      }`}
                    >
                      <Image
                        src={p.src}
                        alt={`${p.title} — ${p.client}`}
                        fill
                        sizes="(max-width: 1024px) 30vw, 15vw"
                        className="object-cover"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
