'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { briefChannels, briefPackages, briefServices, briefTimelines } from '@/lib/data'
import { site } from '@/lib/site'

const easeApple = [0.22, 1, 0.36, 1] as const

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ProjectBrief() {
  const [services, setServices] = useState<string[]>([])
  const [pkg, setPkg] = useState<string>('Not Sure Yet')
  const [timeline, setTimeline] = useState<string>('Flexible')
  const [channel, setChannel] = useState<string>('Email')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const toggleService = (s: string) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))

  /** Opens a pre-filled mail draft if the API isn't configured or fails. */
  const mailtoFallback = (payload: Record<string, unknown>) => {
    const subject =
      pkg && pkg !== 'Not Sure Yet'
        ? `${pkg} — New Project Inquiry — ${payload.name}`
        : `New Project Inquiry — ${payload.name}`
    const lines = [
      `Full name: ${payload.name}`,
      `Company: ${payload.company || '—'}`,
      `Work email: ${payload.email}`,
      `Phone: ${payload.phone || '—'}`,
      `Services: ${services.join(', ') || '—'}`,
      `Package: ${pkg}`,
      `Timeline: ${timeline}`,
      `Prefers: ${channel}`,
      '',
      'THE PROJECT',
      String(payload.message ?? ''),
    ].join('\n')
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines)}`
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      name: String(form.get('name') || '').trim(),
      company: String(form.get('company') || '').trim(),
      email: String(form.get('email') || '').trim(),
      phone: String(form.get('phone') || '').trim(),
      message: String(form.get('message') || '').trim(),
      website: String(form.get('website') || ''), // honeypot
      services,
      pkg,
      timeline,
      channel,
    }

    setStatus('sending')
    setError('')

    try {
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok && data.ok) {
        setStatus('sent')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      if (data.fallback) {
        mailtoFallback(payload)
        setStatus('sent')
        return
      }
      setError(data.error || 'Something went wrong. Please try again.')
      setStatus('error')
    } catch {
      mailtoFallback(payload)
      setStatus('sent')
    }
  }

  /* ---------------- success ---------------- */
  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: easeApple }}
        className="glass glass-specular glass-hairline relative overflow-hidden rounded-glass px-8 py-16 text-center md:px-14 md:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 55% at 50% 0%, rgba(124,58,237,0.32) 0%, rgba(124,58,237,0) 70%)',
          }}
        />
        <div className="relative">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeApple }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-700 shadow-glow"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="m5 12.5 4.5 4.5L19 7.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>

          <h2 className="mt-8 text-[clamp(1.9rem,4vw,3rem)] font-semibold tracking-[-0.035em]">
            <span className="text-chalk">Thank you.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[480px] text-[16.5px] leading-[1.72] text-white/60">
            We’ve received your project brief and will contact you within 24–48 hours.
          </p>
          <p className="mx-auto mt-8 text-[13px] text-white/35">
            Something urgent? Message us on{' '}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="text-violet-200 underline underline-offset-4 transition-colors hover:text-white"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
      </motion.div>
    )
  }

  /* ---------------- form ---------------- */
  const field =
    'w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[15px] text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-violet-400/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-violet-500/20'

  const chip = (on: boolean) =>
    `min-h-[44px] rounded-pill border px-4 py-2.5 text-[13.5px] transition-all duration-300 ease-apple ${
      on
        ? 'border-violet-400/50 bg-violet-500/20 text-white shadow-[0_0_30px_-10px_rgba(124,58,237,0.8)]'
        : 'border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20 hover:text-white'
    }`

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.15, ease: easeApple }}
      className="glass glass-specular glass-hairline rounded-glass p-5 xs:p-7 md:p-12"
      noValidate
    >
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <Section n="01" title="About you">
        <div className="grid gap-4 sm:grid-cols-2">
          <Labelled htmlFor="name" label="Full name" required>
            <input id="name" name="name" required placeholder="Jane Doe" className={field} />
          </Labelled>
          <Labelled htmlFor="company" label="Company name">
            <input id="company" name="company" placeholder="Northline" className={field} />
          </Labelled>
          <Labelled htmlFor="email" label="Work email" required>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="jane@company.com"
              className={field}
            />
          </Labelled>
          <Labelled htmlFor="phone" label="Phone number" hint="optional">
            <input id="phone" name="phone" placeholder="+62 812 3456 7890" className={field} />
          </Labelled>
        </div>
      </Section>

      <Section n="02" title="Which services are you interested in?" hint="Select as many as apply">
        <div className="flex flex-wrap gap-2">
          {briefServices.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleService(s)}
              aria-pressed={services.includes(s)}
              className={chip(services.includes(s))}
            >
              {s}
            </button>
          ))}
        </div>
      </Section>

      <Section n="03" title="Do you have a package in mind?">
        <div className="flex flex-wrap gap-2">
          {briefPackages.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPkg(p)}
              aria-pressed={pkg === p}
              className={chip(pkg === p)}
            >
              {p}
            </button>
          ))}
        </div>
      </Section>

      <Section n="04" title="Timeline">
        <div className="flex flex-wrap gap-2">
          {briefTimelines.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTimeline(t)}
              aria-pressed={timeline === t}
              className={chip(timeline === t)}
            >
              {t}
            </button>
          ))}
        </div>
      </Section>

      <Section n="05" title="Tell us about your project" required>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="What are you launching, who is it for, and what does success look like? Links to references are welcome."
          className={`${field} resize-none`}
        />
      </Section>

      <Section n="06" title="Preferred communication" last>
        <div className="flex flex-wrap gap-2">
          {briefChannels.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setChannel(c)}
              aria-pressed={channel === c}
              className={chip(channel === c)}
            >
              {c}
            </button>
          ))}
        </div>
      </Section>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 rounded-2xl border border-red-400/25 bg-red-500/10 px-5 py-4 text-[14px] text-red-200"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group mt-10 flex w-full items-center justify-center gap-3 rounded-pill bg-white py-[1.05rem] text-[15px] font-medium text-ink transition-all duration-500 ease-apple hover:-translate-y-0.5 hover:shadow-glow disabled:cursor-wait disabled:opacity-70 xs:text-[15.5px]"
      >
        {status === 'sending' ? 'Sending…' : 'Send Project Brief'}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-700 text-white transition-transform duration-500 ease-apple group-hover:translate-x-1">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <p className="mt-5 text-center text-[12.5px] text-white/30">
        We reply within 24–48 hours. No decks, no sales calls unless you want one.
      </p>
    </motion.form>
  )
}

/* ---------------- layout helpers ---------------- */

function Section({
  n,
  title,
  hint,
  required,
  last,
  children,
}: {
  n: string
  title: string
  hint?: string
  required?: boolean
  last?: boolean
  children: React.ReactNode
}) {
  return (
    <fieldset className={last ? '' : 'mb-10 border-b border-white/[0.07] pb-10'}>
      <legend className="mb-5 flex flex-wrap items-baseline gap-3">
        <span className="text-[11px] tracking-[0.3em] text-violet-300/60">{n}</span>
        <span className="text-[16px] font-medium tracking-tight text-white/90">
          {title}
          {required && <span className="ml-1 text-violet-300/70">*</span>}
        </span>
        {hint && <span className="text-[12.5px] text-white/30">{hint}</span>}
      </legend>
      {children}
    </fieldset>
  )
}

function Labelled({
  htmlFor,
  label,
  hint,
  required,
  children,
}: {
  htmlFor: string
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline gap-2 text-[12.5px] text-white/45">
        {label}
        {required && <span className="text-violet-300/70">*</span>}
        {hint && <span className="text-white/25">({hint})</span>}
      </label>
      {children}
    </div>
  )
}
