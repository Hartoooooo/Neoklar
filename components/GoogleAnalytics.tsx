'use client'

import Script from 'next/script'

const GoogleAnalytics = () => {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'
  
  // Enhanced tracking configuration
  const gtagConfig = {
    page_title: typeof window !== 'undefined' ? document.title : '',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    send_page_view: true,
    // Enhanced ecommerce tracking
    custom_map: {
      'custom_parameter_1': 'project_type',
      'custom_parameter_2': 'budget_range'
    },
    // Performance tracking
    transport_type: 'beacon',
    // Privacy settings
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', ${JSON.stringify(gtagConfig)});
            
            // Enhanced event tracking
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              page_path: window.location.pathname
            });
            
            // Track form submissions
            gtag('event', 'form_submit', {
              event_category: 'engagement',
              event_label: 'contact_form'
            });
            
            // Track scroll depth
            let maxScroll = 0;
            window.addEventListener('scroll', () => {
              const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
              if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                gtag('event', 'scroll', {
                  event_category: 'engagement',
                  event_label: 'scroll_depth',
                  value: scrollPercent
                });
              }
            });
          `,
        }}
      />
    </>
  )
}

export default GoogleAnalytics
