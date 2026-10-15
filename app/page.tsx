import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Stats } from '@/components/sections/Stats'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { Pricing } from '@/components/sections/Pricing'
import { FAQ } from '@/components/sections/Faq'
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
