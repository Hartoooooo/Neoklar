import QuantumNavigation from '@/components/QuantumNavigation'
import UltraModernHero from '@/components/UltraModernHero'
import AbstractServices from '@/components/AbstractServices'
import TechAdvantages from '@/components/TechAdvantages'
import QuantumQuestionnaire from '@/components/QuantumQuestionnaire'
import QuantumContact from '@/components/QuantumContact'
import QuantumFooter from '@/components/QuantumFooter'
import CookieBanner from '@/components/CookieBanner'

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <QuantumNavigation />
      <UltraModernHero />
      <AbstractServices />
      <TechAdvantages />
      <QuantumQuestionnaire />
      <QuantumContact />
      <QuantumFooter />
      <CookieBanner />
    </main>
  )
}
