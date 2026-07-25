import Hero from '@/components/sections/Hero'
import Manifesto from '@/components/sections/Manifesto'
import Services from '@/components/sections/Services'
import WorkCta from '@/components/sections/WorkCta'
import Process from '@/components/sections/Process'
import Testimonials from '@/components/sections/Testimonials'
import Pricing from '@/components/sections/Pricing'
import Faq from '@/components/sections/Faq'
import ClosingCta from '@/components/sections/ClosingCta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Services />
      <WorkCta />
      <Process />
      <Testimonials />
      <Pricing />
      <Faq />
      <ClosingCta />
    </>
  )
}
