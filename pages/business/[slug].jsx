import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ReviewForm from '@/components/ReviewForm'
import { StarDisplay, RatingSummary } from '@/components/StarRating'
import { supabase, EMIRATE_TO_SLUG } from '@/lib/supabaseClient'
import { HiLocationMarker, HiPhone, HiMail, HiCalendar, HiIdentification, HiArrowLeft } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'

export default function BusinessPage() {
  const router = useRouter()
  const { slug } = router.query
  const [business, setBusiness] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetchBusiness()
  }, [slug])

  const fetchBusiness = async () => {
    setLoading(true)
    try {
      const { data: bizData, error: bizError } = await supabase
        .from('businesses')
        .select('*')
        .eq('slug', slug)
        .eq('active', true)
        .single()
      if (bizError || !bizData) { setNotFound(true); return }
      setBusiness(bizData)
      const { data: reviewData } = await supabase
        .from('reviews')
        .select('*')
        .eq('business_id', bizData.id)
        .order('created_at', { ascending: false })
      setReviews(reviewData || [])
    } catch (err) {
      console.error(err)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const tierConfig = {
    sponsored: { label: 'Sponsored', color: '#0D9488', bg: 'rgba(13,148,136,0.1)' },
    premium: { label: 'Premium', color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
    standard: { label: 'Standard', color: '#64748b', bg: 'rgba(100,116,139,0.1)' },
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <div className="w-full h-56 sm:h-72 bg-gray-200 animate-pulse" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12 pb-20">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 animate-pulse">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gray-200 flex-shrink-0" />
                <div className="flex-1 space-y-3 pt-2">
                  <div className="h-6 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-100 rounded w-1/3" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (notFound || !business) {
    return (
      <>
        <Head><title>Business Not Found — Daleel UAE</title></Head>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-5">🔍</div>
            <h1 className="text-2xl font-bold mb-3" style={{ color: '#0F172A' }}>Business Not Found</h1>
            <p className="text-gray-400 mb-8">This business listing may have been removed or the link is incorrect.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#0D9488' }}>
              <HiArrowLeft className="w-4 h-4" />
              Back to Homepage
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const tier = tierConfig[business.tier] || tierConfig.standard
  const emirateSlug = EMIRATE_TO_SLUG[business.emirate] || 'dubai'
  const additionalServicesList = business.additional_services
    ? business.additional_services.split('\n').filter(Boolean)
    : []

  return (
    <>
      <Head>
        <title>{business.name} — Daleel UAE</title>
        <meta name="description" content={business.description ? business.description.slice(0, 155) : business.name + ' listed on Daleel UAE'} />
      </Head>
      <Navbar />
      <main>
        <div className="relative w-full h-52 sm:h-72 overflow-hidden">
          {business.cover_url ? (
            <img src={business.cover_url} alt={business.name + ' cover'} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full cover-placeholder" />
          )}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute top-4 left-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
            >
              <HiArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        </div>

        <div className="relative" style={{ backgroundColor: '#f8fafc' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 -mt-10 relative z-10 mb-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="flex-shrink-0 -mt-16 sm:-mt-20">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white">
                    {business.logo_url ? (
                      <img src={business.logo_url} alt={business.name + ' logo'} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold" style={{ backgroundColor: '#0D9488' }}>
                        {business.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight" style={{ color: '#0F172A' }}>{business.name}</h1>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: tier.bg, color: tier.color }}>{tier.label}</span>
                  </div>
                  {business.category && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3" style={{ backgroundColor: '#0D9488' }}>{business.category}</span>
                  )}
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                    {(business.area || business.emirate) && (
                      <Link href={'/emirate/' + emirateSlug} className="flex items-center gap-1 hover:text-teal-600 transition-colors">
                        <HiLocationMarker className="w-4 h-4" style={{ color: '#0D9488' }} />
                        {business.area && business.area + ', '}{business.emirate}
                      </Link>
                    )}
                    {business.year_established && (
                      <span className="flex items-center gap-1">
                        <HiCalendar className="w-4 h-4" style={{ color: '#0D9488' }} />
                        Est. {business.year_established}
                      </span>
                    )}
                    {business.tl_number && (
                      <span className="flex items-center gap-1">
                        <HiIdentification className="w-4 h-4" style={{ color: '#0D9488' }} />
                        Trade License: {business.tl_number}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">

                {business.description && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h2 className="text-base font-bold mb-3" style={{ color: '#0F172A' }}>About This Business</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">{business.description}</p>
                  </div>
                )}

                {business.key_services && business.key_services.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h2 className="text-base font-bold mb-4" style={{ color: '#0F172A' }}>Key Services</h2>
                    <div className="flex flex-wrap gap-2">
                      {business.key_services.map((service, i) => (
                        <span key={i} className="px-4 py-2 rounded-xl text-sm font-medium border" style={{ color: '#0D9488', borderColor: 'rgba(13,148,136,0.3)', backgroundColor: 'rgba(13,148,136,0.05)' }}>
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {additionalServicesList.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h2 className="text-base font-bold mb-4" style={{ color: '#0F172A' }}>Additional Services</h2>
                    <ul className="space-y-2">
                      {additionalServicesList.map((service, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-500">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#0D9488' }} />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-bold" style={{ color: '#0F172A' }}>Customer Reviews</h2>
                    <span className="text-sm text-gray-400">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <RatingSummary reviews={reviews} />
                  </div>
                  {reviews.length > 0 ? (
                    <div className="space-y-4 mb-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="rounded-xl p-4 border border-gray-50" style={{ backgroundColor: '#f8fafc' }}>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <div className="font-semibold text-sm" style={{ color: '#0F172A' }}>{review.reviewer_name}</div>
                              <div className="text-xs text-gray-400 mt-0.5">
                                {new Date(review.created_at).toLocaleDateString('en-AE', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </div>
                            </div>
                            <StarDisplay rating={review.rating} size="sm" />
                          </div>
                          {review.comment && <p className="text-sm text-gray-500 leading-relaxed">{review.comment}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 mb-6">
                      <div className="text-3xl mb-2">⭐</div>
                      <p className="text-sm text-gray-400">No reviews yet. Be the first to review!</p>
                    </div>
                  )}
                  <ReviewForm businessId={business.id} onReviewSubmitted={fetchBusiness} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-base font-bold mb-4" style={{ color: '#0F172A' }}>Contact Business</h2>
                  <div className="space-y-3">
                    {business.mobile && (
                      <a href={'tel:' + business.mobile} className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95" style={{ backgroundColor: '#0D9488' }}>
                        <HiPhone className="w-4 h-4" />
                        Call Now
                      </a>
                    )}
                    {business.whatsapp && (
                      <a href={'https://wa.me/' + business.whatsapp} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95" style={{ backgroundColor: '#25D366' }}>
                        <FaWhatsapp className="w-4 h-4" />
                        WhatsApp
                      </a>
                    )}
                    {business.email && (
                      <a href={'mailto:' + business.email} className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95" style={{ backgroundColor: '#0F172A' }}>
                        <HiMail className="w-4 h-4" />
                        Send Email
                      </a>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-base font-bold mb-4" style={{ color: '#0F172A' }}>Business Details</h2>
                  <div className="space-y-3">
                    {business.category && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(13,148,136,0.1)' }}>
                          <span className="text-xs">🏷️</span>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Category</div>
                          <div className="text-sm font-medium" style={{ color: '#0F172A' }}>{business.category}</div>
                        </div>
                      </div>
                    )}
                    {business.emirate && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(13,148,136,0.1)' }}>
                          <span className="text-xs">📍</span>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Location</div>
                          <div className="text-sm font-medium" style={{ color: '#0F172A' }}>{business.area && business.area + ', '}{business.emirate}</div>
                        </div>
                      </div>
                    )}
                    {business.year_established && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(13,148,136,0.1)' }}>
                          <span className="text-xs">📅</span>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Established</div>
                          <div className="text-sm font-medium" style={{ color: '#0F172A' }}>{business.year_established}</div>
                        </div>
                      </div>
                    )}
                    {business.tl_number && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(13,148,136,0.1)' }}>
                          <span className="text-xs">📋</span>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Trade License</div>
                          <div className="text-sm font-medium" style={{ color: '#0F172A' }}>{business.tl_number}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: '#0F172A' }}>
                  <div className="text-2xl mb-2">🚀</div>
                  <h3 className="text-white font-bold text-sm mb-1">Own a Business?</h3>
                  <p className="text-gray-400 text-xs mb-4">Get listed on Daleel UAE from AED 500/year</p>
                  <Link href="/register" className="block w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#0D9488' }}>
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
