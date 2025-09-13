import React from 'react'

const StructuredData = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Neoklar",
    "alternateName": "Neoklar Webdesign",
    "url": "https://neoklar.de",
    "logo": "https://neoklar.de/logo.png",
    "description": "Neoklar entwickelt maßgeschneiderte Webseiten, E-Commerce-Lösungen und digitale Plattformen mit modernster Technologie.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE",
      "addressRegion": "Bayern",
      "addressLocality": "München"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+49-89-12345678",
      "contactType": "customer service",
      "availableLanguage": ["German", "English"]
    },
    "sameAs": [
      "https://github.com/neoklar",
      "https://linkedin.com/company/neoklar",
      "https://twitter.com/neoklar_de"
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
    </>
  )
}

export default StructuredData
