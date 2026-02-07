import React from 'react'
import { reviewsTabData } from '@/app/data'
import { StarIcon } from 'lucide-react'
export default function ReviewsTab() {
  return (
    <div
      className="tab-content"
      role="tabpanel"
      aria-labelledby="tab-reviews"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {reviewsTabData.title}
        </h2>
        <button
          onClick={() =>
            (window.location.href = 'ReviewModal.html')
          }
          className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-4 py-2 rounded-md text-sm font-medium border border-amazon-secondary"
        >
          Write a Review
        </button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex text-amazon-secondary">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className="w-5 h-5 fill-current"
              />
            ))}
          </div>
          <span className="text-lg font-bold">
            {reviewsTabData.summary.rating}
          </span>
        </div>
        <span className="text-sm text-gray-600">
          {reviewsTabData.summary.total}
        </span>
      </div>

      {/* Review List */}
      <div className="space-y-6" id="reviewList">
        {reviewsTabData.reviews.map((review) => (
          <div
            key={review.name}
            className={`border-b border-gray-200 pb-6 ${
              review.hidden ? 'hidden review-item' : ''
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold">
                {review.initials}
              </div>
              <div>
                <p className="font-bold text-sm">{review.name}</p>
                <div className="flex text-amazon-secondary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-3 h-3 ${
                        i < review.rating ? 'fill-current' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <h4 className="font-bold text-sm mb-1">
              {review.title}
            </h4>
            <p className="text-xs text-gray-500 mb-2">
              {review.date}
            </p>
            <p className="text-sm">{review.content}</p>
          </div>
        ))}
      </div>

      <button
        id="loadMoreBtn"
        onClick={() => loadMoreReviews()}
        className="mt-6 px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
      >
        Load More Reviews
      </button>
    </div>
  )
}
