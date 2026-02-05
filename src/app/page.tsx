import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroNew } from '@/components/sections/HeroNew'
import { AboutNew } from '@/components/sections/AboutNew'
import { InteractiveShowcase } from '@/components/sections/InteractiveShowcase'
import { SkillsNew } from '@/components/sections/SkillsNew'
import { Projects } from '@/components/sections/Projects'
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline'
import { Resume } from '@/components/sections/Resume'
import { ContactNew } from '@/components/sections/ContactNew'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroNew />
        <AboutNew />
        <SkillsNew />
        <InteractiveShowcase />
        <Projects />
        <ExperienceTimeline />
        <Resume />
        {/* Heavy fade transition between Resume and Contact */}
        <div className="relative h-40 md:h-48 bg-gradient-to-b from-background via-background/50 to-transparent overflow-hidden pointer-events-none" />
        <ContactNew />
      </main>
      <Footer />
    </>
  )
}
