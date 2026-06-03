import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase, EMIRATES, AREAS, CATEGORIES } from '@/lib/supabaseClient'
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi'
import { FaStar, FaRocket, FaBullhorn } from 'react-icons/fa'

const tiers = [
  {
    id: 'standard',
    name: 'Standard',
    price: 'AED 499',
    period: '/year',
    icon: <FaStar className="w-5 h-5" />,
    color: '#64748b',
    features: [
      'Listed in directory',
      'Logo + cover photo',
      'Services and contacts page',
      'Appears in search results',
      'Customer reviews',
      'WhatsApp and call buttons',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'AED 999',
    period: '/year',
    icon: <FaRocket className="w-5 h-5" />,
    color: '#0D9488',
    features: [
      'Everything in Standard',
      'Pinned to top of your category',
      'Gold Premium badge',
      'Priority in search results',
      'Enhanced business profile',
      'Featured in emirate listings',
    ],
    cta: 'Go Premium',
    popular: true,
  },
  {
    id: 'sponsored',
    name: 'Sponsored',
    price: 'AED 1,499',
    period: '/month',
    icon: <FaBullhorn className="w-5 h-5" />,
    color: '#d97706',
    features: [
      'Everything in Premium',
      'Spotlight banner at top of emirate page',
      'Sponsored badge',
      'Maximum visibility',
      'Priority customer support',
      'Monthly performance report',
    ],
    cta: 'Get Sponsored',
    popular: false,
  },
]

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

export default function Register() {
  const router = useRouter()
  const [selectedTier, setSelectedTier] = useState('standard')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    emirate: '',
    area: '',
    category: '',
    description: '',
    key_service_1: '',
    key_service_2: '',
    key_service_3: '',
    additional_services: '',
    year_established: '',
    tl_number: '',
    mobile: '',
    whatsapp: '',
    email: '',
  })

  const [logoFile, setLogoFile] = useState(null)
  const [coverFile, setCoverFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'emirate' ? { area: '' } : {}),
    }))
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleCoverChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCoverFile(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const uploadImage = async (file, folder) => {
    if (!file) return null
    const fileExt = file.name.split('.').pop()
    const fileName = folder + '/' + Date.now() + '.' + fileExt
    const { error } = await supabase.storage
      .from('business-images')
      .upload(fileName, file)
    if (error) throw error
    const { data } = supabase.storage
      .from('business-images')
      .getPublicUrl(fileName)
    return data.publicUrl
  }

  const validate = () => {
    if (!form.name.trim()) return 'Business name is required.'
    if (!form.emirate) return 'Please select an emirate.'
    if (!form.area) return 'Please select an area.'
    if (!form.category) return 'Please select a category.'
    if (!form.description.trim()) return 'Please add a business description.'
    if (!form.key_service_1.trim()) return 'Please add at least one key service.'
    if (!form.mobile.trim()) return 'Mobile number is required.'
    if (!form.email.trim()) return 'Email address is required.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      window.scrollTo({ top: document.getElementById('registration-form').offsetTop - 100, behavior: 'smooth' })
      return
    }
    setLoading(true)
    try {
      const logoUrl = await uploadImage(logoFile, 'logos')
      const coverUrl = await uploadImage(coverFile, 'covers')
      const keyServices = [form.key_service_1, form.key_service_2, form.key_service_3].filter(Boolean)
      const slug = slugify(form.name) + '-' + Date.now()
      const businessData = {
        name: form.name.trim(),
        slug,
        description: form.description.trim(),
        logo_url: logoUrl,
        cover_url: coverUrl,
        emirate: form.emirate,
        area: form.area,
        category: form.category,
        key_services: keyServices,
        additional_services: form.additional_services.trim() || null,
        year_established: form.year_established || null,
        tl_number: form.tl_number.trim() || null,
        mobile: form.mobile.trim(),
        whatsapp: form.whatsapp.trim() || form.mobile.trim(),
        email: form.email.trim(),
        tier: selectedTier,
        active: false,
      }
      const { data, error: insertError } = await supabase
        .from('businesses')
        .insert([businessData])
        .select()
      if (insertError) throw insertError
      const registeredBusiness = data[0]
      router.push('/payment?business=' + registeredBusiness.id + '&tier=' + selectedTier + '&name=' + encodeURIComponent(form.name))
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again or contact us.')
    } finally {
      setLoading(false)
    }
  }

  const areas = form.emirate ? AREAS[form.emirate] || [] : []

  return (
    <>
      <Head>
        <title>Register Your Business — Daleel UAE</title>
        <meta name="description" content="List your UAE business on Daleel UAE. Starting from AED 499/year. Get found by thousands of UAE customers." />
      </Head>
      <Navbar />
      <main>

        {/* HERO */}
        <section className="relative py-20 sm:py-28 overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
          <div className="absolute inset-0 hero-overlay opacity-30" />
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: '#0D9488' }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border" style={{ backgroundColor: 'rgba(13,148,136,0.15)', borderColor: 'rgba(13,148,136,0.3)', color: '#5eead4' }}>
              Launch Offer — Limited Time
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
              Put Your Business in Front of{' '}
              <span style={{ color: '#0D9488' }}>Thousands of UAE Customers</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
              Join UAE&apos;s most trusted business directory and watch your phone ring — starting from just AED 499/year
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { number: '500+', label: 'Listed Businesses' },
                { number: '7', label: 'Emirates Covered' },
                { number: '📈', label: 'Growing Daily' },
              ].map((stat, i) => (
                <div key={i} className="rounded-2xl p-4 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="text-2xl font-extrabold text-white">{stat.number}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI SECTION */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-extrabold mb-3" style={{ color: '#0F172A' }}>The Math is Simple</h2>
            <p className="text-gray-500 mb-10">Most businesses recover their listing fee within the first week</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2">
              {[
                { step: '1', label: 'Pay AED 499', sub: 'One-time yearly fee', color: '#0F172A' },
                { arrow: true },
                { step: '2', label: 'Get Found', sub: 'By UAE customers', color: '#0D9488' },
                { arrow: true },
                { step: '3', label: 'One New Client', sub: '= AED 500+', color: '#0D9488' },
                { arrow: true },
                { step: '4', label: 'Pure Profit', sub: 'From client 2 onwards', color: '#16a34a' },
              ].map((item, i) =>
                item.arrow ? (
                  <HiArrowRight key={i} className="w-5 h-5 text-gray-300 flex-shrink-0 hidden sm:block" />
                ) : (
                  <div key={i} className="rounded-2xl px-5 py-4 text-center min-w-[120px]" style={{ backgroundColor: item.color + '15', border: '2px solid ' + item.color + '30' }}>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: item.color }}>Step {item.step}</div>
                    <div className="font-extrabold text-sm" style={{ color: '#0F172A' }}>{item.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{item.sub}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* TIER CARDS */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: '#0F172A' }}>Choose Your Plan</h2>
              <p className="text-gray-500">Launch pricing — prices will increase as we grow</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className="tier-card relative bg-white rounded-3xl p-8 cursor-pointer transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md"
                  style={selectedTier === tier.id ? { boxShadow: '0 20px 60px ' + tier.color + '25', border: '2px solid ' + tier.color } : {}}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap" style={{ backgroundColor: tier.color }}>
                      ⭐ Most Popular
                    </div>
                  )}
                  {selectedTier === tier.id && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: tier.color }}>
                      <HiCheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5" style={{ backgroundColor: tier.color }}>
                    {tier.icon}
                  </div>
                  <h3 className="text-xl font-extrabold mb-1" style={{ color: '#0F172A' }}>{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-extrabold" style={{ color: tier.color }}>{tier.price}</span>
                    <span className="text-gray-400 text-sm">{tier.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: tier.color + '15' }}>
                          <HiCheckCircle className="w-3 h-3" style={{ color: tier.color }} />
                        </div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedTier(tier.id)}
                    className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                    style={selectedTier === tier.id
                      ? { backgroundColor: tier.color, color: 'white' }
                      : { backgroundColor: tier.color + '10', color: tier.color, border: '2px solid ' + tier.color + '30' }
                    }
                  >
                    {selectedTier === tier.id ? '✓ Selected' : tier.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REGISTRATION FORM */}
        <section id="registration-form" className="py-16 sm:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#0F172A' }}>Register Your Business</h2>
              <p className="text-gray-500">Fill in your details below. Takes less than 5 minutes.</p>
            </div>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">

              {/* Business Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business Name <span className="text-red-500">*</span></label>
                <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="e.g. Al Noor AC Services" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all" style={{ color: '#0F172A' }} />
              </div>

              {/* Emirate + Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Emirate <span className="text-red-500">*</span></label>
                  <select name="emirate" value={form.emirate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all" style={{ color: '#0F172A' }}>
                    <option value="">Select Emirate</option>
                    {EMIRATES.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Area <span className="text-red-500">*</span></label>
                  <select name="area" value={form.area} onChange={handleChange} disabled={!form.emirate} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all disabled:opacity-50" style={{ color: '#0F172A' }}>
                    <option value="">{form.emirate ? 'Select Area' : 'Select Emirate first'}</option>
                    {areas.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
                <select name="category" value={form.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all" style={{ color: '#0F172A' }}>
                  <option value="">Select Category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business Description <span className="text-red-500">*</span></label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe your business, what you offer, and what makes you stand out..." rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm resize-none transition-all" style={{ color: '#0F172A' }} />
              </div>

              {/* Key Services */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Key Services <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[1, 2, 3].map((num) => (
                    <input key={num} name={'key_service_' + num} type="text" value={form['key_service_' + num]} onChange={handleChange} placeholder={'Service ' + num} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all" style={{ color: '#0F172A' }} />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1.5">e.g. AC Installation, AC Repair, Duct Cleaning</p>
              </div>

              {/* Additional Services */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Additional Services <span className="text-gray-400 font-normal">(optional)</span></label>
                <textarea name="additional_services" value={form.additional_services} onChange={handleChange} placeholder="List any other services you offer..." rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm resize-none transition-all" style={{ color: '#0F172A' }} />
              </div>

              {/* Year + TL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Year Established <span className="text-gray-400 font-normal">(optional)</span></label>
                  <input name="year_established" type="number" value={form.year_established} onChange={handleChange} placeholder="e.g. 2015" min="1900" max={new Date().getFullYear()} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all" style={{ color: '#0F172A' }} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Trade License Number <span className="text-gray-400 font-normal">(optional)</span></label>
                  <input name="tl_number" type="text" value={form.tl_number} onChange={handleChange} placeholder="e.g. TL-123456" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all" style={{ color: '#0F172A' }} />
                </div>
              </div>

              {/* Contact Details */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-base font-bold mb-4" style={{ color: '#0F172A' }}>Contact Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                      <input name="mobile" type="tel" value={form.mobile} onChange={handleChange} placeholder="e.g. 0501234567" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all" style={{ color: '#0F172A' }} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">WhatsApp Number <span className="text-gray-400 font-normal">(if different)</span></label>
                      <input name="whatsapp" type="tel" value={form.whatsapp} onChange={handleChange} placeholder="e.g. 0501234567" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all" style={{ color: '#0F172A' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="business@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition-all" style={{ color: '#0F172A' }} />
                  </div>
                </div>
              </div>

              {/* Image Uploads */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-base font-bold mb-4" style={{ color: '#0F172A' }}>Business Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business Logo</label>
                    <div className="relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-teal-400 transition-colors" style={{ borderColor: '#e5e7eb' }}>
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo preview" className="w-20 h-20 object-cover rounded-xl mx-auto" />
                      ) : (
                        <div className="py-4">
                          <div className="text-2xl mb-1">🖼️</div>
                          <p className="text-xs text-gray-400">Click to upload logo</p>
                          <p className="text-xs text-gray-300">PNG, JPG up to 2MB</p>
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={handleLogoChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cover Photo</label>
                    <div className="relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-teal-400 transition-colors" style={{ borderColor: '#e5e7eb' }}>
                      {coverPreview ? (
                        <img src={coverPreview} alt="Cover preview" className="w-full h-20 object-cover rounded-xl" />
                      ) : (
                        <div className="py-4">
                          <div className="text-2xl mb-1">🌅</div>
                          <p className="text-xs text-gray-400">Click to upload cover</p>
                          <p className="text-xs text-gray-300">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={handleCoverChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Tier */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-base font-bold mb-4" style={{ color: '#0F172A' }}>Selected Plan</h3>
                <div className="rounded-2xl p-4 flex items-center justify-between" style={{ backgroundColor: 'rgba(13,148,136,0.05)', border: '2px solid rgba(13,148,136,0.2)' }}>
                  <div>
                    <div className="font-bold capitalize" style={{ color: '#0F172A' }}>{selectedTier} Plan</div>
                    <div className="text-sm text-gray-500">
                      {tiers.find(t => t.id === selectedTier)?.price}{' '}
                      {tiers.find(t => t.id === selectedTier)?.period}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => document.querySelector('.tier-card')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-xs font-medium underline"
                    style={{ color: '#0D9488' }}
                  >
                    Change Plan
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: '#0D9488' }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting Registration...
                  </>
                ) : (
                  <>
                    Complete Registration & Proceed to Payment
                    <HiArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400">
                By submitting, you agree to our Terms and Conditions. Your listing will be reviewed and activated within 2 hours of payment confirmation.
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
