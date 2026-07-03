'use client'

import React, { useState, useEffect } from 'react'

const QuantumNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('tech-advantages')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)

      const sections = ['tech-advantages', 'questionnaire', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) {
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
    { id: 'tech-advantages', label: 'Vorteile', href: '#tech-advantages' },
    { id: 'questionnaire', label: 'Projekt-Check', href: '#questionnaire', mobileHidden: true },
    { id: 'contact', label: 'Kontakt', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isScrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Wortmarke */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-70"
          >
            Neoklar
          </button>

          {/* Desktop-Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="ml-3 px-4 py-2 text-sm font-medium rounded-full bg-white text-black transition-transform duration-300 hover:scale-[1.03]"
            >
              Projekt starten
            </button>
          </div>

          {/* Mobile-Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`w-5 h-px bg-white transition-transform duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[3px]' : ''
              }`}
            />
            <span
              className={`w-5 h-px bg-white transition-transform duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[3px]' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile-Menü */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            menuOpen ? 'max-h-72 opacity-100 pb-5' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-white/10">
            {navItems.map(
              (item) =>
                !item.mobileHidden && (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.href)
                      setMenuOpen(false)
                    }}
                    className={`text-left px-2 py-3 text-base transition-colors ${
                      activeSection === item.id ? 'text-white' : 'text-zinc-400'
                    }`}
                  >
                    {item.label}
                  </button>
                )
            )}
            <button
              onClick={() => {
                scrollToSection('#contact')
                setMenuOpen(false)
              }}
              className="mt-2 px-4 py-3 text-base font-medium rounded-full bg-white text-black text-center"
            >
              Projekt starten
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default QuantumNavigation
