'use client'

import { motion } from 'framer-motion'
import Reveal, { RevealWords } from '@/components/ui/Reveal'
import GlassIcon from '@/components/ui/GlassIcon'
import { process } from '@/lib/data'

export default function Process() {
  return (
    <section className="section">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-[560px] text-headline font-semibold">
            <RevealWords text="Four steps." />{' '}
            <span className="text-gradient">
              <RevealWords text="No meetings required." delay={0.15} />
            </span>
          </h2>
          <Reveal delay={2}>
            <div className="flex items-start gap-5">
              <GlassIcon name="rocket" size={84} className="hidden shrink-0 sm:block" tilt={8} />
              <p className="max-w-[340px] text-[15px] leading-relaxed text-white/50">
                The whole studio runs async. You brief, we build, you approve — usually before the
                next stand-up.
              </p>
            </div>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-glass border border-white/10 bg-white/[0.06] md:grid-cols-4">
          {process.map((p, i) => (
            <motion.li
              key={p.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-ink/75 p-8 backdrop-blur-xl transition-colors duration-500 hover:bg-violet-900/20 md:p-9"
            >
              <span className="text-[11px] uppercase tracking-[0.26em] text-violet-300/60">
                0{i + 1} · {p.step}
              </span>
              <h3 className="mt-6 text-[19px] font-semibold leading-snug tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3.5 text-[14px] leading-[1.7] text-white/45">{p.body}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-violet-400 to-transparent transition-all duration-[900ms] ease-apple group-hover:w-full" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
