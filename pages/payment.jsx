import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { HiCheckCircle, HiClock, HiShieldCheck } from 'react-icons/hi'
import { FaWhatsapp, FaPaypal, FaLock } from 'react-icons/fa'

const tierDetails = {
  standard: {
    name: 'Standard',
    price: 'AED 499',
    usdAmount: '$135.90',
    period: 'per year',
    color: '#64748b',
    paypalLink: 'https://www.paypal.com/ncp/payment/9DMJZN6JJV352',
  },
  premium: {
    name: 'Premium',
    price: 'AED 999',
    usdAmount: '$272.00',
    period: 'per year',
    color: '#0D9488',
    paypalLink: 'https://www.paypal.com/ncp/payment/WZDSLE83SF378',
  },
  sponsored: {
    name: 'Sponsored',
    price: 'AED 1,499',
    usdAmount: '$408.00',
    period: 'per month',
    color: '#d97706',
    paypalLink: 'https://www.paypal.com/ncp/payment/2CR83H245M5BU',
  },
}

export default function Payment() {
  const router = useRouter()
  const { tier, name, business } = router.query
  const tierInfo = tierDetails[tier] || tierDetails.standard
  const businessName = name ? decodeURIComponent(name) : 'Your Business'
  const whatsappMessage = 'Hi, I just registered my business ' + businessName + ' on Daleel UAE (' + tierInfo.name + ' plan - ' + tierInfo.price + '). I would like to complete my payment.'
  const whatsappUrl = 'https://wa.me/971500000000?text=' + encodeURIComponent(whatsappMessage)

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
            <p className="text-gray-300 text-lg">
              One last step — complete your payment to go live
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">

            {/* Summary Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6">
              <h2 className="text-lg font-bold mb-5" style={{ color: '#0F172A' }}>
                Registration Summary
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Business Name</span>
                  <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>{businessName}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Plan Selected</span>
                  <span className="text-sm font-bold capitalize px-3 py-0.5 rounded-full text-white" style={{ backgroundColor: tierInfo.color }}>
                    {tierInfo.name}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Billing Period</span>
                  <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>{tierInfo.period}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Amount (AED)</span>
                  <span className="text-2xl font-extrabold" style={{ color: tierInfo.color }}>{tierInfo.price}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-500">Amount (USD)</span>
                  <span className="text-sm font-medium text-gray-400">{tierInfo.usdAmount}</span>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-xl text-xs text-gray-400" style={{ backgroundColor: '#f8fafc' }}>
                💡 Payment is processed in USD via PayPal. The AED amount is approximate based on current exchange rates.
              </div>
            </div>

            {/* Payment Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6">
              <h2 className="text-lg font-bold mb-2" style={{ color: '#0F172A' }}>
                Complete Your Payment
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Click the button below to pay securely via PayPal. You can pay with your PayPal account or any debit or credit card — no PayPal account required.
              </p>

              {/* Security Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { icon: <FaLock className="w-3 h-3" />, label: 'SSL Encrypted' },
                  { icon: <HiShieldCheck className="w-3 h-3" />, label: 'PayPal Secured' },
                  { icon: <FaPaypal className="w-3 h-3" />, label: 'No Account Needed' },
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

              {/* PayPal Pay Button */}
              <Link
                href={tierInfo.paypalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 active:scale-95 mb-3"
                style={{ backgroundColor: '#0070ba' }}
              >
                <FaPaypal className="w-5 h-5" />
                Pay {tierInfo.price} via PayPal
              </Link>

              <p className="text-center text-xs text-gray-400">
                You will be redirected to PayPal secure payment page. After payment return to this page.
              </p>
            </div>

            {/* After Payment Instructions */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6">
              <h2 className="text-lg font-bold mb-5" style={{ color: '#0F172A' }}>
                After You Pay
              </h2>
              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Complete PayPal Payment',
                    desc: 'Pay via PayPal using your account or card',
                    color: '#0070ba',
                  },
                  {
                    step: '2',
                    title: 'Send Us Confirmation',
                    desc: 'Send your PayPal payment screenshot on WhatsApp',
                    color: '#0D9488',
                  },
                  {
                    step: '3',
                    title: 'Go Live Within 2 Hours',
                    desc: 'We review and activate your listing same day',
                    color: '#16a34a',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.step}
                    </div>
                    <div className="pt-1">
                      <div className="text-sm font-bold" style={{ color: '#0F172A' }}>{item.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Send Confirmation WhatsApp Button */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3">
                  After completing payment on PayPal, send us your confirmation:
                </p>
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <FaWhatsapp className="w-4 h-4" />
                  Send Payment Confirmation on WhatsApp
                </Link>
              </div>
            </div>

            {/* Activation Note */}
            <div
              className="rounded-2xl p-5 flex items-start gap-3 mb-8"
              style={{
                backgroundColor: 'rgba(13,148,136,0.06)',
                border: '1.5px solid rgba(13,148,136,0.2)',
              }}
            >
              <HiClock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0D9488' }} />
              <p className="text-sm leading-relaxed" style={{ color: '#0F172A' }}>
                <strong>Your listing will be activated within 2 hours</strong> of payment confirmation during business hours (9am to 9pm UAE time). Payments received after hours will be activated the next morning.
              </p>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
                style={{ color: '#0D9488' }}
              >
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
