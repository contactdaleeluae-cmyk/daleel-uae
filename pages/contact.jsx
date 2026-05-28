import { useState } from 'react'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { submitContactForm } from '@/lib/supabaseClient'
import { HiMail, HiClock, HiCheckCircle } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    if (!form.message.trim()) {
      setError('Please enter a message.')
      return
    }

    setLoading(true)
    try {
      await submitContactForm({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      })
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
        <meta
          name="description"
          content="Get in touch with the Daleel UAE team. We respond within 24 hours."
        />
      </Head>

      <Navbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          className="relative py-20 sm:py-24 overflow-hidden"
          style={{ backgroundColor: '#0F172A' }}
        >
          <div className="absolute inset-0 hero-overlay opacity-30" />
          <div
            className="absolute top-0 right-1/3 w-80 h-80 rounded-full opacity-10 blur-3xl"
            style={{ backgroundColor: '#0D9488' }}
          />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{
                backgroundColor: 'rgba(13,148,136,0.15)',
                borderColor: 'rgba(13,148,136,0.3)',
                color: '#5eead4',
              }}
            >
              Get In Touch
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Contact{' '}
              <span style={{ color: '#0D9488' }}>Daleel UAE</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Have a question about listing your business or need support? We are here to help.
            </p>
          </div>
        </section>

        {/* ── CONTACT SECTION ──────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

              {/* Left — Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2
                    className="text-2xl font-extrabold mb-2"
                    style={{ color: '#0F172A' }}
                  >
                    We&apos;d love to hear from you
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Whether you want to list your business, have a question, or just want to say hello — reach out and we will get back to you quickly.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4">
                  {/* Email */}
                  
                    href="mailto:contact.daleeluae@gmail.com"
                    className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: '#0D9488' }}
                    >
                      <HiMail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div
                        className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                        style={{ color: '#0D9488' }}
                      >
                        Email Us
                      </div>
                      <div
                        className="text-sm font-medium"
                        style={{ color: '#0F172A' }}
                      >
                        contact.daleeluae@gmail.com
                      </div>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  
                    href="https://wa.me/971500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: '#25D366' }}
                    >
                      <FaWhatsapp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div
                        className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                        style={{ color: '#25D366' }}
                      >
                        WhatsApp
                      </div>
                      <div
                        className="text-sm font-medium"
                        style={{ color: '#0F172A' }}
                      >
                        Message us on WhatsApp
                      </div>
                    </div>
                  </a>

                  {/* Response Time */}
                  <div className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div
                      className="
