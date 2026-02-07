import React from 'react'

 const resultsHeaderData = {
    resultsText: '1-16 of over 500 results for',
    sortOptions: [
      'Featured',
      'Price: Low to High',
      'Price: High to Low',
      'Avg. Customer Review',
      'Newest Arrivals',
    ],
  }
  
export default function ResultsHeader() {
  return (
    <div className="flex justify-between items-center mb-4 shadow-sm border-b pb-2">
      <div className="text-sm">
        <span>{resultsHeaderData.resultsText} </span>
        <span className="font-bold text-amazon-orange">
          "Electronics"
        </span>
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
