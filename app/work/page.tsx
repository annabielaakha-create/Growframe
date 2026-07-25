import type { Metadata } from 'next'
import Aurora from '@/components/ui/Aurora'
import WorkGrid from '@/components/work/WorkGrid'
import ClosingCta from '@/components/sections/ClosingCta'
import Marquee from '@/components/ui/Marquee'
import { RevealWords } from '@/components/ui/Reveal'
import { clients, projects, services } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'AI influencers, talking-head video, product photography and videography, video editing and AI visual art — selected GrowFrame projects across skincare, fashion, technology, food and automotive.',
  alternates: { canonical: '/work' },
}

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-[clamp(9rem,18vh,13rem)]">
        <Aurora intensity={0.7} />
        <div className="shell relative">
          <p className="text-[11px] uppercase tracking-[0.24em] text-violet-300/70">
            Portfolio · {projects.length} projects
          </p>
          <h1 className="mt-6 max-w-[900px] text-display font-semibold">
            <span className="block text-chalk">
              <RevealWords text="Every frame" />
            </span>
            <span className="block text-gradient">
              <RevealWords text="earns its place." delay={0.16} />
            </span>
          </h1>
          <p className="mt-8 max-w-[560px] text-[16.5px] leading-[1.72] text-white/55">
            Featured projects first, then selected work across all six disciplines — skincare,
            fashion, technology, food and beverage, automotive and luxury. Every piece produced
            inside a monthly subscription.
          </p>

          <ul className="mt-10 flex flex-wrap gap-2">
            {services.map((s) => (
              <li
                key={s.slug}
                className="rounded-pill border border-white/10 bg-white/[0.04] px-4 py-2 text-[12.5px] text-white/55"
              >
                {s.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="shell">
          <WorkGrid />
        </div>
      </section>

      <div className="border-y border-white/[0.07] py-12">
        <Marquee items={clients} slow />
      </div>

      <ClosingCta />
    </>
  )
}
