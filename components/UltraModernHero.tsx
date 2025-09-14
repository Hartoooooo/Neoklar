'use client'

import React, { useEffect, useState } from 'react'
import { IconBrandNextjs, IconBrandReact, IconBrandTailwind } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

const UltraModernHero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Kleine Verzögerung um Layout-Shifts zu vermeiden
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div id="home" className="relative min-h-screen overflow-hidden bg-transparent">

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-6xl mx-auto">
          {/* Glitch Effect Title */}
          <div className={`mb-8 mt-16 transform transition-all duration-2000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-7xl md:text-9xl font-black leading-none mb-4 relative">
              <span 
                className="bg-gradient-to-r from-white via-cyber-300 to-quantum-300 bg-clip-text text-transparent animate-pulse-slow text-white"
                style={{ 
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'white' // Fallback falls Gradient nicht funktioniert
                }}
              >
                NEOKLAR
              </span>
              <span className="absolute -inset-1 bg-gradient-cyber blur-lg opacity-30 -z-10"></span>
            </h1>
          </div>

          {/* Holographic Subtitle */}
          <div className={`mb-12 transform transition-all duration-2000 delay-500 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative">
              <p className="text-2xl md:text-4xl text-gray-300 font-light tracking-wide mb-2">
                DIGITALE <span 
                  className="bg-gradient-to-r from-white via-cyber-300 to-quantum-300 bg-clip-text text-transparent font-bold"
                  style={{ 
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >AI </span>ARCHITEKTUR
              </p>
              <p className="text-lg md:text-xl text-cyber-400 font-mono uppercase tracking-widest">
                {'//'} Wir machen Sie sichtbar
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent h-px top-1/2 animate-pulse opacity-50"></div>
            </div>
          </div>


          {/* Quantum Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transform transition-all duration-2000 delay-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button
              onClick={scrollToContact}
              className="group relative px-12 py-4 bg-transparent border-2 border-cyber-500 text-cyber-400 font-bold uppercase tracking-wider hover:text-black transition-all duration-500 overflow-hidden rounded-3xl"
            >
              <span className="relative z-10">PROJEKT STARTEN</span>
              <div className="absolute inset-0 bg-cyber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="absolute inset-0 border border-cyber-300 transform scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </button>
            
            <button
              onClick={() => {
                const element = document.querySelector('#services')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="group relative px-12 py-4 bg-gradient-to-r from-neo-600 to-quantum-600 text-white font-bold uppercase tracking-wider hover:from-neo-500 hover:to-quantum-500 transition-all duration-500 transform hover:scale-105 rounded-3xl"
            >
              <span className="relative z-10">PROJEKTE ERKUNDEN</span>
              <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
            </button>
          </div>

          {/* Technology Icons */}
          <div className={cn(
            "mt-16 flex justify-center items-center space-x-8 transform transition-all duration-2000 delay-1200 ease-out",
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          )}>
            {/* Next.js Icon */}
            <div className="flex items-center space-x-3 group">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <IconBrandNextjs className="w-8 h-8 text-cyan-400" />
              </div>
              <span className="text-sm text-gray-400 font-medium">Next.js</span>
            </div>

            {/* React Icon */}
            <div className="flex items-center space-x-3 group">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <IconBrandReact className="w-8 h-8 text-cyan-400" />
              </div>
              <span className="text-sm text-gray-400 font-medium">React</span>
            </div>

            {/* TailwindCSS Icon */}
            <div className="flex items-center space-x-3 group">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-cyan-400" fill="currentColor">
                  <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                </svg>
              </div>
              <span className="text-sm text-gray-400 font-medium">TailwindCSS</span>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default UltraModernHero
