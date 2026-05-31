import { useState } from 'react'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { submitContactForm } from '@/lib/supabaseClient'
import { HiMail, HiClock, HiCheckCircle } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) { setError('Please enter your name.'); return }
    if (!form.email.trim() || !form.email.includes('@')) { setError('Please enter a valid email address.'); return }
    if (!form.message.trim()) { setError('Please enter a message.'); return }
    setLoading(true)
    try {
      await submitContactForm({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() })
      setSuccess(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Contact Us — Daleel UAE</title>
        <meta name="description" content="Get in touch with the Daleel UAE team. We respond within 24 hours." />
      </Head>
      <Navbar />
      <main>
        <section className="relative py-20 sm:py-24 overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
          <div className="absolute inset-0 hero-overlay opacity-30" />
          <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: '#0D9488' }} />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border" style={{ backgroundColor: 'rgba(13,148,136,0.15)', borderColor: 'rgba(13,148,136,0.3)', color: '#5eead4' }}>
              Get In Touch
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Contact <span style={{ color: '#0D9488' }}>Daleel UAE</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Have a question about listing your business or need support? We are here to help.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold mb-2" style={{ color: '#0F172A' }}>
                    We would love to hear from you
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Whether you want to list your business, have a question, or just want to say hello — reach out and we will get back to you quickly.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#0D9488' }}>
                      <HiMail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#0D9488' }}>Email Us</div>
                      <a href="mailto:contact.daleeluae@gmail.com" className="text-sm font-medium hover:underline" style={{ color: '#0F172A' }}>
                        contact.daleeluae@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#25D366' }}>
                      <FaWhatsapp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#25D366' }}>WhatsApp</div>
                      <a href="https://wa.me/971569811722" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline" style={{ color: '#0F172A' }}>
                        Message us on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(13,148,136,0.1)' }}>
                      <HiClock className="w-5 h-5" style={{ color: '#0D9488' }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#0D9488' }}>Response Time</div>
                      <div className="text-sm font-medium" style={{ color: '#0F172A' }}>We respond within 24 hours</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-5 border" style={{ backgroundColor: 'rgba(13,148,136,0.05)', borderColor: 'rgba(13,148,136,0.2)' }}>
                  <p className="text-sm leading-relaxed" style={{ color: '#0F172A' }}>
                    Want to list your business? Head to our{' '}
                    <a href="/register" className="font-semibold underline" style={{ color: '#0D9488' }}>Register page</a>
                    {' '}to get started. Listings start at just AED 500/year.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-3">
                {success ? (
                  <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: 'rgba(13,148,136,0.1)' }}>
                      <HiCheckCircle className="w-8 h-8" style={{ color: '#0D9488' }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: '#0F172A' }}>Message Sent!</h3>
                    <p className="text-gray-500 mb-6">Thank you for reaching out. We will get back to you within 24 hours.</p>
                    <button onClick={() => setSuccess(false)} className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#0D9488' }}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold mb-6" style={{ color: '#0F172A' }}>Send us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="e.g. Ahmed Al Mansoori" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all" style={{ color: '#0F172A' }} />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all" style={{ color: '#0F172A' }} />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" rows={6} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm resize-none transition-all" style={{ color: '#0F172A' }} />
                      </div>
                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                          <p className="text-red-600 text-sm">{error}</p>
                        </div>
                      )}
                      <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed" style={{ backgroundColor: '#0D9488' }}>
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending...
                          </span>
                        ) : 'Send Message'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
