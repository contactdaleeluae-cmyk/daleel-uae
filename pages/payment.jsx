import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { HiCheckCircle, HiClock, HiArrowRight } from 'react-icons/hi'
import { FaWhatsapp, FaUniversity } from 'react-icons/fa'

const tierDetails = {
  standard: { name: 'Standard', price: 'AED 500', period: 'per year', color: '#64748b' },
  premium: { name: 'Premium', price: 'AED 1,500', period: 'per year', color: '#0D9488' },
  sponsored: { name: 'Sponsored', price: 'AED 3,000', period: 'per month', color: '#d97706' },
}

function WhatsAppButton({ href, children }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
      style={{ backgroundColor: '#25D366' }}
    >
      {children}
    </Link>
  )
}

export default function Payment() {
  const router = useRouter()
  const { tier, name } = router.query
  const tierInfo = tierDetails[tier] || tierDetails.standard
  const businessName = name ? decodeURIComponent(name) : 'Your Business'
  const whatsappMessage = 'Hi, I just registered my business ' + businessName + ' on Daleel UAE (' + tierInfo.name + ' plan - ' + tierInfo.price + '). Here is my payment confirmation.'
  const whatsappUrl = 'https://wa.me/971500000000?text=' + encodeURIComponent(whatsappMessage)

  return (
    <>
      <Head>
        <title>Complete Payment — Daleel UAE</title>
        <meta name="description" content="Complete your payment to activate your Daleel UAE business listing." />
      </Head>
      <Navbar />
      <main>
        <section className="relative py-16 sm:py-20 overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
          <div className="absolute inset-0 hero-overlay opacity-30" />
          <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: '#0D9488' }} />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: 'rgba(13,148,136,0.2)' }}>
              <HiCheckCircle className="w-8 h-8" style={{ color: '#0D9488' }} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
              Registration Received!
            </h1>
            <p className="text-gray-300 text-lg">Complete your payment below to activate your listing</p>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6">
              <h2 className="text-lg font-bold mb-5" style={{ color: '#0F172A' }}>Registration Summary</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Business Name</span>
                  <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>{businessName}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Plan Selected</span>
                  <span className="text-sm font-bold capitalize px-3 py-0.5 rounded-full text-white" style={{ backgroundColor: tierInfo.color }}>{tierInfo.name}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Billing Period</span>
                  <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>{tierInfo.period}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-base font-bold" style={{ color: '#0F172A' }}>Total Amount Due</span>
                  <span className="text-2xl font-extrabold" style={{ color: tierInfo.color }}>{tierInfo.price}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6">
              <h2 className="text-lg font-bold mb-2" style={{ color: '#0F172A' }}>How to Complete Payment</h2>
              <p className="text-gray-500 text-sm mb-6">Choose your preferred payment method below</p>

              <div className="rounded-2xl p-6 mb-4 border" style={{ backgroundColor: 'rgba(15,23,42,0.02)', borderColor: '#e5e7eb' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#0F172A' }}>
                    <FaUniversity className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: '#0F172A' }}>Bank Transfer</div>
                    <div className="text-xs text-gray-400">Transfer directly to our account</div>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: 'Bank Name', value: 'Emirates NBD' },
                    { label: 'Account Name', value: 'Daleel UAE FZ LLC' },
                    { label: 'Account Number', value: 'XXXX-XXXX-XXXX' },
                    { label: 'IBAN', value: 'AE00 0000 0000 0000 0000 000' },
                    { label: 'Reference', value: businessName },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-xs text-gray-400">{item.label}</span>
                      <span className="text-xs font-semibold" style={{ color: '#0F172A' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl p-3 text-xs" style={{ backgroundColor: 'rgba(13,148,136,0.05)', color: '#0D9488' }}>
                  Please use your business name as the payment reference so we can identify your transfer quickly.
                </div>
              </div>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400 font-medium">OR</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <div className="rounded-2xl p-6 border" style={{ backgroundColor: 'rgba(37,211,102,0.04)', borderColor: 'rgba(37,211,102,0.2)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#25D366' }}>
                    <FaWhatsapp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: '#0F172A' }}>Pay via WhatsApp</div>
                    <div className="text-xs text-gray-400">Send us your payment confirmation</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Complete your bank transfer first, then send us a screenshot of the transfer confirmation on WhatsApp. We will activate your listing within 2 hours.
                </p>
                <WhatsAppButton href={whatsappUrl}>
                  <FaWhatsapp className="w-4 h-4" />
                  Send Payment Confirmation on WhatsApp
                </WhatsAppButton>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6">
              <h2 className="text-lg font-bold mb-5" style={{ color: '#0F172A' }}>What Happens Next?</h2>
              <div className="space-y-4">
                {[
                  { title: 'Complete Payment', desc: 'Transfer the amount and send us the confirmation', icon: <FaUniversity className="w-4 h-4" />, color: '#0F172A' },
                  { title: 'We Verify Payment', desc: 'Our team confirms your payment within 2 hours', icon: <HiCheckCircle className="w-4 h-4" />, color: '#0D9488' },
                  { title: 'Listing Goes Live', desc: 'Your business appears on Daleel UAE immediately', icon: <HiArrowRight className="w-4 h-4" />, color: '#16a34a' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: item.color }}>
                      {item.icon}
                    </div>
                    <div className="pt-1">
                      <div className="text-sm font-bold" style={{ color: '#0F172A' }}>{item.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5 flex items-start gap-3 mb-8" style={{ backgroundColor: 'rgba(13,148,136,0.06)', border: '1.5px solid rgba(13,148,136,0.2)' }}>
              <HiClock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D9488' }} />
              <p className="text-sm leading-relaxed" style={{ color: '#0F172A' }}>
                <strong>Your listing will be activated within 2 hours</strong> of payment confirmation during business hours (9am to 9pm UAE time). Payments received after hours will be activated the next morning.
              </p>
            </div>

            <div className="text-center">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline" style={{ color: '#0D9488' }}>
                Back to Daleel UAE Homepage
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
