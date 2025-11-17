'use client'

import Hero from '@/components/ui/animated-shader-hero'
import { IconBrandNextjs, IconBrandReact } from '@tabler/icons-react'

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
        subtitle=""
        buttons={{
          primary: {
            text: "Projekt starten",
            onClick: scrollToContact
          }
        }}
        techIcons={
          <div className="flex justify-center items-center space-x-8">
            {/* Next.js Icon */}
            <div className="flex items-center space-x-3 group">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <IconBrandNextjs className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
              </div>
              <span className="text-sm text-gray-300 font-medium">Next.js</span>
            </div>

            {/* React Icon */}
            <div className="flex items-center space-x-3 group">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <IconBrandReact className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
              </div>
              <span className="text-sm text-gray-300 font-medium">React</span>
            </div>

            {/* TailwindCSS Icon */}
            <div className="flex items-center space-x-3 group">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-cyan-400" fill="currentColor">
                  <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                </svg>
              </div>
              <span className="text-sm text-gray-300 font-medium">TailwindCSS</span>
            </div>
          </div>
        }
      />
    </div>
  )
}

export default AnimatedShaderHero

