'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import GlassIcon from '@/components/ui/GlassIcon'
import { site } from '@/lib/site'

export default function ClosingCta() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['12%', '-12%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.06])

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-40">
      {/* Still frame, not a second video. A looping 2.6MB decode behind a panel
          that's 82% covered by a scrim cost far more than it showed. */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src="/videos/hero-poster.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/[0.82]" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      <div className="absolute inset-0 bg-gradient-to-br from-violet-800/40 to-transparent" />

      <motion.div style={{ y }} className="shell relative text-center">
        <GlassIcon name="key" size={110} className="mx-auto mb-8" tilt={-4} />
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-300 animate-blink" />
          Now booking · 3 slots this month
        </span>

        <h2 className="mx-auto mt-8 max-w-[900px] text-display font-semibold">
          <span className="block text-chalk">Ready when</span>
          <span className="block text-gradient">your brief is.</span>
        </h2>

        <p className="mx-auto mt-8 max-w-[500px] text-[16px] leading-[1.72] text-white/55">
          Book a 20-minute intro call. We’ll scope your first month of content before you spend a
          dollar.
        </p>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="/contact">Start your project</MagneticButton>
          <MagneticButton href="/work" variant="ghost">
            View Our Work
          </MagneticButton>
        </div>

        <p className="mt-8 text-[13px] text-white/35">
          Prefer email?{' '}
          <a
            href={`mailto:${site.email}`}
            className="wrap-anywhere text-violet-200 underline underline-offset-4 transition-colors hover:text-white"
          >
            {site.email}
          </a>
        </p>
      </motion.div>
    </section>
  )
}
