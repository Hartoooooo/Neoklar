'use client'

import React, { useEffect, useState } from 'react'

const GlobalBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    // Initialize window size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-20"></div>
      
      {/* Moving Grid Pattern with Parallax */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'grid 20s linear infinite',
            transform: `translateY(${scrollY * 0.03}px)`
          }}
        ></div>
      </div>

      {/* Dynamic Mouse-Following Orb */}
      <div 
        className="absolute w-96 h-96 bg-gradient-cyber rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>

      {/* Floating Abstract Shapes with Parallax */}
      {mounted && (
      <div className="absolute inset-0 pointer-events-none">
        {/* Morphing Blob 1 */}
        <div 
          className="absolute w-32 h-32 bg-gradient-to-r from-neo-500 to-cyber-400 animate-morph opacity-30 blur-sm transition-transform duration-75 ease-out"
          style={{ 
            top: `${20 + scrollY * 0.02}px`,
            left: `${20 + scrollY * 0.01}px`,
            transform: `translateY(${scrollY * -0.05}px)`
          }}
        ></div>
        
        {/* Floating Hexagon */}
        <div 
          className="absolute w-24 h-24 border-2 border-quantum-400 rotate-45 animate-float opacity-40 transition-transform duration-75 ease-out"
          style={{ 
            top: `${windowSize.height * 0.33 + scrollY * 0.03}px`,
            right: `${20 + scrollY * 0.01}px`,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            transform: `translateY(${scrollY * -0.07}px) rotate(${45 + scrollY * 0.03}deg)`
          }}
        ></div>
        
        {/* Circle */}
        <div 
          className="absolute w-16 h-16 bg-cyber-500 rounded-full opacity-35 transition-transform duration-75 ease-out"
          style={{ 
            bottom: `${windowSize.height * 0.33 - scrollY * 0.02}px`,
            left: `${windowSize.width * 0.25 + scrollY * 0.015}px`,
            transform: `translateY(${scrollY * 0.03}px)`
          }}
        ></div>
        
        {/* Abstract Lines */}
        <div 
          className="absolute w-px h-32 bg-gradient-to-b from-neo-400 to-transparent transition-transform duration-75 ease-out"
          style={{ 
            top: `${windowSize.height * 0.5 + scrollY * 0.025}px`,
            right: `${windowSize.width * 0.33 + scrollY * 0.01}px`,
            transform: `translateY(${scrollY * -0.04}px) rotate(${45 + scrollY * 0.02}deg)`
          }}
        ></div>
        <div 
          className="absolute w-40 h-px bg-gradient-to-r from-quantum-400 to-transparent transition-transform duration-75 ease-out"
          style={{ 
            top: `${windowSize.height * 0.25 + scrollY * 0.02}px`,
            left: `${windowSize.width * 0.5 + scrollY * 0.01}px`,
            transform: `translateY(${scrollY * -0.06}px)`
          }}
        ></div>

        {/* Additional floating elements for more coverage */}
        <div 
          className="absolute w-20 h-20 bg-gradient-to-r from-quantum-500 to-neo-400 animate-morph opacity-25 blur-md transition-transform duration-75 ease-out"
          style={{ 
            top: `${windowSize.height * 0.75 + scrollY * 0.015}px`,
            right: `${windowSize.width * 0.25 + scrollY * 0.01}px`,
            transform: `translateY(${scrollY * 0.025}px)`
          }}
        ></div>
        <div 
          className="absolute w-12 h-12 border border-cyber-400 animate-float opacity-35 transition-transform duration-75 ease-out"
          style={{ 
            bottom: `${20 - scrollY * 0.02}px`,
            right: `${40 + scrollY * 0.01}px`,
            transform: `translateY(${scrollY * -0.03}px) rotate(${12 + scrollY * 0.025}deg)`
          }}
        ></div>
        <div 
          className="absolute w-8 h-8 bg-neo-500 rounded-full opacity-30 transition-transform duration-75 ease-out"
          style={{ 
            top: `${windowSize.height * 0.5 + scrollY * 0.02}px`,
            left: `${20 + scrollY * 0.015}px`,
            transform: `translateY(${scrollY * 0.04}px)`
          }}
        >        </div>
      </div>
      )}
    </div>
  )
}

export default GlobalBackground
