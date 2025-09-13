'use client'

import React, { useState } from 'react'

const BlogNewsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setIsSubscribed(true)
    setEmail('')
    
    setTimeout(() => setIsSubscribed(false), 5000)
  }

  return (
    <div className="relative min-h-screen bg-transparent py-32 overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="relative bg-black/60 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl p-8 md:p-12 overflow-hidden">
          
          {/* Corner Quantum Elements */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cyan-400"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-cyan-400"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cyan-400"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-6">
              NEWSLETTER
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Verpassen Sie keine <span className="text-cyan-400 font-semibold">Webentwicklung-Insights</span> mehr. 
              Erhalten Sie wöchentlich die <span className="text-purple-400 font-semibold">neuesten Trends</span> und 
              <span className="text-emerald-400 font-semibold"> praktische Tipps</span> direkt in Ihr Postfach.
            </p>

            {isSubscribed ? (
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center text-green-400 mb-2">
                  <span className="animate-pulse mr-2">✓</span>
                  ERFOLGREICH ANGEMELDET!
                </div>
                <p className="text-green-300 text-sm font-mono">
                  Vielen Dank! Sie erhalten in Kürze eine Bestätigungs-E-Mail.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ihre@email.de"
                    required
                    className="flex-1 px-4 py-4 bg-black/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-400 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold uppercase tracking-wider rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                  >
                    {isLoading ? 'ANMELDEN...' : 'ANMELDEN'}
                  </button>
                </div>
                
                <p className="text-xs text-gray-400 mt-4 font-mono">
                  Keine Spam-E-Mails. Jederzeit abmeldbar.
                </p>
              </form>
            )}

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl mb-2">📧</div>
                <h3 className="text-cyan-400 font-bold mb-2">WÖCHENTLICH</h3>
                <p className="text-gray-300 text-sm">Frische Insights direkt in Ihr Postfach</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="text-cyan-400 font-bold mb-2">RELEVANT</h3>
                <p className="text-gray-300 text-sm">Nur die wichtigsten Trends und Tipps</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="text-cyan-400 font-bold mb-2">PRAKTISCH</h3>
                <p className="text-gray-300 text-sm">Sofort umsetzbare Lösungen</p>
              </div>
            </div>
          </div>

          {/* Quantum Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                style={{
                  left: `${10 + (i * 12)}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogNewsletter
