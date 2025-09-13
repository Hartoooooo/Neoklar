'use client'

import React, { useState, useEffect } from 'react'

const QuantumBlogHero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-6xl mx-auto">
          {/* Glitch Effect Title */}
          <div className={`mb-8 mt-16 transform transition-all duration-2000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-7xl md:text-9xl font-black leading-none mb-4 relative">
              <span 
                className="bg-gradient-to-r from-white via-cyber-300 to-quantum-300 bg-clip-text text-transparent animate-pulse-slow text-white"
                style={{ 
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'white'
                }}
              >
                BLOG
              </span>
              <span className="absolute -inset-1 bg-gradient-cyber blur-lg opacity-30 -z-10"></span>
            </h1>
          </div>

          {/* Holographic Subtitle */}
          <div className={`mb-12 transform transition-all duration-2000 delay-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative">
              <p className="text-2xl md:text-4xl text-gray-300 font-light tracking-wide mb-2">
                WEBENTWICKLUNG <span 
                  className="bg-gradient-to-r from-white via-cyber-300 to-quantum-300 bg-clip-text text-transparent font-bold"
                  style={{ 
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >INSIGHTS</span>
              </p>
              <p className="text-lg md:text-xl text-cyber-400 font-mono uppercase tracking-widest">
                {'//'} Wissen, das Sie weiterbringt
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent h-px top-1/2 animate-pulse opacity-50"></div>
            </div>
          </div>

          {/* Futuristic Description */}
          <div className={`mb-16 transform transition-all duration-2000 delay-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative bg-black/30 backdrop-blur-md border border-neo-500/30 rounded-3xl p-8 max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-cyber opacity-10 rounded-3xl"></div>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed relative z-10">
                Entdecken Sie die <span className="text-cyber-400 font-semibold">neuesten Trends</span> in 
                <span className="text-quantum-400 font-semibold"> Webentwicklung</span>, 
                <span className="text-purple-400 font-semibold"> Design</span> und 
                <span className="text-pink-400 font-semibold"> digitaler Transformation</span>.
              </p>
            </div>
          </div>

          {/* Blog Stats */}
          <div className={`flex justify-center space-x-8 transform transition-all duration-2000 delay-1500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-quantum-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 font-mono text-sm">25+ ARTIKEL</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyber-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 font-mono text-sm">WÖCHENTLICH</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-neo-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 font-mono text-sm">EXPERTENWISSEN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuantumBlogHero
