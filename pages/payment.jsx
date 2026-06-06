import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { HiCheckCircle, HiClock, HiArrowRight, HiShieldCheck } from 'react-icons/hi'
import { FaWhatsapp, FaCreditCard, FaLock } from 'react-icons/fa'

const tierDetails = {
  standard: { name: 'Standard', price: 'AED 499', amount: 49900, period: 'per year', color: '#64748b' },
  premium: { name: 'Premium', price: 'AED 999', amount: 99900, period: 'per year', color: '#0D9488' },
  sponsored: { name: 'Sponsored', price: 'AED 1,499', amount: 149900, period: 'per month', color: '#d97706' },
}

export default function Payment() {
  const router = useRouter()
  const { business, tier, name } = router.query
  const tierInfo = tierDetails[tier] || tierDetails.standard
  const businessName = name ? decodeURIComponent(name) : 'Your Business'
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(false)
  const [error, setError] = useState('')

  const handlePayment = async () => {
    setError('')
    setLoading(true)

    try {
      // Step 1 — Create order on server
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: tier || 'standard',
          businessName,
          businessId: business,
        }),
      })

      const orderData = await orderRes.json()

      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      // Step 2 — Open Razorpay popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Daleel UAE',
        description: tierInfo.name + ' Listing — ' + businessName,
        order_id: orderData.orderId,
        handler: async function (response) {
          // Step 3 — Verify payment on server
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                businessId: business,
              }),
            })

            const verifyData = await verifyRes.json()

            if (verifyData.success) {
              setPaid(true)
              setLoading(false)
            } else {
              setError('Payment verification failed. Please contact us.')
              setLoading(false)
            }
          } catch (err) {
            setError('Something went wrong. Please contact us on WhatsApp.')
            setLoading(false)
          }
        },
        prefill: {
          name: businessName,
        },
        theme: {
          color: '#0D9488',
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },
      }

      // Load Razorpay script dynamically
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        const rzp = new window.Razorpay(options)
        rzp.open()
      }
      document.body.appendChild(script)

    } catch (err) {
      console.error(err)
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const whatsappMessage = 'Hi, I just registered my business ' + businessName + ' on Daleel UAE (' + tierInfo.name + ' plan - ' + tierInfo.price + '). I need help with payment.'
  const whatsappUrl = 'https://wa.me/971500000000?text=' + encodeURIComponent(whatsappMessage)

  // Success Screen
  if (paid) {
    return (
      <>
        <Head>
          <title>Payment Successful — Daleel UAE</title>
        </Head>
        <Navbar />
        <main>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 max-w-md w-full text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'rgba(13,148,136,0.1)' }}
              >
                <HiCheckCircle className="w-10 h-10" style={{ color: '#0D9488' }} />
              </div>
              <h1 className="text-2xl font-extrabold mb-2" style={{ color: '#0F172A' }}>
                Payment Successful!
              </h1>
              <p className="text-gray-500 mb-2">
                Your payment has been confirmed and your listing is now live on Daleel UAE!
              </p>
              <p className="text-sm text-gray-400 mb-8">
                Your business is now visible to thousands of UAE customers.
              </p>
              <div
                className="rounded-2xl p-4 mb-8 text-left"
                style={{ backgroundColor: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.2)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Business</span>
                  <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>{businessName}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Plan</span>
                  <span className="text-sm font-bold text-white px-3 py-0.5 rounded-full capitalize" style={{ backgroundColor: tierInfo.color }}>{tierInfo.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Amount Paid</span>
                  <span className="text-sm font-bold" style={{ color: tierInfo.color }}>{tierInfo.price}</span>
                </div>
              </div>
              <Link
                href="/"
                className="block w-full py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#0D9488' }}
              >
                Go to Daleel UAE Homepage
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Complete Payment — Daleel UAE</title>
        <meta name="description" content="Complete your payment to activate your Daleel UAE business listing." />
      </Head>
      <Navbar />
      <main>

        {/* HERO */}
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

            {/* Registration Summary */}
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

            {/* Payment Button */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6">
              <h2 className="text-lg font-bold mb-2" style={{ color: '#0F172A' }}>Complete Payment</h2>
              <p className="text-gray-500 text-sm mb-6">
                Secure payment powered by Razorpay. Pay by card, UPI, or net banking.
              </p>

              {/* Security badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { icon: <FaLock className="w-3 h-3" />, label: '256-bit SSL Encrypted' },
                  { icon: <HiShieldCheck className="w-3 h-3" />, label: 'Razorpay Secured' },
                  { icon: <FaCreditCard className="w-3 h-3" />, label: 'All Cards Accepted' },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: 'rgba(13,148,136,0.08)', color: '#0D9488' }}
                  >
                    {badge.icon}
                    {badge.label}
                  </div>
                ))}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#0D9488' }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaCreditCard className="w-5 h-5" />
                    Pay {tierInfo.price} Securely
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                Your payment is processed securely by Razorpay. We never see your card details.
              </p>
            </div>

            {/* What Happens Next */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6">
              <h2 className="text-lg font-bold mb-5" style={{ color: '#0F172A' }}>What Happens Next?</h2>
              <div className="space-y-4">
                {[
                  { title: 'Payment Confirmed', desc: 'Razorpay confirms your payment instantly', icon: <FaCreditCard className="w-4 h-4" />, color: '#0F172A' },
                  { title: 'Listing Activated', desc: 'Your business goes live on Daleel UAE automatically', icon: <HiCheckCircle className="w-4 h-4" />, color: '#0D9488' },
                  { title: 'Customers Find You', desc: 'UAE customers searching your category find your business', icon: <HiArrowRight className="w-4 h-4" />, color: '#16a34a' },
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

            {/* Activation Note */}
            <div className="rounded-2xl p-5 flex items-start gap-3 mb-6" style={{ backgroundColor: 'rgba(13,148,136,0.06)', border: '1.5px solid rgba(13,148,136,0.2)' }}>
              <HiClock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D9488' }} />
              <p className="text-sm leading-relaxed" style={{ color: '#0F172A' }}>
                <strong>Your listing activates instantly</strong> after payment confirmation. No waiting, no manual approval needed.
              </p>
            </div>

            {/* Need Help */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
              <h3 className="text-sm font-bold mb-3" style={{ color: '#0F172A' }}>Need Help With Payment?</h3>
              <p className="text-xs text-gray-400 mb-4">
                If you have any issues with the payment process contact us on WhatsApp and we will help you immediately.
              </p>
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#25D366' }}
              >
                <FaWhatsapp className="w-4 h-4" />
                Get Help on WhatsApp
              </Link>
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
