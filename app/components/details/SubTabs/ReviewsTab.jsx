'use client'

import React, { useEffect, useState } from 'react'
import { StarIcon, PencilIcon, Trash2Icon } from 'lucide-react'

const PAGE_SIZE = 5

export default function ReviewsTab({ product }) {
  const [reviews, setReviews] = useState([])
  const [total, setTotal] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [totalRatings, setTotalRatings] = useState(0)
  const [hasPurchased, setHasPurchased] = useState(false)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formRating, setFormRating] = useState(5)
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState(null)

  const productId = product?.id

  const fetchReviews = async (pageNum = 1, append = false) => {
    if (!productId) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/reviews?productId=${productId}&page=${pageNum}&limit=${PAGE_SIZE}`
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load reviews')
      setAverageRating(data.averageRating ?? 0)
      setTotalRatings(data.totalRatings ?? 0)
      setTotal(data.total ?? 0)
      setHasPurchased(data.hasPurchased ?? false)
      setReviews((prev) => (append ? [...prev, ...(data.reviews || [])] : (data.reviews || [])))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews(1, false)
  }, [productId])

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchReviews(nextPage, true)
  }

  const openEdit = (review) => {
    setEditingId(review.id)
    setFormRating(review.rating)
    setFormTitle(review.title || '')
    setFormContent(review.content || '')
    setShowForm(true)
  }

  const openNew = () => {
    setEditingId(null)
    setFormRating(5)
    setFormTitle('')
    setFormContent('')
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
  }

  const submitReview = async () => {
    setSubmitLoading(true)
    setError(null)
    try {
      const url = editingId ? `/api/reviews/${editingId}` : '/api/reviews'
      const method = editingId ? 'PATCH' : 'POST'
      const body = editingId
        ? { rating: formRating, title: formTitle, content: formContent }
        : { productId, rating: formRating, title: formTitle, content: formContent }
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save review')
      closeForm()
      fetchReviews(1, false)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitLoading(false)
    }
  }

  const deleteReview = async (id) => {
    if (!confirm('Delete this review?')) return
    setSubmitLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete')
      }
      closeForm()
      fetchReviews(1, false)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitLoading(false)
    }
  }

  if (!product) return null

  const hasMore = reviews.length < total

  return (
    <div className="tab-content" role="tabpanel" aria-labelledby="tab-reviews">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Customer Reviews</h2>
        {hasPurchased && (
          <button
            type="button"
            onClick={openNew}
            className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-4 py-2 rounded-md text-sm font-medium border border-amazon-secondary"
          >
            Write a Review
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-600 text-sm mb-4">{error}</p>
      )}

      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex text-amazon-secondary">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon
                key={i}
                className={`w-5 h-5 ${i <= Math.round(averageRating) ? 'fill-current' : ''}`}
              />
            ))}
          </div>
          <span className="text-lg font-bold">
            {averageRating > 0 ? `${averageRating} out of 5` : 'No ratings yet'}
          </span>
        </div>
        <span className="text-sm text-gray-600">
          {totalRatings} global rating{totalRatings !== 1 ? 's' : ''}
        </span>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded bg-gray-50">
          <h3 className="font-bold mb-3">{editingId ? 'Edit Review' : 'Write a Review'}</h3>
          <div className="space-y-2 mb-3">
            <label className="block text-sm font-medium">Rating</label>
            <select
              value={formRating}
              onChange={(e) => setFormRating(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2 mb-3">
            <label className="block text-sm font-medium">Title (optional)</label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              placeholder="Summary headline"
            />
          </div>
          <div className="space-y-2 mb-3">
            <label className="block text-sm font-medium">Review (optional)</label>
            <textarea
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              rows={3}
              placeholder="Your review"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={submitReview}
              disabled={submitLoading}
              className="bg-amazon-secondary text-white px-4 py-2 rounded text-sm disabled:opacity-50"
            >
              {submitLoading ? 'Saving...' : (editingId ? 'Update' : 'Submit')}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => deleteReview(editingId)}
                disabled={submitLoading}
                className="bg-red-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={closeForm}
              className="border px-4 py-2 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6" id="reviewList">
        {loading && reviews.length === 0 ? (
          <p className="text-gray-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold">
                    {review.userInitials || 'U'}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{review.userName || 'User'}</p>
                    <div className="flex text-amazon-secondary">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <StarIcon
                          key={i}
                          className={`w-3 h-3 ${i <= review.rating ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {review.isOwn && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(review)}
                      className="text-amazon-blue hover:underline text-xs flex items-center gap-1"
                    >
                      <PencilIcon className="w-3 h-3" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteReview(review.id)}
                      className="text-red-600 hover:underline text-xs flex items-center gap-1"
                    >
                      <Trash2Icon className="w-3 h-3" /> Delete
                    </button>
                  </div>
                )}
              </div>
              {review.title && (
                <h4 className="font-bold text-sm mb-1">{review.title}</h4>
              )}
              <p className="text-xs text-gray-500 mb-2">
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString('en-BD', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </p>
              <p className="text-sm">{review.content || 'No content.'}</p>
            </div>
          ))
        )}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={loadMore}
          disabled={loading}
          className="mt-6 px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          Load More Reviews
        </button>
      )}
    </div>
  )
}
