import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/lib/site'

const columns = [
  {
    title: 'Studio',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Portfolio', href: '/work' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/#services' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'AI Influencer Creation', href: '/#services' },
      { label: 'AI Talking Head Videos', href: '/#services' },
      { label: 'AI Product Photography', href: '/#services' },
      { label: 'AI Product Videography', href: '/#services' },
      { label: 'Video Editing', href: '/#services' },
      { label: 'AI Visual Art', href: '/#services' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[45%] left-1/2 h-[60vw] w-[90vw] -translate-x-1/2 rounded-full bg-violet-800/25 blur-[150px]"
      />

      <div className="shell relative">
        <div className="grid gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/logo/mark.png" alt="" width={34} height={34} className="h-8 w-auto" />
              <span className="leading-none">
                <span className="block text-[18px] font-semibold tracking-tight">GrowFrame</span>
                <span className="mt-1 block text-[9.5px] uppercase tracking-[0.24em] text-white/40">
                  Creative Studio
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-xs text-[14.5px] leading-relaxed text-white/45">
              A subscription creative studio turning raw footage and bold ideas into content engines
              for growing brands.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] uppercase tracking-[0.22em] text-white/35">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[14.5px] text-white/60 transition-colors duration-300 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-white/35">Contact</h3>
            <ul className="mt-5 space-y-3 text-[14.5px]">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="wrap-anywhere text-white/60 transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="relative select-none overflow-hidden pb-6">
          <span className="block bg-gradient-to-b from-white/[0.13] to-transparent bg-clip-text text-center text-[clamp(3.5rem,15.5vw,14rem)] font-semibold leading-[0.85] tracking-[-0.05em] text-transparent">
            GrowFrame
          </span>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] py-8 text-[12.5px] text-white/35 md:flex-row">
          <p>© {new Date().getFullYear()} GrowFrame Studio. All rights reserved.</p>
          <p className="tracking-[0.12em]">{site.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
