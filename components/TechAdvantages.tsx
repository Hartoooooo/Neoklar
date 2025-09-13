'use client'

import React, { useState, useEffect } from 'react'

const TechAdvantages = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [firstTwoVisible, setFirstTwoVisible] = useState(false)
  const [lastTwoVisible, setLastTwoVisible] = useState(false)
  const [businessValuesVisible, setBusinessValuesVisible] = useState(false)

  useEffect(() => {
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
      color: 'from-blue-500 to-cyan-400',
      metric: '300%',
      metricLabel: 'mehr Anfragen'
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
      color: 'from-purple-500 to-pink-400',
      metric: '100%',
      metricLabel: 'rechtskonform'
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
      color: 'from-emerald-500 to-teal-400',
      metric: '95%',
      metricLabel: 'mehr Vertrauen'
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
      color: 'from-orange-500 to-red-400',
      metric: '70%',
      metricLabel: 'mobile Nutzer'
    }
  ]

  const businessValues = [
    {
      title: 'KUNDENVERTRAUEN',
      description: 'Professionelle Website schafft sofortiges Vertrauen bei neuen Kunden',
      metric: '85%',
      label: 'Vertrauenszuwachs',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'UMSATZSTEIGERUNG',
      description: 'Bessere Auffindbarkeit führt direkt zu mehr Anfragen und Verkäufen',
      metric: '+250%',
      label: 'Online-Anfragen',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 8h3.7v3.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'WENIGER STRESS',
      description: 'Alles läuft automatisch - Sie können sich auf Ihr Geschäft konzentrieren',
      metric: '24/7',
      label: 'Verfügbarkeit',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M8 3a5 5 0 1 0 0 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3a5 5 0 1 1 0 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 16h20l-4 4H6l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'KOSTENEINSPARUNG',
      description: 'Weniger teure Werbung nötig - Ihre Website arbeitet für Sie',
      metric: '60%',
      label: 'weniger Werbekosten',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'ZUKUNFTSSICHER',
      description: 'Ihre Website wächst mit Ihrem Unternehmen mit - langfristige Investition',
      metric: '10+',
      label: 'Jahre haltbar',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ]

  return (
    <div id="tech-advantages" className="relative min-h-screen bg-transparent py-32 overflow-hidden">
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
          {/* First Row - Cards 1 & 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {customerAdvantages.slice(0, 2).map((advantage, index) => (
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
                  
                  {/* Metric Badge */}
                  <div className="text-right">
                    <div className="text-3xl font-black text-cyan-400">{advantage.metric}</div>
                    <div className="text-xs text-gray-400 font-mono uppercase">{advantage.metricLabel}</div>
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
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-200 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-6 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${advantage.color} transform origin-left transition-all duration-1000 ${
                      activeCard === index ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  ></div>
                </div>

              </div>
            ))}
          </div>

          {/* Second Row - Cards 3 & 4 */}
          <div id="second-row-cards" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {customerAdvantages.slice(2, 4).map((advantage, index) => (
              <div
                key={advantage.id}
                className={`group relative bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 transition-all duration-700 ${
                  lastTwoVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{
                  transitionDelay: `${300 + index * 200}ms`,
                  transitionDuration: '800ms'
                }}
                onMouseEnter={() => setActiveCard(index + 2)}
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
                  
                  {/* Metric Badge */}
                  <div className="text-right">
                    <div className="text-3xl font-black text-cyan-400">{advantage.metric}</div>
                    <div className="text-xs text-gray-400 font-mono uppercase">{advantage.metricLabel}</div>
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
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-200 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-6 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${advantage.color} transform origin-left transition-all duration-1000 ${
                      activeCard === (index + 2) ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  ></div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Business Value Grid */}
        <div id="business-values-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20">
          {businessValues.map((value, index) => (
            <div
              key={index}
              className={`relative bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 transition-all duration-500 ${
                businessValuesVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{
                transitionDelay: `${200 + index * 150}ms`,
                transitionDuration: '600ms'
              }}
            >
              
              <div className="relative text-center">
                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-4 text-cyan-400">
                  {value.icon}
                </div>
                
                {/* Metric */}
                <div className="mb-4">
                  <div className="text-3xl font-black text-cyan-400 mb-1">{value.metric}</div>
                  <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">{value.label}</div>
                </div>
                
                {/* Title */}
                <h4 className="text-lg font-bold text-white mb-3">
                  {value.title}
                </h4>
                
                {/* Description */}
                <p className="text-sm text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default TechAdvantages