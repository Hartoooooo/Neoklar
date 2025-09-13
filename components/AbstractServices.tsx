'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const AbstractServices = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const services = [
    {
      id: '01',
      title: 'WESTENDPALAIS APP 12',
      subtitle: 'Next.js + Tailwind CSS',
      description: 'Mehr Buchungen durch ansprechende Ferienwohnung-Website',
      icon: '🏖️',
      color: 'from-cyan-500 to-blue-600',
      glowColor: 'shadow-cyan',
      pattern: 'hexagon',
      technology: 'React - Next.js - Tailwind',
      image: 'https://via.placeholder.com/400x300/1e293b/06b6d4?text=Westendpalais+App+12',
      alt: 'Westendpalais App 12 - Moderne Ferienwohnung Website mit Next.js und Tailwind CSS'
    },
    {
      id: '02',
      title: 'CORPORATE WEBSITE',
      subtitle: 'Liquid + Shopify',
      description: 'Vertrauen schaffen und Kunden gewinnen mit professioneller Webpräsenz',
      icon: '🏢',
      color: 'from-purple-500 to-pink-600',
      glowColor: 'shadow-neo',
      pattern: 'triangle',
      technology: 'Liquid',
      image: 'https://via.placeholder.com/400x300/312e81/a855f7?text=Corporate+Demo',
      alt: 'Corporate Website - Professionelle Unternehmenswebseite mit Shopify und Liquid'
    },
    {
      id: '03',
      title: 'PORTFOLIO WEBSITE',
      subtitle: 'React + TypeScript',
      description: 'Ihre Arbeiten perfekt präsentieren und neue Aufträge gewinnen',
      icon: '🎨',
      color: 'from-green-400 to-emerald-600',
      glowColor: 'shadow-quantum',
      pattern: 'diamond',
      technology: 'React',
      image: 'https://via.placeholder.com/400x300/065f46/10b981?text=Portfolio+Demo',
      alt: 'Portfolio Website - Kreative Portfolio-Webseite mit React und TypeScript für Designer'
    },
    {
      id: '04',
      title: 'WEB APP',
      subtitle: 'Vue.js + Node.js',
      description: 'Geschäftsprozesse digitalisieren und Ihren Erfolg automatisieren',
      icon: '⚡',
      color: 'from-orange-400 to-red-600',
      glowColor: 'shadow-cyber',
      pattern: 'circle',
      technology: 'Vue.js',
      image: 'https://via.placeholder.com/400x300/c2410c/fb923c?text=Web+App+Demo'
    }
  ]

  const getGeometricShape = (pattern: string) => {
    const shapes = {
      hexagon: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
      triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
      diamond: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      circle: 'circle(50% at 50% 50%)'
    }
    return shapes[pattern as keyof typeof shapes] || shapes.hexagon
  }

  return (
    <div id="services" className="relative min-h-screen bg-transparent py-32 overflow-hidden">

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quantum Header */}
        <div className="text-center mb-20">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-cyber blur-2xl opacity-30"></div>
            <h2 className="relative text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-6">
              ERFOLGSGESCHICHTEN
            </h2>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
              So machen wir <span className="text-cyan-400 font-semibold">Unternehmen erfolgreich sichtbar</span> - von der 
              <span className="text-purple-400 font-semibold"> ersten Idee bis zur gewinnbringenden Webseite</span>, 
              die Ihnen mehr Kunden und Umsatz bringt.
            </p>
            
            {/* Abstract Divider */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-cyan-400"></div>
              <div className="w-3 h-3 border-2 border-cyan-400 rotate-45"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-purple-400"></div>
            </div>
          </div>
        </div>

        {/* Abstract Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Main Service Card */}
              <div className={`relative h-[500px] bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl transition-all duration-500 transform group-hover:scale-[1.02] overflow-hidden ${
                hoveredService === index ? `${service.glowColor}` : ''
              }`}>
                
                {/* Website Preview Image */}
                <div className="relative h-80 overflow-hidden rounded-t-3xl">
                  <Image 
                    src={service.image} 
                    alt={service.alt || `${service.title} Preview - ${service.description}`}
                    width={400}
                    height={320}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    priority={service.id === '01'}
                  />
                  
                  {/* Technology Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 bg-gradient-to-r ${service.color} text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg`}>
                      {service.technology}
                    </div>
                  </div>

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>

                {/* Floating Icon */}
                <div className="absolute top-4 left-4 z-10">
                  <div className={`relative w-12 h-12 flex items-center justify-center border-2 border-gray-600 bg-black/80 backdrop-blur-md rounded-xl transition-all duration-500 group-hover:border-cyan-400 group-hover:shadow-cyan`}>
                    <span className="text-lg text-cyan-400">{service.icon}</span>
                    <div className="absolute inset-0 border border-cyan-400/30 transform scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
                  </div>
                </div>

                {/* Service ID */}
                <div className="absolute top-4 left-20 z-10">
                  <span className="text-gray-400 font-mono text-xs bg-black/60 px-2 py-1 rounded">{service.id}</span>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-6 h-[calc(100%-320px)]">
                  <div>
                    <div className="mb-3">
                      <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors duration-500">
                        {service.title}
                      </h3>
                      <p className="text-cyan-400 font-mono text-sm uppercase tracking-wider">
                        {service.subtitle}
                      </p>
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* View Project Button */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="relative h-1 bg-gray-800 overflow-hidden flex-1 mr-4">
                      <div 
                        className={`h-full bg-gradient-to-r ${service.color} transform origin-left transition-all duration-1000 ${
                          hoveredService === index ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      ></div>
                    </div>
                    
                    <button className="text-cyan-400 hover:text-white text-sm font-mono uppercase tracking-wider transition-colors duration-300 flex items-center gap-2">
                      ANSEHEN
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Quantum Particles */}
                {hoveredService === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>

              {/* Holographic Shadow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-xl transform translate-y-4 transition-all duration-700 -z-10`}></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default AbstractServices
