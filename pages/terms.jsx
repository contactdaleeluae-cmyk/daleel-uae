import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms and Conditions — Daleel UAE</title>
        <meta name="description" content="Terms and Conditions for Daleel UAE — UAE's most trusted business directory." />
      </Head>
      <Navbar />
      <main>
        <section className="relative py-16 sm:py-20 overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
          <div className="absolute inset-0 hero-overlay opacity-30" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Terms and Conditions</h1>
            <p className="text-gray-300">Last updated: June 2025</p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12 space-y-8">

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>1. Acceptance of Terms</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  By accessing or using Daleel UAE at daleeluae.net you agree to be bound by these Terms and Conditions. If you do not agree to these terms please do not use our website or services. These terms apply to all visitors, users, and businesses who register on Daleel UAE.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>2. About Daleel UAE</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Daleel UAE is an online business directory connecting customers with local businesses across the United Arab Emirates. We provide a platform for businesses to create listings and for customers to discover and contact those businesses. Daleel UAE does not endorse, guarantee, or take responsibility for the quality of services provided by listed businesses.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>3. Business Listings</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">By registering a business on Daleel UAE you agree that:</p>
                <ul className="space-y-2 text-sm text-gray-500">
                  {[
                    'All information provided is accurate, truthful, and up to date',
                    'You have the legal right to operate the business you are listing',
                    'You will not list businesses involved in illegal activities',
                    'You will not provide misleading or fraudulent information',
                    'Your listing may be removed at any time if it violates these terms',
                    'Daleel UAE reserves the right to edit listings for clarity and formatting',
                    'Listings are subject to review and approval before going live',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#0D9488' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>4. Listing Fees and Payments</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">The following terms apply to all listing fee payments:</p>
                <ul className="space-y-2 text-sm text-gray-500">
                  {[
                    'Listing fees are as displayed on our Register page at the time of registration',
                    'Standard and Premium listings are billed annually',
                    'Sponsored listings are billed monthly',
                    'Payment must be completed before a listing goes live',
                    'Listings will be activated within 2 hours of payment confirmation during business hours',
                    'All fees are in UAE Dirhams (AED) unless otherwise stated',
                    'Daleel UAE reserves the right to change pricing with reasonable notice',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#0D9488' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>5. Refund Policy</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Due to the nature of digital directory services, listing fees are generally non-refundable once a listing has been activated. If you believe there has been an error in your payment or listing please contact us within 7 days at contact.daleeluae@gmail.com and we will review your case. Refunds may be considered at our sole discretion in exceptional circumstances.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>6. Customer Reviews</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">By submitting a review on Daleel UAE you agree that:</p>
                <ul className="space-y-2 text-sm text-gray-500">
                  {[
                    'Your review is based on a genuine experience with the business',
                    'Your review does not contain false, defamatory, or misleading information',
                    'Your review does not contain offensive, abusive, or inappropriate content',
                    'You grant Daleel UAE the right to display your review on the platform',
                    'Daleel UAE reserves the right to remove reviews that violate these terms',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#0D9488' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>7. Prohibited Content</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">You may not use Daleel UAE to list or promote:</p>
                <ul className="space-y-2 text-sm text-gray-500">
                  {[
                    'Illegal products or services',
                    'Adult or sexually explicit content',
                    'Businesses involved in fraud or deception',
                    'Counterfeit or fake goods',
                    'Content that infringes on intellectual property rights',
                    'Hate speech or discriminatory content',
                    'Spam or unsolicited commercial messages',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#0D9488' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>8. Intellectual Property</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  The Daleel UAE name, logo, website design, and content are the intellectual property of Daleel UAE. You may not reproduce, distribute, or use our branding without prior written permission. By uploading images and content to your business listing you confirm that you own or have the right to use that content and you grant Daleel UAE a licence to display it on our platform.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>9. Limitation of Liability</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Daleel UAE is a directory platform and does not guarantee the quality, safety, or legality of any listed business or their services. We are not liable for any transactions, disputes, or damages arising from interactions between customers and listed businesses. Our total liability to you for any claims arising from use of our platform shall not exceed the amount you paid for your listing in the preceding 12 months.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>10. Termination</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Daleel UAE reserves the right to suspend or terminate any listing or account at any time without notice if we believe there has been a violation of these Terms and Conditions. You may request removal of your listing at any time by contacting us at contact.daleeluae@gmail.com.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>11. Governing Law</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  These Terms and Conditions are governed by the laws of the United Arab Emirates. Any disputes arising from use of Daleel UAE shall be subject to the exclusive jurisdiction of the courts of the UAE.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>12. Changes to Terms</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page with an updated date. Your continued use of Daleel UAE after any changes constitutes your acceptance of the new terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>13. Contact Us</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  If you have any questions about these Terms and Conditions please contact us at:
                </p>
                <div className="mt-3 p-4 rounded-xl" style={{ backgroundColor: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.2)' }}>
                  <p className="text-sm font-medium" style={{ color: '#0F172A' }}>Daleel UAE</p>
                  <p className="text-sm text-gray-500">Email: contact.daleeluae@gmail.com</p>
                  <p className="text-sm text-gray-500">Website: daleeluae.net</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
