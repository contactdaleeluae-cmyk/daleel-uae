import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BusinessCard from '@/components/BusinessCard'
import { supabase, AREAS, CATEGORIES, EMIRATE_SLUGS } from '@/lib/supabaseClient'
import { HiFilter, HiChevronDown, HiChevronUp, HiSearch, HiArrowRight } from 'react-icons/hi'

export default function EmiratePage() {
  const router = useRouter()
  const { slug, category: queryCategory, search: querySearch } = router.query

  const emirateName = EMIRATE_SLUGS[slug] || slug
  const areas = emirateName ? AREAS[emirateName] || [] : []

  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Set initial filters from URL query params
  useEffect(() => {
    if (queryCategory) setSelectedCategory(queryCategory)
    if (querySearch) setSearchTerm(querySearch)
  }, [queryCategory, querySearch])

  // Fetch businesses when emirate or filters change
  useEffect(() => {
    if (!emirateName) return
    fetchBusinesses()
  }, [emirateName, selectedArea, selectedCategory])

  const fetchBusinesses = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('businesses')
        .select('*')
        .eq('active', true)
        .ilike('emirate', emirateName)

      if (selectedArea) query = query.ilike('area', selectedArea)
      if (selectedCategory) query = query.ilike('category', selectedCategory)

      const { data, error } = await query
      if (error) throw error
      setBusinesses(data || [])
    } catch (err) {
      console.error(err)
      setBusinesses([])
    } finally {
      setLoading(false)
    }
  }

  // Sort: sponsored first, then premium, then standard (newest first within each)
  const sortedBusinesses = [...businesses].sort((a, b) => {
    const tierOrder = { sponsored: 0, premium: 1, standard: 2 }
    const tierDiff = (tierOrder[a.tier] ?? 2) - (tierOrder[b.tier] ?? 2)
    if (tierDiff !== 0) return tierDiff
    return new Date(b.created_at) - new Date(a.created_at)
  })

  // Filter by search term (client side)
  const filteredBusinesses = sortedBusinesses.filter((b) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      b.name?.toLowerCase().includes(term) ||
      b.category?.toLowerCase().includes(term) ||
      b.description?.toLowerCase().includes(term) ||
      b.area?.toLowerCase().includes(term) ||
      b.key_services?.some((s) => s.toLowerCase().includes(term))
    )
  })

  const sponsoredBusinesses = filteredBusinesses.filter((b) => b.tier === 'sponsored')
  const otherBusinesses = filteredBusinesses.filter((b) => b.tier !== 'sponsored')

  const emirateEmojis = {
    Dubai: '🏙️',
    'Abu Dhabi': '🕌',
    Sharjah: '🎭',
    Ajman: '⚓',
    'Ras Al Khaimah': '🏔️',
    Fujairah: '🌊',
    'Umm Al Quwain': '🦅',
  }

  const clearFilters = () => {
    setSelectedArea('')
    setSelectedCategory('')
    setSearchTerm('')
    router.replace(`/emirate/${slug}`, undefined, { shallow: true })
  }

  const hasActiveFilters = selectedArea || selectedCategory || searchTerm

  return (
    <>
      <Head>
        <title>{emirateName} Business Directory — Daleel UAE</title>
        <meta
          name="description"
          content={`Find verified businesses in ${emirateName}. Browse by area and category on Daleel UAE.`}
        />
      </Head>

      <Navbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          className="relative py-14 sm:py-20 overflow-hidden"
          style={{ backgroundColor: '#0F172A' }}
        >
          <div className="absolute inset-0 hero-overlay opacity-30" />
          <div
            className="absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
            style={{ backgroundColor: '#0D9488' }}
          />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="text-5xl mb-4">
              {emirateEmojis[emirateName] || '🇦🇪'}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 leading-tight">
              {emirateName}{' '}
              <span style={{ color: '#0D9488' }}>Business Directory</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Find verified local businesses in {emirateName}
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="flex items-center bg-white rounded-2xl shadow-xl overflow-hidden p-1.5">
                <div className="flex items-center gap-2 flex-1 px-3">
                  <HiSearch className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`Search in ${emirateName}...`}
                    className="flex-1 py-2 text-sm bg-transparent border-none outline-none"
                    style={{ color: '#0F172A' }}
                  />
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-3 py-2 text-gray-400 hover:text-gray-600 text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── FILTERS + RESULTS ────────────────────────────────── */}
        <section className="py-10 sm:py-14 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Filter Panel */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-8">
              {/* Filter Toggle */}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="w-full flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-2">
                  <HiFilter
                    className="w-4 h-4"
                    style={{ color: '#0D9488' }}
                  />
                  <span
                    className="font-semibold text-sm"
                    style={{ color: '#0F172A' }}
                  >
                    Filter Results
                  </span>
                  {hasActiveFilters && (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: '#0D9488' }}
                    >
                      Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {hasActiveFilters && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        clearFilters()
                      }}
                      className="text-xs font-medium text-red-400 hover:text-red-600 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                  {filtersOpen ? (
                    <HiChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <HiChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Filter Dropdowns */}
              {filtersOpen && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Area Filter */}
                    <div>
                      <label
                        className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
                      >
                        Filter by Area
                      </label>
                      <select
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all"
                        style={{ color: '#0F172A' }}
                      >
                        <option value="">All Areas</option>
                        {areas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label
                        className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
                      >
                        Filter by Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all"
                        style={{ color: '#0F172A' }}
                      >
                        <option value="">All Categories</option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2
                  className="text-xl font-bold"
                  style={{ color: '#0F172A' }}
                >
                  {loading
                    ? 'Loading...'
                    : `${filteredBusinesses.length} Business${filteredBusinesses.length !== 1 ? 'es' : ''} Found`}
                </h2>
                {hasActiveFilters && (
                  <p className="text-sm text-gray-400 mt-0.5">
                    Filtered results in {emirateName}
                    {selectedArea && ` › ${selectedArea}`}
                    {selectedCategory && ` › ${selectedCategory}`}
                  </p>
                )}
              </div>
              <Link
                href="/register"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#0D9488' }}
              >
                + List Your Business
              </Link>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse"
                  >
                    <div className="flex gap-3 mb-4">
                      <div className="w-14 h-14 bg-gray-100 rounded-xl flex-shrink-0" />
                      <div className="flex-1 space-y-2 pt-1">
                        <div className="h-4 bg-gray-100 rounded w-3/4" />
                        <div className="h-3 bg-gray-100 rounded w-1/2" />
                      </div>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-gray-100 rounded-full w-20" />
                      <div className="h-6 bg-gray-100 rounded-full w-24" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-gray-100 rounded-xl flex-1" />
                      <div className="h-8 bg-gray-100 rounded-xl flex-1" />
                      <div className="h-8 bg-gray-100 rounded-xl flex-1" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sponsored Businesses - Pinned at Top */}
            {!loading && sponsoredBusinesses.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: '#0D9488' }}
                  >
                    ⭐ Sponsored
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sponsoredBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </div>
            )}

            {/* All Other Businesses */}
            {!loading && otherBusinesses.length > 0 && (
              <div>
                {sponsoredBusinesses.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      All Listings
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredBusinesses.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-5">🔍</div>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: '#0F172A' }}
                >
                  {hasActiveFilters
                    ? 'No businesses match your filters'
                    : `No businesses listed in ${emirateName} yet`}
                </h3>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                  {hasActiveFilters
                    ? 'Try adjusting your filters or clearing them to see all businesses.'
                    : `Be the first business listed in ${emirateName} — Register Now`}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="px-6 py-3 rounded-full text-sm font-semibold border-2 transition-all hover:bg-gray-50"
                      style={{
                        borderColor: '#0D9488',
                        color: '#0D9488',
                      }}
                    >
                      Clear Filters
                    </button>
                  )}
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#0D9488' }}
                  >
                    Register Your Business
                    <HiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Bottom CTA */}
            {!loading && filteredBusinesses.length > 0 && (
              <div
                className="mt-14 rounded-3xl p-8 sm:p-10 text-center text-white relative overflow-hidden"
                style={{ backgroundColor: '#0F172A' }}
              >
                <div className="absolute inset-0 hero-overlay opacity-20" />
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
                    Is Your Business Listed in {emirateName}?
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-lg mx-auto text-sm">
                    Join hundreds of UAE businesses already getting new customers through Daleel UAE. Starting from AED 500/year.
                  </p>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: '#0D9488', color: 'white' }}
                  >
                    List Your Business Today
                    <HiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
