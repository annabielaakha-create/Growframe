'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Reveal animations hide their content until an intersection callback fires.
 * That makes the resting state invisible — if the callback never runs (reduced
 * motion, a stalled observer, a restored scroll position), the copy is simply
 * gone from the page. Both components below therefore bail out to plain,
 * visible markup whenever the animation isn't going to run, and trigger on the
 * first pixel of intersection rather than a negative margin that can leave a
 * heading permanently below the threshold.
 */

const easeApple = [0.22, 1, 0.36, 1] as const

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
  const MotionTag = tags[as] as typeof motion.div
  const reduce = useReducedMotion()

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
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
  const words = text.split(' ')
  const reduce = useReducedMotion()

  if (reduce) return <span className={className}>{text}</span>

  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: delay + i * 0.055, ease: easeApple }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
