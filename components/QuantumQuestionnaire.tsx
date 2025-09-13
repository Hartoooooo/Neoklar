'use client'

import React, { useState, useEffect, useRef } from 'react'

const QuantumQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [domainCheckStatus, setDomainCheckStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'error'>('idle')
  const [domainCheckTimeout, setDomainCheckTimeout] = useState<NodeJS.Timeout | null>(null)
  const [formData, setFormData] = useState({
    // Grundlegende Informationen
    projectType: '',
    customProjectType: '',
    industry: '',
    companyName: '',
    
    // Inhalte & Texte
    hasContent: '',
    needsContent: '',
    pageCount: '',
    hasImages: '',
    needsImages: '',
    
    // Design & Funktionen
    designStyle: 'minimal',
    colors: [] as string[],
    customColors: [] as string[], // Für selbst gemischte Farben
    features: [] as string[],
    
    // Technische Anforderungen
    timeline: '',
    budget: '',
    customBudget: '',
    domain: '',
    existingDomain: '',
    desiredDomain: '',
    
    // Spezielle Anforderungen
    accessibility: '',
    seo: '',
    multilingual: '',
    
    // Kontakt & Zusätzliches
    contactPersonFirstName: '',
    contactPersonLastName: '',
    contactEmail: '',
    contactPhone: '',
    preferredContact: '',
    additionalInfo: ''
  })
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isCompleted, setIsCompleted] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [showColorMixer, setShowColorMixer] = useState(false)
  const [currentMixColor, setCurrentMixColor] = useState('#6366f1')
  const [hue, setHue] = useState(240)
  const [saturation, setSaturation] = useState(100)
  const [lightness, setLightness] = useState(50)
  const colorInputRef = useRef<HTMLInputElement>(null)
  const colorWheelRef = useRef<HTMLDivElement>(null)
  const lightnessSliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggingLightness, setIsDraggingLightness] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleGlobalMouseUp = () => {
      setIsDragging(false)
      setIsDraggingLightness(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleGlobalMouseUp)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [])

  // Domain availability check function
  const checkDomainAvailability = async (domain: string) => {
    if (!domain || domain.length < 3) {
      setDomainCheckStatus('idle')
      return
    }

    // Basic domain format validation
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/
    if (!domainRegex.test(domain)) {
      setDomainCheckStatus('error')
      return
    }

    setDomainCheckStatus('checking')

    try {
      // Using a simple DNS lookup approach
      // This checks if the domain resolves (indicating it's registered)
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`)
      const data = await response.json()
      
      if (data.Status === 0 && data.Answer && data.Answer.length > 0) {
        setDomainCheckStatus('taken')
      } else {
        setDomainCheckStatus('available')
      }
    } catch (error) {
      // Fallback: Try to fetch the domain directly
      try {
        const pingResponse = await fetch(`https://${domain}`, { 
          method: 'HEAD', 
          mode: 'no-cors',
          signal: AbortSignal.timeout(3000)
        })
        setDomainCheckStatus('taken')
      } catch {
        setDomainCheckStatus('available')
      }
    }
  }

  // Debounced domain check
  const debouncedDomainCheck = (domain: string) => {
    if (domainCheckTimeout) {
      clearTimeout(domainCheckTimeout)
    }
    
    const timeout = setTimeout(() => {
      checkDomainAvailability(domain)
    }, 1000) // Wait 1 second after user stops typing
    
    setDomainCheckTimeout(timeout)
  }

  const questionSteps = [
    {
      id: 'basics',
      title: 'BASIS',
      subtitle: 'Grundlegende Informationen',
      icon: '◊',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'content',
      title: 'INHALT',
      subtitle: 'Texte und Medien',
      icon: '◈',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'design',
      title: 'DESIGN',
      subtitle: 'Visuelles Konzept',
      icon: '⬡',
      color: 'from-green-400 to-emerald-600'
    },
    {
      id: 'technical',
      title: 'TECH',
      subtitle: 'Technische Spezifikationen',
      icon: '◉',
      color: 'from-orange-400 to-red-600'
    },
    {
      id: 'requirements',
      title: 'SYSTEM',
      subtitle: 'Erweiterte Features',
      icon: '○',
      color: 'from-indigo-400 to-purple-600'
    },
    {
      id: 'finalization',
      title: 'ABSCHLUSS',
      subtitle: 'Finale Details',
      icon: '◇',
      color: 'from-teal-400 to-cyan-600'
    }
  ]

  const industries = [
    'Technologie & Software',
    'Gesundheitswesen',
    'Finanzdienstleistungen',
    'E-Commerce & Handel',
    'Beratung & Dienstleistungen',
    'Immobilien',
    'Bildung & Training',
    'Tourismus & Gastgewerbe',
    'Kunst & Kreativ',
    'Nonprofit & Soziales',
    'Handwerk & Produktion',
    'Landwirtschaft',
    'Transport & Logistik',
    'Andere'
  ]

  const projectTypes = [
    { 
      value: 'restaurant', 
      label: 'Restaurant',
      description: 'Speisekarte, Reservierungen, Öffnungszeiten'
    },
    { 
      value: 'event', 
      label: 'Event',
      description: 'Programm, Tickets, Teilnehmer-Anmeldung'
    },
    { 
      value: 'corporate', 
      label: 'Verein',
      description: 'Über uns, Leistungen, Karriere, Kontakt'
    },
    { 
      value: 'landing', 
      label: 'Landing',
      description: 'Produktvorstellung, Call-to-Action, Conversion'
    },
    { 
      value: 'verein', 
      label: 'Unternehmenswebseite',
      description: 'Veranstaltungen, Vereinsleben'
    },
    { 
      value: 'portfolio', 
      label: 'Portfolio',
      description: 'Galerie, Projekte, persönliche Präsentation'
    }
  ]

  // Hilfsfunktion um ausgewählte Farben zu holen
  const getSelectedColors = () => {
    const allColors = [
      { value: 'blue', hex: '#3b82f6' },
      { value: 'green', hex: '#10b981' },
      { value: 'purple', hex: '#8b5cf6' },
      { value: 'red', hex: '#ef4444' },
      { value: 'orange', hex: '#f97316' },
      { value: 'yellow', hex: '#eab308' },
      { value: 'pink', hex: '#ec4899' },
      { value: 'cyan', hex: '#06b6d4' },
      { value: 'indigo', hex: '#6366f1' },
      { value: 'teal', hex: '#14b8a6' },
      { value: 'lime', hex: '#84cc16' },
      { value: 'amber', hex: '#f59e0b' }
    ]
    
    const selectedPredefined = formData.colors.map(colorValue => 
      allColors.find(c => c.value === colorValue)?.hex
    ).filter(Boolean)
    
    const selectedCustom = formData.customColors
    
    const combinedColors = [...selectedPredefined, ...selectedCustom]
    
    // Fallback zu Standard-Blau wenn keine Farben ausgewählt
    return combinedColors.length > 0 ? combinedColors : ['#3b82f6']
  }

  const selectedColors = getSelectedColors()
  const primaryColor = selectedColors[0]
  const secondaryColor = selectedColors[1] || selectedColors[0]
  const accentColor = selectedColors[2] || selectedColors[0]

  // Smartphone Mockup Component
  const getMobilePreview = (designStyle: string, config: any, baseColors: any) => {
    // Creative Design bekommt spezielles künstlerisches Layout
    if (designStyle === 'creative') {
      return (
        <div className="absolute bottom-0 right-0 w-20 h-36 bg-black rounded-lg border border-gray-500 shadow-xl z-10 transform -translate-x-2 -translate-y-1" style={{ borderWidth: '0.1px' }}>
          <div className="absolute inset-1 rounded-md overflow-hidden" style={{ background: `linear-gradient(135deg, ${baseColors.primary}CC, ${baseColors.secondary}CC, ${baseColors.accent}CC)` }}>
            {/* Mobile Screen Content */}
            <div className="h-full relative" style={{ fontSize: '2px' }}>
              {/* Creative floating elements */}
              <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-white opacity-60 animate-pulse"></div>
              <div className="absolute top-2 left-1 w-0.5 h-0.5 bg-white opacity-40 transform rotate-45"></div>
              
              {/* Mobile Header */}
              <div className="h-3 flex items-center justify-between px-1 py-0.5 relative" style={{ background: `linear-gradient(90deg, ${baseColors.primary}, ${baseColors.secondary})` }}>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="text-white text-[4px] font-bold">{(formData.companyName || config.title).substring(0, 8)}</div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
              {/* Mobile Content */}
              <div className="px-1 py-1 space-y-1">
                <div className="h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${baseColors.secondary}, ${baseColors.accent})`, width: '80%' }}></div>
                <div className="h-0.5 bg-white bg-opacity-60 rounded-full w-full"></div>
                <div className="h-0.5 bg-white bg-opacity-40 rounded-full w-3/4"></div>
                <div className="grid grid-cols-2 gap-0.5 mt-1">
                  <div className="h-1 rounded-full" style={{ backgroundColor: baseColors.accent }}></div>
                  <div className="h-1 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                </div>
                <div className="space-y-0.5 mt-1">
                  <div className="h-0.5 bg-white bg-opacity-50 rounded-full w-full"></div>
                  <div className="h-0.5 bg-white bg-opacity-50 rounded-full w-2/3"></div>
                  <div className="h-0.5 bg-white bg-opacity-50 rounded-full w-4/5"></div>
                </div>
                {/* Mobile CTA */}
                <div className="mt-1 h-1.5 rounded-full" style={{ background: `linear-gradient(90deg, ${baseColors.primary}, ${baseColors.accent})` }}></div>
              </div>
            </div>
          </div>
          {/* Phone Details */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-white bg-opacity-80 rounded-full"></div>
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
        </div>
      )
    }
    
    // Standard Layout für andere Design-Stile
    const bgColor = designStyle === 'modern' ? 'bg-black' : 'bg-white'
    const contentColor = designStyle === 'modern' ? 'bg-gray-600' : 'bg-gray-300'
    const textColor = designStyle === 'modern' ? 'bg-gray-500' : 'bg-gray-200'
    
    return (
      <div className="absolute bottom-0 right-0 w-20 h-36 bg-black rounded-lg border border-gray-500 shadow-xl z-10 transform -translate-x-2 -translate-y-1" style={{ borderWidth: '0.1px' }}>
        <div className={`absolute inset-1 ${bgColor} rounded-md overflow-hidden`}>
          {/* Mobile Screen Content */}
          <div className="h-full" style={{ fontSize: '2px' }}>
            {/* Mobile Header */}
            <div className="h-3 flex items-center justify-between px-1 py-0.5" style={{ backgroundColor: baseColors.primary }}>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="text-white text-[4px] font-bold">{(formData.companyName || config.title).substring(0, 8)}</div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            {/* Mobile Content */}
            <div className="px-1 py-1 space-y-1">
              <div className="h-1 rounded" style={{ backgroundColor: baseColors.secondary, width: '80%' }}></div>
              <div className={`h-0.5 ${contentColor} rounded w-full`}></div>
              <div className={`h-0.5 ${contentColor} rounded w-3/4`}></div>
              <div className="grid grid-cols-2 gap-0.5 mt-1">
                <div className="h-1 rounded" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-1 rounded" style={{ backgroundColor: baseColors.accent }}></div>
              </div>
              <div className="space-y-0.5 mt-1">
                <div className={`h-0.5 ${textColor} rounded w-full`}></div>
                <div className={`h-0.5 ${textColor} rounded w-2/3`}></div>
                <div className={`h-0.5 ${textColor} rounded w-4/5`}></div>
              </div>
              {/* Mobile CTA */}
              <div className="mt-1 h-1.5 rounded" style={{ backgroundColor: baseColors.primary }}></div>
            </div>
          </div>
        </div>
        {/* Phone Details */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-gray-700 rounded-full"></div>
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full"></div>
      </div>
    )
  }

  // Funktion für projekt-spezifische Design-Vorschauen
  const getProjectSpecificPreview = (projectType: string, designStyle: string) => {
    const baseColors = {
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor
    }

    const projectConfigs = {
      restaurant: {
        title: "Restaurant Bella Vista",
        subtitle: "Italienische Küche & Wein",
        features: ["Speisekarte", "Reservierung", "Öffnungszeiten", "Kontakt"],
        icon: "🍕",
        specificContent: {
          hero: "Willkommen in unserem Restaurant",
          description: "Authentische italienische Küche in gemütlicher Atmosphäre",
          highlights: ["Frische Pasta", "Weinauswahl", "Terrasse", "Events"],
          cta: "Tisch reservieren",
          secondaryCta: "Speisekarte ansehen"
        },
        layout: "restaurant"
      },
      event: {
        title: "Tech Conference 2024",
        subtitle: "Innovation & Networking",
        features: ["Programm", "Tickets", "Sprecher", "Anmeldung"],
        icon: "🎊",
        specificContent: {
          hero: "Die Zukunft der Technologie",
          description: "3 Tage voller Innovation, Networking und Inspiration",
          highlights: ["50+ Sprecher", "Workshops", "Networking", "After Party"],
          cta: "Jetzt anmelden",
          secondaryCta: "Programm ansehen"
        },
        layout: "event"
      },
      corporate: {
        title: "Sportverein Dynamo",
        subtitle: "Gemeinsam stark",
        features: ["Aktuelles", "Termine", "Mitgliedschaft", "Kontakt"],
        icon: "🏛️",
        specificContent: {
          hero: "Gemeinsam zum Erfolg",
          description: "Unser Verein steht für Teamgeist, Fairplay und Leidenschaft",
          highlights: ["Jugendtraining", "Senioren", "Events", "Gastronomie"],
          cta: "Mitglied werden",
          secondaryCta: "Training ansehen"
        },
        layout: "corporate"
      },
      landing: {
        title: "ProductLaunch Pro",
        subtitle: "Revolutionäre Software",
        features: ["Features", "Pricing", "Demo", "Jetzt starten"],
        icon: "🚀",
        specificContent: {
          hero: "Revolutionieren Sie Ihr Business",
          description: "Die ultimative Software-Lösung für moderne Unternehmen",
          highlights: ["Einfach zu bedienen", "Skalierbar", "24/7 Support", "Sicher"],
          cta: "Kostenlos testen",
          secondaryCta: "Demo anfordern"
        },
        layout: "landing"
      },
      verein: {
        title: "InnovateCorp GmbH",
        subtitle: "Leading Technology Solutions",
        features: ["Über uns", "Leistungen", "Karriere", "Kontakt"],
        icon: "🏢",
        specificContent: {
          hero: "Innovation durch Technologie",
          description: "Wir entwickeln maßgeschneiderte Lösungen für Ihr Unternehmen",
          highlights: ["Software-Entwicklung", "Beratung", "Support", "Training"],
          cta: "Kontakt aufnehmen",
          secondaryCta: "Leistungen entdecken"
        },
        layout: "verein"
      },
      portfolio: {
        title: "Max Mustermann",
        subtitle: "Creative Designer",
        features: ["Projekte", "Über mich", "Skills", "Kontakt"],
        icon: "🎨",
        specificContent: {
          hero: "Kreative Lösungen für digitale Welten",
          description: "UI/UX Designer mit Leidenschaft für innovative Designs",
          highlights: ["Web Design", "App Design", "Branding", "Illustration"],
          cta: "Projekt starten",
          secondaryCta: "Portfolio ansehen"
        },
        layout: "portfolio"
      }
    }

    const config = projectConfigs[projectType as keyof typeof projectConfigs] || projectConfigs.corporate

    if (designStyle === 'minimal') {
      // Restaurant Layout - Detaillierte Speisekarte
      if (config.layout === 'restaurant') {
        return (
          <div className="bg-white rounded-xl p-6 h-80 relative border border-gray-200 shadow-sm overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Restaurant Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
            </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-gray-600">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Mo-So 18:00-23:00</div>
            </div>
            
            {/* Restaurant Navigation */}
            <div className="flex gap-4 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="text-sm cursor-pointer border-b-2 border-transparent hover:border-gray-300 transition-colors px-2 py-1 rounded" style={{ 
                  color: index % 3 === 0 ? baseColors.primary : index % 3 === 1 ? baseColors.secondary : baseColors.accent,
                  backgroundColor: index % 3 === 0 ? `${baseColors.primary}10` : index % 3 === 1 ? `${baseColors.secondary}10` : `${baseColors.accent}10`
                }}>
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Speisekarte Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="h-3 rounded w-1/4" style={{ 
                  background: `linear-gradient(90deg, ${baseColors.secondary}, ${baseColors.accent})` 
                }}></div>
                <div className="h-2 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-2 rounded w-1/6" style={{ 
                    background: `linear-gradient(45deg, ${baseColors.accent}, ${baseColors.primary})` 
                  }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-2 rounded w-1/6" style={{ 
                    background: `linear-gradient(45deg, ${baseColors.accent}, ${baseColors.primary})` 
                  }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 rounded w-1/6" style={{ 
                    background: `linear-gradient(45deg, ${baseColors.accent}, ${baseColors.primary})` 
                  }}></div>
                </div>
              </div>
            </div>

            {/* Restaurant Features - Specials */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${baseColors.secondary}10` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.secondary }}></div>
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${baseColors.accent}10` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>

            {/* Restaurant CTAs */}
              <div className="flex gap-3">
              <div className="h-6 rounded w-2/5 shadow-sm" style={{ 
                background: `linear-gradient(135deg, ${baseColors.primary}, ${baseColors.secondary})` 
              }}></div>
              <div className="h-6 border-2 rounded w-1/4" style={{ 
                borderColor: baseColors.secondary, 
                backgroundColor: `${baseColors.secondary}15`,
                background: `linear-gradient(135deg, ${baseColors.secondary}15, ${baseColors.accent}15)`
              }}></div>
            </div>
            </div>
        )
      }

      // Event Layout - Detaillierte Conference Timeline
      if (config.layout === 'event') {
        return (
          <div className="bg-white rounded-xl p-6 h-80 relative border border-gray-200 shadow-sm overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Event Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-gray-600">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">15.-17. März 2024</div>
            </div>
            
            {/* Event Navigation */}
            <div className="flex gap-4 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-gray-300 transition-colors">
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Conference Schedule */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-gray-300 rounded w-1/4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <div className="h-2 rounded w-1/3" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-gray-200 rounded w-1/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <div className="h-2 rounded w-2/5" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-gray-200 rounded w-1/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <div className="h-2 rounded w-1/4" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-gray-200 rounded w-1/6"></div>
                </div>
              </div>
            </div>

            {/* Event Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center">
                <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>

            {/* Event CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded w-2/5" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}15` }}></div>
            </div>
          </div>
        )
      }

      // Corporate Layout - Detaillierte Business Services
      if (config.layout === 'corporate') {
        return (
          <div className="bg-white rounded-xl p-6 h-80 relative border border-gray-200 shadow-sm overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Corporate Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-gray-600">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Gegr. 1985</div>
            </div>
            
            {/* Corporate Navigation */}
            <div className="flex gap-4 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-gray-300 transition-colors">
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Services Overview */}
            <div className="mb-4">
              <div className="h-3 rounded w-1/3 mb-2" style={{ backgroundColor: baseColors.secondary }}></div>
              <div className="h-2 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 border border-gray-200 rounded p-2">
                <div className="h-2 rounded w-3/4 mb-1" style={{ backgroundColor: baseColors.secondary }}></div>
                <div className="h-1 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-2">
                <div className="h-2 rounded w-3/4 mb-1" style={{ backgroundColor: baseColors.secondary }}></div>
                <div className="h-1 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
            
            {/* Company Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 bg-gray-300 rounded w-8 mx-auto mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-6 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-gray-300 rounded w-8 mx-auto mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-6 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-gray-300 rounded w-8 mx-auto mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-6 mx-auto"></div>
              </div>
            </div>

            {/* Corporate CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded w-2/5" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}15` }}></div>
            </div>
          </div>
        )
      }

      // Landing Page Layout - Detaillierte Product Showcase
      if (config.layout === 'landing') {
        return (
          <div className="bg-white rounded-xl p-6 h-80 relative border border-gray-200 shadow-sm overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Landing Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-gray-600">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Beta</div>
            </div>
            
            {/* Landing Navigation */}
            <div className="flex gap-4 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-gray-300 transition-colors">
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Product Hero */}
            <div className="mb-4">
              <div className="h-3 rounded w-3/4 mb-2" style={{ backgroundColor: baseColors.secondary }}></div>
              <div className="h-2 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-2 bg-gray-200 rounded w-2/3"></div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>

            {/* Pricing/Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-200 rounded w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-200 rounded w-4 mx-auto"></div>
              </div>
            </div>

            {/* Landing CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded w-2/5" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}15` }}></div>
            </div>
          </div>
        )
      }

      // Verein Layout - Detaillierte Community Features
      if (config.layout === 'verein') {
        return (
          <div className="bg-white rounded-xl p-6 h-80 relative border border-gray-200 shadow-sm overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Verein Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-gray-600">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Seit 2010</div>
            </div>
            
            {/* Verein Navigation */}
            <div className="flex gap-4 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-gray-300 transition-colors">
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Community Info */}
            <div className="mb-4">
              <div className="h-3 rounded w-1/3 mb-2" style={{ backgroundColor: baseColors.secondary }}></div>
              <div className="h-2 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Activity Schedule */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-gray-300 rounded w-1/4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <div className="h-2 rounded w-1/3" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-gray-200 rounded w-1/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                  <div className="h-2 rounded w-2/5" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-gray-200 rounded w-1/6"></div>
                </div>
              </div>
            </div>

            {/* Member Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-200 rounded w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-200 rounded w-4 mx-auto"></div>
              </div>
            </div>

            {/* Verein CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded w-2/5" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}15` }}></div>
            </div>
          </div>
        )
      }

      // Portfolio Layout - Detaillierte Project Showcase
      if (config.layout === 'portfolio') {
        return (
          <div className="bg-white rounded-xl p-6 h-80 relative border border-gray-200 shadow-sm overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Portfolio Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-gray-600">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">5+ Jahre</div>
            </div>
            
            {/* Portfolio Navigation */}
            <div className="flex gap-4 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-gray-300 transition-colors">
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Project Showcase */}
            <div className="mb-4">
              <div className="h-3 rounded w-1/3 mb-2" style={{ backgroundColor: baseColors.secondary }}></div>
              <div className="h-2 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-gray-50 border border-gray-200 rounded p-2">
                <div className="h-2 rounded w-3/4 mb-1" style={{ backgroundColor: baseColors.secondary }}></div>
                <div className="h-1 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-2">
                <div className="h-2 rounded w-3/4 mb-1" style={{ backgroundColor: baseColors.secondary }}></div>
                <div className="h-1 bg-gray-200 rounded w-full"></div>
              </div>
            </div>

            {/* Skills/Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-200 rounded w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-200 rounded w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-200 rounded w-4 mx-auto"></div>
              </div>
            </div>

            {/* Portfolio CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded w-2/5" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}15` }}></div>
            </div>
          </div>
        )
      }
    }

    if (designStyle === 'modern') {
      // Restaurant Modern - Detaillierte Dark Theme Speisekarte
      if (config.layout === 'restaurant') {
        return (
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 h-80 relative border border-gray-700 shadow-2xl overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Glowing accent */}
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full opacity-60 shadow-lg" style={{ backgroundColor: baseColors.primary, boxShadow: `0 0 10px ${baseColors.primary}` }}></div>
            
            {/* Restaurant Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 rounded-xl flex items-center justify-center text-white text-lg shadow-lg" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-gray-400">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-gray-800/50 px-2 py-1 rounded">18:00 - 23:00</div>
            </div>
            
            {/* Restaurant Navigation */}
            <div className="flex gap-3 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="px-3 py-1 rounded-full text-sm text-white border backdrop-blur-sm" style={{ borderColor: index % 2 === 0 ? baseColors.primary : baseColors.secondary, backgroundColor: index % 2 === 0 ? `${baseColors.primary}20` : `${baseColors.secondary}20` }}>
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Speisekarte Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="h-3 rounded w-1/4" style={{ backgroundColor: baseColors.secondary }}></div>
                <div className="h-2 bg-gray-600 rounded w-1/6"></div>
              </div>
                <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-2 bg-gray-700 rounded w-2/3"></div>
                  <div className="h-2 rounded w-1/6" style={{ backgroundColor: baseColors.accent }}></div>
                  </div>
                <div className="flex items-center justify-between">
                  <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-2 rounded w-1/6" style={{ backgroundColor: baseColors.accent }}></div>
                    </div>
                <div className="flex items-center justify-between">
                  <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-2 rounded w-1/6" style={{ backgroundColor: baseColors.accent }}></div>
                    </div>
                  </div>
              </div>

            {/* Restaurant Features - Specials */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.secondary }}></div>
                <div className="h-2 bg-gray-700 rounded w-3/4"></div>
            </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>

            {/* Restaurant CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-lg w-2/5 shadow-lg" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded-lg w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}10` }}></div>
          </div>
         </div>
        )
      }

      // Event Modern - Detaillierte Conference Timeline
      if (config.layout === 'event') {
        return (
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 h-80 relative border border-gray-700 shadow-2xl overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Glowing accent */}
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full opacity-60 shadow-lg" style={{ backgroundColor: baseColors.primary, boxShadow: `0 0 10px ${baseColors.primary}` }}></div>
            
            {/* Event Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 rounded-xl flex items-center justify-center text-white text-lg shadow-lg" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-gray-400">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-gray-800/50 px-2 py-1 rounded">3 Tage</div>
            </div>
            
            {/* Event Navigation */}
            <div className="flex gap-3 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="px-3 py-1 rounded-full text-sm text-white border backdrop-blur-sm" style={{ borderColor: baseColors.primary, backgroundColor: `${baseColors.primary}20` }}>
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Conference Schedule */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-gray-700 rounded w-1/4"></div>
                <div className="h-2 bg-gray-600 rounded w-1/6"></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                  <div className="h-2 rounded w-1/3" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-gray-600 rounded w-1/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                  <div className="h-2 rounded w-2/5" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-gray-600 rounded w-1/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                  <div className="h-2 rounded w-1/4" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-gray-600 rounded w-1/6"></div>
                </div>
              </div>
            </div>

            {/* Event Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center">
                <div className="h-3 bg-gray-700 rounded w-3/4 mx-auto mb-1"></div>
                <div className="h-2 bg-gray-600 rounded w-1/2 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-gray-700 rounded w-3/4 mx-auto mb-1"></div>
                <div className="h-2 bg-gray-600 rounded w-1/2 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-gray-700 rounded w-3/4 mx-auto mb-1"></div>
                <div className="h-2 bg-gray-600 rounded w-1/2 mx-auto"></div>
              </div>
            </div>

            {/* Event CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-lg w-2/5 shadow-lg" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded-lg w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}10` }}></div>
            </div>
          </div>
        )
      }

      // Corporate Modern - Detaillierte Business Services
      if (config.layout === 'corporate') {
        return (
          <div className="rounded-xl p-6 h-80 relative border border-gray-700 shadow-2xl overflow-hidden" style={{
            background: `linear-gradient(135deg, ${baseColors.primary}20, #1f2937, ${baseColors.secondary}20, #000000)`
          }}>
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Glowing accent */}
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full opacity-60 shadow-lg" style={{ 
              backgroundColor: baseColors.primary, 
              boxShadow: `0 0 15px ${baseColors.primary}, 0 0 30px ${baseColors.primary}40` 
            }}></div>
            
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Corporate Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 rounded-xl flex items-center justify-center text-white text-lg shadow-lg" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-gray-400">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-gray-800/50 px-2 py-1 rounded">Seit 2010</div>
            </div>
            
            {/* Corporate Navigation */}
            <div className="flex gap-3 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="px-3 py-1 rounded-full text-sm text-white border backdrop-blur-sm" style={{ 
                  borderColor: index % 3 === 0 ? baseColors.primary : index % 3 === 1 ? baseColors.secondary : baseColors.accent,
                  background: `linear-gradient(135deg, ${index % 3 === 0 ? baseColors.primary : index % 3 === 1 ? baseColors.secondary : baseColors.accent}30, ${index % 3 === 0 ? baseColors.primary : index % 3 === 1 ? baseColors.secondary : baseColors.accent}10)`
                }}>
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Services Overview */}
            <div className="mb-4">
              <div className="h-3 rounded w-1/3 mb-2" style={{ 
                background: `linear-gradient(90deg, ${baseColors.secondary}, ${baseColors.accent})` 
              }}></div>
              <div className="h-2 bg-gray-600 rounded w-2/3 mb-2"></div>
              <div className="h-2 bg-gray-600 rounded w-1/2"></div>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded p-2" style={{ 
                background: `linear-gradient(135deg, ${baseColors.secondary}20, ${baseColors.accent}10)`,
                border: `1px solid ${baseColors.secondary}40`
              }}>
                <div className="h-2 rounded w-3/4 mb-1" style={{ 
                  background: `linear-gradient(90deg, ${baseColors.secondary}, ${baseColors.accent})` 
                }}></div>
                <div className="h-1 bg-gray-600 rounded w-full"></div>
              </div>
              <div className="rounded p-2" style={{ 
                background: `linear-gradient(135deg, ${baseColors.accent}20, ${baseColors.primary}10)`,
                border: `1px solid ${baseColors.accent}40`
              }}>
                <div className="h-2 rounded w-3/4 mb-1" style={{ 
                  background: `linear-gradient(90deg, ${baseColors.accent}, ${baseColors.primary})` 
                }}></div>
                <div className="h-1 bg-gray-600 rounded w-full"></div>
              </div>
            </div>

            {/* Company Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 rounded w-8 mx-auto mb-1" style={{ 
                  background: `linear-gradient(90deg, ${baseColors.primary}, ${baseColors.secondary})` 
                }}></div>
                <div className="h-2 bg-gray-600 rounded w-6 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded w-8 mx-auto mb-1" style={{ 
                  background: `linear-gradient(90deg, ${baseColors.secondary}, ${baseColors.accent})` 
                }}></div>
                <div className="h-2 bg-gray-600 rounded w-6 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded w-8 mx-auto mb-1" style={{ 
                  background: `linear-gradient(90deg, ${baseColors.accent}, ${baseColors.primary})` 
                }}></div>
                <div className="h-2 bg-gray-600 rounded w-6 mx-auto"></div>
              </div>
            </div>

            {/* Corporate CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-lg w-2/5 shadow-lg" style={{ 
                background: `linear-gradient(135deg, ${baseColors.primary}, ${baseColors.secondary})`,
                boxShadow: `0 4px 15px ${baseColors.primary}40`
              }}></div>
              <div className="h-6 border-2 rounded-lg w-1/4" style={{ 
                borderColor: baseColors.secondary, 
                background: `linear-gradient(135deg, ${baseColors.secondary}20, ${baseColors.accent}10)`
              }}></div>
            </div>
          </div>
        )
      }

      // Landing Modern - Detaillierte Product Showcase
      if (config.layout === 'landing') {
        return (
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 h-80 relative border border-gray-700 shadow-2xl overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Glowing accent */}
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full opacity-60 shadow-lg" style={{ backgroundColor: baseColors.primary, boxShadow: `0 0 10px ${baseColors.primary}` }}></div>
            
            {/* Landing Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 rounded-xl flex items-center justify-center text-white text-lg shadow-lg" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-gray-400">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-gray-800/50 px-2 py-1 rounded">SaaS</div>
            </div>
            
            {/* Landing Navigation */}
            <div className="flex gap-3 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="px-3 py-1 rounded-full text-sm text-white border backdrop-blur-sm" style={{ borderColor: baseColors.primary, backgroundColor: `${baseColors.primary}20` }}>
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Product Hero */}
            <div className="mb-4">
              <div className="h-3 rounded w-3/4 mb-2" style={{ backgroundColor: baseColors.secondary }}></div>
              <div className="h-2 bg-gray-600 rounded w-1/2 mb-2"></div>
              <div className="h-2 bg-gray-600 rounded w-2/3"></div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-gray-700 rounded w-3/4"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-gray-700 rounded w-3/4"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-gray-700 rounded w-3/4"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>

            {/* Pricing/Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-600 rounded w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-600 rounded w-4 mx-auto"></div>
              </div>
            </div>

            {/* Landing CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-lg w-2/5 shadow-lg" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded-lg w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}10` }}></div>
            </div>
          </div>
        )
      }

      // Verein Modern - Detaillierte Community Features
      if (config.layout === 'verein') {
        return (
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 h-80 relative border border-gray-700 shadow-2xl overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Glowing accent */}
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full opacity-60 shadow-lg" style={{ backgroundColor: baseColors.primary, boxShadow: `0 0 10px ${baseColors.primary}` }}></div>
            
            {/* Verein Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 rounded-xl flex items-center justify-center text-white text-lg shadow-lg" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-gray-400">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-gray-800/50 px-2 py-1 rounded">B2B</div>
            </div>
            
            {/* Verein Navigation */}
            <div className="flex gap-3 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="px-3 py-1 rounded-full text-sm text-white border backdrop-blur-sm" style={{ borderColor: baseColors.primary, backgroundColor: `${baseColors.primary}20` }}>
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Community Info */}
            <div className="mb-4">
              <div className="h-3 rounded w-1/3 mb-2" style={{ backgroundColor: baseColors.secondary }}></div>
              <div className="h-2 bg-gray-600 rounded w-2/3 mb-2"></div>
              <div className="h-2 bg-gray-600 rounded w-1/2"></div>
            </div>

            {/* Activity Schedule */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-gray-700 rounded w-1/4"></div>
                <div className="h-2 bg-gray-600 rounded w-1/6"></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                  <div className="h-2 rounded w-1/3" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-gray-600 rounded w-1/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                  <div className="h-2 rounded w-2/5" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-gray-600 rounded w-1/6"></div>
                </div>
              </div>
            </div>

            {/* Member Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-600 rounded w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-600 rounded w-4 mx-auto"></div>
              </div>
            </div>

            {/* Verein CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-lg w-2/5 shadow-lg" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded-lg w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}10` }}></div>
            </div>
          </div>
        )
      }

      // Portfolio Modern - Detaillierte Project Showcase
      if (config.layout === 'portfolio') {
        return (
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 h-80 relative border border-gray-700 shadow-2xl overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Glowing accent */}
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full opacity-60 shadow-lg" style={{ backgroundColor: baseColors.primary, boxShadow: `0 0 10px ${baseColors.primary}` }}></div>
            
            {/* Portfolio Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 rounded-xl flex items-center justify-center text-white text-lg shadow-lg" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-gray-400">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-gray-800/50 px-2 py-1 rounded">Freelancer</div>
            </div>
            
            {/* Portfolio Navigation */}
            <div className="flex gap-3 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="px-3 py-1 rounded-full text-sm text-white border backdrop-blur-sm" style={{ borderColor: baseColors.primary, backgroundColor: `${baseColors.primary}20` }}>
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Project Showcase */}
            <div className="mb-4">
              <div className="h-3 rounded w-1/3 mb-2" style={{ backgroundColor: baseColors.secondary }}></div>
              <div className="h-2 bg-gray-600 rounded w-2/3 mb-2"></div>
              <div className="h-2 bg-gray-600 rounded w-1/2"></div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-gray-800/50 border border-gray-600 rounded p-2">
                <div className="h-2 rounded w-3/4 mb-1" style={{ backgroundColor: baseColors.secondary }}></div>
                <div className="h-1 bg-gray-600 rounded w-full"></div>
              </div>
              <div className="bg-gray-800/50 border border-gray-600 rounded p-2">
                <div className="h-2 rounded w-3/4 mb-1" style={{ backgroundColor: baseColors.secondary }}></div>
                <div className="h-1 bg-gray-600 rounded w-full"></div>
              </div>
            </div>

            {/* Skills/Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-600 rounded w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-600 rounded w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-gray-600 rounded w-4 mx-auto"></div>
              </div>
            </div>

            {/* Portfolio CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-lg w-2/5 shadow-lg" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded-lg w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}10` }}></div>
            </div>
          </div>
        )
      }
    }

    if (designStyle === 'corporate') {
      // Restaurant Corporate - Detaillierte Professional Speisekarte
      if (config.layout === 'restaurant') {
        return (
          <div className="bg-slate-50 rounded-xl p-6 h-80 relative border-2 border-slate-300 shadow-sm overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Restaurant Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center text-white text-sm shadow-sm" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-slate-600">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-slate-500 bg-slate-200 px-2 py-1 rounded">⭐ 4.8/5</div>
            </div>
            
            {/* Restaurant Navigation */}
            <div className="flex gap-4 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="text-sm text-slate-600 hover:text-slate-800 cursor-pointer border-b border-transparent hover:border-slate-400 transition-colors">
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Speisekarte Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="h-3 bg-slate-300 rounded w-1/4"></div>
                <div className="h-2 bg-slate-200 rounded w-1/6"></div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-2 bg-slate-300 rounded w-2/3"></div>
                  <div className="h-2 bg-slate-200 rounded w-1/6"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-2 bg-slate-300 rounded w-1/2"></div>
                  <div className="h-2 bg-slate-200 rounded w-1/6"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-2 bg-slate-300 rounded w-3/4"></div>
                  <div className="h-2 bg-slate-200 rounded w-1/6"></div>
                </div>
              </div>
            </div>

            {/* Restaurant Features - Specials */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-slate-300 rounded w-3/4"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-slate-300 rounded w-3/4"></div>
              </div>
            </div>

            {/* Restaurant CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-sm w-2/5 shadow-sm" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded-sm w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}10` }}></div>
            </div>
          </div>
        )
      }

      // Event Corporate - Detaillierte Conference Timeline
      if (config.layout === 'event') {
        return (
          <div className="bg-slate-50 rounded-xl p-6 h-80 relative border-2 border-slate-300 shadow-sm overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Event Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center text-white text-sm shadow-sm" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-slate-600">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-slate-500 bg-slate-200 px-2 py-1 rounded">📅 März 2024</div>
            </div>
            
            {/* Event Navigation */}
            <div className="flex gap-4 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="text-sm text-slate-600 hover:text-slate-800 cursor-pointer border-b border-transparent hover:border-slate-400 transition-colors">
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Conference Schedule */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-slate-300 rounded w-1/4"></div>
                <div className="h-2 bg-slate-200 rounded w-1/6"></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                  <div className="h-2 rounded w-1/3" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-slate-200 rounded w-1/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                  <div className="h-2 rounded w-2/5" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-slate-200 rounded w-1/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                  <div className="h-2 rounded w-1/4" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-slate-200 rounded w-1/6"></div>
                </div>
              </div>
            </div>

            {/* Event Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center">
                <div className="h-3 bg-slate-300 rounded w-3/4 mx-auto mb-1"></div>
                <div className="h-2 bg-slate-200 rounded w-1/2 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-slate-300 rounded w-3/4 mx-auto mb-1"></div>
                <div className="h-2 bg-slate-200 rounded w-1/2 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-slate-300 rounded w-3/4 mx-auto mb-1"></div>
                <div className="h-2 bg-slate-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>

            {/* Event CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-sm w-2/5 shadow-sm" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded-sm w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}10` }}></div>
            </div>
          </div>
        )
      }

      // Corporate Corporate - Business Services Layout
      if (config.layout === 'corporate') {
        return (
          <div className="bg-slate-50 rounded-xl p-6 h-80 relative border-2 border-slate-300 shadow-sm overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Corporate Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center text-white text-sm shadow-sm" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-slate-600">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-slate-500 bg-slate-200 px-2 py-1 rounded">500+ Mitglieder</div>
            </div>
            
            {/* Corporate Navigation */}
            <div className="flex gap-4 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="text-sm text-slate-600 hover:text-slate-800 cursor-pointer border-b border-transparent hover:border-slate-400 transition-colors">
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Corporate Hero - Services Overview */}
            <div className="mb-6">
              <div className="h-4 bg-slate-300 rounded w-4/5 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-3/5 mb-2"></div>
              <div className="h-2 bg-slate-200 rounded w-2/3"></div>
            </div>

            {/* Corporate Services */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {config.specificContent.highlights.slice(0, 4).map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: baseColors.primary }}></div>
                  <div className="h-2 bg-slate-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>

            {/* Corporate CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-sm w-2/5 shadow-sm" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded-sm w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}10` }}></div>
            </div>
          </div>
        )
      }

      // Landing Corporate - Detaillierte Product Launch
      if (config.layout === 'landing') {
        return (
          <div className="bg-slate-50 rounded-xl p-6 h-80 relative border-2 border-slate-300 shadow-sm overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Landing Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center text-white text-sm shadow-sm" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-slate-600">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-slate-500 bg-slate-200 px-2 py-1 rounded">🚀 SaaS</div>
            </div>
            
            {/* Landing Navigation */}
            <div className="flex gap-4 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="text-sm text-slate-600 hover:text-slate-800 cursor-pointer border-b border-transparent hover:border-slate-400 transition-colors">
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Product Hero */}
            <div className="mb-4">
              <div className="h-3 bg-slate-300 rounded w-3/4 mb-2"></div>
              <div className="h-2 bg-slate-200 rounded w-1/2 mb-2"></div>
              <div className="h-2 bg-slate-200 rounded w-2/3"></div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-slate-300 rounded w-3/4"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-slate-300 rounded w-3/4"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-slate-300 rounded w-3/4"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-slate-300 rounded w-3/4"></div>
              </div>
            </div>

            {/* Pricing/Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-slate-200 rounded w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-slate-200 rounded w-4 mx-auto"></div>
              </div>
            </div>

            {/* Landing CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-sm w-2/5 shadow-sm" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded-sm w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}10` }}></div>
            </div>
          </div>
        )
      }

      // Verein Corporate - Detaillierte Association Features
      if (config.layout === 'verein') {
        return (
          <div className="bg-slate-50 rounded-xl p-6 h-80 relative border-2 border-slate-300 shadow-sm overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Verein Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center text-white text-sm shadow-sm" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-slate-600">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-slate-500 bg-slate-200 px-2 py-1 rounded">🏢 EST.</div>
            </div>
            
            {/* Verein Navigation */}
            <div className="flex gap-4 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="text-sm text-slate-600 hover:text-slate-800 cursor-pointer border-b border-transparent hover:border-slate-400 transition-colors">
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Community Info */}
            <div className="mb-4">
              <div className="h-3 rounded w-1/3 mb-2" style={{ backgroundColor: baseColors.secondary }}></div>
              <div className="h-2 bg-slate-200 rounded w-2/3 mb-2"></div>
              <div className="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>

            {/* Activity Schedule */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-slate-300 rounded w-1/4"></div>
                <div className="h-2 bg-slate-200 rounded w-1/6"></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                  <div className="h-2 rounded w-1/3" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-slate-200 rounded w-1/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                  <div className="h-2 rounded w-2/5" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-slate-200 rounded w-1/6"></div>
                </div>
              </div>
            </div>

            {/* Member Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-slate-200 rounded w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-slate-200 rounded w-4 mx-auto"></div>
              </div>
            </div>

            {/* Verein CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-sm w-2/5 shadow-sm" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded-sm w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}10` }}></div>
            </div>
          </div>
        )
      }

      // Portfolio Corporate - Detaillierte Professional Portfolio
      if (config.layout === 'portfolio') {
        return (
          <div className="bg-slate-50 rounded-xl p-6 h-80 relative border-2 border-slate-300 shadow-sm overflow-hidden">
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Portfolio Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center text-white text-sm shadow-sm" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-slate-600">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-slate-500 bg-slate-200 px-2 py-1 rounded">💼 Freelancer</div>
            </div>
            
            {/* Portfolio Navigation */}
            <div className="flex gap-4 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="text-sm text-slate-600 hover:text-slate-800 cursor-pointer border-b border-transparent hover:border-slate-400 transition-colors">
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Project Showcase */}
            <div className="mb-4">
              <div className="h-3 rounded w-1/3 mb-2" style={{ backgroundColor: baseColors.secondary }}></div>
              <div className="h-2 bg-slate-200 rounded w-2/3 mb-2"></div>
              <div className="h-2 bg-slate-200 rounded w-1/2"></div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-white border-2 border-slate-300 rounded p-2">
                <div className="h-2 rounded w-3/4 mb-1" style={{ backgroundColor: baseColors.secondary }}></div>
                <div className="h-1 bg-slate-200 rounded w-full"></div>
              </div>
              <div className="bg-white border-2 border-slate-300 rounded p-2">
                <div className="h-2 rounded w-3/4 mb-1" style={{ backgroundColor: baseColors.secondary }}></div>
                <div className="h-1 bg-slate-200 rounded w-full"></div>
              </div>
            </div>

            {/* Skills/Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-slate-200 rounded w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-slate-200 rounded w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded w-6 mx-auto mb-1" style={{ backgroundColor: baseColors.accent }}></div>
                <div className="h-2 bg-slate-200 rounded w-4 mx-auto"></div>
              </div>
            </div>

            {/* Portfolio CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-sm w-2/5 shadow-sm" style={{ backgroundColor: baseColors.primary }}></div>
              <div className="h-6 border-2 rounded-sm w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}10` }}></div>
            </div>
          </div>
        )
      }
    }

    if (designStyle === 'creative') {
      // Restaurant Creative - Detaillierte Artistic Food Layout
      if (config.layout === 'restaurant') {
        return (
          <div className="rounded-xl p-6 h-80 relative border-2 shadow-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${baseColors.primary}CC, ${baseColors.secondary}CC, ${baseColors.accent}CC)`, borderColor: baseColors.primary }}>
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Creative background shapes */}
            <div className="absolute top-2 right-3 w-8 h-8 rounded-full opacity-30 transform rotate-45" style={{ backgroundColor: baseColors.primary }}></div>
            <div className="absolute bottom-3 left-4 w-6 h-6 transform rotate-12 opacity-40" style={{ backgroundColor: baseColors.secondary }}></div>
            <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full opacity-50 transform -rotate-12" style={{ backgroundColor: baseColors.accent }}></div>
            
            {/* Restaurant Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl transform rotate-12 shadow-lg" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-white opacity-80">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-white px-2 py-1 rounded-full" style={{ backgroundColor: `${baseColors.accent}80` }}>🍽️ Fine Dining</div>
            </div>
            
            {/* Restaurant Navigation */}
            <div className="flex gap-3 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="px-3 py-1 rounded-full text-sm text-white border-2 transform hover:scale-105 transition-transform" style={{ borderColor: index % 3 === 0 ? baseColors.primary : index % 3 === 1 ? baseColors.secondary : baseColors.accent, backgroundColor: index % 3 === 0 ? `${baseColors.primary}30` : index % 3 === 1 ? `${baseColors.secondary}30` : `${baseColors.accent}30` }}>
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Speisekarte Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
             <div className="h-3 rounded-full w-1/4" style={{ backgroundColor: baseColors.secondary }}></div>
             <div className="h-2 rounded-full w-1/6" style={{ backgroundColor: baseColors.accent }}></div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                   <div className="h-2 rounded-full w-2/3" style={{ backgroundColor: baseColors.secondary }}></div>
                   <div className="h-2 rounded-full w-1/6" style={{ backgroundColor: baseColors.accent }}></div>
                </div>
                <div className="flex items-center justify-between">
                   <div className="h-2 rounded-full w-1/2" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-pink-500 rounded-full w-1/6"></div>
                </div>
                <div className="flex items-center justify-between">
                   <div className="h-2 rounded-full w-3/4" style={{ backgroundColor: baseColors.secondary }}></div>
                  <div className="h-2 bg-pink-500 rounded-full w-1/6"></div>
                </div>
              </div>
            </div>

            {/* Restaurant Features - Specials */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                   <div className="h-2 rounded-full w-3/4" style={{ backgroundColor: baseColors.secondary }}></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                   <div className="h-2 rounded-full w-3/4" style={{ backgroundColor: baseColors.secondary }}></div>
              </div>
            </div>

            {/* Restaurant CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-full w-2/5 shadow-lg" style={{ backgroundColor: baseColors.primary }}></div>
               <div className="h-6 border-2 rounded-full w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}20` }}></div>
            </div>
          </div>
        )
      }

      // Event Creative - Detaillierte Festival Timeline
      if (config.layout === 'event') {
        return (
          <div className="rounded-xl p-6 h-80 relative border-2 shadow-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${baseColors.primary}CC, ${baseColors.secondary}CC, ${baseColors.accent}CC)`, borderColor: baseColors.primary }}>
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Creative background shapes */}
            <div className="absolute top-2 right-3 w-8 h-8 rounded-full opacity-30 transform rotate-45" style={{ backgroundColor: baseColors.primary }}></div>
            <div className="absolute bottom-3 left-4 w-6 h-6 transform rotate-12 opacity-40" style={{ backgroundColor: baseColors.secondary }}></div>
            <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full opacity-50 transform -rotate-12" style={{ backgroundColor: baseColors.accent }}></div>
            
            {/* Event Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl transform rotate-12 shadow-lg" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-white opacity-80">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-white px-2 py-1 rounded-full" style={{ backgroundColor: `${baseColors.accent}80` }}>🎪 Festival</div>
            </div>
            
            {/* Event Navigation */}
            <div className="flex gap-3 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="px-3 py-1 rounded-full text-sm text-white border-2 transform hover:scale-105 transition-transform" style={{ borderColor: index % 3 === 0 ? baseColors.primary : index % 3 === 1 ? baseColors.secondary : baseColors.accent, backgroundColor: index % 3 === 0 ? `${baseColors.primary}30` : index % 3 === 1 ? `${baseColors.secondary}30` : `${baseColors.accent}30` }}>
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Festival Schedule */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-purple-600 rounded-full w-1/4"></div>
                <div className="h-2 bg-pink-500 rounded-full w-1/6"></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-pink-400"></div>
                  <div className="h-2 bg-purple-600 rounded-full w-1/3"></div>
                  <div className="h-2 bg-pink-500 rounded-full w-1/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-pink-400"></div>
                  <div className="h-2 bg-purple-600 rounded-full w-2/5"></div>
                  <div className="h-2 bg-pink-500 rounded-full w-1/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-pink-400"></div>
                  <div className="h-2 bg-purple-600 rounded-full w-1/4"></div>
                  <div className="h-2 bg-pink-500 rounded-full w-1/6"></div>
                </div>
              </div>
            </div>

            {/* Festival Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center">
                <div className="h-3 bg-purple-600 rounded-full w-3/4 mx-auto mb-1"></div>
                <div className="h-2 bg-pink-500 rounded-full w-1/2 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-purple-600 rounded-full w-3/4 mx-auto mb-1"></div>
                <div className="h-2 bg-pink-500 rounded-full w-1/2 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-purple-600 rounded-full w-3/4 mx-auto mb-1"></div>
                <div className="h-2 bg-pink-500 rounded-full w-1/2 mx-auto"></div>
              </div>
            </div>

            {/* Event CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-full w-2/5 shadow-lg" style={{ backgroundColor: baseColors.primary }}></div>
               <div className="h-6 border-2 rounded-full w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}20` }}></div>
            </div>
          </div>
        )
      }

      // Corporate Creative - Detaillierte Innovative Business Services
      if (config.layout === 'corporate') {
        return (
          <div className="rounded-xl p-6 h-80 relative border-2 shadow-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${baseColors.primary}CC, ${baseColors.secondary}CC, ${baseColors.accent}CC)`, borderColor: baseColors.primary }}>
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Creative background shapes */}
            <div className="absolute top-2 right-3 w-8 h-8 rounded-full opacity-30 transform rotate-45" style={{ backgroundColor: baseColors.primary }}></div>
            <div className="absolute bottom-3 left-4 w-6 h-6 transform rotate-12 opacity-40" style={{ backgroundColor: baseColors.secondary }}></div>
            <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full opacity-50 transform -rotate-12" style={{ backgroundColor: baseColors.accent }}></div>
            
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Corporate Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl transform rotate-12 shadow-lg" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-white opacity-80">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-white px-2 py-1 rounded-full" style={{ backgroundColor: `${baseColors.accent}80` }}>🎨 Community</div>
            </div>
            
            {/* Corporate Navigation */}
            <div className="flex gap-3 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="px-3 py-1 rounded-full text-sm text-white border-2 transform hover:scale-105 transition-transform" style={{ borderColor: index % 3 === 0 ? baseColors.primary : index % 3 === 1 ? baseColors.secondary : baseColors.accent, backgroundColor: index % 3 === 0 ? `${baseColors.primary}30` : index % 3 === 1 ? `${baseColors.secondary}30` : `${baseColors.accent}30` }}>
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Services Overview */}
            <div className="mb-4">
              <div className="h-3 rounded-full w-1/3 mb-2" style={{ 
                background: `linear-gradient(45deg, ${baseColors.primary}, ${baseColors.secondary}, ${baseColors.accent})` 
              }}></div>
              <div className="h-2 rounded-full w-2/3 mb-2" style={{ 
                background: `linear-gradient(90deg, ${baseColors.secondary}, ${baseColors.accent})` 
              }}></div>
              <div className="h-2 rounded-full w-1/2" style={{ 
                background: `linear-gradient(60deg, ${baseColors.accent}, ${baseColors.primary})` 
              }}></div>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-full p-2" style={{ 
                background: `linear-gradient(135deg, ${baseColors.primary}30, ${baseColors.secondary}20)`,
                border: `2px solid ${baseColors.primary}60`
              }}>
                <div className="h-2 rounded-full w-3/4 mb-1" style={{ 
                  background: `linear-gradient(45deg, ${baseColors.primary}, ${baseColors.secondary})` 
                }}></div>
                <div className="h-1 rounded-full w-full" style={{ 
                  background: `linear-gradient(90deg, ${baseColors.secondary}, ${baseColors.accent})` 
                }}></div>
              </div>
              <div className="rounded-full p-2" style={{ 
                background: `linear-gradient(135deg, ${baseColors.secondary}30, ${baseColors.accent}20)`,
                border: `2px solid ${baseColors.secondary}60`
              }}>
                <div className="h-2 rounded-full w-3/4 mb-1" style={{ 
                  background: `linear-gradient(45deg, ${baseColors.secondary}, ${baseColors.accent})` 
                }}></div>
                <div className="h-1 rounded-full w-full" style={{ 
                  background: `linear-gradient(90deg, ${baseColors.accent}, ${baseColors.primary})` 
                }}></div>
              </div>
            </div>

            {/* Company Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 rounded-full w-8 mx-auto mb-1" style={{ 
                  background: `linear-gradient(45deg, ${baseColors.primary}, ${baseColors.secondary})` 
                }}></div>
                <div className="h-2 rounded-full w-6 mx-auto" style={{ 
                  background: `linear-gradient(90deg, ${baseColors.secondary}, ${baseColors.accent})` 
                }}></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded-full w-8 mx-auto mb-1" style={{ 
                  background: `linear-gradient(45deg, ${baseColors.secondary}, ${baseColors.accent})` 
                }}></div>
                <div className="h-2 rounded-full w-6 mx-auto" style={{ 
                  background: `linear-gradient(90deg, ${baseColors.accent}, ${baseColors.primary})` 
                }}></div>
              </div>
              <div className="text-center">
                <div className="h-3 rounded-full w-8 mx-auto mb-1" style={{ 
                  background: `linear-gradient(45deg, ${baseColors.accent}, ${baseColors.primary})` 
                }}></div>
                <div className="h-2 rounded-full w-6 mx-auto" style={{ 
                  background: `linear-gradient(90deg, ${baseColors.primary}, ${baseColors.secondary})` 
                }}></div>
              </div>
            </div>

            {/* Corporate CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-full w-2/5 shadow-lg" style={{ 
                background: `linear-gradient(135deg, ${baseColors.primary}, ${baseColors.secondary}, ${baseColors.accent})`,
                boxShadow: `0 4px 20px ${baseColors.primary}50`
              }}></div>
               <div className="h-6 border-2 rounded-full w-1/4" style={{ 
                 borderColor: baseColors.secondary, 
                 background: `linear-gradient(135deg, ${baseColors.secondary}30, ${baseColors.accent}20)`
               }}></div>
            </div>
          </div>
        )
      }

      // Landing Creative - Detaillierte Product Showcase
      if (config.layout === 'landing') {
        return (
          <div className="rounded-xl p-6 h-80 relative border-2 shadow-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${baseColors.primary}CC, ${baseColors.secondary}CC, ${baseColors.accent}CC)`, borderColor: baseColors.primary }}>
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Creative background shapes */}
            <div className="absolute top-2 right-3 w-8 h-8 rounded-full opacity-30 transform rotate-45" style={{ backgroundColor: baseColors.primary }}></div>
            <div className="absolute bottom-3 left-4 w-6 h-6 transform rotate-12 opacity-40" style={{ backgroundColor: baseColors.secondary }}></div>
            <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full opacity-50 transform -rotate-12" style={{ backgroundColor: baseColors.accent }}></div>
            
            {/* Landing Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl transform rotate-12 shadow-lg" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-white opacity-80">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-white px-2 py-1 rounded-full" style={{ backgroundColor: `${baseColors.accent}80` }}>✨ Launch</div>
            </div>
            
            {/* Landing Navigation */}
            <div className="flex gap-3 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="px-3 py-1 rounded-full text-sm text-white border-2 transform hover:scale-105 transition-transform" style={{ borderColor: index % 3 === 0 ? baseColors.primary : index % 3 === 1 ? baseColors.secondary : baseColors.accent, backgroundColor: index % 3 === 0 ? `${baseColors.primary}30` : index % 3 === 1 ? `${baseColors.secondary}30` : `${baseColors.accent}30` }}>
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Product Hero */}
            <div className="mb-4">
              <div className="h-3 bg-purple-600 rounded-full w-3/4 mb-2"></div>
              <div className="h-2 bg-pink-500 rounded-full w-1/2 mb-2"></div>
              <div className="h-2 bg-pink-500 rounded-full w-2/3"></div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                   <div className="h-2 rounded-full w-3/4" style={{ backgroundColor: baseColors.secondary }}></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                   <div className="h-2 rounded-full w-3/4" style={{ backgroundColor: baseColors.secondary }}></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                   <div className="h-2 rounded-full w-3/4" style={{ backgroundColor: baseColors.secondary }}></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                   <div className="h-2 rounded-full w-3/4" style={{ backgroundColor: baseColors.secondary }}></div>
              </div>
            </div>

            {/* Pricing/Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 bg-purple-600 rounded-full w-6 mx-auto mb-1"></div>
                <div className="h-2 bg-pink-500 rounded-full w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-purple-600 rounded-full w-6 mx-auto mb-1"></div>
                <div className="h-2 bg-pink-500 rounded-full w-4 mx-auto"></div>
              </div>
            </div>

            {/* Landing CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-full w-2/5 shadow-lg" style={{ backgroundColor: baseColors.primary }}></div>
               <div className="h-6 border-2 rounded-full w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}20` }}></div>
            </div>
          </div>
        )
      }

      // Verein Creative - Detaillierte Community Art Features
      if (config.layout === 'verein') {
        return (
          <div className="rounded-xl p-6 h-80 relative border-2 shadow-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${baseColors.primary}CC, ${baseColors.secondary}CC, ${baseColors.accent}CC)`, borderColor: baseColors.primary }}>
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Creative background shapes */}
            <div className="absolute top-2 right-3 w-8 h-8 rounded-full opacity-30 transform rotate-45" style={{ backgroundColor: baseColors.primary }}></div>
            <div className="absolute bottom-3 left-4 w-6 h-6 transform rotate-12 opacity-40" style={{ backgroundColor: baseColors.secondary }}></div>
            <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full opacity-50 transform -rotate-12" style={{ backgroundColor: baseColors.accent }}></div>
            
            {/* Verein Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl transform rotate-12 shadow-lg" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-white opacity-80">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-white px-2 py-1 rounded-full" style={{ backgroundColor: `${baseColors.accent}80` }}>🚀 Innovation</div>
            </div>
            
            {/* Verein Navigation */}
            <div className="flex gap-3 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="px-3 py-1 rounded-full text-sm text-white border-2 transform hover:scale-105 transition-transform" style={{ borderColor: index % 3 === 0 ? baseColors.primary : index % 3 === 1 ? baseColors.secondary : baseColors.accent, backgroundColor: index % 3 === 0 ? `${baseColors.primary}30` : index % 3 === 1 ? `${baseColors.secondary}30` : `${baseColors.accent}30` }}>
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Community Info */}
            <div className="mb-4">
              <div className="h-3 bg-purple-600 rounded-full w-1/3 mb-2"></div>
              <div className="h-2 bg-pink-500 rounded-full w-2/3 mb-2"></div>
              <div className="h-2 bg-pink-500 rounded-full w-1/2"></div>
            </div>

            {/* Activity Schedule */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: baseColors.primary }}></div>
                <div className="h-2 bg-purple-600 rounded-full w-1/4"></div>
                <div className="h-2 bg-pink-500 rounded-full w-1/6"></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-pink-400"></div>
                  <div className="h-2 bg-purple-600 rounded-full w-1/3"></div>
                  <div className="h-2 bg-pink-500 rounded-full w-1/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-pink-400"></div>
                  <div className="h-2 bg-purple-600 rounded-full w-2/5"></div>
                  <div className="h-2 bg-pink-500 rounded-full w-1/6"></div>
                </div>
              </div>
            </div>

            {/* Member Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 bg-purple-600 rounded-full w-6 mx-auto mb-1"></div>
                <div className="h-2 bg-pink-500 rounded-full w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-purple-600 rounded-full w-6 mx-auto mb-1"></div>
                <div className="h-2 bg-pink-500 rounded-full w-4 mx-auto"></div>
              </div>
            </div>

            {/* Verein CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-full w-2/5 shadow-lg" style={{ backgroundColor: baseColors.primary }}></div>
               <div className="h-6 border-2 rounded-full w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}20` }}></div>
            </div>
          </div>
        )
      }

      // Portfolio Creative - Detaillierte Artistic Project Showcase
      if (config.layout === 'portfolio') {
        return (
          <div className="rounded-xl p-6 h-80 relative border-2 shadow-2xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${baseColors.primary}CC, ${baseColors.secondary}CC, ${baseColors.accent}CC)`, borderColor: baseColors.primary }}>
            {getMobilePreview(designStyle, config, baseColors)}
            
            {/* Creative background shapes */}
            <div className="absolute top-2 right-3 w-8 h-8 rounded-full opacity-30 transform rotate-45" style={{ backgroundColor: baseColors.primary }}></div>
            <div className="absolute bottom-3 left-4 w-6 h-6 transform rotate-12 opacity-40" style={{ backgroundColor: baseColors.secondary }}></div>
            <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full opacity-50 transform -rotate-12" style={{ backgroundColor: baseColors.accent }}></div>
            
            {/* Portfolio Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl transform rotate-12 shadow-lg" style={{ backgroundColor: baseColors.primary }}>
                  {config.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{formData.companyName || config.title}</h3>
                  <p className="text-sm text-white opacity-80">{config.subtitle}</p>
                </div>
              </div>
              <div className="text-sm text-white px-2 py-1 rounded-full" style={{ backgroundColor: `${baseColors.accent}80` }}>🎭 Artist</div>
            </div>
            
            {/* Portfolio Navigation */}
            <div className="flex gap-3 mb-4">
              {config.features.map((feature, index) => (
                <div key={index} className="px-3 py-1 rounded-full text-sm text-white border-2 transform hover:scale-105 transition-transform" style={{ borderColor: index % 3 === 0 ? baseColors.primary : index % 3 === 1 ? baseColors.secondary : baseColors.accent, backgroundColor: index % 3 === 0 ? `${baseColors.primary}30` : index % 3 === 1 ? `${baseColors.secondary}30` : `${baseColors.accent}30` }}>
                  {feature}
                </div>
              ))}
            </div>
            
            {/* Project Showcase */}
            <div className="mb-4">
              <div className="h-3 bg-purple-600 rounded-full w-1/3 mb-2"></div>
              <div className="h-2 bg-pink-500 rounded-full w-2/3 mb-2"></div>
              <div className="h-2 bg-pink-500 rounded-full w-1/2"></div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-purple-800/30 border border-purple-400 rounded-full p-2">
                <div className="h-2 bg-purple-600 rounded-full w-3/4 mb-1"></div>
                <div className="h-1 bg-pink-500 rounded-full w-full"></div>
              </div>
              <div className="bg-purple-800/30 border border-purple-400 rounded-full p-2">
                <div className="h-2 bg-purple-600 rounded-full w-3/4 mb-1"></div>
                <div className="h-1 bg-pink-500 rounded-full w-full"></div>
              </div>
            </div>

            {/* Skills/Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <div className="h-3 bg-purple-600 rounded-full w-6 mx-auto mb-1"></div>
                <div className="h-2 bg-pink-500 rounded-full w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-purple-600 rounded-full w-6 mx-auto mb-1"></div>
                <div className="h-2 bg-pink-500 rounded-full w-4 mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-3 bg-purple-600 rounded-full w-6 mx-auto mb-1"></div>
                <div className="h-2 bg-pink-500 rounded-full w-4 mx-auto"></div>
              </div>
            </div>

            {/* Portfolio CTAs */}
            <div className="flex gap-3">
              <div className="h-6 rounded-full w-2/5 shadow-lg" style={{ backgroundColor: baseColors.primary }}></div>
               <div className="h-6 border-2 rounded-full w-1/4" style={{ borderColor: baseColors.secondary, backgroundColor: `${baseColors.secondary}20` }}></div>
            </div>
          </div>
        )
      }
    }

    return null
  }

  const designStyles = [
    { 
      value: 'corporate', 
      label: 'Corporate & Professionell',
      preview: (
        <div className="bg-slate-50 border-2 border-slate-300 rounded-lg p-6 text-gray-800 h-52 relative">
          {/* Corporate Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-sm border" style={{ backgroundColor: primaryColor, borderColor: primaryColor }}></div>
                <div className="h-2 bg-gray-700 rounded w-12 font-bold"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-2 bg-gray-600 rounded w-6"></div>
                <div className="h-2 bg-gray-600 rounded w-8"></div>
                <div className="h-2 bg-gray-600 rounded w-6"></div>
                <div className="h-2 rounded w-7" style={{ backgroundColor: primaryColor }}></div>
            </div>
          </div>
          
          {/* Business Hero */}
          <div className="space-y-3 mb-4">
            <div className="h-3 bg-gray-800 rounded-sm w-3/4"></div>
            <div className="h-2 bg-gray-600 rounded-sm w-5/6"></div>
            <div className="h-2 bg-gray-500 rounded-sm w-2/3"></div>
          </div>
          
          {/* Service Boxes */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white border-2 border-gray-300 rounded p-2">
                <div className="h-2 rounded-sm w-3/4 mb-1" style={{ backgroundColor: primaryColor }}></div>
                <div className="h-1 bg-gray-400 rounded w-full"></div>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded p-2">
                <div className="h-2 rounded-sm w-3/4 mb-1" style={{ backgroundColor: secondaryColor }}></div>
                <div className="h-1 bg-gray-400 rounded w-full"></div>
              </div>
          </div>
          
            {/* Corporate CTAs */}
            <div className="flex gap-3">
              <div className="h-4 rounded-sm w-2/5 shadow-md border" style={{ backgroundColor: primaryColor, borderColor: primaryColor }}></div>
              <div className="h-4 bg-white border-2 rounded-sm w-1/4" style={{ borderColor: primaryColor }}></div>
            </div>
          
          {/* Mobile Preview */}
          <div className="absolute bottom-2 right-2 w-16 h-28 bg-gray-800 rounded-lg border border-gray-600 shadow-lg">
            <div className="w-full h-full bg-slate-50 rounded-lg p-3 overflow-hidden">
              <div className="space-y-2">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: primaryColor }}></div>
                    <div className="h-1.5 bg-gray-600 rounded w-4"></div>
                  </div>
                <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                <div className="h-1.5 bg-gray-500 rounded w-full"></div>
                <div className="h-1.5 bg-gray-500 rounded w-2/3"></div>
                  <div className="space-y-1.5 mt-3">
                    <div className="bg-white border border-gray-300 rounded p-1.5">
                      <div className="h-1.5 rounded-sm w-3/4" style={{ backgroundColor: primaryColor }}></div>
                      <div className="h-1 bg-gray-400 rounded w-full mt-1"></div>
                    </div>
                    <div className="bg-white border border-gray-300 rounded p-1.5">
                      <div className="h-1.5 rounded-sm w-3/4" style={{ backgroundColor: secondaryColor }}></div>
                      <div className="h-1 bg-gray-400 rounded w-full mt-1"></div>
                    </div>
                  </div>
                  <div className="h-3 rounded-sm w-1/2 mt-3" style={{ backgroundColor: primaryColor }}></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      value: 'creative', 
      label: 'Bunt & Kreativ',
      preview: (
         <div className="rounded-xl p-6 text-gray-800 h-52 relative overflow-hidden" style={{
           background: `linear-gradient(to bottom right, ${primaryColor}20, ${secondaryColor}20, ${accentColor}20)`
         }}>
           {/* Kreative Hintergrund-Formen */}
           <div className="absolute top-2 right-3 w-8 h-8 rounded-full opacity-40 transform rotate-45" style={{
             background: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})`
           }}></div>
           <div className="absolute bottom-3 left-4 w-6 h-6 transform rotate-12 opacity-50" style={{
             backgroundColor: secondaryColor
           }}></div>
           <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full opacity-30 transform -rotate-12" style={{
             backgroundColor: accentColor
           }}></div>
          
           {/* Kreativer Header */}
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
               <div className="w-4 h-4 rounded-full shadow-lg" style={{
                 background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
               }}></div>
               <div className="h-2 rounded-full w-10 transform rotate-1" style={{
                 background: `linear-gradient(to right, ${primaryColor}80, ${secondaryColor}80)`
               }}></div>
           </div>
           <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full transform rotate-12" style={{
                 background: `linear-gradient(to right, ${secondaryColor}, ${accentColor})`
               }}></div>
               <div className="w-3 h-3 transform -rotate-12" style={{ backgroundColor: accentColor }}></div>
           </div>
           </div>
          
           {/* Verspielte Content-Bereiche */}
           <div className="space-y-3 mb-4">
             <div className="h-3 rounded-full w-4/5 transform -rotate-1 shadow-md" style={{
               background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
             }}></div>
             <div className="h-2 rounded-full w-3/4 transform rotate-1" style={{
               background: `linear-gradient(to right, ${secondaryColor}, ${accentColor})`
             }}></div>
             <div className="h-2 rounded-full w-2/3 transform -rotate-1" style={{ backgroundColor: accentColor }}></div>
           </div>
          
           {/* Künstlerische Gallery Cards */}
           <div className="grid grid-cols-3 gap-2 mb-4">
             <div className="h-6 rounded-lg transform rotate-2 shadow-sm" style={{
               background: `linear-gradient(to bottom right, ${primaryColor}60, ${secondaryColor}60)`
             }}></div>
             <div className="h-6 rounded-lg transform -rotate-1 shadow-sm" style={{
               background: `linear-gradient(to bottom right, ${secondaryColor}60, ${accentColor}60)`
             }}></div>
             <div className="h-6 rounded-lg transform rotate-1 shadow-sm" style={{ backgroundColor: `${accentColor}60` }}></div>
           </div>
          
           {/* Künstlerische CTAs */}
           <div className="flex gap-3">
             <div className="h-4 rounded-full w-2/5 transform rotate-1 shadow-lg" style={{
               background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor}, ${accentColor})`
             }}></div>
             <div className="h-4 rounded-full w-1/4 transform -rotate-1 shadow-md" style={{
               background: `linear-gradient(to right, ${accentColor}, ${primaryColor})`
             }}></div>
           </div>
          
           {/* Mobile Preview */}
           <div className="absolute bottom-2 right-2 w-16 h-28 bg-gray-800 rounded-lg border border-gray-600 shadow-lg">
             <div className="w-full h-full rounded-lg p-3 overflow-hidden" style={{
               background: `linear-gradient(to bottom right, ${primaryColor}15, ${secondaryColor}15)`
             }}>
                 <div className="space-y-2">
                  <div className="flex items-center gap-1.5 mb-2">
                   <div className="w-2 h-2 rounded-full" style={{
                     background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
                   }}></div>
                   <div className="h-1.5 rounded-full w-4" style={{
                     background: `linear-gradient(to right, ${primaryColor}80, ${secondaryColor}80)`
                   }}></div>
                  </div>
                 <div className="h-2 rounded-full w-3/4 transform rotate-1" style={{
                   background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
                 }}></div>
                 <div className="h-1.5 rounded-full w-1/2" style={{
                   background: `linear-gradient(to right, ${secondaryColor}, ${accentColor})`
                 }}></div>
                 <div className="h-1.5 rounded-full w-2/3" style={{ backgroundColor: accentColor }}></div>
                 <div className="space-y-1.5 mt-3">
                   <div className="h-3 rounded-lg transform rotate-2 shadow-sm" style={{
                     background: `linear-gradient(to bottom right, ${primaryColor}60, ${secondaryColor}60)`
                   }}></div>
                   <div className="h-3 rounded-lg transform -rotate-1 shadow-sm" style={{
                     background: `linear-gradient(to bottom right, ${secondaryColor}60, ${accentColor}60)`
                   }}></div>
                   <div className="h-3 rounded-lg transform rotate-1 shadow-sm" style={{
                     backgroundColor: `${accentColor}60`
                   }}></div>
                 </div>
                 <div className="h-3 rounded-full w-1/2 mt-3" style={{
                   background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
                 }}></div>
               </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      value: 'modern', 
      label: 'Modern & Minimalistisch',
      preview: (
        <div className="bg-white rounded-lg p-6 text-gray-800 h-52 shadow-lg border border-gray-100 relative">
          
          {/* Minimaler Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-3 rounded-sm" style={{ backgroundColor: primaryColor }}></div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          
          {/* Saubere Hero Section */}
          <div className="space-y-3 mb-4">
            <div className="h-3 rounded w-4/5" style={{ backgroundColor: primaryColor }}></div>
            <div className="h-2 bg-gray-300 rounded w-3/4"></div>
            <div className="h-2 bg-gray-300 rounded w-2/3"></div>
          </div>
          
          {/* Minimale Content Cards */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="h-6 rounded border border-gray-200" style={{ backgroundColor: `${primaryColor}15` }}></div>
            <div className="h-6 rounded border border-gray-200" style={{ backgroundColor: `${secondaryColor}15` }}></div>
            <div className="h-6 rounded border border-gray-200" style={{ backgroundColor: `${accentColor}15` }}></div>
          </div>
          
          {/* Clean CTAs */}
          <div className="flex gap-3">
            <div className="h-4 rounded w-2/5 shadow-md" style={{ backgroundColor: primaryColor }}></div>
            <div className="h-4 bg-gray-200 border border-gray-300 rounded w-1/4"></div>
          </div>
          
          {/* Mobile Preview */}
          <div className="absolute bottom-2 right-2 w-16 h-28 bg-gray-800 rounded-lg border border-gray-600 shadow-lg">
            <div className="w-full h-full bg-white rounded-lg p-3 overflow-hidden">
              <div className="space-y-2">
                <div className="h-1.5 bg-gray-300 rounded w-full"></div>
                <div className="h-2 rounded w-3/4" style={{ backgroundColor: primaryColor }}></div>
                <div className="h-1.5 bg-gray-300 rounded w-1/2"></div>
                <div className="h-1.5 bg-gray-300 rounded w-2/3"></div>
                <div className="space-y-1.5 mt-3">
                  <div className="h-3 rounded border border-gray-200" style={{ backgroundColor: `${primaryColor}15` }}></div>
                  <div className="h-3 rounded border border-gray-200" style={{ backgroundColor: `${secondaryColor}15` }}></div>
                  <div className="h-3 rounded border border-gray-200" style={{ backgroundColor: `${accentColor}15` }}></div>
                </div>
                <div className="h-3 rounded w-1/2 mt-3" style={{ backgroundColor: primaryColor }}></div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const availableFeatures = [
    { 
      name: 'Kontaktformular', 
      preview: (
        <div className="bg-gray-800 p-2 rounded-lg border border-gray-600">
          <div className="text-sm text-cyan-400 font-bold mb-3">Kontakt</div>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-400 mb-1">Name</div>
              <div className="h-3 bg-gray-600 rounded w-full"></div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">E-Mail</div>
              <div className="h-3 bg-gray-600 rounded w-4/5"></div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Nachricht</div>
              <div className="h-8 bg-gray-600 rounded w-full"></div>
            </div>
            <div className="h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded text-sm flex items-center justify-center text-white font-medium">
              Nachricht senden
            </div>
          </div>
        </div>
      )
    },
    { 
      name: 'Newsletter-Anmeldung', 
      preview: (
        <div className="bg-gray-800 p-2 rounded-lg border border-gray-600">
          <div className="text-sm text-green-400 font-bold mb-3">📧 Newsletter</div>
          <div className="text-sm text-gray-300 mb-3">Bleiben Sie informiert!</div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-600 rounded flex items-center px-2">
              <div className="text-sm text-gray-400">ihre@email.de</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 border border-gray-500 rounded-sm"></div>
              <div className="text-sm text-gray-400">Datenschutz akzeptieren</div>
            </div>
            <div className="h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded text-sm flex items-center justify-center text-white font-medium">
              Anmelden
            </div>
          </div>
        </div>
      )
    },
    { 
      name: 'Social Media Integration', 
      preview: (
        <div className="bg-gray-800 p-2 rounded-lg border border-gray-600">
          <div className="text-sm text-purple-400 font-bold mb-3">🔗 Social Media</div>
          <div className="space-y-2">
            <div className="text-sm text-gray-300 mb-2">Folgen Sie uns:</div>
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded text-sm flex items-center justify-center text-white font-bold">f</div>
              <div className="w-6 h-6 bg-cyan-400 rounded text-sm flex items-center justify-center text-white font-bold">𝕏</div>
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded text-sm flex items-center justify-center text-white font-bold">📷</div>
              <div className="w-6 h-6 bg-blue-700 rounded text-sm flex items-center justify-center text-white font-bold">in</div>
            </div>
            <div className="text-sm text-gray-400">Teilen & Vernetzen</div>
          </div>
        </div>
      )
    },
    { 
      name: 'Google Maps Einbindung', 
      preview: (
        <div className="bg-gray-800 p-2 rounded-lg border border-gray-600">
          <div className="text-sm text-red-400 font-bold mb-3">📍 Google Maps</div>
          <div className="h-16 bg-gray-200 rounded relative overflow-hidden border">
            {/* Simulierte Straßen */}
            <div className="absolute inset-0">
              <div className="absolute top-2 left-0 right-0 h-px bg-gray-400"></div>
              <div className="absolute top-6 left-0 right-0 h-px bg-gray-400"></div>
              <div className="absolute top-10 left-0 right-0 h-px bg-gray-400"></div>
              <div className="absolute top-0 bottom-0 left-4 w-px bg-gray-400"></div>
              <div className="absolute top-0 bottom-0 left-8 w-px bg-gray-400"></div>
              <div className="absolute top-0 bottom-0 left-12 w-px bg-gray-400"></div>
            </div>
            
            {/* Google Maps Marker */}
            <div className="absolute top-3 left-6 w-4 h-4 flex items-end justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg relative">
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-red-500"></div>
              </div>
            </div>
            
            {/* Google Controls */}
            <div className="absolute top-1 right-1 space-y-1">
              <div className="w-4 h-3 bg-white rounded shadow border text-sm flex items-center justify-center text-gray-600">+</div>
              <div className="w-4 h-3 bg-white rounded shadow border text-sm flex items-center justify-center text-gray-600">−</div>
            </div>
            
            {/* Google Logo */}
            <div className="absolute bottom-1 left-1 text-sm font-bold text-gray-600">Google</div>
            
            {/* Satellit/Karte Toggle */}
            <div className="absolute bottom-1 right-1 text-sm bg-white rounded px-1 text-gray-600 border">Karte</div>
          </div>
          <div className="text-sm text-gray-400 mt-1">Interaktive Google Maps</div>
        </div>
      )
    },
    { 
      name: 'Bildergalerie', 
      preview: (
        <div className="bg-gray-800 p-2 rounded-lg border border-gray-600">
          <div className="text-sm text-yellow-400 font-bold mb-3">🖼️ Galerie</div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded flex items-center justify-center text-sm text-white">📸</div>
            <div className="h-6 bg-gradient-to-br from-green-400 to-cyan-500 rounded flex items-center justify-center text-sm text-white">🌅</div>
            <div className="h-6 bg-gradient-to-br from-pink-400 to-red-500 rounded flex items-center justify-center text-sm text-white">🎨</div>
            <div className="h-6 bg-gradient-to-br from-purple-400 to-indigo-500 rounded flex items-center justify-center text-sm text-white">📷</div>
            <div className="h-6 bg-gradient-to-br from-orange-400 to-yellow-500 rounded flex items-center justify-center text-sm text-white">+2</div>
            <div className="h-6 bg-gray-600 rounded flex items-center justify-center text-sm text-gray-400 border-2 border-dashed border-gray-500">+</div>
          </div>
          <div className="text-sm text-gray-400 mt-2">Lightbox & Zoom</div>
        </div>
      )
    },
    { 
      name: 'Video-Integration', 
      preview: (
        <div className="bg-gray-800 p-2 rounded-lg border border-gray-600">
          <div className="text-sm text-red-400 font-bold mb-3">🎥 Video-Player</div>
          <div className="h-14 bg-black rounded relative overflow-hidden border border-gray-600">
            {/* Video Thumbnail Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-purple-900 to-gray-800"></div>
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 transition-colors">
                <div className="w-0 h-0 border-l-4 border-l-white border-y-3 border-y-transparent ml-1"></div>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
              <div className="flex items-center gap-1">
                <div className="w-0 h-0 border-l-2 border-l-white border-y-1 border-y-transparent"></div>
                <div className="flex-1 h-1 bg-gray-600 rounded-full">
                  <div className="h-full w-2/5 bg-red-500 rounded-full"></div>
                </div>
                <div className="text-sm text-white">2:30</div>
              </div>
            </div>
            
          </div>
          <div className="text-sm text-gray-400 mt-2">YouTube, Vimeo, MP4 & mehr</div>
        </div>
      )
    },
    { 
      name: 'FAQ-Sektion', 
      preview: (
        <div className="bg-gray-800 p-2 rounded-lg border border-gray-600">
          <div className="text-sm text-blue-400 font-bold mb-3">❓ FAQ</div>
          <div className="space-y-2">
            <div className="border border-gray-600 rounded p-2">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-300 font-medium">Projektzeit?</div>
                <div className="text-blue-400">−</div>
              </div>
              <div className="text-sm text-gray-400 mt-1">2-4 Wochen</div>
            </div>
            <div className="border border-gray-600 rounded p-2">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-300 font-medium">Website-Kosten?</div>
                <div className="text-blue-400">+</div>
              </div>
            </div>
            <div className="border border-gray-600 rounded p-2">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-300 font-medium">Support verfügbar?</div>
                <div className="text-blue-400">+</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    { 
      name: 'Testimonials/Bewertungen', 
      preview: (
        <div className="bg-gray-800 p-2 rounded-lg border border-gray-600">
          <div className="text-sm text-orange-400 font-bold mb-3">⭐ Bewertungen</div>
          <div className="space-y-3">
            <div className="bg-gray-700 rounded p-2 border-l-2 border-orange-400">
              <div className="flex gap-1 mb-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="text-sm text-yellow-400">★</div>
                ))}
              </div>
              <div className="text-sm text-gray-300 mb-1">&ldquo;Hervorragende Arbeit! Sehr professionell.&rdquo;</div>
              <div className="text-sm text-gray-400">- Max Mustermann</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">4.9/5</div>
              <div className="text-sm text-orange-400">Alle ansehen →</div>
            </div>
          </div>
        </div>
      )
    },
    { 
      name: 'Event-Kalender', 
      preview: (
        <div className="bg-gray-800 p-2 rounded-lg border border-gray-600">
          <div className="text-sm text-orange-400 font-bold mb-3">📅 Event-Kalender</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-300 font-medium">Dezember 2024</div>
              <div className="flex gap-1">
                <div className="w-3 h-3 border border-gray-500 rounded text-sm flex items-center justify-center text-gray-400">‹</div>
                <div className="w-3 h-3 border border-gray-500 rounded text-sm flex items-center justify-center text-gray-400">›</div>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-sm">
              <div className="text-gray-500 text-center">Mo</div>
              <div className="text-gray-500 text-center">Di</div>
              <div className="text-gray-500 text-center">Mi</div>
              <div className="text-gray-500 text-center">Do</div>
              <div className="text-gray-500 text-center">Fr</div>
              <div className="text-gray-500 text-center">Sa</div>
              <div className="text-gray-500 text-center">So</div>
              {[...Array(7)].map((_, i) => (
                <div key={i} className={`h-4 rounded text-sm flex items-center justify-center ${
                  i === 2 ? 'bg-orange-500 text-white' : 
                  i === 5 ? 'bg-blue-500 text-white' : 
                  'bg-gray-600 text-gray-300'
                }`}>
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-400">Events & Termine verwalten</div>
          </div>
        </div>
      )
    },
    { 
      name: 'Blog-Funktionalität', 
      preview: (
        <div className="bg-gray-800 p-2 rounded-lg border border-gray-600">
          <div className="text-sm text-indigo-400 font-bold mb-3">📝 Blog</div>
          <div className="space-y-3">
            <div className="border-b border-gray-600 pb-2">
              <div className="h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-2"></div>
              <div className="text-sm text-gray-300 font-medium mb-1">Webdesign Trends 2024</div>
              <div className="text-sm text-gray-400 mb-1">Neueste Entwicklungen...</div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>15. Dez</span>
                <span>•</span>
                <span>5 Min.</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">Artikel & Kategorien</div>
              <div className="text-sm text-indigo-400">Mehr →</div>
            </div>
          </div>
        </div>
      )
    },
    { 
      name: 'Suchfunktion', 
      preview: (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
          <div className="text-sm text-gray-300 mb-2">Suche</div>
          <div className="flex gap-1">
            <div className="h-4 bg-gray-600 rounded flex-1"></div>
            <div className="h-4 w-4 bg-cyan-500 rounded flex items-center justify-center text-white text-sm">🔍</div>
          </div>
        </div>
      )
    },
    { 
      name: 'Cookie-Banner', 
      preview: (
        <div className="bg-gray-800 p-2 rounded-lg border border-gray-600">
          <div className="text-sm text-yellow-400 font-bold mb-3">🍪 Cookie-Banner</div>
          <div className="bg-gray-900 border border-gray-600 rounded p-3 space-y-2">
            <div className="text-sm text-gray-300 font-medium">Cookies verwenden</div>
            <div className="space-y-1">
              <div className="h-4 bg-green-500 rounded text-sm flex items-center justify-center text-white font-medium">
                Akzeptieren
              </div>
              <div className="h-4 bg-gray-600 rounded text-sm flex items-center justify-center text-gray-300 font-medium">
                Ablehnen
              </div>
              <div className="h-4 bg-blue-500 rounded text-sm flex items-center justify-center text-white font-medium">
                Einstellungen
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-400 mt-2">DSGVO-konform</div>
        </div>
      )
    }
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Trigger domain check for desired domain
    if (field === 'desiredDomain' && value) {
      debouncedDomainCheck(value)
    } else if (field === 'desiredDomain' && !value) {
      setDomainCheckStatus('idle')
    }
  }

  const handleArrayToggle = (field: 'colors' | 'features', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : field === 'colors' && (prev[field].length + prev.customColors.length) >= 2
          ? prev[field] // Maximal 2 Farbschemen gesamt - keine weiteren hinzufügen
          : [...prev[field], value]
    }))
  }

  const addCustomColor = () => {
    if (formData.colors.length + formData.customColors.length >= 2) return
    
    setFormData(prev => ({
      ...prev,
      customColors: [...prev.customColors, currentMixColor]
    }))
    setShowColorMixer(false)
    setCurrentMixColor('#6366f1') // Reset auf Standard
  }

  const removeCustomColor = (colorToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      customColors: prev.customColors.filter(color => color !== colorToRemove)
    }))
  }

  // HSL zu Hex Konvertierung
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  // Update Farbe basierend auf HSL
  const updateColorFromHSL = (newHue?: number, newSat?: number, newLight?: number) => {
    const h = newHue !== undefined ? newHue : hue
    const s = newSat !== undefined ? newSat : saturation
    const l = newLight !== undefined ? newLight : lightness
    
    if (newHue !== undefined) setHue(newHue)
    if (newSat !== undefined) setSaturation(newSat)
    if (newLight !== undefined) setLightness(newLight)
    
    const hexColor = hslToHex(h, s, l)
    setCurrentMixColor(hexColor)
  }

  // Gemeinsame Logik für Klick und Drag
  const updateColorFromPosition = (clientX: number, clientY: number) => {
    if (!colorWheelRef.current) return
    
    const rect = colorWheelRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = clientX - centerX
    const y = clientY - centerY
    
    const angle = Math.atan2(y, x)
    const angleDegrees = ((angle * 180 / Math.PI) + 90 + 360) % 360
    
    const distance = Math.sqrt(x * x + y * y)
    const radius = rect.width / 2
    const saturationValue = Math.min(distance / radius * 100, 100)
    
    if (distance <= radius) {
      updateColorFromHSL(angleDegrees, saturationValue)
    }
  }

  // Klick-Handler für Farbkreis
  const handleColorWheelClick = (event: React.MouseEvent<HTMLDivElement>) => {
    updateColorFromPosition(event.clientX, event.clientY)
  }

  // Mouse-Down Handler
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    updateColorFromPosition(event.clientX, event.clientY)
  }

  // Mouse-Move Handler (während Drag)
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      updateColorFromPosition(event.clientX, event.clientY)
    }
  }

  // Mouse-Up Handler
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Lightness Position Update
  const updateLightnessFromPosition = (clientX: number) => {
    if (!lightnessSliderRef.current) return
    
    const rect = lightnessSliderRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const newLightness = Math.max(0, Math.min(100, Math.round((x / rect.width) * 100)))
    updateColorFromHSL(undefined, undefined, newLightness)
  }

  // Lightness Event Handlers
  const handleLightnessMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingLightness(true)
    updateLightnessFromPosition(event.clientX)
  }

  const handleLightnessMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingLightness) {
      updateLightnessFromPosition(event.clientX)
    }
  }

  const handleLightnessClick = (event: React.MouseEvent<HTMLDivElement>) => {
    updateLightnessFromPosition(event.clientX)
  }

  const nextStep = () => {
    if (currentStep < questionSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      // Scroll zum Anfang des nächsten Steps
      setTimeout(() => {
        const nextStepElement = document.getElementById(`step-${currentStep + 1}`)
        if (nextStepElement) {
          const elementRect = nextStepElement.getBoundingClientRect()
          const offsetTop = window.pageYOffset + elementRect.top - 60
          window.scrollTo({ top: offsetTop, behavior: 'smooth' })
        }
      }, 100)
    } else {
      setIsCompleted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      // Scroll zum Anfang des vorherigen Steps
      setTimeout(() => {
        const prevStepElement = document.getElementById(`step-${currentStep - 1}`)
        if (prevStepElement) {
          const elementRect = prevStepElement.getBoundingClientRect()
          const offsetTop = window.pageYOffset + elementRect.top - 60
          window.scrollTo({ top: offsetTop, behavior: 'smooth' })
        }
      }, 100)
    }
  }

  const submitQuestionnaire = () => {
    // Hier würde normalerweise die Datenübertragung stattfinden
    console.log('Fragebogen-Daten:', formData)
    alert('Fragebogen erfolgreich übermittelt! Wir melden uns binnen 24 Stunden bei Ihnen.')
  }

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0: // BASIS
        return formData.projectType !== '' && formData.industry !== '' && formData.companyName.trim() !== ''
      case 1: // INHALT
        return formData.hasContent !== '' && formData.pageCount !== '' && formData.hasImages !== ''
      case 2: // DESIGN
        return formData.designStyle !== '' && (formData.colors.length > 0 || formData.customColors.length > 0)
      case 3: // TECH
        return formData.timeline !== '' && formData.budget !== '' && formData.domain !== ''
      case 4: // SYSTEM
        return formData.accessibility !== ''
      case 5: // ABSCHLUSS
        return (
          // BASIS - Alle Pflichtfelder
          formData.projectType !== '' && 
          formData.industry !== '' && 
          formData.companyName.trim() !== '' &&
          // INHALT - Alle Pflichtfelder  
          formData.hasContent !== '' && 
          formData.pageCount !== '' && 
          formData.hasImages !== '' &&
          // DESIGN - Designstil und Farben
          formData.designStyle !== '' && 
          (formData.colors.length > 0 || formData.customColors.length > 0) &&
          // TECH - Alle Pflichtfelder
          formData.timeline !== '' && 
          formData.budget !== '' && 
          formData.domain !== '' &&
          // SYSTEM - Alle Pflichtfelder
          formData.accessibility !== '' &&
          // KONTAKT - Alle Pflichtfelder
          formData.contactPersonFirstName.trim() !== '' && 
          formData.contactPersonLastName.trim() !== '' && 
          formData.contactEmail.trim() !== '' && 
          formData.preferredContact !== ''
        )
      default:
        return false
    }
  }

  const getMissingFields = () => {
    const missing: string[] = []
    
    switch (currentStep) {
      case 0: // BASIS
        if (formData.projectType === '') missing.push('Projekttyp')
        if (formData.industry === '') missing.push('Branche')
        if (formData.companyName.trim() === '') missing.push('Firmenname')
        break
      case 1: // INHALT
        if (formData.hasContent === '') missing.push('Textverfügbarkeit')
        if (formData.pageCount === '') missing.push('Seitenumfang')
        if (formData.hasImages === '') missing.push('Bildmaterial')
        break
      case 2: // DESIGN
        if (formData.designStyle === '') missing.push('Design-Stil')
        if (formData.colors.length === 0 && formData.customColors.length === 0) missing.push('Farbauswahl')
        break
      case 3: // TECH
        if (formData.timeline === '') missing.push('Timeline')
        if (formData.budget === '') missing.push('Budget')
        if (formData.domain === '') missing.push('Domain')
        break
      case 4: // SYSTEM
        if (formData.accessibility === '') missing.push('Barrierefreiheit')
        break
      case 5: // ABSCHLUSS
        // BASIS
        if (formData.projectType === '') missing.push('Projekttyp')
        if (formData.industry === '') missing.push('Branche')
        if (formData.companyName.trim() === '') missing.push('Firmenname')
        // INHALT
        if (formData.hasContent === '') missing.push('Textverfügbarkeit')
        if (formData.pageCount === '') missing.push('Seitenumfang')
        if (formData.hasImages === '') missing.push('Bildmaterial')
        // DESIGN
        if (formData.designStyle === '') missing.push('Design-Stil')
        if (formData.colors.length === 0 && formData.customColors.length === 0) missing.push('Farbauswahl')
        // TECH
        if (formData.timeline === '') missing.push('Timeline')
        if (formData.budget === '') missing.push('Budget')
        if (formData.domain === '') missing.push('Domain')
        // SYSTEM
        if (formData.accessibility === '') missing.push('Barrierefreiheit')
        // KONTAKT
        if (formData.contactPersonFirstName.trim() === '') missing.push('Vorname')
        if (formData.contactPersonLastName.trim() === '') missing.push('Nachname')
        if (formData.contactEmail.trim() === '') missing.push('E-Mail')
        if (formData.preferredContact === '') missing.push('Bevorzugter Kontakt')
        break
    }
    
    return missing
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basics
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-cyan-400 font-mono text-sm uppercase tracking-wider mb-4">
                WEBSEITEN.TYP
              </label>
              {/* Erste Zeile: 4 Haupttypen */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {projectTypes.slice(0, 4).map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleInputChange('projectType', type.value)}
                    className={`p-2 border-2 rounded-xl transition-all duration-300 text-left focus:outline-none ${
                      formData.projectType === type.value
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-gray-600 hover:border-cyan-400/50'
                    }`}
                  >
                    <div className={`font-semibold text-base mb-1 ${
                      formData.projectType === type.value ? 'text-cyan-400' : 'text-gray-300'
                    }`}>
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>

              {/* Zweite Zeile: 2 weitere Typen */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectTypes.slice(4, 6).map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleInputChange('projectType', type.value)}
                    className={`p-2 border-2 rounded-xl transition-all duration-300 text-left focus:outline-none ${
                      formData.projectType === type.value
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-gray-600 hover:border-cyan-400/50'
                    }`}
                  >
                    <div className={`font-semibold text-base mb-1 ${
                      formData.projectType === type.value ? 'text-cyan-400' : 'text-gray-300'
                    }`}>
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Sonstige Option mit Eingabefeld */}
              <div className="mt-6">
                <div 
                  onClick={() => handleInputChange('projectType', 'other')}
                  className={`p-6 border-2 rounded-xl transition-all duration-300 cursor-pointer ${
                    formData.projectType === 'other'
                      ? 'border-cyan-400 bg-cyan-400/10'
                      : 'border-gray-600 hover:border-cyan-400/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`font-semibold text-lg mb-2 ${
                        formData.projectType === 'other' ? 'text-cyan-400' : 'text-gray-300'
                      }`}>
                        Sonstige
                      </div>
                      <div className={`text-sm ${
                        formData.projectType === 'other' ? 'text-cyan-300' : 'text-gray-400'
                      }`}>
                        Individuelle Wünsche
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <input
                        type="text"
                        value={formData.customProjectType}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleInputChange('customProjectType', e.target.value);
                          handleInputChange('projectType', 'other');
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-400 transition-all duration-300"
                        placeholder="Beschreiben Sie Ihr Projekt..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-cyan-400 font-mono text-sm uppercase tracking-wider mb-4">
                BRANCHE.SEKTOR
              </label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-4 py-4 bg-black/50 border border-gray-600 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white transition-all duration-300"
              >
                <option value="">Branche auswählen...</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry} className="bg-black">
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-cyan-400 font-mono text-sm uppercase tracking-wider mb-4">
                UNTERNEHMENS.NAME
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full px-4 py-4 bg-black/50 border border-gray-600 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Ihr Unternehmen..."
              />
              </div>
            </div>
          </div>
        )

      case 1: // Content
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-purple-400 font-mono text-sm uppercase tracking-wider mb-4">
                TEXTE.VERFÜGBARKEIT
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'have_all', label: 'Ich habe alle Texte fertig' },
                  { value: 'have_some', label: 'Ich habe teilweise Texte' },
                  { value: 'need_help', label: 'Ich benötige Hilfe bei den Texten' },
                  { value: 'need_all', label: 'Ich benötige komplette Texterstellung' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('hasContent', option.value)}
                    className={`p-2 border-2 rounded-xl transition-all duration-300 text-left ${
                      formData.hasContent === option.value
                        ? 'border-purple-400 bg-purple-400/10 text-purple-400'
                        : 'border-gray-600 hover:border-purple-400/50 text-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-purple-400 font-mono text-sm uppercase tracking-wider mb-4">
                SEITEN.UMFANG
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '1-3', label: '1-3 Seiten' },
                  { value: '3-6', label: '3-6 Seiten' },
                  { value: '6-12', label: '6-12 Seiten' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('pageCount', option.value)}
                    className={`p-2 border-2 rounded-xl transition-all duration-300 text-center ${
                      formData.pageCount === option.value
                        ? 'border-purple-400 bg-purple-400/10 text-purple-400'
                        : 'border-gray-600 hover:border-purple-400/50 text-gray-300'
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-purple-400 font-mono text-sm uppercase tracking-wider mb-4">
                BILDER.MATERIAL
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'have_professional', label: 'Habe prof. Bilder' },
                  { value: 'have_some', label: 'Habe Bilder' },
                  { value: 'need_stock', label: 'Benöt. Stock Bilder' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('hasImages', option.value)}
                    className={`p-2 border-2 rounded-xl transition-all duration-300 text-left ${
                      formData.hasImages === option.value
                        ? 'border-purple-400 bg-purple-400/10 text-purple-400'
                        : 'border-gray-600 hover:border-purple-400/50 text-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 2: // Design
        return (
          <div className="space-y-8">

            {/* Farbauswahl Sektion (Rechts) */}
            <div>
              <label className="block text-green-400 font-mono text-sm uppercase tracking-wider mb-2">
                FARB.PRÄFERENZEN (Mehrauswahl möglich)
              </label>
              <div className="text-sm text-gray-400 mb-4">
                {formData.colors.length + formData.customColors.length}/2 Farbschemen ausgewählt
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { value: 'blue', label: 'Blau', hex: '#3b82f6' },
                  { value: 'green', label: 'Grün', hex: '#10b981' },
                  { value: 'purple', label: 'Lila', hex: '#8b5cf6' },
                  { value: 'red', label: 'Rot', hex: '#ef4444' },
                  { value: 'orange', label: 'Orange', hex: '#f97316' },
                  { value: 'yellow', label: 'Gelb', hex: '#eab308' },
                  { value: 'pink', label: 'Rosa', hex: '#ec4899' },
                  { value: 'cyan', label: 'Türkis', hex: '#06b6d4' },
                  { value: 'indigo', label: 'Indigo', hex: '#6366f1' },
                  { value: 'teal', label: 'Petrol', hex: '#14b8a6' },
                  { value: 'lime', label: 'Limette', hex: '#84cc16' },
                  { value: 'amber', label: 'Bernstein', hex: '#f59e0b' }
                ].map((color) => {
                  const isSelected = formData.colors.includes(color.value)
                  const isDisabled = !isSelected && (formData.colors.length + formData.customColors.length) >= 2
                  
                  return (
                  <button
                    key={color.value}
                    onClick={() => handleArrayToggle('colors', color.value)}
                    disabled={isDisabled}
                    className={`p-2 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                      isSelected
                        ? 'border-green-400 bg-green-400/10'
                        : isDisabled
                          ? 'border-gray-700 bg-gray-800/50 opacity-50 cursor-not-allowed'
                        : 'border-gray-600 hover:border-green-400/50'
                    }`}
                  >
                    <div className="flex flex-col space-y-3">
                      {/* Farbschema Preview */}
                      <div className="flex justify-center">
                        <div className="flex overflow-hidden rounded-lg border border-gray-600">
                          <div
                            className="w-6 h-6"
                            style={{ backgroundColor: color.hex + '40' }}
                          />
                          <div
                            className="w-6 h-6"
                            style={{ backgroundColor: color.hex + '80' }}
                          />
                          <div
                            className="w-6 h-6"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div
                            className="w-6 h-6"
                            style={{ 
                              backgroundColor: color.hex,
                              filter: 'brightness(1.3)'
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Label */}
                      <div className="text-center">
                        <span className="text-white text-sm font-medium">{color.label}</span>
                      </div>
                    </div>
                  </button>
                  )
                })}
              </div>
              
              {/* Interaktive Farbmischpalette */}
              <div className="mt-6">
                <div className="relative">
                  {/* Vereinfachter Color Picker mit nur Farbkreis */}
                  {showColorMixer && (
                    <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 z-30 bg-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/20">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-cyan-400 font-mono text-sm uppercase tracking-wider">
                          Farbauswahl
                        </div>
                        <button
                          onClick={() => setShowColorMixer(false)}
                          className="text-gray-400 hover:text-white transition-colors focus:outline-none"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Klickbarer Farbkreis */}
                      <div className="relative mb-6">
                        <div 
                          ref={colorWheelRef}
                          onClick={handleColorWheelClick}
                          onMouseDown={handleMouseDown}
                          onMouseMove={handleMouseMove}
                          onMouseUp={handleMouseUp}
                          className={`w-48 h-48 mx-auto rounded-full border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20 relative overflow-hidden select-none ${
                            isDragging ? 'cursor-grabbing' : 'cursor-grab'
                          }`}
                          style={{
                            background: `
                              radial-gradient(circle at center, 
                                hsl(0, 0%, 50%) 0%, 
                                transparent 100%
                              ),
                              conic-gradient(
                                hsl(0, 100%, 50%) 0deg,
                                hsl(60, 100%, 50%) 60deg,
                                hsl(120, 100%, 50%) 120deg,
                                hsl(180, 100%, 50%) 180deg,
                                hsl(240, 100%, 50%) 240deg,
                                hsl(300, 100%, 50%) 300deg,
                                hsl(360, 100%, 50%) 360deg
                              )
                            `,
                            backgroundBlendMode: 'multiply'
                          }}
                        >
                          {/* Selector */}
                          <div 
                            className="absolute w-4 h-4 bg-white border-2 border-black rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{
                              left: `${50 + (saturation / 100 * 46) * Math.cos((hue - 90) * Math.PI / 180)}%`,
                              top: `${50 + (saturation / 100 * 46) * Math.sin((hue - 90) * Math.PI / 180)}%`
                            }}
                          />
                        </div>
                      </div>

                      {/* Schwarz-Weiß Lightness Slider */}
                      <div className="mb-6">
                        <div className="text-center mb-2">
                          <div className="text-sm text-cyan-400 font-mono uppercase tracking-wider">
                            Helligkeit: {lightness}%
                          </div>
                        </div>
                        <div className="relative w-48 h-4 mx-auto rounded-lg overflow-hidden border border-cyan-500/30">
                          <div
                            ref={lightnessSliderRef}
                            className={`w-full h-full select-none ${
                              isDraggingLightness ? 'cursor-grabbing' : 'cursor-grab'
                            }`}
                            style={{
                              background: `linear-gradient(to right, 
                                hsl(${hue}, ${saturation}%, 0%) 0%, 
                                hsl(${hue}, ${saturation}%, 50%) 50%, 
                                hsl(${hue}, ${saturation}%, 100%) 100%
                              )`
                            }}
                            onClick={handleLightnessClick}
                            onMouseDown={handleLightnessMouseDown}
                            onMouseMove={handleLightnessMouseMove}
                          >
                            {/* Lightness Selector */}
                            <div
                              className="absolute top-1/2 w-3 h-3 bg-white border-2 border-black rounded-full shadow-lg transform -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                              style={{
                                left: `${lightness}%`
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Kompakte Farbvorschau */}
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <div 
                          className="w-16 h-16 rounded-xl border-2 border-cyan-500/50 shadow-lg"
                          style={{ backgroundColor: currentMixColor }}
                        />
                        <div className="text-center">
                          <div className="text-white font-mono text-lg">{currentMixColor.toUpperCase()}</div>
                          <div className="text-gray-400 text-sm font-mono">
                            HSL({Math.round(hue)}, {Math.round(saturation)}%, {lightness}%)
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={addCustomColor}
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/25 focus:outline-none"
                        >
                          Hinzufügen
                        </button>
                        <button
                          onClick={() => setShowColorMixer(false)}
                          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none"
                        >
                          Abbrechen
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-green-400 font-mono text-sm uppercase tracking-wider">
                      Eigene Farbmischung
                    </span>
                    <button
                      onClick={() => setShowColorMixer(true)}
                    disabled={(formData.colors.length + formData.customColors.length) >= 2}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none ${
                      (formData.colors.length + formData.customColors.length) >= 2
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      Farbe mischen
                    </button>
                  </div>
                </div>


                {/* Harmonierendes Farbschema Display */}
                {(formData.colors.length > 0 || formData.customColors.length > 0) && (
                  <div className="mb-6">
                    <div className="text-sm text-cyan-400 font-mono uppercase tracking-wider mb-3">
                      Ihr Farbschema
                    </div>
                    <div className="space-y-3">
                      {/* Vordefinierte Farben */}
                      {formData.colors.map((colorValue) => {
           const colorData = [
             { value: 'blue', color: '#3b82f6' },
             { value: 'green', color: '#10b981' },
             { value: 'purple', color: '#8b5cf6' },
             { value: 'red', color: '#ef4444' },
             { value: 'orange', color: '#f97316' },
             { value: 'yellow', color: '#eab308' },
             { value: 'pink', color: '#ec4899' },
             { value: 'cyan', color: '#06b6d4' },
             { value: 'indigo', color: '#6366f1' },
             { value: 'teal', color: '#14b8a6' },
             { value: 'lime', color: '#84cc16' },
             { value: 'amber', color: '#f59e0b' }
           ].find(c => c.value === colorValue)
                        
                        if (!colorData) return null
                        
                        return (
                          <div key={colorValue} className="flex items-center gap-2">
                            <div className="flex">
                              {/* Verschiedene Helligkeitsstufen */}
                              <div
                                className="w-8 h-8 border border-gray-600"
                                style={{ 
                                  backgroundColor: colorData.color + '40' // 25% opacity
                                }}
                              />
                              <div
                                className="w-8 h-8 border border-gray-600"
                                style={{ 
                                  backgroundColor: colorData.color + '80' // 50% opacity
                                }}
                              />
                              <div
                                className="w-8 h-8 border border-gray-600"
                                style={{ 
                                  backgroundColor: colorData.color // 100% opacity
                                }}
                              />
                              <div
                                className="w-8 h-8 border border-gray-600"
                                style={{ 
                                  backgroundColor: colorData.color,
                                  filter: 'brightness(1.3)'
                                }}
                              />
                            </div>
                            <button
                              onClick={() => handleArrayToggle('colors', colorValue)}
                              className="w-4 h-4 bg-red-500 rounded-full text-white text-sm hover:bg-red-600 transition-colors duration-200 flex items-center justify-center focus:outline-none"
                            >
                              ×
                            </button>
                          </div>
                        )
                      })}

                      {/* Custom Colors */}
                      {formData.customColors.map((color, index) => (
                        <div key={`custom-${index}`} className="flex items-center gap-2">
                          <div className="flex">
                            {/* Verschiedene Helligkeitsstufen für Custom Colors */}
                            <div
                              className="w-8 h-8 border border-gray-600"
                              style={{ 
                                backgroundColor: color + '40' // 25% opacity
                              }}
                            />
                            <div
                              className="w-8 h-8 border border-gray-600"
                              style={{ 
                                backgroundColor: color + '80' // 50% opacity
                              }}
                            />
                            <div
                              className="w-8 h-8 border border-gray-600"
                              style={{ 
                                backgroundColor: color // 100% opacity
                              }}
                            />
                            <div
                              className="w-8 h-8 border border-gray-600"
                              style={{ 
                                backgroundColor: color,
                                filter: 'brightness(1.3)'
                              }}
                            />
                          </div>
                          <button
                            onClick={() => removeCustomColor(color)}
                            className="w-4 h-4 bg-red-500 rounded-full text-white text-sm hover:bg-red-600 transition-colors duration-200 flex items-center justify-center focus:outline-none"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
            
          </div>
        )

      case 3: // Technical
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-orange-400 font-mono text-sm uppercase tracking-wider mb-4">
                ZEITRAHMEN
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { value: '2weeks', label: '2 Wochen' },
                  { value: '1month', label: '1 Monat' },
                  { value: '3months', label: '3 Monate' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('timeline', option.value)}
                    className={`p-2 border-2 rounded-xl transition-all duration-300 text-left h-12 flex items-center ${
                      formData.timeline === option.value
                        ? 'border-orange-400 bg-orange-400/10 text-orange-400'
                        : 'border-gray-600 hover:border-orange-400/50 text-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
                
                {/* Custom Timeline Input - at the end */}
                <input
                  type="text"
                  placeholder="Eigene"
                  value={formData.timeline === '2weeks' || formData.timeline === '1month' || formData.timeline === '3months' ? '' : formData.timeline || ''}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="p-2 border-2 rounded-xl transition-all duration-300 text-left h-12 bg-black/40 border-gray-600 text-gray-300 placeholder-gray-500 focus:border-orange-400/50 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-orange-400 font-mono text-sm uppercase tracking-wider mb-4">
                BUDGET.RAHMEN
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { value: '500-1k', label: '500€ - 1.000€' },
                  { value: '1k-1.5k', label: '1.000€ - 1.500€' },
                  { value: '1.5k-2.5k', label: '1.500€ - 2.500€' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('budget', option.value)}
                    className={`p-2 border-2 rounded-xl transition-all duration-300 text-left h-12 flex items-center ${
                      formData.budget === option.value
                        ? 'border-orange-400 bg-orange-400/10 text-orange-400'
                        : 'border-gray-600 hover:border-orange-400/50 text-gray-300'
                    }`}
                    style={{ fontSize: '13px' }}
                  >
                    {option.label}
                  </button>
                ))}
                
                {/* Direct Budget Input Field */}
                <input
                  type="text"
                  placeholder="Ihr Budget"
                  value={formData.customBudget || ''}
                  onChange={(e) => handleInputChange('customBudget', e.target.value)}
                  className="p-2 border-2 rounded-xl transition-all duration-300 text-left h-12 bg-black/40 border-gray-600 text-gray-300 placeholder-gray-500 focus:border-orange-400/50 focus:outline-none"
                  style={{ fontSize: '13px' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-orange-400 font-mono text-sm uppercase tracking-wider mb-4">
                DOMAIN.STATUS inkl. LIVE CHECK
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'have', label: 'Habe Domain' },
                  { value: 'need_help', label: 'Brauche Hilfe' },
                  { value: 'need_registration', label: 'Registrierung' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('domain', option.value)}
                    className={`p-2 border-2 rounded-xl transition-all duration-300 text-left h-12 flex items-center justify-between relative group ${
                      formData.domain === option.value
                        ? 'border-orange-400 bg-orange-400/10 text-orange-400'
                        : 'border-gray-600 hover:border-orange-400/50 text-gray-300'
                    }`}
                  >
                    <span>{option.label}</span>
                    
                    {/* Info icon for registration option */}
                    {option.value === 'need_registration' && (
                      <div className="relative">
                        <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-xs opacity-60 hover:opacity-100 transition-opacity">
                          i
                        </div>
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full right-0 z-50 mb-2 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <div className="bg-black/90 backdrop-blur-xl border border-orange-400/50 rounded-xl p-3 shadow-2xl">
                            <div className="text-orange-400 font-mono text-xs uppercase tracking-wider mb-2">
                              Hinweis zur Domain
                            </div>
                            <div className="text-white text-xs leading-relaxed">
                              Die angezeigte Verfügbarkeit ist eine Echtzeit-Prüfung. Domains können 
                              jederzeit von anderen registriert werden. Wir empfehlen eine schnelle 
                              Registrierung bei verfügbaren Domains.
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Conditional Domain Input Fields */}
              {formData.domain === 'have' && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Ihre bestehende Domain (z.B. meine-firma.de)"
                    value={formData.existingDomain || ''}
                    onChange={(e) => handleInputChange('existingDomain', e.target.value)}
                    className="w-full p-2 border-2 rounded-xl transition-all duration-300 bg-black/40 border-orange-400 text-white placeholder-orange-300/70 focus:border-orange-300 focus:outline-none h-12"
                    style={{ fontSize: '13px' }}
                  />
                </div>
              )}
              
              {formData.domain === 'need_registration' && (
                <div className="mt-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Gewünschte Domain (z.B. neue-firma.de)"
                      value={formData.desiredDomain || ''}
                      onChange={(e) => handleInputChange('desiredDomain', e.target.value)}
                      className={`w-full p-2 border-2 rounded-xl transition-all duration-300 bg-black/40 text-white placeholder-orange-300/70 focus:outline-none h-12 pr-10 ${
                        domainCheckStatus === 'available' ? 'border-green-400 focus:border-green-300' :
                        domainCheckStatus === 'taken' ? 'border-red-400 focus:border-red-300' :
                        domainCheckStatus === 'error' ? 'border-yellow-400 focus:border-yellow-300' :
                        'border-orange-400 focus:border-orange-300'
                      }`}
                      style={{ fontSize: '13px' }}
                    />
                    
                    {/* Status indicator */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {domainCheckStatus === 'checking' && (
                        <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                      )}
                      {domainCheckStatus === 'available' && (
                        <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                      {domainCheckStatus === 'taken' && (
                        <div className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✗</span>
                        </div>
                      )}
                      {domainCheckStatus === 'error' && (
                        <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Status message */}
                  {domainCheckStatus !== 'idle' && (
                    <div className="mt-2 text-xs">
                      {domainCheckStatus === 'checking' && (
                        <span className="text-orange-400">Domain wird geprüft...</span>
                      )}
                      {domainCheckStatus === 'available' && (
                        <span className="text-green-400">Domain ist verfügbar!</span>
                      )}
                      {domainCheckStatus === 'taken' && (
                        <span className="text-red-400">Domain ist bereits vergeben</span>
                      )}
                      {domainCheckStatus === 'error' && (
                        <span className="text-yellow-400">! Ungültiges Domain-Format</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )

      case 4: // Requirements
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-indigo-400 font-mono text-sm uppercase tracking-wider mb-4">
                GEWÜNSCHTE.FUNKTIONEN (Mehrauswahl möglich)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableFeatures.map((feature) => (
                  <div key={feature.name} className="relative">
                  <button
                      onClick={() => handleArrayToggle('features', feature.name)}
                      className={`w-full p-2 border-2 rounded-xl transition-all duration-300 text-left flex items-center justify-between ${
                        formData.features.includes(feature.name)
                        ? 'border-indigo-400 bg-indigo-400/10 text-indigo-400'
                        : 'border-gray-600 hover:border-indigo-400/50 text-gray-300'
                    }`}
                  >
                      <span>{feature.name}</span>
                      <div 
                        className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center text-sm text-gray-400 hover:border-indigo-400 hover:text-indigo-400 transition-colors duration-200 cursor-help"
                        onMouseEnter={() => setHoveredFeature(feature.name)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        ?
                      </div>
                  </button>
                    
                    {/* Hover Preview */}
                    {hoveredFeature === feature.name && (
                      <div className="absolute bottom-full right-0 z-50 mb-2 w-48">
                        <div className="bg-black/90 backdrop-blur-xl border border-indigo-400/50 rounded-xl p-2 shadow-2xl">
                          <div className="text-indigo-400 font-mono text-sm uppercase tracking-wider mb-2">
                            Vorschau
                          </div>
                          {feature.preview}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-indigo-400 font-mono text-sm uppercase tracking-wider mb-4">
                  BARRIEREFREIHEIT
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'important', label: 'Sehr wichtig' },
                    { value: 'nice', label: 'Wünschenswert' },
                    { value: 'not_needed', label: 'Nicht erforderlich' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleInputChange('accessibility', option.value)}
                      className={`w-full p-3 border-2 rounded-lg transition-all duration-300 text-left ${
                        formData.accessibility === option.value
                          ? 'border-indigo-400 bg-indigo-400/10 text-indigo-400'
                          : 'border-gray-600 hover:border-indigo-400/50 text-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-indigo-400 font-mono text-sm uppercase tracking-wider mb-4">
                  SEO.OPTIMIERUNG
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'full', label: 'Vollständige SEO-Optimierung' },
                    { value: 'basic', label: 'Basis SEO-Setup' },
                    { value: 'not_needed', label: 'Nicht erforderlich' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleInputChange('seo', option.value)}
                      className={`w-full p-3 border-2 rounded-lg transition-all duration-300 text-left ${
                        formData.seo === option.value
                          ? 'border-indigo-400 bg-indigo-400/10 text-indigo-400'
                          : 'border-gray-600 hover:border-indigo-400/50 text-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 5: // Finalization
        return (
          <div className="space-y-8">
            {/* Project Summary */}
            <div className="bg-black/40 border border-teal-400/30 rounded-2xl p-6">
              <h3 className="text-teal-400 font-mono text-sm uppercase tracking-wider mb-4">
                PROJEKT.ZUSAMMENFASSUNG
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Webseiten-Typ:</span>
                    <span className="text-white font-medium">
                      {formData.projectType === 'other' ? formData.customProjectType : 
                       formData.projectType === 'restaurant' ? 'Restaurant' :
                       formData.projectType === 'event' ? 'Event' :
                       formData.projectType === 'corporate' ? 'Verein' :
                       formData.projectType === 'landing' ? 'Landing' :
                       formData.projectType === 'verein' ? 'Unternehmenswebseite' :
                       formData.projectType === 'portfolio' ? 'Portfolio' : 'Nicht gewählt'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Design-Stil:</span>
                    <span className="text-white font-medium">
                      {formData.designStyle === 'minimal' ? 'Minimal' :
                       formData.designStyle === 'modern' ? 'Modern' :
                       formData.designStyle === 'creative' ? 'Kreativ' :
                       formData.designStyle === 'corporate' ? 'Corporate' : 'Minimal'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Zeitrahmen:</span>
                    <span className="text-white font-medium">
                      {formData.timeline === '2weeks' ? '2 Wochen' :
                       formData.timeline === '1month' ? '1 Monat' :
                       formData.timeline === '3months' ? '3 Monate' :
                       formData.timeline || 'Nicht angegeben'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Budget:</span>
                    <span className="text-white font-medium">
                      {formData.budget === '500-1k' ? '500€ - 1.000€' :
                       formData.budget === '1k-1.5k' ? '1.000€ - 1.500€' :
                       formData.budget === '1.5k-2.5k' ? '1.500€ - 2.500€' :
                       formData.customBudget || 'Nicht angegeben'}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Domain:</span>
                    <span className="text-white font-medium">
                      {formData.domain === 'have' ? `Vorhanden: ${formData.existingDomain || 'Nicht angegeben'}` :
                       formData.domain === 'need_registration' ? `Registrierung: ${formData.desiredDomain || 'Nicht angegeben'}` :
                       formData.domain === 'need_help' ? 'Brauche Hilfe' : 'Nicht gewählt'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Seitenanzahl:</span>
                    <span className="text-white font-medium">
                      {formData.pageCount || 'Nicht angegeben'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Inhalte:</span>
                    <span className="text-white font-medium">
                      {formData.hasContent === 'have_all' ? 'Alle Texte vorhanden' :
                       formData.hasContent === 'have_some' ? 'Teilweise vorhanden' :
                       formData.hasContent === 'need_help' ? 'Benötige Hilfe' :
                       formData.hasContent === 'need_all' ? 'Benötige Texterstellung' : 'Nicht angegeben'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bilder:</span>
                    <span className="text-white font-medium">
                      {formData.hasImages === 'have_professional' ? 'Habe prof. Bilder' :
                       formData.hasImages === 'have_some' ? 'Habe Bilder' :
                       formData.hasImages === 'need_photography' ? 'Benötige Bilder' :
                       formData.hasImages === 'need_stock' ? 'Benöt. Stock Bilder' : 'Nicht angegeben'}
                    </span>
                  </div>
                  <div className="flex justify-between relative group">
                    <span className="text-gray-400">Funktionen:</span>
                    <span className="text-white font-medium cursor-help">
                      {formData.features.length > 0 ? `${formData.features.length} ausgewählt` : 'Keine ausgewählt'}
                    </span>
                    
                    {/* Tooltip for selected features */}
                    {formData.features.length > 0 && (
                      <div className="absolute bottom-full right-0 z-50 mb-2 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="bg-black/90 backdrop-blur-xl border border-teal-400/50 rounded-xl p-3 shadow-2xl">
                          <div className="text-teal-400 font-mono text-xs uppercase tracking-wider mb-2">
                            Ausgewählte Funktionen:
                          </div>
                          <div className="space-y-1">
                            {formData.features.map((feature, index) => (
                              <div key={index} className="text-white text-xs">
                                • {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-teal-400 font-mono text-sm uppercase tracking-wider mb-4">
                ANSPRECHPARTNER
              </label>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                    value={formData.contactPersonFirstName}
                    onChange={(e) => handleInputChange('contactPersonFirstName', e.target.value)}
                className="w-full px-4 py-4 bg-black/50 border border-gray-600 rounded-xl focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Vorname..."
                  />
                  <input
                    type="text"
                    value={formData.contactPersonLastName}
                    onChange={(e) => handleInputChange('contactPersonLastName', e.target.value)}
                    className="w-full px-4 py-4 bg-black/50 border border-gray-600 rounded-xl focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Nachname..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="w-full px-4 py-4 bg-black/50 border border-gray-600 rounded-xl focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="E-Mail Adresse..."
                  />
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    className="w-full px-4 py-4 bg-black/50 border border-gray-600 rounded-xl focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Telefonnummer..."
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-teal-400 font-mono text-sm uppercase tracking-wider mb-4">
                BEVORZUGTE.KOMMUNIKATION
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'email', label: 'E-Mail' },
                  { value: 'phone', label: 'Telefon' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('preferredContact', option.value)}
                    className={`p-2 border-2 rounded-xl transition-all duration-300 text-left ${
                      formData.preferredContact === option.value
                        ? 'border-teal-400 bg-teal-400/10 text-teal-400'
                        : 'border-gray-600 hover:border-teal-400/50 text-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-teal-400 font-mono text-sm uppercase tracking-wider mb-4">
                ZUSÄTZLICHE.INFORMATIONEN
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                rows={6}
                className="w-full px-4 py-4 bg-black/50 border border-gray-600 rounded-xl focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 text-white placeholder-gray-400 resize-none transition-all duration-300"
                placeholder="Weitere Details, spezielle Wünsche, Inspiration oder Referenzen..."
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isCompleted) {
    return (
      <div id="questionnaire" className="relative min-h-screen bg-transparent flex items-center justify-center overflow-hidden">
        {/* Success Animation Background */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-6xl">✓</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-6">
              MISSION COMPLETED
            </h2>
            <p className="text-2xl text-gray-300 mb-8">
              Ihr Fragebogen wurde erfolgreich übermittelt!
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-xl border border-green-500/30 rounded-3xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Was passiert als nächstes?</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">1</div>
                <div>
                  <p className="text-white font-semibold">Analyse Ihrer Anfrage</p>
                  <p className="text-gray-400">Wir analysieren Ihre Angaben und erstellen ein maßgeschneidertes Angebot</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">2</div>
                <div>
                  <p className="text-white font-semibold">Kontaktaufnahme</p>
                  <p className="text-gray-400">Wir melden uns binnen 24 Stunden bei Ihnen</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">3</div>
                <div>
                  <p className="text-white font-semibold">Beratungsgespräch</p>
                  <p className="text-gray-400">Gemeinsame Verfeinerung der Projektdetails</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const element = document.querySelector('#home')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
          >
            Zurück zur Startseite
          </button>
        </div>
      </div>
    )
  }

  return (
    <div id="questionnaire" className="relative min-h-screen bg-transparent overflow-hidden">

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-6">
            IHR WEB-PROJEKT
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Erzählen Sie uns von Ihrem Unternehmen - wir finden gemeinsam den 
            <span className="text-cyan-400 font-semibold"> besten Weg zu Ihrer erfolgreichen Webseite</span>
          </p>
        </div>



        {/* Split Layout: Design Preview Links, Analysis Container Rechts */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side: Design Preview & Selection */}
          <div className="space-y-6">

              {/* Design-Stil Vorschau */}
              <div className="bg-black/40 border border-green-400/30 rounded-2xl p-6">
                {getProjectSpecificPreview(formData.projectType, formData.designStyle)}
              </div>

              {/* Design-Stil Auswahl */}
              <div className="space-y-4">
                <label className="block text-green-400 font-mono text-sm uppercase tracking-wider">
                  DESIGN.STIL AUSWAHL
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {designStyles.map((style) => (
                    <button
                      key={style.value}
                      onClick={() => handleInputChange('designStyle', style.value)}
                      className={`p-2 border-2 rounded-xl transition-all duration-300 text-center focus:outline-none ${
                        formData.designStyle === style.value
                          ? 'border-green-400 bg-green-400/10 text-green-400'
                          : 'border-gray-600 hover:border-green-400/50 text-gray-300 hover:text-green-400'
                      }`}
                    >
                      <div className="font-mono text-sm uppercase tracking-wider">
                        {style.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Bar with Dots */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-mono text-sm">FORTSCHRITT.STATUS</span>
                  <span className="text-cyan-400 font-mono text-sm">
                    {Math.round(((currentStep + 1) / questionSteps.length) * 100)}%
                  </span>
                </div>
                
                {/* Progress Bar with Step Dots */}
                <div className="relative">
                  {/* Background Line */}
                  <div className="w-full h-1 bg-gray-800 rounded-full"></div>
                  
                  {/* Progress Line */}
                  <div 
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / (questionSteps.length - 1)) * 100}%` }}
                  />
                  
                  {/* Step Dots */}
                  <div className="absolute top-0 left-0 w-full flex justify-between items-center transform -translate-y-1/2">
                    {questionSteps.map((step, index) => (
                      <div key={step.id} className="relative group">
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-black/90 backdrop-blur-sm border border-cyan-500/50 rounded-lg text-cyan-400 text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                          <div className="flex items-center space-x-2">
                            <span>{step.icon}</span>
                            <span>{step.title}</span>
                          </div>
                          {/* Tooltip Arrow */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-cyan-500/50"></div>
                        </div>
                        
                        {/* Dot */}
                        <div 
                          className={`w-4 h-4 rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-110 ${
                            index <= currentStep
                              ? 'bg-gradient-to-r from-cyan-400 to-purple-500 border-cyan-400 shadow-lg shadow-cyan-400/50'
                              : 'bg-gray-800 border-gray-600'
                          }`}
                        >
                          {/* Inner glow for completed steps */}
                          {index <= currentStep && (
                            <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
                          )}
                          
                          {/* Current step indicator */}
                          {index === currentStep && (
                            <div className="absolute inset-0 rounded-full border-2 border-cyan-300 animate-ping"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

          </div>

          {/* Right Side: Analysis Container */}
          <div className="space-y-6">
            <div id={`step-${currentStep}`} className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8">
            {/* Current Step Header */}
            <div className="mb-8">
              <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-xl bg-gradient-to-r ${questionSteps[currentStep].color} mb-4`}>
                <span className="text-white text-xl">{questionSteps[currentStep].icon}</span>
                <span className="text-white font-mono font-bold">{questionSteps[currentStep].title}</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {questionSteps[currentStep].subtitle}
              </h3>
            </div>

            {/* Step Content */}
            {renderStepContent()}
            </div>
          </div>
          </div>

          {/* Navigation Buttons */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-8 py-4 border-2 border-gray-600 text-gray-400 font-bold rounded-xl hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← ZURÜCK
            </button>

            <div className="text-center">
              <div className="text-cyan-400 font-mono text-sm mb-2">
                SCHRITT {currentStep + 1} VON {questionSteps.length}
              </div>
            </div>

            {currentStep === questionSteps.length - 1 ? (
              <button
                onClick={submitQuestionnaire}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
              >
                ABSENDEN →
              </button>
            ) : (
              <div className="relative group">
                <button
                  onClick={nextStep}
                  disabled={!isCurrentStepValid()}
                  className={`px-8 py-4 font-bold rounded-xl transition-all duration-300 transform ${
                    isCurrentStepValid()
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 hover:scale-105 cursor-pointer'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  WEITER →
                </button>
                
                {/* Tooltip für fehlende Felder */}
                {!isCurrentStepValid() && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-black/90 backdrop-blur-sm border border-red-500/50 rounded-lg text-red-400 text-sm font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                    <div className="font-semibold mb-2">Noch zu erledigen:</div>
                    {getMissingFields().map((field, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                        <span>{field}</span>
                      </div>
                    ))}
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-red-500/50"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuantumQuestionnaire

