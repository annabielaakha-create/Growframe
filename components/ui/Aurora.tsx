/**
 * Soft gradient wash behind sections.
 *
 * Previously this was three 70vw divs with `filter: blur(130px)` on an infinite
 * keyframe animation. A blur that large forces the browser to re-rasterise a
 * huge surface every single frame — it was the main cause of scroll jank.
 *
 * Radial gradients paint once and cost nothing. Visually near-identical.
 */
export default function Aurora({
  className = '',
  intensity = 1,
}: {
  className?: string
  intensity?: number
}) {
  const a = (n: number) => Math.min(0.5, n * intensity)

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: [
          `radial-gradient(60% 45% at 50% -5%, rgba(76,29,149,${a(0.42)}) 0%, rgba(76,29,149,0) 70%)`,
          `radial-gradient(45% 40% at 0% 85%, rgba(124,58,237,${a(0.3)}) 0%, rgba(124,58,237,0) 70%)`,
          `radial-gradient(40% 38% at 100% 30%, rgba(109,40,217,${a(0.28)}) 0%, rgba(109,40,217,0) 70%)`,
        ].join(','),
      }}
    />
  )
}
