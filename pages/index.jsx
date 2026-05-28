import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { HiSearch, HiArrowRight } from 'react-icons/hi'
import { FaTools, FaStar, FaRocket } from 'react-icons/fa'

const emirates = [
  {
    name: 'Dubai',
    slug: 'dubai',
    landmark: '🏙️',
    desc: 'City of the Future',
  },
  {
    name: 'Abu Dhabi',
    slug: 'abu-dhabi',
    landmark: '🕌',
    desc: 'The Capital',
  },
  {
    name: 'Sharjah',
    slug: 'sharjah',
    landmark: '🎭',
    desc: 'Cultural Capital',
  },
  {
    name: 'Ajman',
    slug: 'ajman',
    landmark: '⚓',
    desc: 'Pearl of the Gulf',
  },
  {
    name: 'Ras Al Khaimah',
    slug: 'ras-al-khaimah',
    landmark: '🏔️',
    desc: 'Adventure Awaits',
  },
  {
    name: 'Fujairah',
    slug: 'fujairah',
    landmark: '🌊',
    desc: 'Gateway to the East',
  },
  {
    name: 'Umm Al Quwain',
    slug: 'umm-al-quwain',
    landmark: '🦅',
    desc: 'The Tranquil Emirate',
  },
]

const categories = [
  'AC Repair',
  'Cleaning Services',
  'Salon & Beauty',
  'Plumbing',
  'Medical Clinic',
  'Restaurant',
  'Home Maintenance',
  'Tutoring',
  'Electrician',
  'Carpentry',
  'Painting',
  'Security Systems',
]

const features = [
  {
    icon: <FaRocket className="w-6 h-6" />,
    title: 'Get Found Instantly',
    desc: 'Customers searching your category in your area find you first. Be visible to thousands of UAE residents actively looking for your services.',
  },
  {
    icon: <FaStar className="w-6 h-6" />,
    title: 'Your Digital Storefront',
    desc: 'Logo, cover photo, services, contacts — all in one professional page. Make a great first impression every single time.',
  },
  {
    icon: <FaTools className="w-6 h-6" />,
    title: 'Real ROI',
    desc: 'One new client covers your entire year\'s listing fee. Most businesses see a return within the first week of going live.',
  },
]

export default function Home() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/emirate/dubai?search=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <>
      <Head>
        <title>Daleel UAE — UAE&apos;s Most Trusted Business Directory</title>
        <meta
          name="description"
          content="Find verified businesses across all 7 emirates — by area, by category, by service. UAE's most trusted business directory."
        />
      </Head>

      <Navbar />

      <main>
        {/* ── HERO SECTION ─────────────────────────────────────── */}
        <section
          className="relative min-h-[620px] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#0F172A' }}
        >
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 hero-overlay opacity-40" />

          {/* Teal glow blobs */}
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ backgroundColor: '#0D9488' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ backgroundColor: '#0D9488' }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{
                backgroundColor: 'rgba(13,148,136,0.15)',
                borderColor: 'rgba(13,148,136,0.3)',
                color: '#5eead4',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Trusted by 500+ UAE Businesses
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
              UAE&apos;s Most Trusted{' '}
              <span style={{ color: '#0D9488' }}>Business Directory</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Find verified businesses across all 7 emirates —{' '}
              <span className="text-white font-medium">by area</span>,{' '}
              <span className="text-white font-medium">by category</span>,{' '}
              <span className="text-white font-medium">by service</span>
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
              <div className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden p-1.5">
                <div className="flex items-center gap-3 flex-1 px-3">
                  <HiSearch className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a service or business..."
                    className="flex-1 py-2.5 text-sm bg-transparent border-none outline-none"
                    style={{ color: '#0F172A' }}
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 flex-shrink-0"
                  style={{ backgroundColor: '#0D9488' }}
                >
                  Search
                </button>
              </div>
            </form>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 sm:gap-16">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-white">500+</div>
                <div className="text-sm text-gray-400 mt-0.5">Businesses Listed</div>
              </div>
              <div
                className="w-px h-10 opacity-20"
                style={{ backgroundColor: '#0D9488' }}
              />
              <div className="text-center">
                <div className="text-3xl font-extrabold text-white">7</div>
                <div className="text-sm text-gray-400 mt-0.5">Emirates Covered</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EMIRATES SECTION ─────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-extrabold mb-3"
                style={{ color: '#0F172A' }}
              >
                Browse by Emirate
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Explore businesses in any of the 7 emirates across the UAE
              </p>
            </div>

            {/* Emirates Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {emirates.map((emirate) => (
                <Link
                  key={emirate.slug}
                  href={`/emirate/${emirate.slug}`}
                  className="group relative bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Hover teal overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: 'rgba(13,148,136,0.04)' }}
                  />

                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{emirate.landmark}</div>
                    <h3
                      className="font-bold text-base mb-1 group-hover:text-teal-600 transition-colors"
                      style={{ color: '#0F172A' }}
                    >
                      {emirate.name}
                    </h3>
                    <p className="text-xs text-gray-400">{emirate.desc}</p>

                    {/* Arrow */}
                    <div
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-1"
                      style={{ color: '#0D9488' }}
                    >
                      Explore <HiArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORIES STRIP ─────────────────────────────────── */}
        <section className="py-12 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-2xl sm:text-3xl font-extrabold mb-8 text-center"
              style={{ color: '#0F172A' }}
            >
              Popular Categories
            </h2>

            {/* Scrollable pills */}
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/emirate/dubai?category=${encodeURIComponent(cat)}`}
                  className="flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all duration-200 hover:text-white hover:border-teal-600 whitespace-nowrap"
                  style={{
                    borderColor: '#0D9488',
                    color: '#0D9488',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0D9488'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#0D9488'
                  }}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY LIST WITH US ─────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-14">
              <h2
                className="text-3xl sm:text-4xl font-extrabold mb-3"
                style={{ color: '#0F172A' }}
              >
                Why 500+ Businesses Trust Daleel UAE
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Join the UAE&apos;s fastest growing business directory
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 stagger-children">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5"
                    style={{ backgroundColor: '#0D9488' }}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: '#0F172A' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Banner */}
            <div
              className="rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden"
              style={{ backgroundColor: '#0D9488' }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 hero-overlay opacity-20" />

              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
                  List Your Business Today for AED 500/year
                </h3>
                <p className="text-teal-100 mb-8 max-w-lg mx-auto">
                  Join hundreds of UAE businesses already getting new customers through Daleel UAE
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 active:scale-95 shadow-lg"
                  style={{ backgroundColor: '#0F172A', color: 'white' }}
                >
                  Register Now
                  <HiArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
