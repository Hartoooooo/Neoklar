'use client'

import Hero from '@/components/ui/animated-shader-hero'

const AnimatedShaderHero = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToServices = () => {
    const element = document.querySelector('#services')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div id="home" className="relative" style={{ 
      width: '100vw',
      marginLeft: 'calc(-1 * (100vw - 100%) / 2)',
      marginRight: 'calc(-1 * (100vw - 100%) / 2)',
      paddingLeft: 0,
      paddingRight: 0,
      maxWidth: 'none',
      overflow: 'hidden'
    }}>
      <Hero
        trustBadge={{
          text: "Vertrauen Sie auf moderne Technologie",
          icons: ["✨"]
        }}
        headline={{
          line1: "Wo Innovation",
          line2: "auf Design trifft"
        }}
        subtitle="Entwickeln Sie mit Neoklar moderne, professionelle Webseiten und digitale Lösungen. Next.js, React, TypeScript — Ihr Partner für erfolgreiche Webprojekte."
        buttons={{
          primary: {
            text: "Projekt starten",
            onClick: scrollToContact
          }
        }}
      />
    </div>
  )
}

export default AnimatedShaderHero

