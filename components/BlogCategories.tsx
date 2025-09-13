'use client'

import React, { useState } from 'react'

const BlogCategories = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Alle', count: 25 },
    { id: 'nextjs', name: 'Next.js', count: 8 },
    { id: 'react', name: 'React', count: 6 },
    { id: 'typescript', name: 'TypeScript', count: 5 },
    { id: 'performance', name: 'Performance', count: 4 },
    { id: 'seo', name: 'SEO', count: 3 },
    { id: 'design', name: 'Design', count: 4 },
    { id: 'ecommerce', name: 'E-Commerce', count: 3 }
  ]

  return (
    <div className="relative bg-transparent py-16 overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group relative px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'bg-black/40 border border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400'
              }`}
            >
              <span className="relative z-10">
                {category.name}
                <span className="ml-2 text-xs opacity-70">({category.count})</span>
              </span>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogCategories
