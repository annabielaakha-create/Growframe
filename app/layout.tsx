import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { site } from '@/lib/site'
import SmoothScroll from '@/components/SmoothScroll'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    'creative agency',
    'subscription video editing',
    'brand film',
    'short-form video',
    'AI motion design',
    'video production studio',
    'GrowFrame',
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: site.ogImage, width: 1600, height: 900, alt: `${site.name} showreel` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [site.ogImage],
  },
  icons: {
    icon: [{ url: '/logo/mark.png', type: 'image/png' }],
    apple: '/logo/mark.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWorkSeries',
  name: site.name,
  url: site.url,
  description: site.description,
  brand: { '@type': 'Brand', name: site.name, logo: `${site.url}/logo/mark.png` },
  provider: {
    '@type': 'Organization',
    name: site.legalName,
    email: site.email,
    url: site.url,
    sameAs: [site.instagram, site.linkedin],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[200] focus:rounded-full focus:bg-violet focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Nav
          links={[
            { label: 'Portfolio', href: '/work' },
            { label: 'Services', href: '/#services' },
            { label: 'About', href: '/about' },
            { label: 'Pricing', href: '/#pricing' },
          ]}
          ctaHref="/contact"
          ctaText="Start Your Project"
        />
        <main id="main">{children}</main>
        <Footer
          links={[
            { label: 'Portfolio', href: '/work' },
            { label: 'Services', href: '/#services' },
            { label: 'About', href: '/about' },
            { label: 'Pricing', href: '/#pricing' },
          ]}
          email={site.email}
          socials={{
            instagram: site.instagram,
            whatsapp: site.whatsapp,
            linkedin: site.linkedin,
          }}
        />
      </body>
    </html>
  )
}
