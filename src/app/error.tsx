'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-lg shadow-lg border border-red-100">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Oops! Something went wrong</h1>
        <p className="text-gray-600 text-center mb-6">
          An unexpected error occurred. We've logged the details. Please try again or return home.
        </p>

        {error?.message && (
          <div className="mb-6 p-3 bg-red-50 rounded text-sm text-red-700 border border-red-200">
            <span className="font-semibold">Error: </span>
            {error.message}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
          <a
            href="/"
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 text-center"
          >
            Go Home
          </a>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Error ID: {error?.digest}
        </p>
      </div>
    </div>
  )
}
