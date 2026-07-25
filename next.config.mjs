/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static build -> `out/`. Every page here is static, so there's no
  // server to host: Cloudflare Pages serves the files from its edge network.
  // The brief form is handled by functions/api/brief.ts (a Pages Function),
  // which keeps us off the deprecated next-on-pages adapter entirely.
  output: 'export',
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
