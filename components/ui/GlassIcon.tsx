'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { icons, type IconName } from '@/lib/data'

/**
 * 3D glass icon. Rendered on pure black, so `mix-blend-mode: screen`
 * removes the background and lets it float over any dark surface.
 */
export default function GlassIcon({
  name,
  size = 88,
  className = '',
  float = true,
  delay = 0,
  tilt = 0,
  priority = false,
}: {
  name: IconName
  size?: number
  className?: string
  /** gentle idle drift */
  float?: boolean
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
      initial={{ opacity: 0, scale: 0.82, rotate: tilt - 6 }}
      whileInView={{ opacity: 1, scale: 1, rotate: tilt }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="block h-full w-full"
        animate={
          float
            ? { y: [0, -9, 0], rotate: [tilt, tilt + 3, tilt] }
            : undefined
        }
        transition={
          float
            ? { duration: 7 + (delay % 3), repeat: Infinity, ease: 'easeInOut', delay }
            : undefined
        }
      >
        <Image
          src={icons[name]}
          alt=""
          fill
          sizes={`${size}px`}
          priority={priority}
          className="glass-icon-img object-contain"
        />
      </motion.span>
    </motion.span>
  )
}
