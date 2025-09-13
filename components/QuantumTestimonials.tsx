'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const QuantumTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sarah Weber',
      company: 'MedTech Solutions GmbH',
      role: 'Geschäftsführerin',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Neoklar hat unsere Praxis-Website komplett neu entwickelt. Die Ladezeiten sind um 70% schneller geworden und wir haben 3x mehr Online-Terminbuchungen. Absolut professionell!',
      project: 'Praxis-Website mit Online-Terminbuchung',
      technology: 'Next.js + TypeScript',
      results: '+300% Online-Buchungen'
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'Bavarian Brewery',
      role: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Unser E-Commerce Shop läuft seit 6 Monaten fehlerfrei. Die Conversion-Rate ist um 250% gestiegen. Neoklar versteht wirklich, was moderne Webentwicklung bedeutet.',
      project: 'E-Commerce Shop mit Shopify',
      technology: 'Shopify + Liquid',
      results: '+250% Conversion-Rate'
    },
    {
      id: 3,
      name: 'Anna Müller',
      company: 'Creative Agency Munich',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Das Portfolio-Design ist atemberaubend! Wir haben 5 neue Kunden gewonnen, nur weil unsere Website so professionell aussieht. Neoklar ist ein echter Partner.',
      project: 'Portfolio-Website für Kreativagentur',
      technology: 'React + Framer Motion',
      results: '+5 neue Kunden'
    },
    {
      id: 4,
      name: 'Thomas Schmidt',
      company: 'TechStart Munich',
      role: 'CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Unsere Web-App läuft perfekt. Die Performance ist outstanding und die Benutzerfreundlichkeit top. Neoklar hat unsere Vision perfekt umgesetzt.',
      project: 'SaaS Web-App',
      technology: 'Next.js + Prisma + PostgreSQL',
      results: '99.9% Uptime'
    }
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

    const section = document.getElementById('testimonials')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const stats = [
    { label: 'Zufriedene Kunden', value: '50+', icon: '👥' },
    { label: 'Projekte abgeschlossen', value: '75+', icon: '🚀' },
    { label: 'Durchschnittliche Bewertung', value: '4.9/5', icon: '⭐' },
    { label: 'Wiederholungskunden', value: '85%', icon: '🔄' }
  ]

  return (
    <div id="testimonials" className="relative min-h-screen bg-transparent py-32 overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quantum Header */}
        <div className="text-center mb-20">
          <div className={`transform transition-all duration-2000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="inline-block relative mb-8">
              <div className="absolute inset-0 bg-gradient-cyber blur-2xl opacity-40"></div>
              <h2 className="relative text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                KUNDENSTIMMEN
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Was unsere <span className="text-cyan-400 font-semibold">Kunden über uns</span> sagen - 
              <span className="text-purple-400 font-semibold"> echte Ergebnisse</span> aus 
              <span className="text-emerald-400 font-semibold"> echten Projekten</span>.
            </p>

            {/* Abstract Divider */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-cyan-400"></div>
              <div className="w-3 h-3 border-2 border-cyan-400 rotate-45"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-purple-400"></div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 text-center transition-all duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-black text-cyan-400 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-300 font-mono uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main Testimonial */}
          <div className="relative bg-black/60 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl p-8 md:p-12 overflow-hidden">
            
            {/* Corner Quantum Elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cyan-400"></div>

            <div className="relative z-10">
              {/* Customer Info */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="relative">
                  <Image
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full border-2 border-cyan-400 object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-black flex items-center justify-center">
                    <span className="text-xs text-black font-bold">✓</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-white mb-1">
                    {testimonials[currentTestimonial].name}
                  </h3>
                  <p className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-1">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-gray-300 text-lg">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">★</span>
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 italic">
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </blockquote>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/40 border border-gray-700/50 rounded-xl p-4">
                  <div className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-2">PROJEKT</div>
                  <div className="text-white font-medium">{testimonials[currentTestimonial].project}</div>
                </div>
                
                <div className="bg-black/40 border border-gray-700/50 rounded-xl p-4">
                  <div className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-2">TECHNOLOGIE</div>
                  <div className="text-white font-medium">{testimonials[currentTestimonial].technology}</div>
                </div>
                
                <div className="bg-black/40 border border-gray-700/50 rounded-xl p-4">
                  <div className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-2">ERGEBNIS</div>
                  <div className="text-emerald-400 font-bold">{testimonials[currentTestimonial].results}</div>
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

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index 
                    ? 'bg-cyan-400 scale-125' 
                    : 'bg-gray-600 hover:bg-cyan-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-8 bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl px-8 py-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔒</span>
              <span className="text-gray-300 font-mono text-sm">DSGVO-KONFORM</span>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <span className="text-gray-300 font-mono text-sm">99.9% UPTIME</span>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🛡️</span>
              <span className="text-gray-300 font-mono text-sm">SICHER & SICHER</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default QuantumTestimonials
