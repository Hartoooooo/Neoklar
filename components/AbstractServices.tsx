'use client'

import React from 'react'
import Image from 'next/image'
import { IconBrandNextjs, IconBrandReact, IconBrandTypescript, IconBrandHtml5, IconBrandCss3, IconCode } from '@tabler/icons-react'

const AbstractServices = () => {

  const services = [
    {
      id: '01',
      title: 'WESTENDPALAIS APP 12',
      subtitle: 'Moderne Ferienwohnung Website',
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
  ]


  return (
    <div id="services" className="hidden relative min-h-screen bg-transparent py-24 overflow-hidden">

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
                      {/* Technology Icons for Westendpalais */}
                      {service.id === '01' && (
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <IconBrandReact className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
                            <span className="text-xs text-gray-400 font-medium">React</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400" fill="currentColor">
                              <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                            </svg>
                            <span className="text-xs text-gray-400 font-medium">TailwindCSS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <IconBrandTypescript className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
                            <span className="text-xs text-gray-400 font-medium">TypeScript</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Technology Icons for Schärfservice */}
                      {service.id === '02' && (
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <svg viewBox="0 0 32 32" className="w-5 h-5 text-cyan-400" fill="currentColor">
                              <path d="M 12.800781 3 C 11.036985 3 9.6296249 5.0832753 9.1152344 8.2597656 L 5.8007812 9.1992188 L 3.4003906 26.199219 L 19 29 L 28.599609 27.099609 L 25.5 7.0996094 L 22.699219 6.6992188 L 20.599609 5 L 19.431641 5.3320312 C 18.695913 3.8438173 17.659454 3 16.5 3 C 16.001696 3 15.296296 3.1453859 14.613281 3.8222656 C 14.079545 3.29588 13.473033 3 12.800781 3 z M 12.900391 5 C 13.165961 5 13.743502 5.4734923 14.150391 6.8300781 L 11.275391 7.6464844 C 11.727369 5.842949 12.501879 5 12.900391 5 z M 16.5 5 C 16.69148 5 17.04878 5.2854228 17.410156 5.9042969 L 16.03125 6.296875 C 15.922597 5.9804534 15.80502 5.6828 15.677734 5.4082031 L 15.800781 5.5 C 16.000781 5.2 16.3 5 16.5 5 z M 19.226562 7.359375 L 18.044922 26.820312 L 5.6992188 24.5 L 7.5996094 10.800781 L 19.226562 7.359375 z M 21.189453 7.9960938 L 21.800781 8.5 L 23.699219 8.8007812 L 26.300781 25.599609 L 20.048828 26.798828 L 21.189453 7.9960938 z M 14.5 11.900391 C 11.5 11.900391 10 13.800391 10 15.900391 C 10 18.400391 12.400391 18.400391 12.400391 19.900391 C 12.400391 20.300391 12.1 20.800781 11.5 20.800781 C 10.5 20.800781 9.4003906 19.800781 9.4003906 19.800781 L 8.8007812 21.699219 C 8.8007812 21.699219 9.8996094 23 12.099609 23 C 13.899609 23 15.199219 21.6 15.199219 19.5 C 15.199219 16.9 12.199219 16.400781 12.199219 15.300781 C 12.199219 15.100781 12.299609 14.300781 13.599609 14.300781 C 14.499609 14.300781 15.199219 14.699219 15.199219 14.699219 L 16 12.199219 C 16 12.199219 15.4 11.900391 14.5 11.900391 z"/>
                            </svg>
                            <span className="text-xs text-gray-400 font-medium">Shopify</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <IconBrandHtml5 className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
                            <span className="text-xs text-gray-400 font-medium">HTML</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-cyan-400 rounded text-black text-[10px] font-bold flex items-center justify-center">
                              CSS
                            </div>
                            <span className="text-xs text-gray-400 font-medium">CSS</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <IconCode className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
                            <span className="text-xs text-gray-400 font-medium">Custom Liquid</span>
                          </div>
                        </div>
                      )}
                      
                      {/* SEO Success for Schärfservice */}
                      {service.id === '02' && (
                        <div className="mt-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <span className="text-cyan-400 font-semibold text-sm">SEO-Erfolg:</span>
                            </div>
                            <span className="text-white text-sm">
                              Platz 1 bei &quot;dentalinstrumente schärfen berlin&quot;
                            </span>
                          </div>
                        </div>
                      )}
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
