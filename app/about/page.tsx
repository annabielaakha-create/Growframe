import type { Metadata } from 'next'
import Image from 'next/image'
import Aurora from '@/components/ui/Aurora'
import Reveal, { RevealWords } from '@/components/ui/Reveal'
import MagneticButton from '@/components/ui/MagneticButton'
import GlassIcon from '@/components/ui/GlassIcon'
import StoryVideo from '@/components/ui/StoryVideo'
import { founder, story, values } from '@/lib/data'
import { site } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'About',
  description:
    'GrowFrame is a subscription creative studio pairing AI production tools with human art direction — founded by Annabil Aska Pratama, AI Visual Artist and Creative Director.',
  path: '/about',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About GrowFrame',
  url: `${site.url}/about`,
  mainEntity: {
    '@type': 'Person',
    name: founder.name,
    jobTitle: founder.role,
    image: `${site.url}${founder.image}`,
    worksFor: { '@type': 'Organization', name: site.legalName },
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden pb-20 pt-[clamp(9rem,18vh,13rem)] md:pb-28">
        <Aurora intensity={0.75} />
        <div className="shell relative">
          <div className="flex items-center gap-5">
            <p className="text-[11px] uppercase tracking-[0.24em] text-violet-300/70">
              About the studio
            </p>
            <GlassIcon name="nib" size={64} tilt={-10} priority />
          </div>
          <h1 className="mt-6 max-w-[1000px] text-display font-semibold">
            <span className="block text-chalk">
              <RevealWords text="About" />
            </span>
            <span className="block text-gradient">
              <RevealWords text="GrowFrame." delay={0.15} />
            </span>
          </h1>

          <div className="mt-10 grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
            <Reveal delay={1}>
              <p className="max-w-[620px] text-[18px] leading-[1.65] text-white/70 md:text-[20px]">
                We’re a creative studio built for the pace brands actually move at. GrowFrame pairs
                AI production tools with human art direction to make premium visual content —
                ambassadors, product films, campaign stills and finished edits — without the
                timelines or the six-figure quotes.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <p className="max-w-[420px] text-[15.5px] leading-[1.75] text-white/45">
                Our mission is simple: put cinema-grade craft within reach of every growing brand,
                and make it repeatable. One subscription, one team, an endless supply of frames that
                earn attention.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Our Story ---------------- */}
      <section className="section overflow-hidden pt-0">
        <div className="shell">
          <div className="glass glass-specular glass-hairline relative overflow-hidden rounded-[36px] px-7 py-14 md:px-16 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(45% 55% at 92% 8%, rgba(109,40,217,0.3) 0%, rgba(109,40,217,0) 70%)',
              }}
            />
            <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <StoryVideo
                  src="/videos/story.mp4"
                  poster="/videos/story-poster.jpg"
                  className="max-w-[340px]"
                />
                <h2 className="mt-9 text-headline font-semibold">
                  <RevealWords text="Built for the" />{' '}
                  <span className="text-gradient">
                    <RevealWords text="new pace." delay={0.15} />
                  </span>
                </h2>
              </div>

              <div className="space-y-6">
                {story.map((para, i) => (
                  <Reveal key={i} delay={i}>
                    <p className="max-w-[620px] text-[16px] leading-[1.78] text-white/60">{para}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Values ---------------- */}
      <section className="section pt-0">
        <div className="shell">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-[620px] text-headline font-semibold">
              <RevealWords text="What we hold" />{' '}
              <span className="text-gradient">
                <RevealWords text="to." delay={0.15} />
              </span>
            </h2>
            <Reveal delay={2}>
              <p className="max-w-[340px] text-[15px] leading-relaxed text-white/50">
                Four principles that decide what we make, how fast we make it, and what we refuse to
                ship.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i}>
                <article className="glass glass-specular glass-hairline group relative h-full overflow-hidden rounded-glass p-8 transition-shadow duration-700 ease-apple hover:shadow-glass-hover md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="mt-1 text-[11px] tracking-[0.3em] text-violet-300/60">{v.n}</span>
                    <GlassIcon
                      name={(['gem', 'rocket', 'clapper', 'avatar'] as const)[i % 4]}
                      size={78}
                      delay={i * 0.1}
                      tilt={i % 2 ? 6 : -6}
                      className="-mr-1 -mt-2"
                    />
                  </div>
                  <h3 className="mt-7 text-title font-semibold">{v.title}</h3>
                  <p className="mt-4 max-w-[460px] text-[15px] leading-[1.7] text-white/50">
                    {v.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Founder ---------------- */}
      <section className="section overflow-hidden pt-0">
        <Aurora intensity={0.4} />
        <div className="shell relative">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* portrait */}
            <Reveal>
              <figure className="relative mx-auto w-full max-w-[440px]">
                {/* halo behind the disc */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6"
                  style={{
                    background:
                      'radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,0.34) 0%, rgba(124,58,237,0) 70%)',
                  }}
                />

                {/* glass ring, sized exactly to the circular artwork */}
                <div className="glass glass-specular glass-hairline relative aspect-square w-full rounded-full p-2.5 shadow-[0_60px_140px_-40px_rgba(76,29,149,0.75)]">
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src={founder.image}
                      alt={`${founder.name} — ${founder.role}`}
                      fill
                      sizes="(max-width: 1024px) 80vw, 440px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* soft specular arc across the top of the ring */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0) 45%)',
                    }}
                  />
                </div>

                <figcaption className="glass glass-specular glass-hairline relative z-10 mx-auto -mt-8 w-fit rounded-pill px-6 py-3.5 text-center">
                  <p className="text-[15px] font-semibold tracking-tight">{founder.name}</p>
                  <p className="mt-0.5 text-[12px] text-violet-200/70">{founder.role}</p>
                </figcaption>
              </figure>
            </Reveal>

            {/* bio */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-violet-300/70">
                Meet the founder
              </p>
              <h2 className="mt-6 text-headline font-semibold">
                <RevealWords text={founder.name.split(' ').slice(0, 2).join(' ')} />{' '}
                <span className="text-gradient">
                  <RevealWords text={founder.name.split(' ').slice(2).join(' ')} delay={0.15} />
                </span>
              </h2>

              <div className="mt-8 space-y-5">
                {founder.bio.map((para, i) => (
                  <Reveal key={i} delay={i}>
                    <p className="max-w-[600px] text-[16px] leading-[1.78] text-white/60">{para}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={2}>
                <ul className="mt-10 grid gap-px overflow-hidden rounded-glass border border-white/10 bg-white/[0.06] sm:grid-cols-3">
                  {founder.stats.map((s) => (
                    <li key={s.label} className="bg-ink/75 px-6 py-6 backdrop-blur-xl">
                      <span className="block text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-[-0.04em] text-gradient-soft">
                        {s.value}
                      </span>
                      <span className="mt-1.5 block text-[12.5px] leading-snug text-white/45">
                        {s.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={3}>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {founder.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-pill border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12.5px] text-white/55"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden pb-28 md:pb-36">
        <div className="shell">
          <div className="glass glass-specular glass-hairline relative overflow-hidden rounded-[36px] px-7 py-16 text-center md:px-16 md:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(55% 65% at 50% 50%, rgba(109,40,217,0.34) 0%, rgba(109,40,217,0) 72%)',
              }}
            />
            <div className="relative">
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300 animate-blink" />
                Now booking · 3 slots this month
              </span>

              <h2 className="mx-auto mt-8 max-w-[900px] text-headline font-semibold">
                <span className="block text-chalk">Let’s create something</span>
                <span className="block text-gradient">exceptional together.</span>
              </h2>

              <p className="mx-auto mt-8 max-w-[520px] text-[16px] leading-[1.72] text-white/55">
                Tell us what you’re building. We’ll come back with a plan, a timeline and a flat
                monthly number — usually within a business day.
              </p>

              <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href="/contact">Start a project</MagneticButton>
                <MagneticButton href="/work" variant="ghost">
                  View Our Work
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
