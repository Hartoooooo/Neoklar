'use client'

import { IconBrandNextjs, IconBrandReact } from '@tabler/icons-react'

const AnimatedShaderHero = () => {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToAdvantages = () => {
    document.querySelector('#tech-advantages')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5"
    >
      {/* Sehr dezenter Lichtschein oben, sonst pures Schwarz */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-60"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 grid-faint opacity-[0.6]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center pt-24 pb-20">
        {/* Badge */}
        <div className="reveal-fade inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/[0.03] text-sm text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Individuelle Webentwicklung
        </div>

        {/* Headline */}
        <h1 className="heading-tight reveal-up delay-1 text-5xl sm:text-6xl md:text-7xl font-semibold text-white">
          Webseiten, die
          <br />
          <span className="text-zinc-400">für Sie arbeiten.</span>
        </h1>

        {/* Subline */}
        <p className="reveal-up delay-2 mt-7 max-w-xl mx-auto text-lg text-zinc-400 leading-relaxed">
          Wir bauen schnelle, klare Webseiten, die gut aussehen und neue Kunden
          bringen. Sauber umgesetzt, ohne unnötigen Ballast.
        </p>

        {/* CTAs */}
        <div className="reveal-up delay-3 mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={scrollToContact}
            className="px-7 py-3.5 rounded-full bg-white text-black font-medium transition-transform duration-300 hover:scale-[1.03]"
          >
            Projekt starten
          </button>
          <button
            onClick={scrollToAdvantages}
            className="px-7 py-3.5 rounded-full border border-white/15 text-white font-medium transition-colors duration-300 hover:bg-white/5"
          >
            Vorteile ansehen
          </button>
        </div>

        {/* Tech-Zeile */}
        <div className="reveal-fade delay-5 mt-16 flex items-center justify-center gap-8 text-zinc-500">
          <div className="flex items-center gap-2">
            <IconBrandNextjs className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm">Next.js</span>
          </div>
          <div className="flex items-center gap-2">
            <IconBrandReact className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm">React</span>
          </div>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
              <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
            </svg>
            <span className="text-sm">Tailwind CSS</span>
          </div>
        </div>
      </div>

      {/* Scroll-Hinweis */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 reveal-fade delay-5">
        <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1.5">
          <span className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
        </div>
      </div>
    </section>
  )
}

export default AnimatedShaderHero
