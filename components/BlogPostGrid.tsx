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
    <div id="blog-posts" className="relative min-h-screen bg-transparent py-32 overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'bg-black/40 border border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400'
              }`}
            >
              {category === 'all' ? 'ALLE' : category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group relative bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden transition-all duration-700 transform hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              } ${post.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
              style={{
                transitionDelay: `${200 + index * 150}ms`,
                transitionDuration: '800ms'
              }}
            >
              {/* Featured Badge */}
              {post.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                    FEATURED
                  </div>
                </div>
              )}

              {/* Post Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-black/60 backdrop-blur-md text-cyan-400 text-xs font-mono uppercase tracking-wider rounded-full">
                    {post.category}
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-400 font-mono mb-4">
                  <span>{post.readTime} LESEZEIT</span>
                  <span>{new Date(post.date).toLocaleDateString('de-DE')}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-mono rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read More Button */}
                <button className="group/btn flex items-center space-x-2 text-cyan-400 hover:text-white transition-colors duration-300">
                  <span className="font-mono text-sm uppercase tracking-wider">WEITERLESEN</span>
                  <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"></div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="group relative px-12 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 font-bold uppercase tracking-wider hover:text-black transition-all duration-500 overflow-hidden rounded-3xl">
            <span className="relative z-10">MEHR ARTIKEL LADEN</span>
            <div className="absolute inset-0 bg-cyber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogPostGrid
