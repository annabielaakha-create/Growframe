'use client'

import Link from 'next/link'
import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type Props = {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ghost'
  className?: string
  strength?: number
}

/**
 * Cursor-magnetic CTA with a glass arrow capsule.
 * Falls back to a normal button on touch devices.
 */
export default function MagneticButton({
  href,
  children,
  variant = 'solid',
  className = '',
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 190, damping: 16, mass: 0.35 })
  const y = useSpring(my, { stiffness: 190, damping: 16, mass: 0.35 })
  const glowX = useTransform(x, (v) => v * 1.6)
  const glowY = useTransform(y, (v) => v * 1.6)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * strength)
    my.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  const base =
    'group relative inline-flex items-center gap-3 rounded-pill text-[15px] font-medium will-change-transform'
  const styles =
    variant === 'solid'
      ? 'bg-white py-2 pl-6 pr-2 text-ink shadow-glow'
      : 'glass glass-specular py-3 pl-6 pr-5 text-chalk hover:bg-white/10'

  return (
    <motion.span style={{ x: glowX, y: glowY }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={`${base} ${styles} ${className} transition-colors duration-500 ease-apple`}
      >
        <span className="relative z-10 whitespace-nowrap">{children}</span>
        {variant === 'solid' ? (
          <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-700 text-white transition-transform duration-500 ease-apple group-hover:translate-x-1">
            <Arrow />
          </span>
        ) : (
          <span className="relative z-10 transition-transform duration-500 ease-apple group-hover:translate-x-1">
            <Arrow />
          </span>
        )}
      </Link>
    </motion.span>
  )
}

function Arrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
