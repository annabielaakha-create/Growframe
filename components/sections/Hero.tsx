'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import Aurora from '@/components/ui/Aurora'
import GlassIcon from '@/components/ui/GlassIcon'

const easeApple = [0.22, 1, 0.36, 1] as const

/**
 * Text-first hero: headline → description → CTAs → featured showreel.
 * The reel sits in its own liquid-glass frame rather than behind the type.
 */
export default function Hero() {
  const wrap = useRef<HTMLElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)

  /* ---------- scroll choreography ---------- */
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ['start start', 'end start'],
  })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15])

  const { scrollYProgress: frameProgress } = useScroll({
    target: frame,
    offset: ['start end', 'end start'],
  })
  // Drift only. Scaling a container that holds a playing video forces the
  // compositor to resample every frame — the single most expensive thing on
  // the page. A small vertical drift gives the same sense of depth for free.
  const frameY = useTransform(frameProgress, [0, 1], ['3%', '-3%'])

  /* ---------- playback ---------- */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    v.muted = true
    setMuted(true)

    // Pick the lighter encode on small screens. Done in JS because browsers
    // are inconsistent about honouring `media` on <source> inside <video>.
    if (window.matchMedia('(max-width: 768px)').matches) {
      v.src = '/videos/hero-mobile.mp4'
      v.load()
    }

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onVolume = () => setMuted(v.muted)
    const onTime = () => {
      if (v.duration) setProgress((v.currentTime / v.duration) * 100)
    }

    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    v.addEventListener('volumechange', onVolume)
    v.addEventListener('timeupdate', onTime)

    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))

    // Pause while off-screen or in a background tab; resume when back.
    let autoPaused = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !v.paused) {
          autoPaused = true
          v.pause()
        } else if (entry.isIntersecting && autoPaused) {
          autoPaused = false
          v.play().catch(() => {})
        }
      },
      { threshold: 0.2 },
    )
    io.observe(v)

    const onVisibility = () => {
      if (document.hidden && !v.paused) {
        autoPaused = true
        v.pause()
      } else if (!document.hidden && autoPaused) {
        autoPaused = false
        v.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('volumechange', onVolume)
      v.removeEventListener('timeupdate', onTime)
      document.removeEventListener('visibilitychange', onVisibility)
      io.disconnect()
    }
  }, [])

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused || v.ended) v.play().catch(() => setPlaying(false))
    else v.pause()
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    const next = !v.muted
    v.muted = next
    if (!next) v.volume = 0.6
    setMuted(next)
  }, [])

  return (
    <section ref={wrap} className="relative overflow-hidden" aria-label="Introducing GrowFrame">
      <Aurora intensity={0.75} />
      {/* keeps the top of the page anchored in black behind the floating nav */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink to-transparent"
      />

      {/* ---------------- Hero copy ---------------- */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative pb-14 pt-[clamp(8.5rem,17vh,12rem)] md:pb-20"
      >
        <div className="shell">
          <div className="grid items-center gap-10 lg:grid-cols-[1.32fr_0.68fr] lg:gap-12">
            {/* left — type */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.35, ease: easeApple }}
                className="eyebrow"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300 animate-blink" />
                Subscription Creative Studio
              </motion.span>

              {/* logo lockup sits with the headline */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1, delay: 0.45, ease: easeApple }}
                className="mt-7 flex items-center gap-4"
              >
                <span className="glass glass-specular glass-hairline flex h-[62px] w-[62px] items-center justify-center rounded-[20px] md:h-[74px] md:w-[74px] md:rounded-[24px]">
                  <Image
                    src="/logo/mark.png"
                    alt="GrowFrame"
                    width={44}
                    height={44}
                    priority
                    className="h-8 w-auto md:h-10"
                  />
                </span>
                <span className="leading-none">
                  <span className="block text-[22px] font-semibold tracking-[-0.03em] md:text-[26px]">
                    GrowFrame
                  </span>
                  <span className="mt-1.5 block text-[10px] uppercase tracking-[0.28em] text-white/40">
                    Creative Studio
                  </span>
                </span>
              </motion.div>

              <h1 className="mt-7 max-w-[900px] text-display font-semibold">
                {['We grow brands', 'one frame at a time.'].map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className={`block ${i === 1 ? 'text-gradient' : 'text-chalk'}`}
                      initial={{ y: '108%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1.35, delay: 0.55 + i * 0.11, ease: easeApple }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.95, ease: easeApple }}
                className="mt-8 max-w-[560px] text-[16.5px] leading-[1.72] text-white/60 md:text-[17.5px]"
              >
                Cinematic craft, AI-accelerated. Unlimited requests, 48-hour turnaround, one flat
                monthly rate — content that stops thumbs and compounds long after you post.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 1.1, ease: easeApple }}
                className="mt-11 flex flex-wrap items-center gap-4"
              >
                <MagneticButton href="/contact">Start your subscription</MagneticButton>
                <MagneticButton href="/work" variant="ghost">
                  View Our Work
                </MagneticButton>
              </motion.div>
            </div>

            {/* right — floating glass cluster */}
            <div className="relative hidden h-[420px] lg:block" aria-hidden>
              <div className="absolute right-[6%] top-[4%]">
                <GlassIcon name="camera" size={190} delay={0.2} tilt={-8} priority />
              </div>
              <div className="absolute left-[2%] top-[36%]">
                <GlassIcon name="gem" size={120} delay={0.9} tilt={10} />
              </div>
              <div className="absolute bottom-[4%] right-[22%]">
                <GlassIcon name="clapper" size={150} delay={0.55} tilt={6} />
              </div>
              <div className="absolute right-[-4%] top-[52%]">
                <GlassIcon name="cursor" size={92} delay={1.3} tilt={-12} />
              </div>
            </div>
          </div>

          {/* mobile icon row — sized to fit a 320px viewport without wrapping */}
          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-3 xs:gap-5 lg:hidden"
            aria-hidden
          >
            <GlassIcon name="camera" size={60} delay={0.2} tilt={-8} />
            <GlassIcon name="clapper" size={60} delay={0.5} tilt={5} />
            <GlassIcon name="gem" size={50} delay={0.8} tilt={10} />
            <GlassIcon name="cursor" size={46} delay={1.1} tilt={-12} />
          </div>
        </div>
      </motion.div>

      {/* ---------------- Featured showreel ---------------- */}
      <motion.div
        ref={frame}
        style={{ y: frameY }}
        className="relative pb-24 md:pb-32"
      >
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 1.15, ease: easeApple }}
            className="group relative"
          >
            {/* glow bed — gradient, not a blurred box: this sits inside a
                parallax transform, so a 90px blur would re-rasterise on scroll */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -bottom-10 top-10"
              style={{
                background:
                  'radial-gradient(55% 50% at 50% 60%, rgba(109,40,217,0.38) 0%, rgba(109,40,217,0) 72%)',
              }}
            />

            <figure className="glass glass-specular glass-hairline relative overflow-hidden rounded-[28px] p-2 shadow-[0_40px_90px_-32px_rgba(76,29,149,0.7)] md:rounded-[40px] md:p-3">
              <div className="relative aspect-video w-full overflow-hidden rounded-[22px] bg-ink md:rounded-[32px]">
                <video
                  ref={videoRef}
                  src="/videos/hero.mp4"
                  className={`h-full w-full cursor-pointer object-cover transition-[filter,transform] duration-[1400ms] ease-apple ${
                    ready ? 'scale-100 blur-0' : 'scale-[1.03] blur-[6px]'
                  }`}
                  poster="/videos/hero-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onLoadedData={() => setReady(true)}
                  onCanPlay={() => setReady(true)}
                  onClick={togglePlay}
                />

                {/* readability + cohesion grade (light, since type isn't on top) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(120% 90% at 50% 45%, transparent 45%, rgba(6,4,12,0.45) 100%)',
                  }}
                />

                {/* ---------- controls ---------- */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 md:p-6">
                  <div className="glass glass-specular glass-hairline pointer-events-auto flex items-center gap-1 rounded-pill p-1.5">
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={playing ? 'Pause showreel' : 'Play showreel'}
                      aria-pressed={playing}
                      className="flex h-11 w-11 items-center justify-center rounded-full text-white/90 transition-all duration-500 ease-apple hover:bg-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 md:h-10 md:w-10"
                    >
                      {playing ? <IconPause /> : <IconPlay />}
                    </button>

                    <span aria-hidden className="h-5 w-px bg-white/15" />

                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={muted ? 'Unmute showreel' : 'Mute showreel'}
                      aria-pressed={!muted}
                      className="flex h-11 w-11 items-center justify-center rounded-full text-white/90 transition-all duration-500 ease-apple hover:bg-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 md:h-10 md:w-10"
                    >
                      {muted ? <IconMuted /> : <IconSound />}
                    </button>
                  </div>

                  <span className="glass glass-specular pointer-events-auto hidden items-center gap-2.5 rounded-pill px-4 py-2.5 text-[10.5px] uppercase tracking-[0.24em] text-white/60 sm:flex">
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-violet-300 ${
                        playing ? 'animate-blink' : 'opacity-40'
                      }`}
                    />
                    Showreel 2026
                  </span>
                </div>

                {/* progress hairline */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-white/10"
                >
                  <div
                    className="h-full bg-gradient-to-r from-violet-300 to-violet-500 transition-[width] duration-200 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </figure>

            <figcaption className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12.5px] text-white/35">
              <span>GrowFrame Showreel</span>
              <span aria-hidden>·</span>
              <span>Selected work, 2026</span>
            </figcaption>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

/* ---------------- icons ---------------- */

function IconPlay() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13a.6.6 0 0 0 .92.5l10-6.5a.6.6 0 0 0 0-1l-10-6.5a.6.6 0 0 0-.92.5Z" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="7" y="5" width="3.6" height="14" rx="1.2" />
      <rect x="13.4" y="5" width="3.6" height="14" rx="1.2" />
    </svg>
  )
}

function IconMuted() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
