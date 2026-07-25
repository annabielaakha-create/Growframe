'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MediaCard from '@/components/ui/MediaCard'
import { categories, projects } from '@/lib/data'

export default function WorkGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>('All')

  // Featured projects stay pinned to the top of every view.
  const filtered = useMemo(() => {
    const list = active === 'All' ? projects : projects.filter((p) => p.category === active)
    return [...list].sort((a, b) => Number(b.best ?? false) - Number(a.best ?? false))
  }, [active])

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: projects.length }
    for (const p of projects) map[p.category] = (map[p.category] ?? 0) + 1
    return map
  }, [])

  return (
    <div>
      {/* Glass filter bar */}
      <div className="sticky top-[78px] z-40 flex justify-center md:top-[86px]">
        <div className="glass glass-specular glass-hairline hide-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-pill p-1.5">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`relative whitespace-nowrap rounded-pill px-4 py-2 text-[13px] transition-colors duration-300 md:text-[13.5px] ${
                active === c ? 'text-ink' : 'text-white/60 hover:text-white'
              }`}
            >
              {active === c && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-pill bg-white"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">
                {c}
                <span className={active === c ? 'text-ink/40' : 'text-white/25'}>
                  {' '}
                  {counts[c] ?? 0}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.65, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* every card shares one frame so the grid stays perfectly even */}
              <MediaCard project={p} priority={i < 3} className="aspect-[4/5] h-full w-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mt-12 text-center text-[13px] text-white/30">
        Showing {filtered.length} of {projects.length} projects
      </p>
    </div>
  )
}
