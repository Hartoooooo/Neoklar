'use client'

import React, { useState, useEffect } from 'react'

const TechAdvantages = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [firstTwoVisible, setFirstTwoVisible] = useState(false)
  const [lastTwoVisible, setLastTwoVisible] = useState(false)
  const [businessValuesVisible, setBusinessValuesVisible] = useState(false)

  useEffect(() => {
    // Skip animations on mobile devices for better performance
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      setIsVisible(true)
      setFirstTwoVisible(true)
      setLastTwoVisible(true)
      setBusinessValuesVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setFirstTwoVisible(true)
        } else {
          setIsVisible(false)
          setFirstTwoVisible(false)
        }
      },
      { threshold: 0.1 }
    )

    const secondRowObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLastTwoVisible(true)
        } else {
          setLastTwoVisible(false)
        }
      },
      { threshold: 0.3 }
    )

    const businessValuesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBusinessValuesVisible(true)
        } else {
          setBusinessValuesVisible(false)
        }
      },
      { threshold: 0.2 }
    )

    const section = document.getElementById('tech-advantages')
    const secondRow = document.getElementById('second-row-cards')
    const businessValuesSection = document.getElementById('business-values-grid')
    
    if (section) observer.observe(section)
    if (secondRow) secondRowObserver.observe(secondRow)
    if (businessValuesSection) businessValuesObserver.observe(businessValuesSection)

    return () => {
      observer.disconnect()
      secondRowObserver.disconnect()
      businessValuesObserver.disconnect()
    }
  }, [])

  const customerAdvantages = [
    {
      id: 'more-customers',
      title: 'MEHR KUNDEN',
      subtitle: 'ERHÖHTE SICHTBARKEIT',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Ihre Website wird bei Google besser gefunden und zieht automatisch mehr potenzielle Kunden an',
      benefits: [
        'SEO optimiert',
        'Mehr Website-Besucher',
        'Höhere Conversion-Rate'
      ],
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 'legal-compliance',
      title: 'RECHTSKONFORM',
      subtitle: 'DSGVO & COMPLIANCE',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Ihre Website erfüllt automatisch alle rechtlichen Anforderungen - DSGVO, Impressum und Cookie-Richtlinien',
      benefits: [
        'DSGVO-konforme Datenverarbeitung',
        'Rechtssichere Cookie-Banner',
        'Automatische Compliance-Updates'
      ],
      color: 'from-purple-500 to-pink-400'
    },
    {
      id: 'professional-image',
      title: 'PROFESSIONELL',
      subtitle: 'VERTRAUEN SCHAFFEN',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Ihre Kunden vertrauen Ihnen mehr durch ein modernes, professionelles Erscheinungsbild',
      benefits: [
        'Hochwertiges Design',
        'Vertrauensvolle Ausstrahlung',
        'Seriöser Eindruck'
      ],
      color: 'from-emerald-500 to-teal-400'
    },
    {
      id: 'mobile-reach',
      title: 'ÜBERALL ERREICHBAR',
      subtitle: 'MOBILE OPTIMIERUNG',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Ihre Website funktioniert perfekt auf Handys, Tablets und Computern - verlieren Sie keine Kunden',
      benefits: [
        'Perfekt auf allen Geräten',
        'Schnelle mobile Ladezeiten',
        'Einfache Bedienung'
      ],
      color: 'from-orange-500 to-red-400'
    },
    {
      id: 'all-in-one',
      title: 'ALLES UNTER EINEM DACH',
      subtitle: 'VOLLSERVICE MIT OPTIONALEM HOSTING',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      description: 'Von der Entwicklung bis zum optionalen Hosting - wir kümmern uns um alles.',
      benefits: [
        'Komplette Website-Entwicklung',
        'Optional: Professionelles Hosting (kleine monatl. Pauschale)',
        'Flexible Service-Auswahl'
      ],
      color: 'from-indigo-500 to-purple-400'
    }
  ]


  return (
    <div id="tech-advantages" className="relative min-h-screen bg-transparent py-24 overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quantum Header */}
        <div className="text-center mb-20">
          <div className={`transform transition-all duration-2000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="inline-block relative mb-8">
              <div className="absolute inset-0 bg-gradient-cyber blur-2xl opacity-40"></div>
              <h2 className="relative text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                IHRE VORTEILE
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Was eine professionelle Website für <span className="text-cyan-400 font-semibold">Ihr Geschäft</span> bedeutet - 
              <span className="text-purple-400 font-semibold"> mehr Kunden</span>, 
              <span className="text-emerald-400 font-semibold"> weniger Aufwand</span> und 
              <span className="text-pink-400 font-semibold"> höhere Umsätze</span>.
            </p>

            {/* Abstract Divider */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-cyan-400"></div>
              <div className="w-3 h-3 border-2 border-cyan-400 rotate-45"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-emerald-400"></div>
            </div>
          </div>
        </div>

        {/* Main Advantages */}
        <div className="space-y-8 mb-24">
          {/* First Row - Cards 1, 2 & 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {customerAdvantages.slice(0, 3).map((advantage, index) => (
              <div
                key={advantage.id}
                className={`group relative bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 transition-all duration-700 ${
                  firstTwoVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{
                  transitionDelay: `${500 + index * 200}ms`,
                  transitionDuration: '800ms'
                }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                
                {/* Header with Icon and Metric */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 flex items-center justify-center border-2 border-gray-600 bg-black/50 rounded-xl transition-all duration-500 text-cyan-400">
                      <div className="w-8 h-8">
                        {advantage.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white transition-colors duration-500">
                        {advantage.title}
                      </h3>
                      <p className="text-cyan-400 font-mono text-sm uppercase tracking-wider">
                        {advantage.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {advantage.description}
                </p>

                {/* Benefits List */}
                <div className="space-y-3">
                  {advantage.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-200 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>


              </div>
            ))}
          </div>

          {/* Second Row - Cards 4 & 5 */}
          <div id="second-row-cards" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {customerAdvantages.slice(3, 5).map((advantage, index) => (
              <div
                key={advantage.id}
                className={`group relative bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 transition-all duration-700 ${
                  lastTwoVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{
                  transitionDelay: `${300 + index * 200}ms`,
                  transitionDuration: '800ms'
                }}
                onMouseEnter={() => setActiveCard(index + 3)}
                onMouseLeave={() => setActiveCard(null)}
              >
                
                {/* Header with Icon and Metric */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 flex items-center justify-center border-2 border-gray-600 bg-black/50 rounded-xl transition-all duration-500 text-cyan-400">
                      <div className="w-8 h-8">
                        {advantage.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white transition-colors duration-500">
                        {advantage.title}
                      </h3>
                      <p className="text-cyan-400 font-mono text-sm uppercase tracking-wider">
                        {advantage.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {advantage.description}
                </p>

                {/* Benefits List */}
                <div className="space-y-3">
                  {advantage.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-200 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>


              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  )
}

export default TechAdvantages