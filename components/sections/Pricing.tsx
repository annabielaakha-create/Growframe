'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Aurora from '@/components/ui/Aurora'
import Reveal, { RevealWords } from '@/components/ui/Reveal'
import GlassIcon from '@/components/ui/GlassIcon'
import { plans } from '@/lib/data'

export default function Pricing() {
  return (
    <section id="pricing" className="section overflow-hidden">
      <Aurora intensity={0.45} />
      <div className="shell relative">
        <div className="mx-auto max-w-[680px] text-center">
          <GlassIcon name="gem" size={104} className="mx-auto mb-6" tilt={-6} />
          <p className="text-[11px] uppercase tracking-[0.24em] text-violet-300/70">Membership</p>
          <h2 className="mt-6 text-headline font-semibold">
            <RevealWords text="One rate." />{' '}
            <span className="text-gradient">
              <RevealWords text="Endless frames." delay={0.15} />
            </span>
          </h2>
          <Reveal delay={2}>
            <p className="mx-auto mt-6 max-w-[500px] text-[15.5px] leading-relaxed text-white/50">
              No hourly billing, no change orders, no surprise invoices. Pause or cancel from your
              dashboard whenever you like.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-[560px] items-stretch gap-5 lg:max-w-none lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`glass glass-specular glass-hairline relative flex flex-col rounded-glass p-8 md:p-10 ${
                p.featured ? 'lg:-my-4 lg:shadow-glass-hover' : ''
              }`}
            >
              {p.featured && (
                <>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-glass bg-gradient-to-b from-violet-600/20 to-transparent"
                  />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-gradient-to-r from-violet-500 to-violet-700 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white shadow-glow">
                    Most chosen
                  </span>
                </>
              )}

              <div className="relative">
                <h3 className="text-[17px] font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-2 min-h-[42px] text-[13.5px] leading-relaxed text-white/45">
                  {p.blurb}
                </p>
                <p className="mt-7 flex items-baseline gap-1.5">
                  <span className="text-[clamp(2.2rem,4vw,3rem)] font-semibold tracking-[-0.04em] text-gradient-soft">
                    {p.price}
                  </span>
                  <span className="text-[13.5px] text-white/35">{p.cadence}</span>
                </p>

                <ul className="mt-8 space-y-3.5 border-t border-white/[0.08] pt-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[14px] text-white/60">
                      <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-200">
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <path
                            d="M2 6.2 4.6 8.8 10 3.4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className={`relative mt-10 flex items-center justify-center rounded-pill px-6 py-3.5 text-[14.5px] font-medium transition-all duration-500 ease-apple ${
                  p.featured
                    ? 'bg-white text-ink hover:-translate-y-0.5 hover:shadow-glow'
                    : 'border border-white/12 bg-white/[0.05] text-white hover:bg-white/[0.12]'
                }`}
              >
                {p.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-[13px] text-white/35">
          All plans include unlimited revisions, full commercial rights and source files on request.
        </p>
      </div>
    </section>
  )
}
