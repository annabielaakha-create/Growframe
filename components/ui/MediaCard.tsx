'use client'

import Image from 'next/image'
import { useRef } from 'react'
import type { Project } from '@/lib/data'

/**
 * Glass-framed media tile. Videos play on hover (desktop) and
 * autoplay muted inline on touch devices.
 */
export default function MediaCard({
  project,
  className = '',
  priority = false,
}: {
  project: Project
  className?: string
  priority?: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const onEnter = () => {
    const v = videoRef.current
    if (!v) return
    const p = v.play()
    if (p && typeof p.catch === 'function') p.catch(() => {})
  }
  const onLeave = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0
  }

  return (
    <article
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] ${className}`}
    >
      <div className="absolute inset-0">
        {project.format === 'Video' ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-apple group-hover:scale-[1.06]"
            src={project.src}
            poster={project.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={project.title}
          />
        ) : (
          <Image
            src={project.src}
            alt={`${project.title} — ${project.client}`}
            fill
            sizes="(max-width: 768px) 88vw, (max-width: 1280px) 45vw, 30vw"
            priority={priority}
            className="object-cover transition-transform duration-[1400ms] ease-apple group-hover:scale-[1.06]"
          />
        )}
      </div>

      {/* grade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-700/25 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      {/* chips */}
      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        {project.best && (
          <span className="flex items-center gap-1.5 rounded-pill bg-gradient-to-r from-violet-500 to-violet-700 px-3 py-1.5 text-[11px] font-medium tracking-wide text-white shadow-glow">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2.5l2.9 5.9 6.6.9-4.8 4.6 1.2 6.5L12 17.3 6.1 20.4l1.2-6.5L2.5 9.3l6.6-.9L12 2.5z" />
            </svg>
            Featured
          </span>
        )}
        <span className="glass rounded-pill px-3 py-1.5 text-[11px] tracking-wide text-white/80">
          {project.category}
        </span>
        {project.format === 'Video' && (
          <span className="glass flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-[11px] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 animate-blink" />
            Reel
          </span>
        )}
      </div>

      {/* meta */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <div className="translate-y-1 transition-transform duration-700 ease-apple group-hover:translate-y-0">
          <p className="text-[11px] uppercase tracking-[0.2em] text-violet-200/70">{project.meta}</p>
          <h3 className="mt-2 text-[19px] font-semibold tracking-tight">{project.title}</h3>
          <p className="mt-1 text-[13px] text-white/45">
            {project.client} · {project.industry}
          </p>
        </div>
      </div>
    </article>
  )
}
