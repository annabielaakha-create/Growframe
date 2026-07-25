'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

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
  return (
    <MotionTag
      className={className}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
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
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
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
