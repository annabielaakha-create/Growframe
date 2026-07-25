'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { icons, type IconName } from '@/lib/data'

/**
 * 3D glass icon with genuine transparency (SVG luminance→alpha filter,
 * see components/ui/GlassAlphaFilter.tsx).
 *
 * Performance note: the icons used to float on an infinite keyframe loop. An
 * SVG filter re-runs whenever the element it's applied to is repainted, so
 * animating them forever meant re-filtering ten images every frame. The
 * entrance animation is kept — it runs once — and the idle float is gone.
 */
export default function GlassIcon({
  name,
  size = 88,
  className = '',
  delay = 0,
  tilt = 0,
  priority = false,
}: {
  name: IconName
  size?: number
  className?: string
  delay?: number
  /** degrees of resting rotation */
  tilt?: number
  priority?: boolean
}) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none relative inline-block select-none ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.86, rotate: tilt - 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: tilt }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={icons[name]}
        alt=""
        fill
        sizes={`${size}px`}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className="glass-icon-img object-contain"
      />
    </motion.span>
  )
}
