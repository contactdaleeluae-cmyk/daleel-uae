import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { HiCheckCircle, HiXCircle, HiTrash, HiEye, HiLockClosed, HiLogout, HiRefresh } from 'react-icons/hi'
import { FaWhatsapp, FaPhone, FaEnvelope, FaStar } from 'react-icons/fa'

const ADMIN_PASSWORD = 'Anaconda!!#10kaedjune2026'
const TABS = ['Pending', 'Active', 'Reviews', 'Contacts', 'Stats']

function PreviewLink({ slug, label, className, style }) {
  return (
    <Link
      href={'/business/' + slug}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      {label}
    </Link>
  )
}

function EmailLink({ email, className }) {
  return (
    <Link href={'mailto:' + email} className={className}>
      {email}
    </Link>
  )
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [activeTab, setActiveTab] = useState('Pending')
  const [businesses, setBusinesses] = useState([])
  const [reviews, setReviews] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({})
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('daleel_admin_auth')
    if (saved === 'true') setAuthed(true)
  }, [])

  useEffect(() => {
    if (authed) fetchAll()
  }, [authed])

  const handleLogin = (e) => {
    e.preventDefault()
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthed(true)
      sessionStorage.setItem('daleel_admin_auth', 'true')
      setPasswordError('')
    } else {
      setPasswordError('Incorrect password. Try again.')
      setPasswordInput('')
    }
  }

  const handleLogout = () => {
    setAuthed(false)
    sessionStorage.removeItem('daleel_admin_auth')
  }

  const showNotification = (msg) => {
    setNotification(msg)
    setTimeout(() => setNotification(''), 3000)
  }

  const fetchAll = async () => {
    setLoading(true)
    try {
      const { data: allBusinesses } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false })
      const { data: allReviews } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
      const { data: allContacts } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })
      setBusinesses(allBusinesses || [])
      setReviews(allReviews || [])
      setContacts(allContacts || [])
      const all = allBusinesses || []
      setStats({
        total: all.length,
        active: all.filter(b => b.active).length,
        pending: all.filter(b => !b.active).length,
        sponsored: all.filter(b => b.tier === 'sponsored').length,
        premium: all.filter(b => b.tier === 'premium').length,
        standard: all.filter(b => b.tier === 'standard').length,
        reviews: (allReviews || []).length,
        contacts: (allContacts || []).length,
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const approveBusiness = async (id) => {
    try {
      await supabase.from('businesses').update({ active: true }).eq('id', id)
      setBusinesses(prev => prev.map(b => b.id === id ? { ...b, active: true } : b))
      showNotification('Business approved and is now live!')

      // Send approval email
      const approvedBusiness = businesses.find(b => b.id === id)
      if (approvedBusiness && approvedBusiness.email) {
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'listing_approved',
              business: {
                name: approvedBusiness.name,
                email: approvedBusiness.email,
                slug: approvedBusiness.slug,
                tier: approvedBusiness.tier,
              },
            }),
          })
        } catch (emailErr) {
          console.error('Approval email failed:', emailErr)
        }
      }
    } catch (err) { console.error(err) }
  }

  const rejectBusiness = async (id) => {
    if (!confirm('Are you sure you want to delete this business? This cannot be undone.')) return
    try {
      await supabase.from('businesses').delete().eq('id', id)
      setBusinesses(prev => prev.filter(b => b.id !== id))
      showNotification('Business deleted.')
    } catch (err) { console.error(err) }
  }

  const deactivateBusiness = async (id) => {
    try {
      await supabase.from('businesses').update({ active: false }).eq('id', id)
      setBusinesses(prev => prev.map(b => b.id === id ? { ...b, active: false } : b))
      showNotification('Business deactivated.')
    } catch (err) { console.error(err) }
  }

  const deleteReview = async (id) => {
    if (!confirm('Delete this review?')) return
    try {
      await supabase.from('reviews').delete().eq('id', id)
      setReviews(prev => prev.filter(r => r.id !== id))
      showNotification('Review deleted.')
    } catch (err) { console.error(err) }
  }

  const deleteContact = async (id) => {
    try {
      await supabase.from('contacts').delete().eq('id', id)
      setContacts(prev => prev.filter(c => c.id !== id))
      showNotification('Contact deleted.')
    } catch (err) { console.error(err) }
  }

  const pendingBusinesses = businesses.filter(b => !b.active)
  const activeBusinesses = businesses.filter(b => b.active)

  const tierColor = {
    sponsored: '#0D9488',
    premium: '#d97706',
    standard: '#64748b',
  }

  if (!authed) {
    return (
      <>
        <Head>
          <title>Admin — Daleel UAE</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0F172A' }}>
          <div className="absolute inset-0 hero-overlay opacity-20" />
          <div className="relative z-10 bg-white rounded-3xl p-8 sm:p-10 w-full max-w-md shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#0D9488' }}>
                <HiLockClosed className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold" style={{ color: '#0F172A' }}>Admin Access</h1>
              <p className="text-gray-400 text-sm mt-1">Daleel UAE Control Panel</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm"
                  style={{ color: '#0F172A' }}
                  autoFocus
                />
              </div>
              {passwordError && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="text-red-600 text-sm">{passwordError}</p>
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#0D9488' }}
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard — Daleel UAE</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>

        {notification && (
          <div className="fixed top-4 right-4 z-50 bg-white rounded-2xl shadow-xl px-5 py-3 border border-gray-100">
            <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>{notification}</p>
          </div>
        )}

        <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0D9488' }}>
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <div>
                  <span className="font-extrabold text-sm" style={{ color: '#0F172A' }}>Daleel UAE</span>
                  <span className="text-xs text-gray-400 ml-2">Admin Dashboard</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                  style={{ color: '#0F172A' }}
                >
                  <HiRefresh className="w-3.5 h-3.5" />
                  Refresh
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#0F172A' }}
                >
                  <HiLogout className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
            {[
              { label: 'Total', value: stats.total || 0, color: '#0F172A' },
              { label: 'Active', value: stats.active || 0, color: '#16a34a' },
              { label: 'Pending', value: stats.pending || 0, color: '#dc2626' },
              { label: 'Sponsored', value: stats.sponsored || 0, color: '#0D9488' },
              { label: 'Premium', value: stats.premium || 0, color: '#d97706' },
              { label: 'Standard', value: stats.standard || 0, color: '#64748b' },
              { label: 'Reviews', value: stats.reviews || 0, color: '#7c3aed' },
              { label: 'Contacts', value: stats.contacts || 0, color: '#0369a1' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                <div className="text-2xl font-extrabold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap"
                style={activeTab === tab
                  ? { backgroundColor: '#0D9488', color: 'white' }
                  : { backgroundColor: 'white', color: '#64748b', border: '1px solid #e5e7eb' }
                }
              >
                {tab}
                {tab === 'Pending' && pendingBusinesses.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {pendingBusinesses.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Loading data...</p>
            </div>
          )}

          {!loading && activeTab === 'Pending' && (
            <div>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0F172A' }}>
                Pending Approvals ({pendingBusinesses.length})
              </h2>
              {pendingBusinesses.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                  <div className="text-4xl mb-3">🎉</div>
                  <p className="text-gray-400">No pending businesses. All caught up!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingBusinesses.map((b) => (
                    <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="flex-shrink-0">
                          {b.logo_url ? (
                            <img src={b.logo_url} alt={b.name} className="w-16 h-16 rounded-xl object-cover" />
                          ) : (
                            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl" style={{ backgroundColor: '#0D9488' }}>
                              {b.name?.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-bold text-base" style={{ color: '#0F172A' }}>{b.name}</h3>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white capitalize" style={{ backgroundColor: tierColor[b.tier] || '#64748b' }}>
                              {b.tier}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                            <span>📍 {b.area}, {b.emirate}</span>
                            <span>🏷️ {b.category}</span>
                            <span>📅 {new Date(b.created_at).toLocaleDateString('en-AE')}</span>
                          </div>
                          {b.description && (
                            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{b.description}</p>
                          )}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {b.key_services?.map((s, i) => (
                              <span key={i} className="px-2.5 py-1 rounded-lg text-xs border" style={{ color: '#0D9488', borderColor: 'rgba(13,148,136,0.3)', backgroundColor: 'rgba(13,148,136,0.05)' }}>
                                {s}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                            {b.mobile && <span className="flex items-center gap-1"><FaPhone className="w-3 h-3" />{b.mobile}</span>}
                            {b.whatsapp && <span className="flex items-center gap-1"><FaWhatsapp className="w-3 h-3" />{b.whatsapp}</span>}
                            {b.email && <span className="flex items-center gap-1"><FaEnvelope className="w-3 h-3" />{b.email}</span>}
                            {b.tl_number && <span>TL: {b.tl_number}</span>}
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => approveBusiness(b.id)}
                              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                              style={{ backgroundColor: '#16a34a' }}
                            >
                              <HiCheckCircle className="w-4 h-4" />
                              Approve + Email
                            </button>
                            <button
                              onClick={() => rejectBusiness(b.id)}
                              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                              style={{ backgroundColor: '#dc2626' }}
                            >
                              <HiXCircle className="w-4 h-4" />
                              Reject
                            </button>
                            <PreviewLink
                              slug={b.slug}
                              label={
                                <span className="flex items-center gap-2">
                                  <HiEye className="w-4 h-4" />
                                  Preview
                                </span>
                              }
                              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all hover:opacity-90 border"
                              style={{ color: '#0F172A', borderColor: '#e5e7eb' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!loading && activeTab === 'Active' && (
            <div>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0F172A' }}>
                Active Listings ({activeBusinesses.length})
              </h2>
              {activeBusinesses.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                  <p className="text-gray-400">No active businesses yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeBusinesses.map((b) => (
                    <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {b.logo_url ? (
                            <img src={b.logo_url} alt={b.name} className="w-12 h-12 rounded-xl object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#0D9488' }}>
                              {b.name?.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-sm" style={{ color: '#0F172A' }}>{b.name}</h3>
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white capitalize" style={{ backgroundColor: tierColor[b.tier] || '#64748b' }}>
                              {b.tier}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{b.area}, {b.emirate} — {b.category}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <PreviewLink
                            slug={b.slug}
                            label={
                              <span className="flex items-center gap-1.5">
                                <HiEye className="w-3.5 h-3.5" />
                                View
                              </span>
                            }
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:bg-gray-50"
                            style={{ color: '#0F172A', borderColor: '#e5e7eb' }}
                          />
                          <button
                            onClick={() => deactivateBusiness(b.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90"
                            style={{ backgroundColor: '#d97706' }}
                          >
                            <HiXCircle className="w-3.5 h-3.5" />
                            Deactivate
                          </button>
                          <button
                            onClick={() => rejectBusiness(b.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90"
                            style={{ backgroundColor: '#dc2626' }}
                          >
                            <HiTrash className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!loading && activeTab === 'Reviews' && (
            <div>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0F172A' }}>
                All Reviews ({reviews.length})
              </h2>
              {reviews.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                  <p className="text-gray-400">No reviews yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reviews.map((r) => (
                    <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm" style={{ color: '#0F172A' }}>{r.reviewer_name}</span>
                            <div className="flex items-center gap-0.5">
                              {[1,2,3,4,5].map((star) => (
                                <FaStar key={star} className="w-3 h-3" style={{ color: star <= r.rating ? '#f59e0b' : '#e5e7eb' }} />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-1">{r.comment}</p>
                          <p className="text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString('en-AE')}</p>
                        </div>
                        <button
                          onClick={() => deleteReview(r.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90 flex-shrink-0"
                          style={{ backgroundColor: '#dc2626' }}
                        >
                          <HiTrash className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!loading && activeTab === 'Contacts' && (
            <div>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0F172A' }}>
                Contact Submissions ({contacts.length})
              </h2>
              {contacts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                  <p className="text-gray-400">No contact submissions yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {contacts.map((c) => (
                    <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="font-semibold text-sm" style={{ color: '#0F172A' }}>{c.name}</span>
                            <EmailLink email={c.email} className="text-xs text-teal-600 hover:underline" />
                            <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleDateString('en-AE')}</span>
                          </div>
                          <p className="text-sm text-gray-500">{c.message}</p>
                        </div>
                        <button
                          onClick={() => deleteContact(c.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90 flex-shrink-0"
                          style={{ backgroundColor: '#dc2626' }}
                        >
                          <HiTrash className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!loading && activeTab === 'Stats' && (
            <div>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0F172A' }}>Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Total Businesses', value: stats.total || 0, color: '#0F172A', icon: '🏢' },
                  { label: 'Active Listings', value: stats.active || 0, color: '#16a34a', icon: '✅' },
                  { label: 'Pending Review', value: stats.pending || 0, color: '#dc2626', icon: '⏳' },
                  { label: 'Sponsored', value: stats.sponsored || 0, color: '#0D9488', icon: '⭐' },
                  { label: 'Premium', value: stats.premium || 0, color: '#d97706', icon: '🥇' },
                  { label: 'Standard', value: stats.standard || 0, color: '#64748b', icon: '📋' },
                  { label: 'Total Reviews', value: stats.reviews || 0, color: '#7c3aed', icon: '⭐' },
                  { label: 'Contact Forms', value: stats.contacts || 0, color: '#0369a1', icon: '📩' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-extrabold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
