import HeroSection from '@/components/sections/HeroSection'
import HomeExecutiveSummary from '@/components/sections/HomeExecutiveSummary'
import ClientsTicker from '@/components/sections/ClientsTicker'
import HomeSectionNav from '@/components/sections/HomeSectionNav'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeExecutiveSummary />
      <ClientsTicker />
      <HomeSectionNav />
    </>
  )
}
