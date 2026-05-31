import Link from 'next/link'
import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import { HiLocationMarker, HiTag } from 'react-icons/hi'

function ContactButton({ href, style, title, children }) {
  return (
    <Link
      href={href}
      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-95"
      style={style}
      title={title}
    >
      {children}
    </Link>
  )
}

export default function BusinessCard({ business }) {
  const {
    slug,
    name,
    logo_url,
    category,
    area,
    emirate,
    key_services,
    mobile,
    whatsapp,
    email,
    tier,
  } = business

  const isSponsored = tier === 'sponsored'
  const isPremium = tier === 'premium'

  const cardClass = isSponsored
    ? 'business-card sponsored-card bg-white rounded-2xl overflow-hidden border-2 border-teal-500'
    : isPremium
    ? 'business-card premium-card bg-white rounded-2xl overflow-hidden border-2 border-amber-400'
    : 'business-card bg-white rounded-2xl overflow-hidden border border-gray-100'

  return (
    <div className={cardClass}>
      {(isSponsored || isPremium) && (
        <div
          className="px-4 py-1.5 flex items-center gap-2"
          style={{ backgroundColor: isSponsored ? '#0D9488' : '#d97706' }}
        >
          <span className="text-white text-xs font-bold uppercase tracking-wider">
            {isSponsored ? '⭐ Sponsored' : '🥇 Premium'}
          </span>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            {logo_url ? (
              <img
                src={logo_url}
                alt={name + ' logo'}
                className="w-14 h-14 rounded-xl object-cover border border-gray-100 shadow-sm"
              />
            ) : (
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm"
                style={{ backgroundColor: '#0D9488' }}
              >
                {name?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <Link href={'/business/' + slug}>
              <h3
                className="font-bold text-base leading-tight hover:text-teal-600 transition-colors cursor-pointer truncate"
                style={{ color: '#0F172A' }}
              >
                {name}
              </h3>
            </Link>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {category && (
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: '#0D9488' }}
                >
                  <HiTag className="w-3 h-3" />
                  {category}
                </span>
              )}
              {area && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  <HiLocationMarker className="w-3 h-3" />
                  {area}, {emirate}
                </span>
              )}
            </div>
          </div>
        </div>

        {key_services && key_services.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {key_services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="px-2.5 py-1 rounded-lg text-xs font-medium border"
                style={{
                  color: '#0D9488',
                  borderColor: 'rgba(13,148,136,0.3)',
                  backgroundColor: 'rgba(13,148,136,0.05)',
                }}
              >
                {service}
              </span>
            ))}
          </div>
        )}

        <div className="border-t border-gray-100 my-3" />

        <div className="flex items-center gap-2">
          {mobile && (
            <ContactButton
              href={'tel:' + mobile}
              style={{ backgroundColor: '#0D9488' }}
              title="Call"
            >
              <FaPhone className="w-3 h-3" />
              Call
            </ContactButton>
          )}
          {whatsapp && (
            <ContactButton
              href={'https://wa.me/' + whatsapp}
              style={{ backgroundColor: '#25D366' }}
              title="WhatsApp"
            >
              <FaWhatsapp className="w-3 h-3" />
              WhatsApp
            </ContactButton>
          )}
          {email && (
            <ContactButton
              href={'mailto:' + email}
              style={{ backgroundColor: '#0F172A' }}
              title="Email"
            >
              <FaEnvelope className="w-3 h-3" />
              Email
            </ContactButton>
          )}
        </div>

        <Link
          href={'/business/' + slug}
          className="mt-3 block text-center text-xs font-medium transition-colors hover:underline"
          style={{ color: '#0D9488' }}
        >
          View Full Profile →
        </Link>
      </div>
    </div>
  )
}
