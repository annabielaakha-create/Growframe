export default function Marquee({
  items,
  reverse = false,
  slow = false,
}: {
  items: string[]
  reverse?: boolean
  slow?: boolean
}) {
  const row = [...items, ...items]
  return (
    <div className="mask-fade-x relative flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-14 pr-14 ${slow ? 'animate-marquee-slow' : 'animate-marquee'}`}
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap text-lg font-medium tracking-tight text-white/35 transition-colors duration-500 hover:text-white/80 md:text-xl"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
