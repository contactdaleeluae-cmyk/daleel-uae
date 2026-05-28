import { useState } from 'react'
import { submitReview } from '@/lib/supabaseClient'
import { StarSelector } from '@/components/StarRating'
import { FaCheckCircle } from 'react-icons/fa'

export default function ReviewForm({ businessId, onReviewSubmitted }) {
  const [form, setForm] = useState({
    reviewer_name: '',
    rating: 0,
    comment: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRating = (rating) => {
    setForm({ ...form, rating })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!form.reviewer_name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (form.rating === 0) {
      setError('Please select a star rating.')
      return
    }
    if (!form.comment.trim()) {
      setError('Please write a comment.')
      return
    }

    setLoading(true)
    try {
      await submitReview({
        business_id: businessId,
        reviewer_name: form.reviewer_name.trim(),
        rating: form.rating,
        comment: form.comment.trim(),
      })
      setSuccess(true)
      setForm({ reviewer_name: '', rating: 0, comment: '' })
      if (onReviewSubmitted) onReviewSubmitted()
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <FaCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-green-800 mb-1">
          Thank you for your review!
        </h3>
        <p className="text-green-600 text-sm">
          Your review has been submitted successfully.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-sm font-medium underline text-green-700 hover:text-green-900"
        >
          Write another review
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
      <h3
        className="text-lg font-bold mb-5"
        style={{ color: '#0F172A' }}
      >
        Leave a Review
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="reviewer_name"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="reviewer_name"
            name="reviewer_name"
            type="text"
            value={form.reviewer_name}
            onChange={handleChange}
            placeholder="e.g. Ahmed Al Mansoori"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm transition-all"
            style={{ color: '#0F172A' }}
          />
        </div>

        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Your Rating <span className="text-red-500">*</span>
          </label>
          <StarSelector value={form.rating} onChange={handleRating} />
        </div>

        {/* Comment */}
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Your Review <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder="Share your experience with this business..."
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm resize-none transition-all"
            style={{ color: '#0F172A' }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#0D9488' }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit Review'
          )}
        </button>
      </form>
    </div>
  )
}
