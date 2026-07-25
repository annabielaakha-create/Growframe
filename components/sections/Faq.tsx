'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RevealWords } from '@/components/ui/Reveal'
import { faqs } from '@/lib/data'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section">
      <div className="shell grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-violet-300/70">FAQ</p>
          {/*
            Not `text-display`: that clamp tops out at 10rem, sized for the
            full-width closing CTA. This heading lives in the ~476px left
            column, so it gets its own ceiling — same leading and tracking,
            small enough that "questions." never overruns the column.
          */}
          <h2 className="mt-7 text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
            <span className="block text-chalk">
              <RevealWords text="Good" />
            </span>
            <span className="block text-gradient">
              <RevealWords text="questions." delay={0.12} />
            </span>
          </h2>
          <p className="mt-8 max-w-[320px] text-[15px] leading-relaxed text-white/45">
            Still curious? Email us — a human replies, usually within the hour.
          </p>
        </div>

        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={`text-[16.5px] font-medium tracking-tight transition-colors duration-300 md:text-[18px] ${
                      isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'
                    }`}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 transition-all duration-500 ease-apple ${
                      isOpen ? 'rotate-45 bg-violet-500/25' : 'bg-white/[0.04]'
                    }`}
                  >
                    <span className="absolute h-px w-3 bg-white/70" />
                    <span className="absolute h-3 w-px bg-white/70" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[560px] pb-7 text-[15px] leading-[1.75] text-white/50">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
