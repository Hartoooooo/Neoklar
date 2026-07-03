'use client'

import React, { useState, useEffect } from 'react'

const TechAdvantages = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [firstRowVisible, setFirstRowVisible] = useState(false)
  const [secondRowVisible, setSecondRowVisible] = useState(false)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      setIsVisible(true)
      setFirstRowVisible(true)
      setSecondRowVisible(true)
      return
    }

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setFirstRowVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const secondRowObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSecondRowVisible(true)
      },
      { threshold: 0.2 }
    )

    const section = document.getElementById('tech-advantages')
    const secondRow = document.getElementById('second-row-cards')

    if (section) headerObserver.observe(section)
    if (secondRow) secondRowObserver.observe(secondRow)

    return () => {
      headerObserver.disconnect()
      secondRowObserver.disconnect()
    }
  }, [])

  const advantages = [
    {
      id: 'more-customers',
      title: 'Besser gefunden werden',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      description:
        'Ihre Website erscheint weiter oben bei Google und bringt so mehr passende Anfragen statt zufälliger Klicks.',
      benefits: ['Für Suchmaschinen optimiert', 'Mehr Besucher aus Ihrer Region', 'Anfragen statt Zufall'],
    },
    {
      id: 'legal-compliance',
      title: 'Rechtssicher von Anfang an',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      description:
        'DSGVO, Impressum und Cookie-Hinweis bauen wir korrekt ein, damit Sie sich um rechtliche Details keine Sorgen machen müssen.',
      benefits: ['DSGVO-konform umgesetzt', 'Rechtssicherer Cookie-Hinweis', 'Sauberes Impressum'],
    },
    {
      id: 'professional-image',
      title: 'Auftritt, der Vertrauen schafft',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 2l2.4 6.9L21 9.2l-5.2 4.3L17.6 21 12 17.2 6.4 21l1.8-7.5L3 9.2l6.6-.3L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
      description:
        'Ein moderner, aufgeräumter Auftritt wirkt professionell, bevor das erste Gespräch überhaupt begonnen hat.',
      benefits: ['Hochwertiges Design', 'Klare Struktur', 'Seriöser Eindruck'],
    },
    {
      id: 'mobile-reach',
      title: 'Überall erreichbar',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <rect x="6" y="2" width="12" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="11" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      description:
        'Ihre Seite funktioniert auf Handy, Tablet und Desktop gleich gut. So verlieren Sie unterwegs keine Interessenten.',
      benefits: ['Optimiert für jedes Gerät', 'Schnelle Ladezeiten', 'Einfache Bedienung'],
    },
    {
      id: 'all-in-one',
      title: 'Alles aus einer Hand',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
      description:
        'Von der Entwicklung bis zum optionalen Hosting kümmern wir uns um alles. Sie haben einen Ansprechpartner statt vieler Baustellen.',
      benefits: ['Komplette Umsetzung', 'Optionales Hosting zum kleinen Monatspreis', 'Flexible Auswahl'],
    },
  ]

  const Card = ({ advantage, show, index }: { advantage: (typeof advantages)[number]; show: boolean; index: number }) => (
    <div
      className={`group rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-700 ease-out hover:border-white/20 hover:bg-white/[0.04] ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 text-white">
        <div className="w-5 h-5">{advantage.icon}</div>
      </div>
      <h3 className="mt-5 text-xl font-medium text-white">{advantage.title}</h3>
      <p className="mt-3 text-zinc-400 leading-relaxed">{advantage.description}</p>
      <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
        {advantage.benefits.map((benefit, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
            <svg className="w-4 h-4 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <section id="tech-advantages" className="relative py-28 sm:py-36">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className={`max-w-2xl transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <span className="text-sm text-zinc-500">Ihre Vorteile</span>
          <h2 className="heading-tight mt-3 text-4xl sm:text-5xl font-semibold text-white">
            Was eine gute Website konkret bringt
          </h2>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            Mehr Anfragen, weniger Aufwand und ein Auftritt, auf den Sie sich
            verlassen können. Darum geht es bei jedem Projekt.
          </p>
        </div>

        {/* Karten */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.slice(0, 3).map((advantage, index) => (
            <Card key={advantage.id} advantage={advantage} show={firstRowVisible} index={index} />
          ))}
        </div>
        <div id="second-row-cards" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.slice(3, 5).map((advantage, index) => (
            <Card key={advantage.id} advantage={advantage} show={secondRowVisible} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechAdvantages
