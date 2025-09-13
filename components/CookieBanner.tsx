'use client'

import React, { useState, useEffect } from 'react'

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDetailed, setIsDetailed] = useState(false)
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Immer aktiviert
    analytics: false,
    marketing: false,
    functional: false
  })

  useEffect(() => {
    // Cookie-Zustimmung prüfen
    const cookieConsent = localStorage.getItem('cookie-consent')
    if (!cookieConsent) {
      // Kurze Verzögerung für bessere UX
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    setIsVisible(false)
  }

  const handleAcceptSelected = () => {
    const selectedPreferences = {
      ...cookiePreferences,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(selectedPreferences))
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly))
    setIsVisible(false)
  }

  const togglePreference = (key: keyof typeof cookiePreferences) => {
    if (key === 'necessary') return // Notwendige Cookies können nicht deaktiviert werden
    setCookiePreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="relative max-w-6xl mx-auto">
        {/* Quantum Background Effects */}
        <div className="absolute inset-0 bg-gradient-cyber opacity-20 blur-2xl rounded-3xl"></div>
        
        <div className="relative bg-black/95 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl p-6 sm:p-8 overflow-hidden">
          
          {/* Corner Quantum Elements */}
          <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-cyan-400"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-cyan-400"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-cyan-400"></div>

          <div className="relative z-10">
            
            {!isDetailed ? (
              // Kompakte Ansicht
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0 lg:space-x-8">
                
                {/* Header & Text */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-cyan-400 text-xl">🍪</span>
                    <h3 className="text-xl font-black text-white">
                      COOKIE.PROTOKOLL
                    </h3>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-4 lg:mb-0">
                    Diese Website verwendet <span className="text-cyan-400 font-semibold">technisch notwendige Cookies</span> für optimale Funktionalität. 
                    Zusätzliche Cookies helfen uns, die <span className="text-purple-400 font-semibold">Nutzererfahrung zu verbessern</span> und 
                    <span className="text-emerald-400 font-semibold"> relevante Inhalte</span> anzuzeigen.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 lg:flex-shrink-0">
                  <button
                    onClick={() => setIsDetailed(true)}
                    className="px-6 py-3 border border-gray-600 text-gray-300 font-mono text-sm hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 rounded-lg"
                  >
                    EINSTELLUNGEN
                  </button>
                  
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    ALLE AKZEPTIEREN
                  </button>
                </div>
              </div>
            ) : (
              // Detaillierte Ansicht
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-cyan-400 text-xl">🍪</span>
                    <h3 className="text-xl font-black text-white">
                      COOKIE.EINSTELLUNGEN
                    </h3>
                  </div>
                  
                  <button
                    onClick={() => setIsDetailed(false)}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Cookie Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Notwendige Cookies */}
                  <div className="bg-black/40 border border-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-bold">Notwendige Cookies</h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-6 bg-cyan-500 rounded-full relative">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">IMMER AN</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">
                      Grundlegende Funktionen der Website. Können nicht deaktiviert werden.
                    </p>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="bg-black/40 border border-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-bold">Analytics</h4>
                      <button
                        onClick={() => togglePreference('analytics')}
                        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                          cookiePreferences.analytics ? 'bg-cyan-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                          cookiePreferences.analytics ? 'right-1' : 'left-1'
                        }`}></div>
                      </button>
                    </div>
                    <p className="text-sm text-gray-400">
                      Hilft uns zu verstehen, wie Besucher die Website nutzen.
                    </p>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="bg-black/40 border border-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-bold">Marketing</h4>
                      <button
                        onClick={() => togglePreference('marketing')}
                        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                          cookiePreferences.marketing ? 'bg-cyan-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                          cookiePreferences.marketing ? 'right-1' : 'left-1'
                        }`}></div>
                      </button>
                    </div>
                    <p className="text-sm text-gray-400">
                      Personalisierte Werbung und relevante Inhalte.
                    </p>
                  </div>

                  {/* Funktionale Cookies */}
                  <div className="bg-black/40 border border-gray-700/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-bold">Funktional</h4>
                      <button
                        onClick={() => togglePreference('functional')}
                        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
                          cookiePreferences.functional ? 'bg-cyan-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                          cookiePreferences.functional ? 'right-1' : 'left-1'
                        }`}></div>
                      </button>
                    </div>
                    <p className="text-sm text-gray-400">
                      Erweiterte Funktionen und personalisierte Erfahrung.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-700/50">
                  <button
                    onClick={handleRejectAll}
                    className="px-6 py-3 border border-gray-600 text-gray-300 font-mono text-sm hover:border-red-400 hover:text-red-400 transition-all duration-300 rounded-lg flex-1"
                  >
                    NUR NOTWENDIGE
                  </button>
                  
                  <button
                    onClick={handleAcceptSelected}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 flex-1"
                  >
                    AUSWAHL SPEICHERN
                  </button>
                  
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex-1"
                  >
                    ALLE AKZEPTIEREN
                  </button>
                </div>

                {/* Additional Info */}
                <div className="text-center pt-4 border-t border-gray-700/50">
                  <p className="text-xs text-gray-400 font-mono">
                    Weitere Informationen in unserer{' '}
                    <a href="/cookies" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      Cookie-Richtlinie
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Quantum Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                  style={{
                    left: `${10 + (i * 15)}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
