'use client'

import React from 'react'

const QuantumBlogHero = () => {
  return (
    <section className="relative pt-40 pb-16 px-5">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh] opacity-60"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <span className="reveal-fade text-sm text-zinc-500">Blog</span>
        <h1 className="heading-tight reveal-up delay-1 mt-3 text-5xl sm:text-6xl font-semibold text-white">
          Einblicke in Web und Design
        </h1>
        <p className="reveal-up delay-2 mt-6 text-lg text-zinc-400 leading-relaxed">
          Praktische Beiträge zu Webentwicklung, Design und Sichtbarkeit im Netz.
          Kurz, konkret und ohne Fachchinesisch.
        </p>
      </div>
    </section>
  )
}

export default QuantumBlogHero
