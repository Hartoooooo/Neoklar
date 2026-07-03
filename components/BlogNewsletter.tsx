'use client'

import React, { useState } from 'react'

const BlogNewsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setIsSubscribed(true)
    setEmail('')
    
    setTimeout(() => setIsSubscribed(false), 5000)
  }

  return (
    <div className="relative py-24 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12 text-center">
          <h2 className="heading-tight text-3xl sm:text-4xl font-semibold text-white mb-4">
            Nichts verpassen
          </h2>

          <p className="text-zinc-400 leading-relaxed mb-8 max-w-lg mx-auto">
            Neue Beiträge zu Web, Design und Sichtbarkeit, in Ihrem Postfach.
            Kein Spam, jederzeit abbestellbar.
          </p>

          {isSubscribed ? (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 max-w-md mx-auto text-sm text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Vielen Dank. Sie erhalten in Kürze eine Bestätigung.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ihre@email.de"
                  required
                  className="flex-1 px-4 py-3.5 rounded-full bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 transition-colors duration-300 focus:border-white/30"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-7 py-3.5 rounded-full bg-white text-black font-medium transition-transform duration-300 hover:scale-[1.03] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? 'Anmelden' : 'Anmelden'}
                </button>
              </div>
              <p className="text-xs text-zinc-500 mt-4">
                Keine Spam-Mails. Jederzeit abmeldbar.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogNewsletter
