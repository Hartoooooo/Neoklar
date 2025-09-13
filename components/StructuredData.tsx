import React from 'react'

const StructuredData = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Neoklar",
    "alternateName": "Neoklar Webdesign",
    "url": "https://neoklar.de",
    "logo": {
      "@type": "ImageObject",
      "url": "https://neoklar.de/logo.png",
      "width": 300,
      "height": 300
    },
    "description": "Neoklar entwickelt maßgeschneiderte Webseiten, E-Commerce-Lösungen und digitale Plattformen mit modernster Technologie. Next.js, React, TypeScript - Ihr Partner für professionelle Webentwicklung.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE",
      "addressRegion": "Bayern",
      "addressLocality": "München",
      "postalCode": "80331"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+49-89-12345678",
        "contactType": "customer service",
        "availableLanguage": ["German", "English"],
        "areaServed": "DE"
      },
      {
        "@type": "ContactPoint",
        "email": "neoklar.info@gmail.com",
        "contactType": "sales",
        "availableLanguage": ["German", "English"]
      }
    ],
    "sameAs": [
      "https://github.com/neoklar",
      "https://linkedin.com/company/neoklar",
      "https://twitter.com/neoklar_de",
      "https://www.instagram.com/neoklar_de"
    ],
    "knowsAbout": [
      "Webentwicklung",
      "Next.js",
      "React",
      "TypeScript",
      "E-Commerce",
      "Shopify",
      "SEO",
      "Webdesign"
    ],
    "award": [
      "Google Partner",
      "Shopify Partner"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Webentwicklung Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Webseiten Entwicklung",
            "description": "Professionelle Webseiten mit Next.js, React und TypeScript"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-Commerce Entwicklung",
            "description": "Shopify und WooCommerce Online-Shops"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Webdesign",
            "description": "Moderne, responsive Webdesigns mit Quantum-Design"
          }
        }
      ]
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Neoklar",
    "url": "https://neoklar.de",
    "description": "Professionelle Webseiten Design & Entwicklung mit AI-Architektur",
    "inLanguage": "de-DE",
    "copyrightYear": "2024",
    "creator": {
      "@type": "Organization",
      "name": "Neoklar"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://neoklar.de/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Webseiten Entwicklung",
    "description": "Professionelle Webseiten, E-Commerce-Lösungen und digitale Plattformen",
    "provider": {
      "@type": "Organization",
      "name": "Neoklar"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Deutschland"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Webentwicklung Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Next.js Webentwicklung",
            "description": "Moderne Webseiten mit Next.js 15, React und TypeScript"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-Commerce Entwicklung",
            "description": "Shopify und WooCommerce Online-Shops"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Responsive Webdesign",
            "description": "Mobile-optimierte Designs für alle Geräte"
          }
        }
      ]
    }
  }

  // FAQ Schema für bessere SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie lange dauert die Entwicklung einer Webseite?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die Entwicklungszeit hängt von der Komplexität ab. Einfache Webseiten: 2-4 Wochen, E-Commerce Shops: 4-8 Wochen, komplexe Webanwendungen: 8-16 Wochen."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Technologien verwendet Neoklar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wir verwenden moderne Technologien wie Next.js 15, React, TypeScript, Tailwind CSS, Shopify, und weitere cutting-edge Tools für optimale Performance und SEO."
        }
      },
      {
        "@type": "Question",
        "name": "Bietet Neoklar auch Wartung und Support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, wir bieten umfassenden Support, regelmäßige Updates, Sicherheitspatches und technische Wartung für alle unsere Projekte."
        }
      }
    ]
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://neoklar.de"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://neoklar.de#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Kontakt",
        "item": "https://neoklar.de#contact"
      }
    ]
  }

  // Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://neoklar.de/#organization",
    "name": "Neoklar",
    "image": "https://neoklar.de/logo.png",
    "description": "Professionelle Webentwicklung und Webdesign in München",
    "url": "https://neoklar.de",
    "telephone": "+49-89-12345678",
    "email": "neoklar.info@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Marienplatz 1",
      "addressLocality": "München",
      "addressRegion": "Bayern",
      "postalCode": "80331",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.1374,
      "longitude": 11.5755
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "€€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}

export default StructuredData
