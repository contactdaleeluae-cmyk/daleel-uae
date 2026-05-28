import Head from 'next/head'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { HiArrowRight } from 'react-icons/hi'
import { FaShieldAlt, FaMapMarkerAlt, FaSearch } from 'react-icons/fa'

const values = [
  {
    icon: <FaShieldAlt className="w-6 h-6" />,
    title: 'Trusted Listings',
    desc: 'Every business on Daleel UAE is manually reviewed before going live. We verify contact details and business information so customers can trust what they find.',
  },
  {
    icon: <FaMapMarkerAlt className="w-6 h-6" />,
    title: 'Local Focus',
    desc: 'We are built specifically for the UAE. Every emirate, every area, every neighbourhood — we know the local landscape and make it easy to find businesses near you.',
  },
  {
    icon: <FaSearch className="w-6 h-6" />,
    title: 'Easy Discovery',
    desc: 'No complicated filters, no confusing interfaces. Just search, find, and connect. We built Daleel UAE to be the simplest way to discover local businesses.',
  },
]

const stats = [
  { number: '500+', label: 'Businesses Listed' },
  { number: '7', label: 'Emirates Covered' },
  { number: '24h', label: 'Avg. Response Time' },
  { number: '100%', label: 'Verified Listings' },
]

export default function About() {
  return (
    <>
      <Head>
        <title>About Us — Daleel UAE</title>
        <meta
          name="description"
          content="Learn about Daleel UAE — built to make it easy for anyone in the UAE to find trusted, verified local businesses across all 7 emirates."
        />
      </Head>

      <Navbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          className="relative py-20 sm:py-28 overflow-hidden"
          style={{ backgroundColor: '#0F172A' }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 hero-overlay opacity-30" />

          {/* Teal glow */}
          <div
            className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ backgroundColor: '#0D9488' }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{
                backgroundColor: 'rgba(13,148,136,0.15)',
                borderColor: 'rgba(13,148,136,0.3)',
                color: '#5eead4',
              }}
            >
              Our Story
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
              About{' '}
              <span style={{ color: '#0D9488' }}>Daleel UAE</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Built with one mission — to make it easy for anyone in the UAE to find trusted, verified local businesses.
            </p>
          </div>
        </section>

        {/* ── STATS BAR ────────────────────────────────────────── */}
        <section
          className="py-10 border-b border-gray-100"
          style={{ backgroundColor: '#0D9488' }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-extrabold text-white">
                    {stat.number}
                  </div>
                  <div className="text-teal-100 text-sm mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUR STORY ────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Text */}
              <div>
                <span
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: '#0D9488' }}
                >
                  Our Story
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-extrabold mt-2 mb-6 leading-tight"
                  style={{ color: '#0F172A' }}
                >
                  Connecting UAE Residents with Local Businesses
                </h2>
                <div className="space-y-4 text-gray-500 leading-relaxed">
                  <p>
                    Daleel UAE was built with one mission — to make it easy for anyone in the UAE to find trusted, verified local businesses. Whether you are looking for an AC technician in Ajman or a salon in Dubai Marina, Daleel UAE connects you instantly.
                  </p>
                  <p>
                    We noticed a gap in the market. UAE residents were struggling to find reliable local businesses, relying on word of mouth or outdated listings. At the same time, small and medium businesses had no affordable way to get found online.
                  </p>
                  <p>
                    So we built Daleel UAE — a clean, simple, trustworthy directory that works for both sides. Customers find who they need. Businesses get the visibility they deserve.
                  </p>
                </div>
              </div>

              {/* Visual Card */}
              <div className="relative">
                <div
                  className="rounded-3xl p-8 text-white relative overflow-hidden"
                  style={{ backgroundColor: '#0F172A' }}
                >
                  <div className="absolute inset-0 hero-overlay opacity-20" />
                  <div className="relative z-10">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: '#0D9488' }}
                    >
                      <span className="text-white font-bold text-2xl">D</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      To be the UAE&apos;s most trusted and comprehensive business directory — helping residents find verified local businesses and helping businesses grow their customer base.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Verified', value: 'All Listings' },
                        { label: 'Coverage', value: 'All 7 Emirates' },
                        { label: 'Price', value: 'AED 500/year' },
                        { label: 'Support', value: '24h Response' },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="rounded-xl p-3"
                          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                        >
                          <div
                            className="text-xs font-medium mb-0.5"
                            style={{ color: '#0D9488' }}
                          >
                            {item.label}
                          </div>
                          <div className="text-white font-semibold text-sm">
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR VALUES ───────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: '#0D9488' }}
              >
                What We Stand For
              </span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold mt-2"
                style={{ color: '#0F172A' }}
              >
                Our Mission & Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: '#0D9488' }}
                  >
                    {value.icon}
                  </div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: '#0F172A' }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM SECTION ─────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: '#0D9488' }}
              >
                The People Behind Daleel
              </span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold mt-2"
                style={{ color: '#0F172A' }}
              >
                Our Team
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100"
                >
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
                    style={{ backgroundColor: 'rgba(13,148,136,0.15)' }}
                  >
                    <span style={{ color: '#0D9488' }}>?</span>
                  </div>
                  <div
                    className="h-4 rounded-full w-32 mx-auto mb-2"
                    style={{ backgroundColor: '#e5e7eb' }}
                  />
                  <div
                    className="h-3 rounded-full w-24 mx-auto"
                    style={{ backgroundColor: '#f3f4f6' }}
                  />
                  <p className="text-xs text-gray-400 mt-4">
                    Team member coming soon
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ──────────────────────────────────────── */}
        <section
          className="py-16 sm:py-24 relative overflow-hidden"
          style={{ backgroundColor: '#0F172A' }}
        >
          <div className="absolute inset-0 hero-overlay opacity-20" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ backgroundColor: '#0D9488' }}
          />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to List Your Business?
            </h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Join 500+ UAE businesses already on Daleel UAE and start getting found by customers today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: '#0D9488' }}
              >
                Register Your Business
                <HiArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:bg-white/10"
                style={{ color: 'white', border: '2px solid rgba(255,255,255,0.2)' }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
