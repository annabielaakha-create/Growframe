import type { Metadata } from 'next'
import { site } from './site'

/**
 * Build per-page metadata.
 *
 * Next.js shallow-merges metadata: the moment a page defines `openGraph` or
 * `twitter`, the parent's version is REPLACED, not merged. So a page that sets
 * only `openGraph.title` silently drops the layout's `images`, `type` and
 * `siteName` — share previews lose their card image. This helper re-declares
 * the full object every time so that can't happen.
 *
 *   export const metadata = pageMeta({
 *     title: 'Portfolio',
 *     description: '…',
 *     path: '/work',
 *   })
 */
export function pageMeta({
  title,
  description,
  path,
  image = site.ogImage,
}: {
  /** Page title WITHOUT the brand suffix — the layout template appends it. */
  title: string
  description: string
  /** Root-relative, leading slash, no trailing slash. e.g. '/work' */
  path: string
  image?: string
}): Metadata {
  const fullTitle = `${title} — ${site.name}`
  const url = `${site.url}${path}`

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1600, height: 900, alt: `${site.name} showreel` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  }
}
