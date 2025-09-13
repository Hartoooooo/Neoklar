'use client'

import React, { useState, useEffect } from 'react'

const SocialProof = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStat, setCurrentStat] = useState(0)

  const stats = [
    { label: 'Projekte abgeschlossen', value: '75+', icon: '🚀' },
    { label: 'Zufriedene Kunden', value: '50+', icon: '👥' },
    { label: 'Jahre Erfahrung', value: '5+', icon: '⭐' },
    { label: 'Durchschnittliche Bewertung', value: '4.9/5', icon: '💯' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('social-proof')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [stats.length])

  const achievements = [
    {
      title: 'Google Partner',
      description: 'Zertifizierter Google Partner für Webentwicklung',
      icon: '🏆',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'Shopify Partner',
      description: 'Offizieller Shopify Partner für E-Commerce',
      icon: '🛍️',
      color: 'from-green-500 to-emerald-400'
    },
    {
      title: 'Next.js Expert',
      description: 'Zertifizierter Next.js Entwickler',
      icon: '⚡',
      color: 'from-purple-500 to-pink-400'
    },
    {
      title: 'TypeScript Master',
      description: 'Experte für TypeScript Entwicklung',
      icon: '🔧',
      color: 'from-orange-500 to-red-400'
    }
  ]

  const recentActivity = [
    { text: 'Neues Projekt gestartet: E-Commerce Shop für Mode-Label', time: '2 Min' },
    { text: 'Website für Restaurant optimiert - 300% schnellere Ladezeiten', time: '15 Min' },
    { text: 'Kunde aus München hat 5-Sterne-Bewertung hinterlassen', time: '1 Std' },
    { text: 'Neuer Blog-Artikel veröffentlicht: "Next.js 15 Features"', time: '2 Std' },
    { text: 'Portfolio-Website für Fotografen live geschaltet', time: '3 Std' }
  ]

  return (
    <div id="social-proof" className="relative min-h-screen bg-transparent py-32 overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quantum Header */}
        <div className="text-center mb-20">
          <div className={`transform transition-all duration-2000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="inline-block relative mb-8">
              <div className="absolute inset-0 bg-gradient-cyber blur-2xl opacity-40"></div>
              <h2 className="relative text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                VERTRAUEN
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Warum <span className="text-cyan-400 font-semibold">Kunden uns vertrauen</span> - 
              <span className="text-purple-400 font-semibold"> Zahlen, Zertifikate</span> und 
              <span className="text-emerald-400 font-semibold"> echte Ergebnisse</span>.
            </p>

            {/* Abstract Divider */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-cyan-400"></div>
              <div className="w-3 h-3 border-2 border-cyan-400 rotate-45"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-purple-400"></div>
            </div>
          </div>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 text-center transition-all duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              } ${currentStat === index ? 'scale-105 border-cyan-400' : ''}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-black text-cyan-400 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-300 font-mono uppercase tracking-wider">{stat.label}</div>
              
              {/* Animated border */}
              {currentStat === index && (
                <div className="absolute inset-0 border-2 border-cyan-400 rounded-2xl animate-pulse"></div>
              )}
            </div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`relative bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 transition-all duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{achievement.description}</p>
              </div>
              
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-5 rounded-2xl`}></div>
            </div>
          ))}
        </div>

        {/* Live Activity Feed */}
        <div className="relative bg-black/60 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl p-8 overflow-hidden">
          
          {/* Corner Quantum Elements */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cyan-400"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-cyan-400"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cyan-400"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="text-2xl font-black text-white">LIVE AKTIVITÄT</h3>
              <span className="text-cyan-400 font-mono text-sm">REAL-TIME</span>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 bg-black/40 border border-gray-700/50 rounded-xl transition-all duration-500 ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${600 + index * 200}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-200">{activity.text}</span>
                  </div>
                  <span className="text-cyan-400 font-mono text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantum Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                style={{
                  left: `${10 + (i * 15)}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-8 bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl px-8 py-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔒</span>
              <span className="text-gray-300 font-mono text-sm">SSL-VERSCHLÜSSELT</span>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <span className="text-gray-300 font-mono text-sm">99.9% UPTIME</span>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🛡️</span>
              <span className="text-gray-300 font-mono text-sm">DSGVO-KONFORM</span>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⭐</span>
              <span className="text-gray-300 font-mono text-sm">4.9/5 BEWERTUNG</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SocialProof
