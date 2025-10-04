'use client'

import React from 'react'
import Link from 'next/link'
import GlobalBackground from '@/components/GlobalBackground'

const DatenschutzPage = () => {
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
                <h1 className="text-3xl font-bold text-white mb-2">Datenschutzerklärung</h1>
                <div className="text-cyan-400 font-mono text-sm uppercase tracking-wider">
                  DATEN.SCHUTZ.INFO
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
                Datenschutz auf einen Blick
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                  passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                  persönlich identifiziert werden können.
                </p>
                <p>
                  Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre personenbezogenen Daten 
                  vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
              </div>
            </div>

            {/* Verantwortliche Stelle */}
            <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-purple-400 mb-6 font-mono uppercase tracking-wider">
                Verantwortliche Stelle
              </h2>
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                <div className="bg-black/40 border border-purple-400/30 rounded-xl p-4">
                  <div>Timon Hartmann</div>
                  <div>Jungfernstr. 18</div>
                  <div>15344 Strausberg</div>
                  <div>Deutschland</div>
                  <div className="mt-2">
                    <div>E-Mail: neoklar.info@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Datenerfassung */}
            <div className="bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-green-400 mb-6 font-mono uppercase tracking-wider">
                Datenerfassung auf dieser Website
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="text-white font-semibold mb-3">Server-Log-Dateien</h3>
                  <p className="leading-relaxed mb-3">
                    Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
                    die Ihr Browser automatisch an uns übermittelt. Dies sind:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Browsertyp und Browserversion</li>
                    <li>Verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                    <li>IP-Adresse</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-3">Kontaktformular</h3>
                  <p className="leading-relaxed">
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
                    Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der 
                    Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3">Domain-Verfügbarkeitsprüfung</h3>
                  <p className="leading-relaxed">
                    Bei der Nutzung unserer Live-Domain-Prüfung werden die eingegebenen Domain-Namen zur Verfügbarkeitsprüfung 
                    an externe DNS-Dienste übermittelt. Diese Daten werden nicht dauerhaft gespeichert und dienen ausschließlich 
                    der sofortigen Verfügbarkeitsprüfung.
                  </p>
                </div>
              </div>
            </div>

            {/* Rechtsgrundlage */}
            <div className="bg-black/40 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-orange-400 mb-6 font-mono uppercase tracking-wider">
                Rechtsgrundlage der Datenverarbeitung
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten ist Art. 6 Abs. 1 lit. f DSGVO 
                  (berechtigtes Interesse). Unser berechtigtes Interesse liegt in der ordnungsgemäßen Funktion unserer 
                  Website und der Bearbeitung von Anfragen.
                </p>
                <p>
                  Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung einholen, 
                  dient Art. 6 Abs. 1 lit. a DSGVO als Rechtsgrundlage.
                </p>
              </div>
            </div>

            {/* Ihre Rechte */}
            <div className="bg-black/40 backdrop-blur-xl border border-teal-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-teal-400 mb-6 font-mono uppercase tracking-wider">
                Ihre Rechte
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Recht auf Auskunft</strong> über die von uns verarbeiteten personenbezogenen Daten</li>
                  <li><strong>Recht auf Berichtigung</strong> unrichtiger oder unvollständiger Daten</li>
                  <li><strong>Recht auf Löschung</strong> Ihrer gespeicherten Daten</li>
                  <li><strong>Recht auf Einschränkung</strong> der Datenverarbeitung</li>
                  <li><strong>Recht auf Datenübertragbarkeit</strong></li>
                  <li><strong>Recht auf Widerspruch</strong> gegen die Verarbeitung Ihrer Daten</li>
                  <li><strong>Recht auf Beschwerde</strong> bei einer Aufsichtsbehörde</li>
                </ul>
              </div>
            </div>

            {/* Speicherdauer */}
            <div className="bg-black/40 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-indigo-400 mb-6 font-mono uppercase tracking-wider">
                Speicherdauer
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist. 
                  Nach Wegfall des Zwecks werden die Daten gelöscht, sofern keine gesetzlichen Aufbewahrungsfristen bestehen.
                </p>
                <div className="bg-black/40 border border-indigo-400/30 rounded-xl p-4">
                  <div><strong>Server-Log-Dateien:</strong> 7 Tage</div>
                  <div><strong>Kontaktanfragen:</strong> Bis zur vollständigen Bearbeitung + 3 Jahre</div>
                  <div><strong>Domain-Prüfungen:</strong> Keine Speicherung</div>
                </div>
              </div>
            </div>

            {/* SSL/TLS Verschlüsselung */}
            <div className="bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-red-400 mb-6 font-mono uppercase tracking-wider">
                SSL/TLS Verschlüsselung
              </h2>
              <div className="text-gray-300 leading-relaxed">
                <p>
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine 
                  SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile 
                  des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
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
                Bei Fragen zum Datenschutz wenden Sie sich gerne an: 
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

export default DatenschutzPage
