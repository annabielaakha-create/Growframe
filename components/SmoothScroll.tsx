'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Apple-grade inertial scrolling, wired into GSAP's ScrollTrigger
 * so pinned sections and scrubbed timelines stay perfectly in sync.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gsap.registerPlugin(ScrollTrigger)

    if (reduced) {
      ScrollTrigger.refresh()
      return
    }

    // Shorter duration = the page tracks the wheel more closely. 1.15s read as
    // "heavy"; 0.8 keeps the glide without the lag behind your input.
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Anchor links should ride the smooth scroller too.
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('a[href^="/#"], a[href^="#"]') as
        | HTMLAnchorElement
        | null
      if (!el) return
      const hash = el.getAttribute('href')?.split('#')[1]
      if (!hash) return
      const target = document.getElementById(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -90, duration: 1.4 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
