# GrowFrame — Creative Studio

Apple-inspired luxury site for GrowFrame. Liquid-glass surfaces, cinematic video hero, GSAP scroll choreography, Framer Motion micro-interactions.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP + ScrollTrigger · Lenis smooth scroll

---

## Run it

```bash
cd growframe
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm start   # production
```

Deploy: push to GitHub → import on [Vercel](https://vercel.com/new). Zero config needed.

---

## Structure

```
app/
  layout.tsx        Fonts, SEO metadata, JSON-LD, nav + footer shell
  page.tsx          Homepage
  work/page.tsx     Filterable archive
  about/page.tsx    Studio + founder, AboutPage JSON-LD
  contact/page.tsx  Brief form + channels
  not-found.tsx     404
  sitemap.ts        Auto sitemap
  robots.ts         Auto robots.txt
components/
  Nav.tsx           Floating glass nav, scroll-reactive
  Footer.tsx        Sitemap columns + contact
  SmoothScroll.tsx  Lenis ↔ GSAP ScrollTrigger bridge
  sections/         Hero, Manifesto, Services, WorkCta, Process,
                    Testimonials, Pricing, Faq, ClosingCta
  ui/               Glass primitives: MagneticButton, Reveal, Aurora,
                    Marquee, MediaCard, Grain, GlassIcon, GlassAlphaFilter
  work/             WorkGrid — the filterable portfolio grid
  contact/          ContactForm, ProjectBrief
functions/
  api/brief.ts      Cloudflare Pages Function behind the brief form
lib/
  site.ts           Brand name, URL, email, socials  ← edit first
  data.ts           ALL copy: projects, plans, FAQ, testimonials, founder
  seo.ts            pageMeta() — per-page title/canonical/OG/Twitter
public/
  videos/           hero.mp4 (2.1 MB), hero-mobile.mp4, hero-poster.jpg
  logo/             mark.png (nav), mark-liquid.png (violet glass mark)
  work/             Self-hosted portfolio media
  _headers          Security + cache headers, applied by Cloudflare Pages
```

**To change any copy or project, edit `lib/data.ts` — no component edits needed.**

---

## The hero video

`FINAL.mp4` was 84 MB — far too heavy for a homepage. It ships compressed:

| File | Size | Used for |
|---|---|---|
| `hero.mp4` | 2.1 MB | Desktop (1600px wide, silent) |
| `hero-mobile.mp4` | 0.8 MB | ≤768px viewports |
| `hero-poster.jpg` | 80 KB | First paint + social preview |

To re-encode after editing your reel:

```bash
ffmpeg -i FINAL.mp4 -an -vf scale=1600:-2 -c:v libx264 -crf 30 -preset slow \
  -pix_fmt yuv420p -movflags +faststart public/videos/hero.mp4

ffmpeg -i FINAL.mp4 -an -vf scale=900:-2 -c:v libx264 -crf 32 -preset slow \
  -pix_fmt yuv420p -movflags +faststart public/videos/hero-mobile.mp4

ffmpeg -ss 21 -i FINAL.mp4 -frames:v 1 -vf scale=1600:-2 -q:v 4 \
  public/videos/hero-poster.jpg
```

The hero grade stack (dark scrim → violet duotone → edge falloff → vignette) keeps the type legible whether the underlying frame is white or black — so you can swap in any reel without redesigning.

---

## Design system

| Token | Value |
|---|---|
| Base | `#06040C` |
| Brand violet | `#7C3AED` → `#4C1D95` |
| Lavender | `#C4B5FD` |
| Glass | `white/4.5%` + `blur(28px)` + inset specular hairline |
| Radius | 28px cards · full pill buttons |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Type | Inter (SF Pro-adjacent), −0.045em tracking on display |

Utility classes live in `app/globals.css`: `.glass`, `.glass-specular`, `.glass-hairline`, `.text-gradient`, `.eyebrow`, `.shell`, `.section`.

---

## Performance & SEO

- Video: compressed, `preload="auto"` on hero only, `preload="none"` on the closing CTA
- Images: `next/image` with AVIF/WebP, remote patterns allow-listed in `next.config.mjs`
- Fonts: `next/font` self-hosts Inter — no render-blocking Google request
- Metadata, Open Graph, Twitter cards, JSON-LD, sitemap and robots all generated
- `prefers-reduced-motion` disables Lenis, GSAP pinning and all animation
- Immutable cache headers on `/videos/*`

---

## Portfolio media

31 projects, mostly placeholders generated with Artlist — Seedream 5.0 for images, Seedance 2.0 Mini for video — covering skincare, fashion, technology, food & beverage, automotive, luxury, wellness and music.

| Category | Count |
|---|---|
| AI Influencer | 8 |
| Talking Head | 4 |
| Product Photography | 7 |
| Product Video | 5 |
| Video Editing | 3 |
| Visual Art | 4 |

**Only the three Roxy Daytona pieces are self-hosted in `public/work/`. The other 28 still hotlink Artlist's CDN.** Two reasons to finish the job: images on a domain you don't own can't rank in Google Images for GrowFrame, and your main sales page depends on someone else's CDN staying up. Download each remaining `src` into `public/work/` and swap the value for `/work/filename.webp`.

To swap in real client work: drop files into `public/work/`, point each project's `src` at them, and set `format: 'Video' | 'Image'`.

## Deploying

Hosted on **Cloudflare Pages** (free, commercial use permitted). Full step-by-step in [`../DEPLOY.md`](../DEPLOY.md).

Three things that must be set in the Pages project or the build fails:

- Build command `npx @cloudflare/next-on-pages@1`, output directory `.vercel/output/static`
- Env var `NODE_VERSION=20`
- Compatibility flag `nodejs_compat` on Production **and** Preview

Test a real production build locally with `npm run pages:preview`.

## Project brief emails (setup required)

`/contact` is a Project Brief form. On submit it POSTs to `functions/api/brief.ts` — a Cloudflare Pages Function, since the Next app itself is a static export with no server — which sends you a formatted HTML email via [Resend](https://resend.com). Free tier covers 3,000 emails/month.

**To turn it on:**

1. Create a free Resend account
2. **API Keys → Create API Key**, copy it
3. `cp .env.example .env.local` and paste the key into `RESEND_API_KEY`
4. Restart `npm run dev`

That's it. Briefs arrive at `hello@growframestudio.bond` with the visitor's address as `reply-to`, so hitting reply goes straight to them.

**Sender address.** Until you verify your domain, Resend only allows `onboarding@resend.dev` as the from address — fine for testing. To send from your own domain, add `growframestudio.bond` under **Domains** in Resend, add the DNS records it gives you, then set `BRIEF_FROM_EMAIL=GrowFrame Briefs <briefs@growframestudio.bond>`.

**Subject lines** change with the selected package:

- `Growth — New Project Inquiry — John Doe`
- `New Project Inquiry — John Doe` (when "Not Sure Yet")

**Without a key configured**, nothing breaks: the form falls back to opening the visitor's mail app with every field pre-filled. A hidden honeypot field silently drops bot submissions.

To swap Resend for another provider, `functions/api/brief.ts` is the only file to touch — it's a plain `fetch` call, no SDK.

## Page structure

- **Home** — hero reel → manifesto → six services → portfolio CTA band → process → testimonials → pricing → FAQ → closing CTA
- **/work** — the portfolio, filterable by the six services
- **/about** — studio positioning and founder
- **/contact** — brief form

The portfolio no longer appears inline on the homepage; the CTA band teases six featured frames and sends people to `/work`.

## SEO

Every page's metadata comes from `pageMeta()` in `lib/seo.ts`:

```ts
export const metadata: Metadata = pageMeta({
  title: 'Portfolio',        // brand suffix is added for you
  description: '…',
  path: '/work',             // drives canonical + og:url
})
```

Use it for any new page. Next.js **shallow**-merges metadata, so a page that defines `openGraph` replaces the layout's version outright — set only `openGraph.title` by hand and you silently lose `images`, `type` and `siteName`, which strips the card image off every share. `pageMeta()` re-declares the whole object so that can't happen.

Registered at Google Search Console as a **Domain property**. That variant needs the sitemap submitted as a full URL (`https://growframestudio.bond/sitemap.xml`), not the bare `sitemap.xml` path a URL-prefix property accepts.

Cloudflare prepends its own managed block to `robots.txt`, so the served file is longer than `app/robots.ts`. It allows Googlebot and blocks AI training crawlers — Googlebot itself is unaffected.

The portfolio no longer appears inline on the homepage; the CTA band teases six featured frames and sends people to `/work`.
