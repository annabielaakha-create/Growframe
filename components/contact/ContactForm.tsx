'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '@/lib/site'

const budgets = ['Under $3k / mo', '$3k – $5k / mo', '$5k – $10k / mo', 'Let’s discuss']
const needs = ['Brand Film', 'Short-Form', 'AI Motion', 'Full retainer']

export default function ContactForm() {
  const [budget, setBudget] = useState(budgets[1])
  const [need, setNeed] = useState<string[]>([needs[1]])
  const [sent, setSent] = useState(false)

  const toggleNeed = (n: string) =>
    setNeed((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]))

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const body = [
      `Name: ${form.get('name')}`,
      `Company: ${form.get('company')}`,
      `Email: ${form.get('email')}`,
      `Budget: ${budget}`,
      `Looking for: ${need.join(', ') || '—'}`,
      '',
      `${form.get('brief')}`,
    ].join('\n')

    // No backend required — opens the visitor's mail client, pre-filled.
    // Swap this for a fetch() to your form endpoint (Formspree, Resend, etc.).
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `New brief — ${form.get('company') || form.get('name')}`,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const field =
    'w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[15px] text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-violet-400/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-violet-500/20'

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="glass glass-specular glass-hairline rounded-glass p-7 md:p-10"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-[12.5px] text-white/45">
            Your name
          </label>
          <input id="name" name="name" required placeholder="Jane Doe" className={field} />
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block text-[12.5px] text-white/45">
            Company
          </label>
          <input id="company" name="company" placeholder="Northline" className={field} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="email" className="mb-2 block text-[12.5px] text-white/45">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="jane@company.com"
          className={field}
        />
      </div>

      <fieldset className="mt-8">
        <legend className="mb-3 text-[12.5px] text-white/45">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {needs.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => toggleNeed(n)}
              className={`rounded-pill border px-4 py-2 text-[13.5px] transition-all duration-300 ${
                need.includes(n)
                  ? 'border-violet-400/50 bg-violet-500/20 text-white'
                  : 'border-white/10 bg-white/[0.03] text-white/50 hover:text-white'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="mb-3 text-[12.5px] text-white/45">Monthly budget</legend>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBudget(b)}
              className={`rounded-pill border px-4 py-2 text-[13.5px] transition-all duration-300 ${
                budget === b
                  ? 'border-violet-400/50 bg-violet-500/20 text-white'
                  : 'border-white/10 bg-white/[0.03] text-white/50 hover:text-white'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-8">
        <label htmlFor="brief" className="mb-2 block text-[12.5px] text-white/45">
          The brief
        </label>
        <textarea
          id="brief"
          name="brief"
          rows={5}
          required
          placeholder="What are you launching, who is it for, and what does success look like?"
          className={`${field} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="group mt-8 flex w-full items-center justify-center gap-3 rounded-pill bg-white py-4 text-[15px] font-medium text-ink transition-all duration-500 ease-apple hover:-translate-y-0.5 hover:shadow-glow"
      >
        {sent ? 'Opening your mail app…' : 'Send the brief'}
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

      <p className="mt-4 text-center text-[12px] text-white/30">
        We reply within one business day. No decks, no sales calls unless you want one.
      </p>
    </motion.form>
  )
}
