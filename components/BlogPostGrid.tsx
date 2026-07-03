'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const BlogPostGrid = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('blog-posts')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const blogPosts = [
    {
      id: 1,
      title: 'Next.js 15: Die Revolution der Webentwicklung',
      excerpt: 'Entdecken Sie die neuen Features von Next.js 15 und wie sie Ihre Webentwicklung revolutionieren werden.',
      category: 'Next.js',
      readTime: '8 Min',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      author: 'Neoklar Team',
      tags: ['Next.js', 'React', 'Performance'],
      featured: true
    },
    {
      id: 2,
      title: 'TypeScript Best Practices für bessere Code-Qualität',
      excerpt: 'Lernen Sie die wichtigsten TypeScript-Patterns kennen, die Ihren Code robuster und wartbarer machen.',
      category: 'TypeScript',
      readTime: '12 Min',
      date: '2024-01-12',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop',
      author: 'Neoklar Team',
      tags: ['TypeScript', 'Best Practices', 'Code Quality']
    },
    {
      id: 3,
      title: 'E-Commerce Performance: Von 2s auf 0.5s Ladezeit',
      excerpt: 'Case Study: Wie wir einen Shopify-Shop von 2 Sekunden auf 0.5 Sekunden Ladezeit optimiert haben.',
      category: 'Performance',
      readTime: '15 Min',
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      author: 'Neoklar Team',
      tags: ['Performance', 'E-Commerce', 'Shopify', 'Case Study']
    },
    {
      id: 4,
      title: 'Tailwind CSS: Design System aufbauen',
      excerpt: 'Erstellen Sie ein konsistentes Design System mit Tailwind CSS und sparen Sie Zeit bei der Entwicklung.',
      category: 'CSS',
      readTime: '10 Min',
      date: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      author: 'Neoklar Team',
      tags: ['Tailwind CSS', 'Design System', 'CSS']
    },
    {
      id: 5,
      title: 'SEO für React-Websites: Die ultimative Anleitung',
      excerpt: 'Alles was Sie über SEO für React und Next.js Websites wissen müssen - von Meta-Tags bis Structured Data.',
      category: 'SEO',
      readTime: '18 Min',
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      author: 'Neoklar Team',
      tags: ['SEO', 'React', 'Next.js', 'Marketing']
    },
    {
      id: 6,
      title: 'Web Security: Schutz vor modernen Bedrohungen',
      excerpt: 'Lernen Sie die wichtigsten Sicherheitsmaßnahmen für moderne Webanwendungen kennen.',
      category: 'Security',
      readTime: '14 Min',
      date: '2024-01-03',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      author: 'Neoklar Team',
      tags: ['Security', 'Web Security', 'Best Practices']
    }
  ]

  const categories = ['all', 'Next.js', 'TypeScript', 'Performance', 'CSS', 'SEO', 'Security']

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <div id="blog-posts" className="relative py-16 px-5">
      <div className="max-w-6xl mx-auto">

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                selectedCategory === category
                  ? 'bg-white text-black font-medium'
                  : 'border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white'
              }`}
            >
              {category === 'all' ? 'Alle' : category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-700 hover:border-white/20 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              {/* Post Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-zinc-200 text-xs">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
                  <span>{post.readTime} Lesezeit</span>
                  <span>{new Date(post.date).toLocaleDateString('de-DE')}</span>
                </div>

                <h3 className="text-lg font-medium text-white mb-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <button className="group/btn flex items-center gap-2 text-sm text-white transition-opacity hover:opacity-70">
                  Weiterlesen
                  <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-14">
          <button className="px-8 py-3 rounded-full border border-white/15 text-white transition-colors duration-300 hover:bg-white/5">
            Mehr Artikel laden
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogPostGrid
