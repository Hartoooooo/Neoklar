'use client'

import { useEffect } from 'react'

const PerformanceMonitor = () => {
  useEffect(() => {
    // Core Web Vitals Tracking
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
    }

    // Import web-vitals library dynamically
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(sendToAnalytics)
      onINP(sendToAnalytics)
      onFCP(sendToAnalytics)
      onLCP(sendToAnalytics)
      onTTFB(sendToAnalytics)
    })

    // Performance API monitoring
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log performance metrics
          console.log(`${entry.name}: ${entry.duration}ms`)
        }
      })

      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] })
    }
  }, [])

  return null
}

export default PerformanceMonitor
