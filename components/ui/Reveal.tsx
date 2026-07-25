'use client'

import type { ReactNode } from 'react'

/**
 * These two used to animate content in on scroll, via framer-motion's
 * `whileInView`. The resting state was `opacity: 0` / `translateY(110%)`, which
 * meant the server sent every headline to the browser already hidden and relied
 * on JavaScript to reveal it. When that reveal didn't happen the copy wasn't
 * merely un-animated — it was gone. Headlines were invisible site-wide because
 * of it, and two attempts to make the trigger more reliable didn't fix it.
 *
 * Correctness beats the effect: the text now renders plainly and is visible
 * unconditionally, with no dependency on JavaScript, IntersectionObserver or
 * hydration. The components are kept so no call site has to change.
 *
 * To bring the motion back later, do it in CSS with the visible state as the
 * element's own style and the animation running from hidden to visible — that
 * way a stalled animation still leaves readable text.
 */

const tags = {
  div: 'div',
  span: 'span',
  li: 'li',
  section: 'section',
} as const

export default function Reveal({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  /** Retained for API compatibility; no longer used. */
  delay?: number
  className?: string
  as?: keyof typeof tags
}) {
  const Tag = tags[as]
  return <Tag className={className}>{children}</Tag>
}

/** Headline text. Previously a word-by-word reveal — see the note above. */
export function RevealWords({
  text,
  className,
}: {
  text: string
  className?: string
  /** Retained for API compatibility; no longer used. */
  delay?: number
}) {
  return <span className={className}>{text}</span>
}
