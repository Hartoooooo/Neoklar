'use client'

import React, { useEffect, useState } from 'react'

const GlobalBackground = () => {
  const [scrollY, setScrollY] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [documentHeight, setDocumentHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      setDocumentHeight(Math.max(window.innerHeight, document.documentElement.scrollHeight))
    }

    // Initialize window size and document height
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    setDocumentHeight(Math.max(window.innerHeight, document.documentElement.scrollHeight))

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-20"></div>
      
      {/* Grid Pattern - Static on Mobile, Animated on Desktop */}
      <div className="absolute inset-0 opacity-35">
        <div 
          className="absolute" 
          style={{
            top: `${-scrollY}px`,
            left: 0,
            right: 0,
            height: `${Math.max(documentHeight, windowSize.height + scrollY)}px`,
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.35) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(99, 102, 241, 0.35) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            backgroundRepeat: 'repeat',
            backgroundPosition: `0 ${scrollY * 0.03}px`,
            animation: windowSize.width >= 768 ? 'grid 20s linear infinite' : 'none'
          }}
        ></div>
      </div>

    </div>
  )
}

export default GlobalBackground
