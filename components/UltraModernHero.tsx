'use client'

import React, { useEffect, useState } from 'react'

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

          {/* Status Indicators */}
          <div className={`mt-20 flex justify-center space-x-8 transform transition-all duration-2000 delay-1500 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-quantum-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 font-mono text-sm">SYSTEM.ONLINE</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyber-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 font-mono text-sm">KI.BEREIT</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UltraModernHero
