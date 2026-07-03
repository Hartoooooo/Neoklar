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
    <div className="relative py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                activeCategory === category.id
                  ? 'bg-white text-black font-medium'
                  : 'border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white'
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-60">{category.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogCategories
