'use client'

import React, { useState, useEffect } from 'react'

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDetailed, setIsDetailed] = useState(false)
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  })

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent')
    if (!cookieConsent) {
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const persist = (prefs: Record<string, boolean>) => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({ ...prefs, timestamp: new Date().toISOString() })
    )
    setIsVisible(false)
  }

  const handleAcceptAll = () =>
    persist({ necessary: true, analytics: true, marketing: true, functional: true })

  const handleAcceptSelected = () => persist(cookiePreferences)

  const handleRejectAll = () =>
    persist({ necessary: true, analytics: false, marketing: false, functional: false })

  const togglePreference = (key: keyof typeof cookiePreferences) => {
    if (key === 'necessary') return
    setCookiePreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  if (!isVisible) return null

  const Toggle = ({ active, onClick }: { active: boolean; onClick?: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${
        active ? 'bg-white' : 'bg-white/15'
      } ${onClick ? '' : 'cursor-default'}`}
    >
      <span
        className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
          active ? 'right-1 bg-black' : 'left-1 bg-white'
        }`}
      />
    </button>
  )

  const categories = [
    { key: 'necessary' as const, title: 'Notwendig', text: 'Grundlegende Funktionen der Website. Lassen sich nicht deaktivieren.', locked: true },
    { key: 'analytics' as const, title: 'Statistik', text: 'Hilft uns zu verstehen, wie die Website genutzt wird.' },
    { key: 'marketing' as const, title: 'Marketing', text: 'Für relevante Inhalte und Werbung.' },
    { key: 'functional' as const, title: 'Funktional', text: 'Erweiterte Funktionen und Komfort.' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-[#111113]/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl reveal-up">
        {!isDetailed ? (
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-base font-medium text-white mb-2">Cookies auf dieser Website</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Wir verwenden notwendige Cookies für den Betrieb der Seite.
                Zusätzliche Cookies nutzen wir nur mit Ihrer Zustimmung.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <button
                onClick={() => setIsDetailed(true)}
                className="px-5 py-2.5 rounded-full border border-white/15 text-sm text-white transition-colors hover:bg-white/5"
              >
                Einstellungen
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium transition-transform hover:scale-[1.03]"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-white">Cookie-Einstellungen</h3>
              <button
                onClick={() => setIsDetailed(false)}
                aria-label="Schließen"
                className="text-zinc-500 transition-colors hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div key={cat.key} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{cat.title}</h4>
                    <Toggle
                      active={cookiePreferences[cat.key]}
                      onClick={cat.locked ? undefined : () => togglePreference(cat.key)}
                    />
                  </div>
                  <p className="text-sm text-zinc-500">{cat.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleRejectAll}
                className="flex-1 px-5 py-2.5 rounded-full border border-white/15 text-sm text-white transition-colors hover:bg-white/5"
              >
                Nur notwendige
              </button>
              <button
                onClick={handleAcceptSelected}
                className="flex-1 px-5 py-2.5 rounded-full border border-white/15 text-sm text-white transition-colors hover:bg-white/5"
              >
                Auswahl speichern
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium transition-transform hover:scale-[1.02]"
              >
                Alle akzeptieren
              </button>
            </div>

            <p className="text-xs text-zinc-500">
              Mehr dazu in unserer{' '}
              <a href="/cookies" className="text-white underline underline-offset-2">
                Cookie-Richtlinie
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CookieBanner
