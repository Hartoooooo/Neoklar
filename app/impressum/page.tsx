'use client'

import React from 'react'
import Link from 'next/link'
import GlobalBackground from '@/components/GlobalBackground'

const ImpressumPage = () => {
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
                <h1 className="text-3xl font-bold text-white mb-2">Impressum</h1>
                <div className="text-cyan-400 font-mono text-sm uppercase tracking-wider">
                  RECHTLICHE.INFORMATIONEN
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-12">
            
            {/* Angaben gemäß § 5 TMG */}
            <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-cyan-400 mb-6 font-mono uppercase tracking-wider">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <div className="text-white font-semibold mb-2">Unternehmen:</div>
                  <div>NEOKLAR</div>
                  <div>Webentwicklung & Digitale Lösungen</div>
                </div>
                
                <div>
                  <div className="text-white font-semibold mb-2">Inhaber:</div>
                  <div>Timon Hartmann</div>
                </div>
                
                <div>
                  <div className="text-white font-semibold mb-2">Anschrift:</div>
                  <div>Jungfernstr. 18</div>
                  <div>15344 Strausberg</div>
                  <div>Deutschland</div>
                </div>
                
                <div>
                  <div className="text-white font-semibold mb-2">Kontakt:</div>
                  <div>E-Mail: neoklar.info@gmail.com</div>
                  <div>Website: www.neoklar.de</div>
                </div>
              </div>
            </div>

            {/* Verantwortlich für den Inhalt */}
            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-purple-400 mb-6 font-mono uppercase tracking-wider">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <div>Timon Hartmann</div>
                  <div>Jungfernstr. 18</div>
                  <div>15344 Strausberg</div>
                </div>
              </div>
            </div>

            {/* Haftungsausschluss */}
            <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-green-400 mb-6 font-mono uppercase tracking-wider">
                Haftungsausschluss
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="text-white font-semibold mb-3">Haftung für Inhalte</h3>
                  <p className="leading-relaxed">
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                    unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                    Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-3">Haftung für Links</h3>
                  <p className="leading-relaxed">
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                    Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten 
                    Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-3">Urheberrecht</h3>
                  <p className="leading-relaxed">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
                    Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
                    Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </div>

            {/* Online-Streitbeilegung */}
            <div className="bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-orange-400 mb-6 font-mono uppercase tracking-wider">
                Online-Streitbeilegung
              </h2>
              <div className="text-gray-300 leading-relaxed">
                <p className="mb-4">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                </p>
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 transition-colors underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                <p className="mt-4">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
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
                Bei Fragen zum Impressum wenden Sie sich gerne an: 
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

export default ImpressumPage
