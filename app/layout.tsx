import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GlobalBackground from '@/components/GlobalBackground'
import ShaderBackground from '@/components/ShaderBackground'
import StructuredData from '@/components/StructuredData'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import SecurityMonitor from '@/components/SecurityMonitor'
import SEOOptimizer from '@/components/SEOOptimizer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Neoklar - Professionelle Webseiten Design & Entwicklung',
    template: '%s | Neoklar - AI-Architektur für digitale Lösungen'
  },
  description: 'Neoklar entwickelt maßgeschneiderte Webseiten, E-Commerce-Lösungen und digitale Plattformen mit modernster Technologie. Next.js, React, TypeScript - Ihr Partner für professionelle Webentwicklung.',
  keywords: [
    'Webdesign München', 'Webentwicklung', 'Next.js Entwicklung', 'React Webseiten', 
    'TypeScript Webentwicklung', 'E-Commerce Entwicklung', 'Shopify Entwicklung',
    'Professionelle Webseiten', 'Moderne Webdesign', 'Responsive Design',
    'SEO optimierte Webseiten', 'Webseiten Agentur', 'Digitale Lösungen',
    'Neoklar', 'AI-Architektur', 'Quantum Design', 'Cyber Webdesign'
  ],
  authors: [{ name: 'Neoklar Team', url: 'https://neoklar.de' }],
  creator: 'Neoklar',
  publisher: 'Neoklar',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://neoklar.de',
    siteName: 'Neoklar',
    title: 'Neoklar - Professionelle Webseiten Design & Entwicklung',
    description: 'Entwickeln Sie mit Neoklar moderne, professionelle Webseiten und digitale Lösungen. Next.js, React, TypeScript - Ihr Partner für erfolgreiche Webprojekte.',
    images: [
      {
        url: 'https://neoklar.de/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Neoklar - Professionelle Webseiten Design & Entwicklung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neoklar - Professionelle Webseiten Design & Entwicklung',
    description: 'Entwickeln Sie mit Neoklar moderne, professionelle Webseiten und digitale Lösungen.',
    images: ['https://neoklar.de/og-image.jpg'],
    creator: '@neoklar_de',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
      'facebook-domain-verification': 'your-facebook-verification-code'
    }
  },
  alternates: {
    canonical: 'https://neoklar.de',
  },
  category: 'technology',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.className}`} style={{ background: 'transparent' }}>
        <GoogleAnalytics />
        <PerformanceMonitor />
        <SecurityMonitor />
        <SEOOptimizer />
        <ShaderBackground />
        <GlobalBackground />
        <div className="relative z-10" style={{ paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0, width: '100%', maxWidth: 'none' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
