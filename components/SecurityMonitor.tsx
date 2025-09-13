'use client'

import { useEffect } from 'react'

const SecurityMonitor = () => {
  useEffect(() => {
    // Security monitoring and protection
    const initSecurity = () => {
      // 1. Detect and block suspicious activities
      const detectSuspiciousActivity = () => {
        // Monitor for rapid clicks (potential bot)
        let clickCount = 0
        let lastClickTime = 0
        
        document.addEventListener('click', (e) => {
          const now = Date.now()
          if (now - lastClickTime < 100) { // Less than 100ms between clicks
            clickCount++
            if (clickCount > 10) {
              console.warn('🚨 Suspicious activity detected: Rapid clicking')
              // Could implement rate limiting here
            }
          } else {
            clickCount = 0
          }
          lastClickTime = now
        })

        // Console monitoring disabled to prevent interference with React development
        // React components need full console access for debugging
        console.log('Console monitoring disabled for React compatibility')
      }

      // 2. Form security enhancements (simplified to prevent React conflicts)
      const enhanceFormSecurity = () => {
        // This function has been simplified to prevent conflicts with React forms
        // React forms should handle their own security measures
        console.log('Form security enhancements simplified for React compatibility')
      }

      // 3. Input sanitization (disabled to prevent React state conflicts)
      const sanitizeInputs = () => {
        // This function has been disabled because it conflicts with React's state management
        // and causes form inputs to reset unexpectedly
        // React components should handle input sanitization in their own onChange handlers
        console.log('Input sanitization disabled to prevent React state conflicts')
      }

      // 4. Session security
      const initSessionSecurity = () => {
        // Set secure session timeout
        let lastActivity = Date.now()
        const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes

        const updateActivity = () => {
          lastActivity = Date.now()
        }

        // Track user activity
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
          document.addEventListener(event, updateActivity, true)
        })

        // Check for session timeout
        setInterval(() => {
          if (Date.now() - lastActivity > SESSION_TIMEOUT) {
            console.warn('🚨 Session timeout detected')
            // Could implement session refresh or logout here
          }
        }, 60000) // Check every minute
      }

      // 5. Content Security Policy monitoring
      const monitorCSP = () => {
        // Monitor for CSP violations
        document.addEventListener('securitypolicyviolation', (e) => {
          console.warn('🚨 CSP Violation:', {
            blockedURI: e.blockedURI,
            violatedDirective: e.violatedDirective,
            originalPolicy: e.originalPolicy
          })
        })
      }

      // 6. Generate CSRF token
      const generateCSRFToken = () => {
        const array = new Uint8Array(32)
        crypto.getRandomValues(array)
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
      }

      // Initialize all security measures
      detectSuspiciousActivity()
      enhanceFormSecurity()
      sanitizeInputs()
      initSessionSecurity()
      monitorCSP()
    }

    // Initialize security when DOM is ready
    if (typeof window !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSecurity)
      } else {
        initSecurity()
      }
    }

    // Cleanup function
    return () => {
      // Remove event listeners if needed
      if (typeof window !== 'undefined') {
        document.removeEventListener('DOMContentLoaded', initSecurity)
      }
    }
  }, [])

  return null
}

export default SecurityMonitor
