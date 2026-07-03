'use client'

import React, { useState } from 'react'

type Project = {
  name: string
  url: string
  domain: string
}

const projects: Project[] = [
  { name: 'Schärfservice Hartmann', url: 'https://www.dentalschleifen.de', domain: 'dentalschleifen.de' },
  { name: 'BBS Berlin', url: 'https://www.artdesignbau.de', domain: 'artdesignbau.de' },
  { name: 'Westendpalais App 12', url: 'https://www.urlaubahlbeck.de', domain: 'urlaubahlbeck.de' },
  { name: 'micro dental', url: 'https://www.micro-dental.de', domain: 'micro-dental.de' },
]

// Live-Screenshot der aktuellen Seite, serverseitig gerendert.
const previewSrc = (url: string) =>
  `https://image.thum.io/get/width/1200/crop/760/noanimate/${url}`

const SiteFrame = ({ project, index }: { project: Project; index: number }) => {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div
      className="reveal-up group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors duration-500 hover:border-white/20"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {/* Browser-Leiste */}
      <div className="flex items-center gap-3 px-4 h-11 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="px-3 py-1 rounded-full bg-white/[0.04] text-xs text-zinc-400 truncate max-w-[70%]">
            {project.domain}
          </span>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} öffnen`}
          className="text-zinc-500 transition-colors hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5h5v5m0-5L10 14M9 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-3" />
          </svg>
        </a>
      </div>

      {/* Live-Vorschau */}
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block relative">
        <div className="relative w-full overflow-hidden bg-[#0d0d0f]" style={{ aspectRatio: '1200 / 760' }}>
          {/* Ladezustand */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
              loaded || failed ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
              Vorschau wird geladen
            </div>
          </div>

          {/* Fallback, falls der Screenshot nicht lädt */}
          {failed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
              <span className="text-white font-medium">{project.name}</span>
              <span className="text-sm text-zinc-500">{project.domain}</span>
            </div>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewSrc(project.url)}
            alt={`Vorschau der Website ${project.name}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`w-full h-full object-cover object-top transition-opacity duration-700 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Hover-Overlay */}
          <div className="absolute inset-0 flex items-end justify-start p-4 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-black text-sm font-medium">
              Live ansehen
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </a>

      {/* Fußzeile */}
      <div className="flex items-center justify-between px-5 py-4 border-t border-white/10">
        <h3 className="text-white font-medium">{project.name}</h3>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-400 transition-colors hover:text-white"
        >
          {project.domain}
        </a>
      </div>
    </div>
  )
}

const ProjectShowcase = () => {
  return (
    <section id="projekte" className="relative py-28 sm:py-36">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-sm text-zinc-500">Referenzen</span>
          <h2 className="heading-tight mt-3 text-4xl sm:text-5xl font-semibold text-white">
            Realisierte Projekte
          </h2>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            Ein Blick auf Websites, die wir umgesetzt haben. Jede Vorschau zeigt
            die aktuelle Seite. Klicken Sie hinein, um sie live zu öffnen.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <SiteFrame key={project.url} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectShowcase
