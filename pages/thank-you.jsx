import Head from 'next/head'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { HiCheckCircle } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Payment Received — Daleel UAE</title>
        <meta name="description" content="Thank you for your payment. Your Daleel UAE listing will be activated shortly." />
      </Head>
      <Navbar />
      <main>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 max-w-lg w-full text-center">

            {/* Success Icon */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: 'rgba(13,148,136,0.1)' }}
            >
              <HiCheckCircle className="w-10 h-10" style={{ color: '#0D9488' }} />
            </div>

            <h1 className="text-2xl font-extrabold mb-2" style={{ color: '#0F172A' }}>
              Thank You for Your Payment!
            </h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We have received your payment. Our team will review your listing and activate it within 2 hours during business hours (9am to 9pm UAE time).
            </p>

            {/* What Happens Next */}
            <div
              className="rounded-2xl p-6 mb-8 text-left"
              style={{
                backgroundColor: 'rgba(13,148,136,0.05)',
                border: '1px solid rgba(13,148,136,0.2)',
              }}
            >
              <h3 className="font-bold text-sm mb-4" style={{ color: '#0F172A' }}>
                What happens next:
              </h3>
              <div className="space-y-3">
                {[
                  'Our team reviews your business listing',
                  'Your listing goes live on Daleel UAE',
                  'You receive a confirmation email',
                  'Customers start finding your business',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-xs font-bold"
                      style={{ backgroundColor: '#0D9488' }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-sm text-gray-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Send Confirmation */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-3">
                Speed up activation by sending your payment screenshot:
              </p>
              <Link
                href="https://wa.me/971500000000?text=Hi, I just completed my payment for my Daleel UAE listing. Here is my payment confirmation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#25D366' }}
              >
                <FaWhatsapp className="w-4 h-4" />
                Send Payment Screenshot on WhatsApp
              </Link>
            </div>

            {/* Back Home */}
            <Link
              href="/"
              className="block w-full py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#0D9488' }}
            >
              Go to Daleel UAE Homepage
            </Link>

            <p className="text-xs text-gray-400 mt-4">
              Questions? Email us at contact.daleeluae@gmail.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

