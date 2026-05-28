import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

// Display only star rating (no interaction)
export function StarDisplay({ rating, size = 'md' }) {
  const sizeClass = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  }[size] || 'w-4 h-4'

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={sizeClass}
          style={{
            color: star <= rating ? '#f59e0b' : '#e5e7eb',
          }}
        />
      ))}
    </div>
  )
}

// Interactive star rating selector
export function StarSelector({ value, onChange }) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110 active:scale-95 p-0.5"
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          <FaStar
            className="w-7 h-7 transition-colors duration-150"
            style={{
              color: star <= (hovered || value) ? '#f59e0b' : '#e5e7eb',
            }}
          />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-sm font-medium text-gray-500">
          {value === 1 && 'Poor'}
          {value === 2 && 'Fair'}
          {value === 3 && 'Good'}
          {value === 4 && 'Very Good'}
          {value === 5 && 'Excellent'}
        </span>
      )}
    </div>
  )
}

// Average rating summary display
export function RatingSummary({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <StarDisplay rating={0} size="md" />
        <span className="text-sm text-gray-500">No reviews yet</span>
      </div>
    )
  }

  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  const rounded = Math.round(average * 10) / 10

  return (
    <div className="flex items-center gap-3">
      <span
        className="text-3xl font-bold"
        style={{ color: '#0F172A' }}
      >
        {rounded}
      </span>
      <div>
        <StarDisplay rating={Math.round(average)} size="md" />
        <p className="text-xs text-gray-500 mt-0.5">
          {reviews.length} review{reviews.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}

// Default export for simple use
export default function StarRating({ rating, onChange, interactive = false, size = 'md' }) {
  if (interactive) {
    return <StarSelector value={rating} onChange={onChange} />
  }
  return <StarDisplay rating={rating} size={size} />
}
