'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Looping 9:16 story video in a brand glass frame, with a mute toggle.
 *
 * It has to start muted: every browser blocks autoplay with sound, and an
 * unmuted <video autoplay> is simply refused rather than played silently. So
 * the button is the only way to opt into audio, and it starts in the muted
 * state to match what the element actually does.
 */
export default function StoryVideo({
  src,
  poster,
  className = '',
}: {
  src: string
  poster?: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  // Keep the DOM property in sync with state. React sets the `muted` attribute,
  // not the property, and browsers only honour the property — set it by hand or
  // the toggle silently does nothing.
  useEffect(() => {
    if (ref.current) ref.current.muted = muted
  }, [muted])

  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-white/[0.03] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      {/* specular hairline, same treatment as the glass cards elsewhere */}
      <div className="pointer-events-none absolute inset-0 z-10 rounded-[28px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)]" />

      {/* violet wash so the footage sits inside the palette instead of fighting it */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-violet-500/10 via-transparent to-[#06040C]/55" />

      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="aspect-[9/16] w-full object-cover"
      />

      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        aria-pressed={!muted}
        className="absolute bottom-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/85 backdrop-blur-md transition-all duration-300 ease-apple hover:scale-105 hover:bg-black/65 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
      >
        {muted ? <IconMuted /> : <IconSound />}
      </button>
    </div>
  )
}

function IconMuted() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m16 9 5 6m0-6-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function IconSound() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
