'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, site } from '@/lib/site'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-3 z-[120] flex justify-center px-4 md:top-5"
      >
        <nav
          className={`glass glass-specular glass-hairline flex w-full max-w-[1180px] items-center justify-between rounded-pill py-2.5 pl-4 pr-2.5 transition-all duration-700 ease-apple md:pl-6 ${
            scrolled ? 'bg-white/[0.07] backdrop-blur-glass' : 'bg-white/[0.03]'
          }`}
          aria-label="Primary"
        >
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Image
              src="/logo/mark.png"
              alt=""
              width={30}
              height={30}
              className="h-[26px] w-auto md:h-[30px]"
              priority
            />
            <span className="leading-none">
              <span className="block text-[17px] font-semibold tracking-tight">GrowFrame</span>
              <span className="mt-0.5 hidden text-[9.5px] uppercase tracking-[0.24em] text-white/40 sm:block">
                Creative Studio
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-[14px] text-white/65 transition-colors duration-300 hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-violet-300 to-transparent transition-all duration-500 ease-apple group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="group hidden items-center gap-2.5 rounded-pill bg-white py-1.5 pl-5 pr-1.5 text-[14px] font-medium text-ink transition-transform duration-500 ease-apple hover:-translate-y-0.5 sm:inline-flex"
            >
              Start your plan
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-700 text-white transition-transform duration-500 ease-apple group-hover:translate-x-0.5">
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
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-4 bg-white transition-all duration-500 ease-apple ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-4 bg-white transition-all duration-500 ease-apple ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[110] bg-ink/85 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              {[...nav, { label: 'Contact', href: '/contact' }].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-5 text-[clamp(2rem,9vw,3rem)] font-medium tracking-tight text-white/90"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href={`mailto:${site.email}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 text-sm text-white/45"
              >
                {site.email}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
