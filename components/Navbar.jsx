import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { HiMenu, HiX } from 'react-icons/hi'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href) => router.pathname === href

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg leading-none">D</span>
            </div>
            <span className="text-navy-900 font-bold text-xl tracking-tight" style={{ color: '#0F172A' }}>
              Daleel <span style={{ color: '#0D9488' }}>UAE</span>
            </span>
          </Link>

          {/* Center Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-teal-600 ${
                  isActive(link.href)
                    ? 'text-teal-600 border-b-2 border-teal-600 pb-0.5'
                    : 'text-gray-600'
                }`}
                style={isActive(link.href) ? { color: '#0D9488' } : {}}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href="/register"
              className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
              style={{ backgroundColor: '#0D9488' }}
            >
              Register Your Business
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                style={
                  isActive(link.href)
                    ? { backgroundColor: '#0D9488', color: 'white' }
                    : {}
                }
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className="pt-2 pb-1">
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#0D9488' }}
              >
                Register Your Business
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
