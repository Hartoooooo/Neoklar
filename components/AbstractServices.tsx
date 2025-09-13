'use client'

import React from 'react'
import Image from 'next/image'

const AbstractServices = () => {

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
      image: '/Bild 13.09.25 um 19.40.jpg',
      websiteUrl: 'https://westendpalais.vercel.app/',
      alt: 'Westendpalais App 12 - Moderne Ferienwohnung Website mit Next.js und Tailwind CSS'
    },
    {
      id: '02',
      title: 'SCHÄRFSERVICE HARTMANN',
      subtitle: 'Next.js + Tailwind CSS',
      description: 'Professionelle Schärfservice-Website mit modernem Design und hoher Conversion-Rate',
      icon: '⚔️',
      color: 'from-purple-500 to-pink-600',
      glowColor: 'shadow-neo',
      pattern: 'triangle',
      technology: 'React - Next.js - Tailwind',
      image: '/Bild 13.09.25 um 19.38.jpg',
      websiteUrl: 'https://xn--schrfservice-hartmann-71b.de/',
      alt: 'Schärfservice Hartmann - Professionelle Schärfservice Website mit modernem Design'
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
      websiteUrl: 'https://portfolio-demo.vercel.app'
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
      websiteUrl: 'https://webapp-demo.vercel.app'
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
              className="relative"
            >
              {/* Main Service Card */}
              <div className="relative h-[500px]">
                
                {/* Service Content Card */}
                <div className="relative w-full h-80 rounded-xl overflow-hidden border border-gray-600 bg-gradient-to-br from-gray-900 to-gray-800">
                  {service.image ? (
                    // Mit Bild - nur Bild ohne Text
                    <div className="relative w-full h-full">
                      <Image 
                        src={service.image} 
                        alt={service.alt || `${service.title} Preview - ${service.description}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    // Ohne Bild
                    <div className="w-full h-full flex flex-col justify-center items-center p-8">
                      <div className="text-center">
                        <div className="text-6xl mb-4">{service.icon}</div>
                        <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                        <p className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-4">{service.subtitle}</p>
                        <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 md:group-hover:opacity-100 transition-all duration-500"></div>



                {/* Service ID */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="text-gray-400 font-mono text-xs bg-black/60 px-2 py-1 rounded">{service.id}</span>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between h-[calc(100%-320px)]">
                  <div className="text-left">
                    <div className="mb-3 pt-6">
                      <h3 className="text-xl font-black text-white mb-2 md:group-hover:text-cyan-400 transition-colors duration-500">
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
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default AbstractServices
