import React from 'react'

const resultsHeaderData = {
  sortOptions: [
    'Featured',
    'Price: Low to High',
    'Price: High to Low',
    'Avg. Customer Review',
    'Newest Arrivals',
  ],
}

export default function ResultsHeader({ searchTerm = '', totalResults = 0 }) {
  const resultsText = searchTerm
    ? `${totalResults} result${totalResults !== 1 ? 's' : ''} for `
    : totalResults
      ? `${totalResults} product${totalResults !== 1 ? 's' : ''}`
      : 'No products'

  return (
    <div className="flex justify-between items-center mb-4 shadow-sm border-b pb-2">
      <div className="text-sm">
        <span>{resultsText}</span>
        {searchTerm && (
          <span className="font-bold text-amazon-orange">"{searchTerm}"</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">Sort by:</span>
        <select className="text-sm bg-gray-100 border border-gray-300 rounded px-2 py-1 shadow-sm focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary">
          {resultsHeaderData.sortOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
