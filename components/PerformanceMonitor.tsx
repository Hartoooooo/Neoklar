'use client'

import { useEffect } from 'react'

const PerformanceMonitor = () => {
  useEffect(() => {
    // Enhanced Core Web Vitals Tracking
    const sendToAnalytics = (metric: any) => {
      // Send to Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        })
      }
      
      // Console logging for development
      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 ${metric.name}: ${metric.value}${metric.name === 'CLS' ? ' (CLS)' : 'ms'}`)
      }
    }

    // Enhanced performance monitoring
    const trackPerformance = () => {
      if ('performance' in window) {
        // Track page load time
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart
          sendToAnalytics({
            name: 'Page Load Time',
            value: loadTime,
            id: 'page_load'
          })
        }

        // Track resource loading
        const resources = performance.getEntriesByType('resource')
        const totalResourceSize = resources.reduce((total, resource) => {
          return total + (resource.transferSize || 0)
        }, 0)
        
        sendToAnalytics({
          name: 'Total Resource Size',
          value: totalResourceSize,
          id: 'resource_size'
        })
      }
    }

    // Import web-vitals library dynamically
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(sendToAnalytics)
      onINP(sendToAnalytics)
      onFCP(sendToAnalytics)
      onLCP(sendToAnalytics)
      onTTFB(sendToAnalytics)
    })

    // Enhanced Performance API monitoring
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Enhanced logging with categorization
          const entryType = entry.entryType
          const entryName = entry.name
          const entryDuration = entry.duration || 0
          
          // Categorize performance entries
          let category = 'other'
          if (entryType === 'navigation') category = 'navigation'
          else if (entryType === 'paint') category = 'paint'
          else if (entryType === 'largest-contentful-paint') category = 'lcp'
          else if (entryType === 'resource') category = 'resource'
          
          // Send to analytics
          sendToAnalytics({
            name: `${category.toUpperCase()}_${entryName}`,
            value: entryDuration,
            id: `${category}_${entryName}`
          })
        }
      })

      // Observe multiple entry types
      observer.observe({ 
        entryTypes: [
          'navigation', 
          'paint', 
          'largest-contentful-paint',
          'resource',
          'measure',
          'mark'
        ] 
      })

      // Track performance after page load
      if (document.readyState === 'complete') {
        trackPerformance()
      } else {
        window.addEventListener('load', trackPerformance)
      }
    }

    // Memory usage tracking (if available)
    if ('memory' in performance) {
      const memory = (performance as any).memory
      sendToAnalytics({
        name: 'Memory Usage',
        value: memory.usedJSHeapSize,
        id: 'memory_usage'
      })
    }
  }, [])

  return null
}

export default PerformanceMonitor
