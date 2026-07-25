import Aurora from '@/components/ui/Aurora'
import MagneticButton from '@/components/ui/MagneticButton'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden">
      <Aurora intensity={0.8} />
      <div className="shell relative text-center">
        <p className="text-[11px] uppercase tracking-[0.24em] text-violet-300/70">404</p>
        <h1 className="mt-6 text-display font-semibold">
          <span className="block text-chalk">This frame</span>
          <span className="block text-gradient">didn’t make the cut.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-[420px] text-[16px] leading-relaxed text-white/50">
          The page you’re after has moved or never existed. The work, however, is right here.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <MagneticButton href="/">Back home</MagneticButton>
          <MagneticButton href="/work" variant="ghost">
            See the work
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
