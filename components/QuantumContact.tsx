'use client'

import React, { useState, useEffect } from 'react'

const QuantumContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: 'neural-interface',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [quantumField, setQuantumField] = useState(Array(20).fill(0).map(() => Math.random()))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const interval = setInterval(() => {
      setQuantumField(prev => prev.map(() => Math.random()))
    }, 2000)

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)
    
    // Simulate quantum processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsAnalyzing(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', project: 'neural-interface', message: '' })
    
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactNodes = [
    { 
      id: 'transmission', 
      title: 'E-Mail', 
      value: 'neoklar.info@gmail.com',
      icon: '⟡',
      color: 'from-cyan-400 to-blue-500'
    }
  ]

  const projectTypes = [
    { value: 'neural-interface', label: 'NEURALE SCHNITTSTELLE' },
    { value: 'quantum-aesthetics', label: 'QUANTUM ÄSTHETIK' },
    { value: 'data-crystallization', label: 'DATEN KRISTALLISATION' },
    { value: 'temporal-optimization', label: 'TEMPORALE OPTIMIERUNG' },
    { value: 'dimension-bridge', label: 'DIMENSIONS BRÜCKE' }
  ]

  return (
    <div id="contact" className="relative min-h-screen bg-transparent py-24 overflow-hidden">

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quantum Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-cyber blur-2xl opacity-40"></div>
            <h2 className="relative text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-6">
              KONTAKT
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Bereit für Ihre <span className="text-cyan-400 font-semibold">erfolgreiche Webseite</span>? 
            Kontaktieren Sie uns <span className="text-purple-400 font-semibold"> für ein kostenloses Beratungsgespräch</span>. 
            Gemeinsam machen wir Ihr Unternehmen online sichtbar.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
          {/* Quantum Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-cyber opacity-10 blur-2xl"></div>
            <div className="relative bg-black/60 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl p-8 overflow-hidden">
              
              {/* Corner Quantum Elements */}
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cyan-400"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-cyan-400"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cyan-400"></div>

              <div className="relative z-10">
                <h3 className="text-3xl font-black text-white mb-8 flex items-center">
                  <span className="text-cyan-400 mr-4">◊</span>
                  ÜBERTRAGUNGSPROTOKOLL
                </h3>

                {isSubmitted && (
                  <div className="mb-8 p-6 bg-green-500/10 border border-green-400/30 rounded-xl">
                    <div className="flex items-center text-green-400 mb-2">
                      <span className="animate-pulse mr-2">●</span>
                      QUANTUM VERBINDUNG HERGESTELLT
                    </div>
                    <p className="text-green-300 text-sm font-mono">
                      Ihre Übertragung wurde empfangen. Neurale Antwort wird gesendet...
                    </p>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="mb-8 p-6 bg-cyan-500/10 border border-cyan-400/30 rounded-xl">
                    <div className="flex items-center text-cyan-400 mb-2">
                      <span className="animate-spin mr-2">◇</span>
                      ANALYSIERE QUANTUM SIGNATUR...
                    </div>
                    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse"></div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Identity Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-cyan-400 font-mono text-sm uppercase tracking-wider mb-3">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-black/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-400 transition-all duration-300"
                        placeholder="Ihr Name..."
                      />
                      <div className="absolute inset-0 border border-cyan-400/20 rounded-lg pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity"></div>
                    </div>

                    <div className="relative">
                      <label className="block text-cyan-400 font-mono text-sm uppercase tracking-wider mb-3">
                        E-Mail
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-black/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-400 transition-all duration-300"
                        placeholder="ihre@email.de"
                      />
                      <div className="absolute inset-0 border border-cyan-400/20 rounded-lg pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity"></div>
                    </div>
                  </div>


                  {/* Message Matrix */}
                  <div className="relative">
                    <label className="block text-cyan-400 font-mono text-sm uppercase tracking-wider mb-3">
                      Nachricht
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-black/50 border border-gray-600 rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-400 resize-none transition-all duration-300"
                      placeholder="Ihre Nachricht..."
                    />
                    <div className="absolute inset-0 border border-cyan-400/20 rounded-lg pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Quantum Submit */}
                  <button
                    type="submit"
                    disabled={isAnalyzing}
                    className="group relative w-full px-4 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 font-bold uppercase tracking-wider hover:bg-cyan-500 hover:text-black transition-all duration-300 disabled:opacity-50 rounded-lg"
                  >
                    <span className="relative z-10">
                      {isAnalyzing ? 'ANALYSIERE QUANTUM SIGNATUR' : 'ABSENDEN'}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Nodes */}
          <div className="space-y-8">
            {contactNodes.map((node, index) => (
              <div
                key={node.id}
                className="group relative bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500"></div>
                
                <div className="relative flex items-center">
                  {/* Node Info */}
                  <div className="flex-1">
                    <h4 className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-1">
                      {node.title}
                    </h4>
                    {node.id === 'transmission' ? (
                      <a 
                        href={`mailto:${node.value}`}
                        className="text-white font-medium text-lg hover:text-cyan-400 transition-colors duration-300"
                      >
                        {node.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium text-lg">
                        {node.value}
                      </p>
                    )}
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400 font-mono">ACTIVE</span>
                  </div>
                </div>

                {/* Quantum Trail */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default QuantumContact
