/**
 * BlogPostSkeleton Component
 * Displays skeleton loading state for individual blog post pages
 */

export default function BlogPostSkeleton() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex gap-2 mb-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
            {index < 2 && <div className="h-4 w-4 bg-gray-300 rounded"></div>}
          </div>
        ))}
      </div>

      {/* Title skeleton */}
      <div className="mb-4">
        <div className="h-10 bg-gray-300 rounded w-4/5 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/5"></div>
      </div>

      {/* Meta information skeleton */}
      <div className="flex flex-wrap gap-4 mb-8 py-4 border-y border-gray-200">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Featured image skeleton */}
      <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>

      {/* Table of contents skeleton */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-300 rounded w-3/4"></div>
          ))}
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-4 mb-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/5"></div>
          </div>
        ))}
      </div>

      {/* Code block skeleton */}
      <div className="bg-gray-100 p-4 rounded-lg mb-8">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>

      {/* Related posts skeleton */}
      <div className="mt-12">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card bg-base-100 shadow">
              <div className="h-40 bg-gray-300 rounded-t-lg"></div>
              <div className="card-body">
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
