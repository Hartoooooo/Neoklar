'use client'

import React, { useState, useEffect } from 'react'

const QuantumFooter = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [quantumState, setQuantumState] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [networkNodes, setNetworkNodes] = useState<Array<{id: number, x: number, y: number, active: boolean}>>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set client flag to enable time rendering after hydration
    setIsClient(true)
    setMounted(true)

    
    // Initialize network nodes only on client side
    setNetworkNodes(Array(15).fill(0).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      active: Math.random() > 0.5
    })))
    
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const quantumInterval = setInterval(() => {
      setQuantumState(prev => (prev + 1) % 4)
    }, 2000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(quantumInterval)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const quickLinks = [
    { label: 'STARTSEITE', href: '#home' },
    { label: 'PROJEKTE', href: '#services' },
    { label: 'FRAGEBOGEN', href: '#questionnaire' },
    { label: 'KONTAKT', href: '#contact' }
  ]


  const networkProtocols = []

  const currentYear = new Date().getFullYear()

  return (
    <div className="relative bg-transparent border-t border-cyan-500/20 overflow-hidden">

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="py-16">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-8 lg:space-y-0">
            
            {/* Quantum Identity */}
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-cyber blur-xl opacity-30"></div>
                <h3 className="relative text-4xl font-black bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  NEO&lt;/&gt;KLAR
                </h3>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Wir erschaffen <span className="text-cyan-400">digitale Welten</span> und 
                <span className="text-purple-400"> innovative Webseiten</span> für Ihr Unternehmen.
              </p>
            </div>

            {/* Navigation Matrix */}
            <div>
              <h4 className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-6 flex items-center">
                <span className="text-cyan-400 mr-2">◊</span>
                SCHNELLZUGRIFF
              </h4>
              
              <div className="space-y-4">
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(link.href)}
                    className="group block w-full text-left text-gray-300 hover:text-cyan-400 transition-all duration-300 font-mono"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600">{'>'}</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">
                        {link.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Matrix */}
        <div className="py-8">
          {/* Contact Information */}
          <div className="flex flex-col space-y-4 mb-6">

            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              {/* Instagram Icon */}
              <a 
                href="https://instagram.com/neoklar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-4 h-4 relative group"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-full h-full text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </a>
              
              {/* X (Twitter) Icon */}
              <a 
                href="https://x.com/neoklar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-4 h-4 relative group"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-full h-full text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
                </svg>
              </a>
              
              {/* LinkedIn Icon */}
              <a 
                href="https://linkedin.com/company/neoklar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-4 h-4 relative group"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-full h-full text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
                </svg>
              </a>
              
              {/* Discord Icon */}
              <a 
                href="https://discord.gg/neoklar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-4 h-4 relative group"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-full h-full text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright and Legal in one line */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            {/* Copyright Matrix */}
            <div className="text-gray-400 font-mono text-sm">
              <span className="text-cyan-400">©</span> {currentYear} NEOKLAR 
              <span className="mx-2 text-gray-600">|</span>
              <span className="text-xs">ALLE RECHTE VORBEHALTEN</span>
            </div>

            {/* Legal Protocols */}
            <div className="flex items-center space-x-4 text-xs font-mono">
              <a 
                href="/datenschutz" 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                DATENSCHUTZ
              </a>
              <a 
                href="/impressum" 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                IMPRESSUM
              </a>
              <a 
                href="/cookies" 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                COOKIES
              </a>
              <button className="text-gray-400 hover:text-cyan-400 transition-colors">
                AGB
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default QuantumFooter
