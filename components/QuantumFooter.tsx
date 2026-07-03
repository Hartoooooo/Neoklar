'use client'

import React from 'react'

const QuantumFooter = () => {
  const scrollToSection = (href: string) => {
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const quickLinks = [
    { label: 'Start', href: '#home' },
    { label: 'Vorteile', href: '#tech-advantages' },
    { label: 'Projekte', href: '#projekte' },
    { label: 'Projekt-Check', href: '#questionnaire' },
    { label: 'Kontakt', href: '#contact' },
  ]

  const legalLinks = [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'Cookies', href: '/cookies' },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Marke */}
          <div className="lg:col-span-2 max-w-sm">
            <span className="text-lg font-semibold tracking-tight text-white">Neoklar</span>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              Wir gestalten und entwickeln moderne Webseiten für kleine und
              mittlere Unternehmen. Klar, schnell und auf Ihr Ziel ausgerichtet.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm text-zinc-500 mb-4">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h4 className="text-sm text-zinc-500 mb-4">Rechtliches</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-zinc-400 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Unterzeile */}
        <div className="py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/10">
          <p className="text-sm text-zinc-500">
            © {currentYear} Neoklar. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/neoklar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-zinc-500 transition-colors hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/neoklar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-500 transition-colors hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default QuantumFooter
