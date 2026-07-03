'use client'

import React, { useState } from 'react'

const QuantumContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: 'neural-interface',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', project: 'neural-interface', message: '' })

    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const inputClass =
    'w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 transition-colors duration-300 focus:border-white/30 focus:bg-white/[0.05]'

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-sm text-zinc-500">Kontakt</span>
          <h2 className="heading-tight mt-3 text-4xl sm:text-5xl font-semibold text-white">
            Lassen Sie uns über Ihr Projekt sprechen
          </h2>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            Erzählen Sie uns kurz, was Sie vorhaben. Sie bekommen eine ehrliche
            Einschätzung und einen klaren nächsten Schritt. Das Erstgespräch ist
            kostenlos.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Formular */}
          <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-9">
            {isSubmitted && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Vielen Dank. Ihre Nachricht ist angekommen, wir melden uns zeitnah.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Ihr Name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">E-Mail</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="ihre@email.de"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Nachricht</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Worum geht es bei Ihrem Projekt?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3.5 rounded-full bg-white text-black font-medium transition-transform duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? 'Wird gesendet' : 'Nachricht senden'}
              </button>
            </form>
          </div>

          {/* Direktkontakt */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <h3 className="text-sm text-zinc-400 mb-2">Direkt per E-Mail</h3>
              <a
                href="mailto:neoklar.info@gmail.com"
                className="text-lg text-white transition-opacity hover:opacity-70 break-all"
              >
                neoklar.info@gmail.com
              </a>
              <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
                Schreiben Sie uns jederzeit. Wir antworten in der Regel innerhalb
                eines Werktags.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <h3 className="text-sm text-zinc-400 mb-3">So läuft es ab</h3>
              <ol className="space-y-3 text-sm text-zinc-300">
                <li className="flex gap-3">
                  <span className="text-zinc-500">1</span>
                  Sie schildern uns Ihr Vorhaben.
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-500">2</span>
                  Wir besprechen Umfang, Ablauf und Kosten.
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-500">3</span>
                  Sie erhalten ein konkretes Angebot.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuantumContact
