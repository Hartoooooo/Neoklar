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

        // Monitor for console access attempts
        const originalConsole = { ...console }
        Object.keys(console).forEach(key => {
          if (typeof console[key as keyof Console] === 'function') {
            (console as any)[key] = (...args: any[]) => {
              // Log security events
              if (key === 'log' && args.some(arg => 
                typeof arg === 'string' && 
                (arg.includes('password') || arg.includes('token') || arg.includes('key'))
              )) {
                console.warn('🚨 Potential sensitive data logging detected')
              }
              return (originalConsole as any)[key](...args)
            }
          }
        })
      }

      // 2. Form security enhancements
      const enhanceFormSecurity = () => {
        const forms = document.querySelectorAll('form')
        forms.forEach(form => {
          // Add CSRF protection
          const csrfToken = document.createElement('input')
          csrfToken.type = 'hidden'
          csrfToken.name = '_csrf'
          csrfToken.value = generateCSRFToken()
          form.appendChild(csrfToken)

          // Add honeypot field
          const honeypot = document.createElement('input')
          honeypot.type = 'text'
          honeypot.name = 'website'
          honeypot.style.display = 'none'
          honeypot.tabIndex = -1
          honeypot.autocomplete = 'off'
          form.appendChild(honeypot)

          // Validate honeypot on submit
          form.addEventListener('submit', (e) => {
            const honeypotValue = (honeypot as HTMLInputElement).value
            if (honeypotValue) {
              e.preventDefault()
              console.warn('🚨 Bot detected: Honeypot field filled')
              return false
            }
          })
        })
      }

      // 3. Input sanitization
      const sanitizeInputs = () => {
        const inputs = document.querySelectorAll('input, textarea')
        inputs.forEach(input => {
          input.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement
            // Remove potentially dangerous characters
            target.value = target.value.replace(/[<>]/g, '')
          })
        })
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
