'use client'

import Hero from '@/components/ui/neural-network-hero'

const NeuralNetworkHero = () => {
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
    <div id="home" style={{ 
      position: 'relative',
      width: '100vw',
      marginLeft: 'calc(-1 * (100vw - 100%) / 2)',
      marginRight: 'calc(-1 * (100vw - 100%) / 2)',
      paddingLeft: 0,
      paddingRight: 0,
      maxWidth: 'none',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <Hero 
        title="Wo Algorithmen zu Kunst werden."
        description="Entwickeln Sie mit Neoklar moderne, professionelle Webseiten und digitale Lösungen. Next.js, React, TypeScript — Ihr Partner für erfolgreiche Webprojekte."
        badgeText="AI-Architektur"
        badgeLabel="Neu"
        ctaButtons={[
          { 
            text: "Projekt starten", 
            href: "#contact", 
            primary: true 
          },
          { 
            text: "Projekte erkunden", 
            href: "#services" 
          }
        ]}
        microDetails={["Next.js", "React", "TypeScript"]}
      />
    </div>
  )
}

export default NeuralNetworkHero

