'use client'

import { useEffect } from 'react'

const SEOOptimizer = () => {
  useEffect(() => {
    // Advanced SEO optimizations
    const optimizeSEO = () => {
      // 1. Dynamic meta tags based on content
      const updateMetaTags = () => {
        const title = document.title
        const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
        
        // Update Open Graph tags dynamically
        const ogTitle = document.querySelector('meta[property="og:title"]')
        if (ogTitle) ogTitle.setAttribute('content', title)
        
        const ogDescription = document.querySelector('meta[property="og:description"]')
        if (ogDescription) ogDescription.setAttribute('content', description)
        
        // Update Twitter tags
        const twitterTitle = document.querySelector('meta[name="twitter:title"]')
        if (twitterTitle) twitterTitle.setAttribute('content', title)
        
        const twitterDescription = document.querySelector('meta[name="twitter:description"]')
        if (twitterDescription) twitterDescription.setAttribute('content', description)
      }

      // 2. Schema markup injection
      const injectSchemaMarkup = () => {
        // Breadcrumb schema
        const breadcrumbSchema = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://neoklar.de"
            }
          ]
        }

        // Add current page to breadcrumb
        const currentPath = window.location.pathname
        if (currentPath !== '/') {
          const pathSegments = currentPath.split('/').filter(Boolean)
          pathSegments.forEach((segment, index) => {
            breadcrumbSchema.itemListElement.push({
              "@type": "ListItem",
              "position": index + 2,
              "name": segment.charAt(0).toUpperCase() + segment.slice(1),
              "item": `https://neoklar.de${currentPath}`
            })
          })
        }

        // Inject schema
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.textContent = JSON.stringify(breadcrumbSchema)
        document.head.appendChild(script)
      }

      // 3. Internal linking optimization
      const optimizeInternalLinks = () => {
        const links = document.querySelectorAll('a[href^="/"]')
        links.forEach(link => {
          // Add rel="nofollow" to external links in content
          if (link.getAttribute('href')?.startsWith('http')) {
            link.setAttribute('rel', 'nofollow noopener noreferrer')
          }
          
          // Add title attributes for better accessibility
          if (!link.getAttribute('title')) {
            const linkText = link.textContent?.trim()
            if (linkText) {
              link.setAttribute('title', `Weiter zu ${linkText}`)
            }
          }
        })
      }

      // 4. Image optimization for SEO
      const optimizeImages = () => {
        const images = document.querySelectorAll('img')
        images.forEach(img => {
          // Add alt text if missing
          if (!img.getAttribute('alt')) {
            const src = img.getAttribute('src') || ''
            const filename = src.split('/').pop()?.split('.')[0] || 'image'
            img.setAttribute('alt', filename.replace(/[-_]/g, ' '))
          }
          
          // Add loading="lazy" for performance
          if (!img.getAttribute('loading')) {
            img.setAttribute('loading', 'lazy')
          }
          
          // Add decoding="async" for better performance
          if (!img.getAttribute('decoding')) {
            img.setAttribute('decoding', 'async')
          }
        })
      }

      // 5. Heading structure optimization
      const optimizeHeadings = () => {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        let h1Count = 0
        
        headings.forEach(heading => {
          if (heading.tagName === 'H1') {
            h1Count++
            if (h1Count > 1) {
              console.warn('🚨 Multiple H1 tags detected - consider using only one H1 per page')
            }
          }
        })
      }

      // 6. Content analysis
      const analyzeContent = () => {
        const content = document.body.textContent || ''
        const wordCount = content.split(/\s+/).length
        
        // Check for minimum word count
        if (wordCount < 300) {
          console.warn('🚨 Content too short - consider adding more content for better SEO')
        }
        
        // Check for keyword density
        const keywords = ['webentwicklung', 'webdesign', 'next.js', 'react', 'typescript']
        keywords.forEach(keyword => {
          const keywordCount = (content.toLowerCase().match(new RegExp(keyword, 'g')) || []).length
          const density = (keywordCount / wordCount) * 100
          
          if (density > 3) {
            console.warn(`🚨 Keyword density too high for "${keyword}": ${density.toFixed(2)}%`)
          }
        })
      }

      // 7. Performance monitoring for SEO
      const monitorPerformance = () => {
        // Track Core Web Vitals
        if ('web-vitals' in window) {
          import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
            onCLS((metric) => {
              if (metric.value > 0.25) {
                console.warn('🚨 CLS score too high - consider optimizing layout shifts')
              }
            })
            
            onLCP((metric) => {
              if (metric.value > 2500) {
                console.warn('🚨 LCP score too high - consider optimizing largest contentful paint')
              }
            })
          })
        }
      }

      // 8. Social media optimization
      const optimizeSocialMedia = () => {
        // Ensure Open Graph images are optimized
        const ogImage = document.querySelector('meta[property="og:image"]')
        if (ogImage) {
          const imageUrl = ogImage.getAttribute('content')
          if (imageUrl && !imageUrl.includes('1200x630')) {
            console.warn('🚨 Open Graph image should be 1200x630 pixels for optimal display')
          }
        }
      }

      // Initialize all optimizations
      updateMetaTags()
      injectSchemaMarkup()
      optimizeInternalLinks()
      optimizeImages()
      optimizeHeadings()
      analyzeContent()
      monitorPerformance()
      optimizeSocialMedia()
    }

    // Run optimizations when DOM is ready
    if (typeof window !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', optimizeSEO)
      } else {
        optimizeSEO()
      }
    }

    // Re-run on navigation (for SPA behavior)
    if (typeof window !== 'undefined') {
      const observer = new MutationObserver(() => {
        optimizeSEO()
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })

      return () => {
        observer.disconnect()
        document.removeEventListener('DOMContentLoaded', optimizeSEO)
      }
    }
  }, [])

  return null
}

export default SEOOptimizer
