import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GlobalBackground from '@/components/GlobalBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neoklar - Professionelle Webseiten Design',
  description: 'Neoklar erstellt moderne, professionelle Webseiten und Info-Seiten mit klarem Design und optimaler Benutzererfahrung.',
  keywords: 'Webdesign, Webseiten, Design, Neoklar, moderne Webseiten, Info-Seiten',
  authors: [{ name: 'Neoklar' }],
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
      <body className={`${inter.className} bg-black`}>
        <GlobalBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
