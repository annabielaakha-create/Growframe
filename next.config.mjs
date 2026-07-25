/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Cloudflare Pages has no Vercel image-optimisation service. Our assets are
    // already sized and compressed (WebP locally, imgix at w=720 remotely), so
    // serving them as-is costs nothing in quality. Remove this line if you ever
    // move to Vercel and want on-the-fly optimisation back.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'ai-toolkit-generations.imgix.net' },
      { protocol: 'https', hostname: 'cms-toolkit-artifacts.artlist.io' },
      { protocol: 'https', hostname: 'cms-toolkit-public-artifacts.artlist.io' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
  },
  // Security + cache headers live in public/_headers, which Cloudflare Pages
  // applies natively. next.config headers() is ignored by next-on-pages, so
  // keeping them in one place avoids them silently doing nothing.
}

export default nextConfig
