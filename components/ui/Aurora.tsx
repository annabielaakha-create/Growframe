/**
 * Soft drifting gradient mesh used behind sections.
 * Pure CSS — no canvas, no JS cost.
 */
export default function Aurora({
  className = '',
  intensity = 1,
}: {
  className?: string
  intensity?: number
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute -top-1/3 left-1/2 h-[70vw] w-[70vw] -translate-x-1/2 rounded-full blur-[130px] animate-drift"
        style={{ background: '#4C1D95', opacity: 0.35 * intensity }}
      />
      <div
        className="absolute bottom-[-20%] left-[-15%] h-[52vw] w-[52vw] rounded-full blur-[130px] animate-drift"
        style={{ background: '#7C3AED', opacity: 0.22 * intensity, animationDelay: '-8s' }}
      />
      <div
        className="absolute right-[-18%] top-[25%] h-[46vw] w-[46vw] rounded-full blur-[140px] animate-drift"
        style={{ background: '#6D28D9', opacity: 0.2 * intensity, animationDelay: '-16s' }}
      />
    </div>
  )
}
