import type { Metadata } from 'next'
import Aurora from '@/components/ui/Aurora'
import ProjectBrief from '@/components/contact/ProjectBrief'
import Reveal, { RevealWords } from '@/components/ui/Reveal'
import GlassIcon from '@/components/ui/GlassIcon'
import { site } from '@/lib/site'
import { process } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Start Your Project',
  description:
    'Tell GrowFrame about your project. Complete the brief and we’ll come back within 24–48 hours with a plan, a timeline and a flat monthly number.',
  alternates: { canonical: '/contact' },
}

const channels = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'WhatsApp', value: 'Message the studio', href: site.whatsapp },
  { label: 'Instagram', value: '@growframe.studio', href: site.instagram },
]

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pb-28 pt-[clamp(9rem,18vh,13rem)]">
      <Aurora intensity={0.8} />

      {/* ---------------- intro ---------------- */}
      <div className="shell relative text-center">
        <GlassIcon name="key" size={116} className="mx-auto mb-8" tilt={-4} priority />
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-300 animate-blink" />
          Now booking · 3 slots this month
        </span>

        <h1 className="mx-auto mt-8 max-w-[1000px] text-display font-semibold">
          <span className="block text-chalk">
            <RevealWords text="Let’s build something" />
          </span>
          <span className="block text-gradient">
            <RevealWords text="exceptional together." delay={0.16} />
          </span>
        </h1>

        <Reveal delay={1}>
          <p className="mx-auto mt-8 max-w-[620px] text-[16.5px] leading-[1.72] text-white/60 md:text-[17.5px]">
            We’d love to learn more about your project. Complete the brief below and we’ll get back
            to you within 24–48 hours with the next steps.
          </p>
        </Reveal>
      </div>

      {/* ---------------- brief + rail ---------------- */}
      <div className="shell relative mt-16 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
        <ProjectBrief />

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <div className="glass glass-specular glass-hairline rounded-glass p-7">
              <h2 className="text-[15px] font-semibold tracking-tight">What happens next</h2>
              <ol className="mt-6 space-y-5">
                {process.map((p, i) => (
                  <li key={p.step} className="flex gap-3.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 text-[11px] text-violet-200">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-[14px] font-medium">{p.title}</span>
                      <span className="mt-1 block text-[13px] leading-relaxed text-white/45">
                        {p.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="glass glass-specular glass-hairline rounded-glass p-7">
              <h2 className="text-[15px] font-semibold tracking-tight">Rather talk directly?</h2>
              <ul className="mt-5 space-y-3.5">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-3 text-[14px] text-white/70 transition-colors hover:text-white"
                    >
                      <span className="min-w-0">
                        <span className="block text-[11px] uppercase tracking-[0.18em] text-white/30">
                          {c.label}
                        </span>
                        <span className="wrap-anywhere mt-0.5 block">{c.value}</span>
                      </span>
                      <span className="text-white/30 transition-transform duration-500 ease-apple group-hover:translate-x-1 group-hover:text-white">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="glass glass-specular glass-hairline rounded-glass p-7">
              <p className="text-[14.5px] leading-relaxed text-white/55">
                “They turn a plain white wall into a cinematic scene. Every edit comes back better
                than the brief.”
              </p>
              <p className="mt-4 text-[12.5px] text-white/35">Rafi Kurniawan · CEO, Atelier Nova</p>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  )
}
