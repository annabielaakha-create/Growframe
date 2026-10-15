'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

interface NavLink {
  label: string
  href: string
}

interface NavProps {
  links: NavLink[]
  logo?: React.ReactNode
  ctaHref?: string
  ctaText?: string
}

/**
 * Nav — Navigation bar (light theme)
 */
export function Nav({ links, logo, ctaHref, ctaText }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)

      if (navRef.current) {
        gsap.to(navRef.current, {
          borderBottomColor: scrolled ? '#e8e8e8' : 'rgba(232, 232, 232, 0)',
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-transparent transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {logo || <span className="font-bold text-xl">GrowFrame</span>}
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        {ctaHref && ctaText && (
          <Link
            href={ctaHref}
            className="px-6 py-2 rounded-full bg-violet text-white font-semibold text-sm hover:bg-violet-dark transition-colors duration-200"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </nav>
  )
}
