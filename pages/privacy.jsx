import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Daleel UAE</title>
        <meta name="description" content="Privacy Policy for Daleel UAE — UAE's most trusted business directory." />
      </Head>
      <Navbar />
      <main>
        <section className="relative py-16 sm:py-20 overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
          <div className="absolute inset-0 hero-overlay opacity-30" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-300">Last updated: June 2025</p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12 space-y-8">

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>1. Introduction</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Welcome to Daleel UAE. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at daleeluae.net or use our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>2. Information We Collect</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">We collect information that you provide directly to us, including:</p>
                <ul className="space-y-2 text-sm text-gray-500">
                  {[
                    'Business name, description, and contact details when you register a business listing',
                    'Name and email address when you submit a contact form',
                    'Name, star rating, and comment when you submit a review',
                    'Logo and cover photo images uploaded during business registration',
                    'Payment information for processing listing fees',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#0D9488' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>3. How We Use Your Information</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">We use the information we collect to:</p>
                <ul className="space-y-2 text-sm text-gray-500">
                  {[
                    'Create and display your business listing on Daleel UAE',
                    'Process your listing fee payments',
                    'Respond to your enquiries and contact form submissions',
                    'Display customer reviews on business profiles',
                    'Improve and maintain our website and services',
                    'Send you important updates about your listing',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#0D9488' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>4. Information Sharing</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. Business listing information including business name, description, services, and contact details is displayed publicly on Daleel UAE as part of the directory service. We may share information with trusted service providers who assist us in operating our website, subject to confidentiality agreements.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>5. Data Storage and Security</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Your data is stored securely using Supabase, a trusted cloud database provider. We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>6. Cookies</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Daleel UAE uses essential cookies to ensure the website functions correctly. We do not use tracking cookies or advertising cookies. By using our website you consent to our use of essential cookies.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>7. Your Rights</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">You have the right to:</p>
                <ul className="space-y-2 text-sm text-gray-500">
                  {[
                    'Request access to the personal data we hold about you',
                    'Request correction of any inaccurate personal data',
                    'Request deletion of your personal data',
                    'Request removal of your business listing at any time',
                    'Withdraw consent for us to process your data',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#0D9488' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>8. Third Party Links</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Our website may contain links to third party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review the privacy policies of any third party sites you visit.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>9. Children</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Daleel UAE is not directed at children under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child please contact us immediately.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>10. Changes to This Policy</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page with an updated date. Your continued use of our website after any changes constitutes your acceptance of the new policy.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>11. Contact Us</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  If you have any questions about this Privacy Policy or how we handle your data please contact us at:
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
