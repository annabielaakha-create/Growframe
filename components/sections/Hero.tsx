'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '../ui/Button'

interface HeroProps {
  title: string
  subtitle: string
  cta?: {
    text: string
    href: string
  }
  videoSrc?: string
  videoPoster?: string
}

/**
 * Hero — Hero section with video background
 * Light theme version
 */
export function Hero({
  title,
  subtitle,
  cta,
  videoSrc,
  videoPoster,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initial animation
    const tl = gsap.timeline()

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      0
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.2
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.4
      )
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Video Background */}
      {videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={videoPoster}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Overlay Scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/60 to-white/80" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-black mb-6 leading-tight"
        >
          {title}
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl text-text-secondary mb-10 leading-relaxed"
        >
          {subtitle}
        </p>

        {cta && (
          <div ref={ctaRef}>
            <Button href={cta.href} size="lg" variant="primary">
              {cta.text}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
