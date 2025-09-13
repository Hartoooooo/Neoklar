'use client'

import React from 'react'
import Link from 'next/link'
import GlobalBackground from '@/components/GlobalBackground'

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <GlobalBackground />
      
      <div className="relative z-20">
        {/* Header */}
        <div className="relative border-b border-cyan-500/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <Link 
                href="/"
                className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-2"
              >
                <span className="text-xl">←</span>
                <span className="font-mono text-sm uppercase tracking-wider">Zurück</span>
              </Link>
              
              <div className="text-right">
                <h1 className="text-3xl font-bold text-white mb-2">Cookie-Richtlinie</h1>
                <div className="text-cyan-400 font-mono text-sm uppercase tracking-wider">
                  COOKIE.MANAGEMENT.INFO
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-12">
            
            {/* Einleitung */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-cyan-400 mb-6 font-mono uppercase tracking-wider">
                Cookie-Verwendung auf einen Blick
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie unsere Website besuchen. 
                  Sie helfen uns dabei, die Website funktionsfähig zu halten, die Sicherheit zu gewährleisten und Ihnen 
                  die bestmögliche Nutzererfahrung zu bieten.
                </p>
                <p>
                  Wir respektieren Ihre Privatsphäre und geben Ihnen die vollständige Kontrolle über die Verwendung 
                  von Cookies auf unserer Website. Sie können jederzeit Ihre Einstellungen anpassen.
                </p>
              </div>
            </div>

            {/* Cookie-Kategorien */}
            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-purple-400 mb-6 font-mono uppercase tracking-wider">
                Cookie-Kategorien
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="text-white font-semibold mb-3">Notwendige Cookies</h3>
                  <p className="leading-relaxed mb-3">
                    Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich. Sie können nicht deaktiviert werden.
                  </p>
                  <div className="bg-black/40 border border-purple-400/30 rounded-xl p-4">
                    <div><strong>Zweck:</strong> Grundlegende Funktionalität der Website</div>
                    <div><strong>Beispiele:</strong> Sitzungsverwaltung, Sicherheitseinstellungen</div>
                    <div><strong>Dauer:</strong> Sitzung oder bis zu 1 Jahr</div>
                    <div><strong>Deaktivierung:</strong> Nicht möglich (technisch erforderlich)</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-3">Analytics Cookies</h3>
                  <p className="leading-relaxed mb-3">
                    Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen, damit wir sie verbessern können.
                  </p>
                  <div className="bg-black/40 border border-purple-400/30 rounded-xl p-4">
                    <div><strong>Zweck:</strong> Verständnis der Website-Nutzung</div>
                    <div><strong>Beispiele:</strong> Google Analytics, Besucherstatistiken</div>
                    <div><strong>Dauer:</strong> Bis zu 2 Jahre</div>
                    <div><strong>Deaktivierung:</strong> Über Cookie-Banner möglich</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3">Marketing Cookies</h3>
                  <p className="leading-relaxed mb-3">
                    Diese Cookies werden verwendet, um Ihnen relevante Werbung und personalisierte Inhalte zu zeigen.
                  </p>
                  <div className="bg-black/40 border border-purple-400/30 rounded-xl p-4">
                    <div><strong>Zweck:</strong> Personalisierte Werbung</div>
                    <div><strong>Beispiele:</strong> Facebook Pixel, Google Ads</div>
                    <div><strong>Dauer:</strong> Bis zu 1 Jahr</div>
                    <div><strong>Deaktivierung:</strong> Über Cookie-Banner möglich</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3">Funktionale Cookies</h3>
                  <p className="leading-relaxed mb-3">
                    Diese Cookies ermöglichen erweiterte Funktionen und eine personalisierte Nutzererfahrung.
                  </p>
                  <div className="bg-black/40 border border-purple-400/30 rounded-xl p-4">
                    <div><strong>Zweck:</strong> Erweiterte Website-Funktionen</div>
                    <div><strong>Beispiele:</strong> Spracheinstellungen, Präferenzen</div>
                    <div><strong>Dauer:</strong> Bis zu 1 Jahr</div>
                    <div><strong>Deaktivierung:</strong> Über Cookie-Banner möglich</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ihre Rechte */}
            <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-green-400 mb-6 font-mono uppercase tracking-wider">
                Ihre Cookie-Rechte
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>Sie haben folgende Rechte bezüglich der Cookie-Verwendung:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Recht auf Information</strong> über die verwendeten Cookie-Arten</li>
                  <li><strong>Recht auf Einwilligung</strong> oder Ablehnung von nicht-notwendigen Cookies</li>
                  <li><strong>Recht auf Widerruf</strong> Ihrer Cookie-Einwilligung jederzeit</li>
                  <li><strong>Recht auf Löschung</strong> bereits gesetzter Cookies über Browser-Einstellungen</li>
                  <li><strong>Recht auf Anpassung</strong> Ihrer Cookie-Präferenzen über unseren Banner</li>
                  <li><strong>Recht auf Opt-out</strong> bei Drittanbieter-Cookies</li>
                </ul>
              </div>
            </div>

            {/* Drittanbieter-Services */}
            <div className="bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-orange-400 mb-6 font-mono uppercase tracking-wider">
                Drittanbieter-Services
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="text-white font-semibold mb-3">Google Analytics</h3>
                  <p className="leading-relaxed mb-3">
                    Wir verwenden Google Analytics zur Analyse der Website-Nutzung. Diese Daten helfen uns, 
                    die Benutzererfahrung zu verbessern und unsere Inhalte zu optimieren.
                  </p>
                  <div className="bg-black/40 border border-orange-400/30 rounded-xl p-4">
                    <div><strong>Anbieter:</strong> Google LLC</div>
                    <div><strong>Zweck:</strong> Website-Analyse und Optimierung</div>
                    <div><strong>Datenschutz:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">policies.google.com/privacy</a></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-3">Social Media Plugins</h3>
                  <p className="leading-relaxed mb-3">
                    Unsere Website kann Social Media Plugins enthalten, die Daten an die jeweiligen Plattformen übertragen. 
                    Diese werden nur geladen, wenn Sie der Marketing-Cookie-Kategorie zustimmen.
                  </p>
                  <div className="bg-black/40 border border-orange-400/30 rounded-xl p-4">
                    <div><strong>Aktivierung:</strong> Nur mit Marketing-Cookie-Zustimmung</div>
                    <div><strong>Kontrolle:</strong> Vollständig über Cookie-Banner steuerbar</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-cyan-500/20 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-400 text-sm">
              <p>Stand: {new Date().toLocaleDateString('de-DE')}</p>
              <p className="mt-2">
                Bei Fragen zu Cookies wenden Sie sich gerne an: 
                <a href="mailto:neoklar.info@gmail.com" className="text-cyan-400 hover:text-cyan-300 ml-1">
                  neoklar.info@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookiesPage
