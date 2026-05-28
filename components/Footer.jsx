import Link from 'next/link'
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

export default function Footer() {
  const emirates = [
    { name: 'Dubai', slug: 'dubai' },
    { name: 'Abu Dhabi', slug: 'abu-dhabi' },
    { name: 'Sharjah', slug: 'sharjah' },
    { name: 'Ajman', slug: 'ajman' },
    { name: 'Ras Al Khaimah', slug: 'ras-al-khaimah' },
    { name: 'Fujairah', slug: 'fujairah' },
    { name: 'Umm Al Quwain', slug: 'umm-al-quwain' },
  ]

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Register Your Business', href: '/register' },
  ]

  return (
    <footer style={{ backgroundColor: '#0F172A' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: '#0D9488' }}
              >
                <span className="text-white font-bold text-xl leading-none">D</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Daleel <span style={{ color: '#0D9488' }}>UAE</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mt-3">
              UAE&apos;s most trusted directory connecting customers with verified local businesses across all 7 emirates.
            </p>
            <div className="flex items-center gap-4 mt-6">
              
                href="https://instagram.com/daleeluae"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-600 transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              
                href="https://facebook.com/daleeluae"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-600 transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              
                href="https://tiktok.com/@daleeluae"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-600 transition-colors duration-200"
                aria-label="TikTok"
              >
                <FaTiktok className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-teal-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#0D9488' }}
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Emirates */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Emirates
            </h3>
            <ul className="space-y-3">
              {emirates.map((emirate) => (
                <li key={emirate.slug}>
                  <Link
                    href={`/emirate/${emirate.slug}`}
                    className="text-gray-400 text-sm hover:text-teal-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#0D9488' }}
                    />
                    {emirate.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                
                  href="mailto:contact.daleeluae@gmail.com"
                  className="flex items-center gap-3 text-gray-400 text-sm hover:text-teal-400 transition-colors duration-200"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(13,148,136,0.15)' }}
                  >
                    <HiMail className="w-4 h-4" style={{ color: '#0D9488' }} />
                  </div>
                  contact.daleeluae@gmail.com
                </a>
              </li>
              <li>
                
                  href="https://wa.me/971500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 text-sm hover:text-teal-400 transition-colors duration-200"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(13,148,136,0.15)' }}
                  >
                    <FaWhatsapp className="w-4 h-4" style={{ color: '#0D9488' }} />
                  </div>
                  WhatsApp Us
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <Link
                href="/register"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#0D9488' }}
              >
                List Your Business
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-sm">
              © 2025 Daleel UAE. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-gray-500 text-sm hover:text-teal-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 text-sm hover:text-teal-400 transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
