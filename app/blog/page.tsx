import { Metadata } from 'next'
import QuantumBlogHero from '@/components/QuantumBlogHero'
import BlogPostGrid from '@/components/BlogPostGrid'
import BlogCategories from '@/components/BlogCategories'
import BlogNewsletter from '@/components/BlogNewsletter'

export const metadata: Metadata = {
  title: 'Blog - Webentwicklung & Design Insights | Neoklar',
  description: 'Entdecken Sie die neuesten Trends in Webentwicklung, Design und digitaler Transformation. Praktische Tipps, Case Studies und technische Insights von den Neoklar-Experten.',
  keywords: [
    'Webentwicklung Blog', 'Next.js Tutorial', 'React Tips', 'Webdesign Trends',
    'SEO Optimierung', 'Performance Tuning', 'E-Commerce Entwicklung',
    'TypeScript Guide', 'Tailwind CSS', 'Webentwicklung München'
  ],
  openGraph: {
    title: 'Blog - Webentwicklung & Design Insights | Neoklar',
    description: 'Entdecken Sie die neuesten Trends in Webentwicklung, Design und digitaler Transformation.',
    images: [
      {
        url: 'https://neoklar.de/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Neoklar Blog - Webentwicklung Insights',
      },
    ],
  },
  alternates: {
    canonical: 'https://neoklar.de/blog',
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <QuantumBlogHero />
      <BlogCategories />
      <BlogPostGrid />
      <BlogNewsletter />
    </main>
  )
}
