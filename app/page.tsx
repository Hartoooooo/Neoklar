import QuantumNavigation from '@/components/QuantumNavigation'
import UltraModernHero from '@/components/UltraModernHero'
import AnimatedShaderHero from '@/components/AnimatedShaderHero'
import { HeroSectionOne } from '@/components/HeroSectionOne'
import AbstractServices from '@/components/AbstractServices'
import TechAdvantages from '@/components/TechAdvantages'
import QuantumQuestionnaire from '@/components/QuantumQuestionnaire'
import QuantumContact from '@/components/QuantumContact'
import QuantumFooter from '@/components/QuantumFooter'
import CookieBanner from '@/components/CookieBanner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Neoklar - Professionelle Webseiten Design & Entwicklung | AI-Architektur für digitale Lösungen',
  description: 'Entwickeln Sie mit Neoklar moderne, professionelle Webseiten und digitale Lösungen. Next.js, React, TypeScript - Ihr Partner für erfolgreiche Webprojekte. Jetzt kostenlose Beratung anfragen!',
  keywords: [
    'Webdesign München', 'Webentwicklung München', 'Next.js Entwicklung', 'React Webseiten', 
    'TypeScript Webentwicklung', 'E-Commerce Entwicklung', 'Shopify Entwicklung',
    'Professionelle Webseiten', 'Moderne Webdesign', 'Responsive Design',
    'SEO optimierte Webseiten', 'Webseiten Agentur München', 'Digitale Lösungen',
    'Neoklar', 'AI-Architektur', 'Quantum Design', 'Cyber Webdesign',
    'Webseiten erstellen', 'Online Shop Entwicklung', 'Portfolio Website'
  ],
  openGraph: {
    title: 'Neoklar - Professionelle Webseiten Design & Entwicklung',
    description: 'Entwickeln Sie mit Neoklar moderne, professionelle Webseiten und digitale Lösungen. Next.js, React, TypeScript - Ihr Partner für erfolgreiche Webprojekte.',
    images: [
      {
        url: 'https://neoklar.de/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Neoklar - Professionelle Webseiten Design & Entwicklung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neoklar - Professionelle Webseiten Design & Entwicklung',
    description: 'Entwickeln Sie mit Neoklar moderne, professionelle Webseiten und digitale Lösungen.',
    images: ['https://neoklar.de/og-home.jpg'],
  },
  alternates: {
    canonical: 'https://neoklar.de',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <QuantumNavigation />
      {/* Wähle zwischen AnimatedShaderHero, UltraModernHero oder HeroSectionOne */}
      <AnimatedShaderHero />
      {/* <UltraModernHero /> */}
      {/* <HeroSectionOne /> */}
      <AbstractServices />
      <TechAdvantages />
      <QuantumQuestionnaire />
      <QuantumContact />
      <QuantumFooter />
      <CookieBanner />
    </main>
  )
}
