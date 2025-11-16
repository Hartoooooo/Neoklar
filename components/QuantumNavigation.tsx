'use client'

import React, { useState, useEffect } from 'react'

const QuantumNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('services')
  const [isHologramMode, setIsHologramMode] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Detect active section
      const sections = ['services', 'tech-advantages', 'questionnaire', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'services', label: 'PROJEKTE', href: '#services', code: '01' },
    { id: 'questionnaire', label: 'ANALYSE', href: '#questionnaire', code: '02', mobileHidden: true },
    { id: 'contact', label: 'KONTAKT', href: '#contact', code: '03' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-2xl border-b border-cyan-500/20' 
        : 'bg-transparent'
    }`}>
      {/* Quantum Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Holographic Logo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 blur-lg opacity-30 md:group-hover:opacity-60 transition-all duration-500"></div>
            <h1 className="relative text-3xl font-black bg-gradient-to-r from-white via-cyan-300 to-blue-400 bg-clip-text text-transparent tracking-wider">
              neoklar
            </h1>
          </div>

          {/* Mobile Hamburger Menu - Clean 3 Lines Only */}
          <button
            onClick={() => setIsHologramMode(!isHologramMode)}
            className="md:hidden relative w-12 h-12 active:bg-cyan-500/10 transition-all duration-200"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
              <div className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${isHologramMode ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${isHologramMode ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${isHologramMode ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className={`group relative px-6 py-3 font-mono uppercase tracking-widest text-sm transition-all duration-500 transform md:hover:scale-105 focus:outline-none ${
                  activeSection === item.id 
                    ? 'text-cyan-400' 
                    : isScrolled ? 'text-gray-300 md:hover:text-cyan-400' : 'text-white md:hover:text-cyan-400'
                }`}
              >
                {/* Code Number */}
                <span className="absolute -top-2 -left-2 text-xs text-cyan-600 font-mono opacity-60">
                  {item.code}
                </span>
                
                {/* Main Label */}
                <span className="relative z-10">{item.label}</span>
                
                {/* Holographic Underline */}
                <div className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyan-400 to-blue-500 transform origin-left transition-all duration-500 ${
                  activeSection === item.id ? 'scale-x-100' : 'scale-x-0 md:group-hover:scale-x-100'
                }`} style={{ width: '100%' }}></div>
                
                {/* Quantum Glow */}
                <div className={`absolute inset-0 bg-cyan-500/10 blur-md transform scale-0 md:group-hover:scale-100 transition-all duration-500 ${
                  activeSection === item.id ? 'scale-100' : ''
                }`}></div>
                
                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-cyan-500 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-cyan-500 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-cyan-500 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-cyan-500 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>

          {/* Quantum Status */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400 font-mono">AKTIV</span>
            </div>
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
            <div className="text-xs text-cyan-400 font-mono">v2.0.1</div>
          </div>
        </div>

        {/* Mobile Hologram Menu - Performance Optimized */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isHologramMode ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className={`py-4 space-y-2 border-t border-cyan-500/20 transition-all duration-300 ${
            isScrolled ? '' : 'bg-black/95 backdrop-blur-xl rounded-b-3xl'
          }`}>
            {navItems.map((item, index) => (
              !item.mobileHidden && (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.href)
                    setIsHologramMode(false)
                  }}
                  className={`block w-full text-left px-6 py-3 font-mono uppercase tracking-widest text-sm transition-colors duration-200 focus:outline-none ${
                    activeSection === item.id ? 'text-cyan-400' : 'text-gray-300 active:text-cyan-400'
                  }`}
                >
                  <span className="text-xs text-cyan-600 mr-4">{item.code}</span>
                  <span>{item.label}</span>
                </button>
              )
            ))}
            
            {/* Mobile Status - Simplified */}
            <div className="px-6 pt-3 border-t border-cyan-500/20">
              <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>ONLINE</span>
                </div>
                <span>v2.0.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </nav>
  )
}

export default QuantumNavigation
