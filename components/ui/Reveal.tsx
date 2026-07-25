'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

const easeApple = [0.22, 1, 0.36, 1] as const

/**
 * Reveal animations used to ship their hidden state in the server HTML —
 * `opacity:0; transform:translateY(110%)` straight out of framer-motion's
 * `initial`. Anything that stopped the trigger from firing (no JS, a hydration
 * error, an observer that never reported) left the copy permanently invisible.
 * Headlines were vanishing site-wide because of it.
 *
 * The default is now inverted: text renders plain and visible, and the
 * animation is opted into only once the client has confirmed it can run it.
 *
 *   'static'  — plain visible markup. Server render, no JS, reduced motion, or
 *               already on screen at mount (nothing to reveal — it's been seen).
 *   'armed'   — below the fold, JS is alive: hide it and wait for the scroll.
 *   'shown'   — the observer fired, play the reveal.
 *
 * Worst case is now a missed animation, never missing words.
 */
type Mode = 'static' | 'armed' | 'shown'

function useReveal<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null)
  const [mode, setMode] = useState<Mode>('static')

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    // Already on screen when the page loads: leave it visible. Arming it here
    // would blink the text out and back in for no reason.
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) return

    setMode('armed')

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMode('shown')
          io.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [enabled])

  return [ref, mode] as const
}

const variants: Variants = {
  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.05, delay: i * 0.08, ease: easeApple },
  }),
}

const tags = {
  div: motion.div,
  span: motion.span,
  li: motion.li,
  section: motion.section,
} as const

export default function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: keyof typeof tags
}) {
  const reduce = useReducedMotion()
  const [ref, mode] = useReveal<HTMLDivElement>(!reduce)
  const Tag = as

  if (mode === 'static') {
    return (
      <Tag ref={ref as never} className={className}>
        {children}
      </Tag>
    )
  }

  const MotionTag = tags[as] as typeof motion.div
  return (
    <MotionTag
      ref={ref}
      className={className}
      custom={delay}
      variants={variants}
      initial="hidden"
      animate={mode === 'shown' ? 'show' : 'hidden'}
    >
      {children}
    </MotionTag>
  )
}

/** Word-by-word cinematic headline reveal. */
export function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const [ref, mode] = useReveal<HTMLSpanElement>(!reduce)

  if (mode === 'static') {
    return (
      <span ref={ref} className={className}>
        {text}
      </span>
    )
  }

  const words = text.split(' ')
  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={mode === 'shown' ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{ duration: 1, delay: delay + i * 0.055, ease: easeApple }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
