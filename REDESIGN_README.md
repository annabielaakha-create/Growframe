# GrowFrame Light Editorial Theme — Component Library

Complete redesign dari dark luxury glass theme ke light clean editorial style, inspired by Sanjaya.

## 🎨 Design System

### Colors
```
Base:           #FFFFFF (white)
Surface:        #F8F8F8 (off-white)
Border:         #E8E8E8
Text Primary:   #1A1A1A
Text Secondary: #666666
Violet:         #7C3AED (brand)
Black:          #000000 (accents)
```

### Typography
- Font: Inter
- Display: 3.5rem → 2.5rem → 1.75rem
- Letter Spacing: -0.045em
- Line Height: 1.2 (headings), 1.6 (body)

### Spacing & Layout
- Border Radius: 8px (sm), 12px (md), 16px (lg)
- Section Padding: 6rem (desktop), 3rem (mobile)
- Card Padding: 2rem (default), 1.5rem (compact)

---

## 📦 Components

### Core UI Components

#### `Card.tsx`
Clean white card dengan border dan shadow.
```tsx
<Card variant="default" hover>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```
**Variants:** `default` | `bordered` | `elevated`

#### `Button.tsx`
Primary button component.
```tsx
<Button variant="primary" size="md" href="/contact">
  Get Started
</Button>
```
**Variants:** `primary` | `secondary` | `ghost`  
**Sizes:** `sm` | `md` | `lg`

#### `Badge.tsx`
Small label/tag.
```tsx
<Badge variant="solid" color="violet">Most Popular</Badge>
```
**Variants:** `solid` | `outline`  
**Colors:** `violet` | `black`

#### `SectionHeader.tsx`
Consistent section header.
```tsx
<SectionHeader
  eyebrow="About Us"
  title="Our Story"
  description="Building the future of creative production."
  align="center"
/>
```

---

### Data Display Components

#### `StatBox.tsx`
Big number display for stats.
```tsx
<StatBox value="150+" label="Projects Shipped" />
```

#### `ServiceCard.tsx`
Numbered service card (`/01`, `/02` format).
```tsx
<ServiceCard
  number="01"
  title="AI Influencer Creation"
  description="Build photoreal brand ambassadors..."
  points={['Identity lock', 'Always-on content', 'Campaign consistency']}
/>
```

#### `CaseStudyCard.tsx`
Portfolio case study with metrics.
```tsx
<CaseStudyCard
  title="AURA Campaign"
  category="AI Influencer"
  industry="Skincare"
  year="2025"
  image="/work/aura.jpg"
  metrics={[
    { label: 'Time Saved', value: '40%' },
    { label: 'Engagement', value: '2.5x' }
  ]}
/>
```

#### `ProcessCard.tsx`
Process step with optional mockup.
```tsx
<ProcessCard
  number="01"
  title="Understand Your Workflow"
  description="We analyze your current processes..."
  mockupImage="/mockups/step1.jpg"
/>
```

---

### Section Components

#### `Hero.tsx`
Hero section with video background.
```tsx
<Hero
  title="One Subscription. Endless Frames."
  subtitle="Cinematic craft, AI-accelerated."
  videoSrc="/videos/hero.mp4"
  videoPoster="/videos/hero-poster.jpg"
  cta={{ text: 'Start Your Project', href: '/contact' }}
/>
```

#### `Services.tsx`
Numbered services grid (Sanjaya style).
```tsx
<Services services={servicesData} />
```

#### `Process.tsx`
4-step process section.
```tsx
<Process steps={processSteps} />
```

#### `Stats.tsx`
Big number stats section.
```tsx
<Stats 
  stats={[
    { value: '150+', label: 'Projects' },
    { value: '48hrs', label: 'Turnaround' }
  ]}
  title="By The Numbers"
/>
```

#### `Testimonials.tsx`
Client testimonials grid.
```tsx
<Testimonials testimonials={testimonialsData} />
```

#### `Pricing.tsx`
Pricing cards with Monthly/Yearly toggle.
```tsx
<Pricing plans={pricingPlans} />
```

#### `FAQ.tsx`
Accordion FAQ section.
```tsx
<FAQ faqs={faqData} />
```

#### `CTA.tsx`
Call-to-action closing section.
```tsx
<CTA
  title="Ready to Transform Your Workflow?"
  description="Let's build something great together."
  primaryCta={{ text: 'Get Started', href: '/contact' }}
  secondaryCta={{ text: 'View Portfolio', href: '/work' }}
/>
```

---

### Layout Components

#### `Nav.tsx`
Navigation bar with scroll effect.
```tsx
<Nav
  links={[
    { label: 'Portfolio', href: '/work' },
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/about' },
    { label: 'Pricing', href: '/#pricing' }
  ]}
  ctaHref="/contact"
  ctaText="Start Your Project"
/>
```

#### `Footer.tsx`
Footer with navigation, contact, and socials.
```tsx
<Footer
  links={navLinks}
  email="hello@growframestudio.bond"
  socials={{
    instagram: 'https://instagram.com/growframe.studio',
    linkedin: 'https://linkedin.com/company/growframe',
    whatsapp: 'https://wa.me/6282220459249'
  }}
/>
```

---

## 🚀 Implementation Guide

### 1. Update `globals.css`
Replace dengan file `globals.css` dari redesign.

### 2. Update `tailwind.config.ts`
Replace dengan config baru untuk light theme.

### 3. Install Components
Copy semua component files ke `components/` folder:
```
components/
├── ui/
│   ├── Card.tsx
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── StatBox.tsx
│   ├── ServiceCard.tsx
│   ├── CaseStudyCard.tsx
│   ├── ProcessCard.tsx
│   └── SectionHeader.tsx
├── sections/
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Process.tsx
│   ├── Stats.tsx
│   ├── Testimonials.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   └── CTA.tsx
├── Nav.tsx
└── Footer.tsx
```

### 4. Update Homepage
```tsx
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { Stats } from '@/components/sections/Stats'
import { Testimonials } from '@/components/sections/Testimonials'
import { Pricing } from '@/components/sections/Pricing'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'

import { services, process, stats, testimonials, plans, faqs } from '@/lib/data'

export default function Home() {
  return (
    <>
      <Hero
        title="We grow brands one frame at a time."
        subtitle="Cinematic craft, AI-accelerated. Unlimited requests, 48-hour turnaround, one flat monthly rate."
        videoSrc="/videos/hero.mp4"
        videoPoster="/videos/hero-poster.jpg"
        cta={{ text: 'Start Your Project', href: '/contact' }}
      />
      <Services services={services} />
      <Stats stats={stats} />
      <Process steps={process} />
      <Testimonials testimonials={testimonials} />
      <Pricing plans={plans} />
      <FAQ faqs={faqs} />
      <CTA
        title="Ready when your brief is."
        description="Book a 20-minute intro call. We'll scope your first month of content before you spend a dollar."
        primaryCta={{ text: 'Get Started', href: '/contact' }}
      />
    </>
  )
}
```

---

## 🎯 Key Differences from Dark Theme

| Aspect | Dark Theme | Light Theme |
|--------|------------|-------------|
| **Base** | `#06040C` (near-black) | `#FFFFFF` (white) |
| **Cards** | Glassmorphism + blur | Solid white + border |
| **Text** | White/Lavender | Black/Gray |
| **Accents** | Violet gradient | Violet + Black |
| **Services** | Icon grid | Numbered cards `/01` |
| **Process** | Vertical steps | Side-by-side cards |
| **Stats** | Not present | Big number display |
| **Pricing** | 3 columns | 3 columns + toggle |

---

## 📝 Assets Needed

### Video
- `hero.mp4` (1600px desktop, light-themed cinematic)
- `hero-mobile.mp4` (900px mobile)
- `hero-poster.jpg` (poster frame)

### Mockups (optional for Process section)
- `mockup-step1.jpg` — Workflow analysis UI
- `mockup-step2.jpg` — Build system interface
- `mockup-step3.jpg` — Optimization dashboard

### Icons (optional)
- Solid icons untuk services (currently using Artlist CDN)

---

## ✅ Migration Checklist

- [ ] Update `globals.css`
- [ ] Update `tailwind.config.ts`
- [ ] Install all component files
- [ ] Update `app/layout.tsx` (Nav + Footer)
- [ ] Update `app/page.tsx` (Homepage)
- [ ] Update `app/work/page.tsx` (Portfolio)
- [ ] Update `app/about/page.tsx` (About)
- [ ] Update `app/contact/page.tsx` (Contact)
- [ ] Generate hero video (light theme)
- [ ] Optional: Generate process mockups
- [ ] Test responsive design
- [ ] Test animations
- [ ] Deploy to Cloudflare Pages

---

**Created:** 2026-10-15  
**Theme:** Light Editorial (Sanjaya-inspired)  
**Framework:** Next.js 14 + Tailwind + GSAP + Framer Motion
