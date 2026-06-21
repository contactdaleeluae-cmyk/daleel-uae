import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { HiCheckCircle, HiClock } from 'react-icons/hi'
import { FaWhatsapp, FaPaypal } from 'react-icons/fa'

const tierDetails = {
  standard: { name: 'Standard', price: 'AED 499', usdAmount: '135.90', period: 'per year', color: '#64748b' },
  premium: { name: 'Premium', price: 'AED 999', usdAmount: '272.00', period: 'per year', color: '#0D9488' },
  sponsored: { name: 'Sponsored', price: 'AED 1,499', usdAmount: '408.00', period: 'per month', color: '#d97706' },
}

export default function Payment() {
  const router = useRouter()
  const { tier, name, business } = router.query
  const tierInfo = tierDetails[tier] || tierDetails.standard
  const businessName = name ? decodeURIComponent(name) : 'Your Business'
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const whatsappMessage = 'Hi, I just registered my business ' + businessName + ' on Daleel UAE (' + tierInfo.name + ' plan - ' + tierInfo.price + '). I would like to complete my payment.'
  const whatsappUrl = 'https://wa.me/971500000000?text=' + encodeURIComponent(whatsappMessage)

  const handlePayPalClick = async () => {
    setError('')
    setLoading(true)

    try {
      const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

      if (!clientId) {
        setError('PayPal is not configured. Please use WhatsApp payment below.')
        setLoading(false)
        return
      }

      // Check if PayPal SDK already loaded
      if (window.paypal) {
        renderPayPalButtons()
        setLoading(false)
        return
      }

      // Load PayPal SDK
      const script = document.createElement('script')
      script.src = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&currency=USD&intent=capture'
      script.async = true
      script.onload = () => {
        setLoading(false)
        renderPayPalButtons()
      }
      script.onerror = () => {
        setError('Failed to load PayPal. Please use WhatsApp payment below.')
        setLoading(false)
      }
      document.body.appendChild(script)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please use WhatsApp payment below.')
      setLoading(false)
    }
  }

  const renderPayPalButtons = () => {
    const container = document.getElementById('paypal-button-container')
    if (!container) return
    if (!window.paypal) return
    container.innerHTML = ''

    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'pay',
        height: 50,
      },
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: tierInfo.usdAmount,
              currency_code: 'USD',
            },
            description: 'Daleel UAE ' + tierInfo.name + ' Listing — ' + businessName,
          }],
          application_context: {
            brand_name: 'Daleel UAE',
            shipping_preference: 'NO_SHIPPING',
          },
        })
      },
      onApprove: async function(data, actions) {
        setLoading(true)
        try {
          const order = await actions.order.capture()
          console.log('Payment completed:', order)
          if (order.status === 'COMPLETED') {
            if (business) {
              try {
                const { createClient } = await import('@supabase/supabase-js')
                const supabase = createClient(
                  process.env.NEXT_PUBLIC_SUPABASE_URL,
                  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                )
                await supabase
                  .from('businesses')
                  .update({ active: true, payment_id: order.id })
                  .eq('id', business)
              } catch (dbErr) {
                console.error('DB update error:', dbErr)
              }
            }
            setPaid(true)
          }
        } catch (err) {
          console.error('Capture error:', err)
          setError('Payment capture failed. Please contact us on WhatsApp.')
        } finally {
          setLoading(false)
        }
      },
      onError: function(err) {
        console.error('PayPal button error:', err)
        setError('PayPal error: ' + (err.message || 'Unknown error. Please try WhatsApp payment below.'))
        setLoading(false)
      },
      onCancel: function() {
        setError('Payment cancelled. You can try again or use WhatsApp payment below.')
        setLoading(false)
      },
    }).render('#paypal-button-container').catch(function(err) {
      console.error('Render error:', err)
      setError('Could not load PayPal buttons. Please use WhatsApp payment below.')
      setLoading(false)
    })
  }

  // Success Screen
  if (paid) {
    return (
      <>
        <Head><title>Payment Successful — Daleel UAE</title></Head>
        <Navbar />
        <main>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 max-w-md w-full text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(13,148,136,0.1)' }}>
                <HiCheckCircle className="w-10 h-10" style={{ color: '#0D9488' }} />
              </div>
              <h1 className="text-2xl font-extrabold mb-2" style={{ color: '#0F172A' }}>Payment Successful!</h1>
              <p className="text-gray-500 mb-2">Your payment has been confirmed. Your listing will be activated within 2 hours after our team reviews it.</p>
              <p className="text-sm text-gray-400 mb-8">You will receive a confirmation email shortly.</p>
              <div className="rounded-2xl p-4 mb-8 text-left" style={{ backgroundColor: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.2)' }}>
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
              <Link href="/" className="block w-full py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#0D9488' }}>
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

        <section className="relative py-16 sm:py-20 overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
          <div className="absolute inset-0 hero-overlay opacity-30" />
          <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: '#0D9488' }} />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: 'rgba(13,148,136,0.2)' }}>
              <HiCheckCircle className="w-8 h-8" style={{ color: '#0D9488' }} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">Registration Received!</h1>
            <p className="text-gray-300 text-lg">Complete your payment below to activate your listing</p>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">

            {/* Summary */}
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
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Amount (AED)</span>
                  <span className="text-xl font-extrabold" style={{ color: tierInfo.color }}>{tierInfo.price}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-500">Amount (USD)</span>
                  <span className="text-sm font-semibold text-gray-400">USD {tierInfo.usdAmount}</span>
                </div>
              </div>
              <div className="mt-3 p-3 rounded-xl text-xs text-gray-400" style={{ backgroundColor: '#f8fafc' }}>
                💡 Payment is processed in USD. The AED amount shown is approximate based on current exchange rates.
              </div>
            </div>

            {/* PayPal Section */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6">
              <h2 className="text-lg font-bold mb-2" style={{ color: '#0F172A' }}>Complete Payment</h2>
              <p className="text-gray-500 text-sm mb-6">Pay securely with PayPal. Use your PayPal account or any debit or credit card.</p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* PayPal Button Container */}
              <div id="paypal-button-container" className="mb-4" />

              {/* Show Pay with PayPal button if not loaded yet */}
              {!window?.paypal && !loading && (
                <button
                  onClick={handlePayPalClick}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-white text-base transition-all hover:opacity-90"
                  style={{ backgroundColor: '#0070ba' }}
                >
                  <FaPaypal className="w-5 h-5" />
                  Pay with PayPal
                </button>
              )}

              {loading && (
                <div className="text-center py-4">
                  <div className="animate-spin w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Loading PayPal...</p>
                </div>
              )}

              <p className="text-center text-xs text-gray-400 mt-3">
                Secured by PayPal. We never see your card or bank details.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* WhatsApp Alternative */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
              <h3 className="text-sm font-bold mb-2" style={{ color: '#0F172A' }}>Prefer to Pay via WhatsApp?</h3>
              <p className="text-xs text-gray-400 mb-4">Contact us on WhatsApp and we will send you bank transfer details directly.</p>
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#25D366' }}
              >
                <FaWhatsapp className="w-4 h-4" />
                Pay via WhatsApp
              </Link>
            </div>

            {/* Activation Note */}
            <div className="rounded-2xl p-5 flex items-start gap-3 mb-6" style={{ backgroundColor: 'rgba(13,148,136,0.06)', border: '1.5px solid rgba(13,148,136,0.2)' }}>
              <HiClock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D9488' }} />
              <p className="text-sm leading-relaxed" style={{ color: '#0F172A' }}>
                <strong>Your listing will be activated within 2 hours</strong> of payment confirmation during business hours (9am to 9pm UAE time).
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
