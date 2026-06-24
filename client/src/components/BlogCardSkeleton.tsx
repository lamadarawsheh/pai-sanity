/**
 * BlogCardSkeleton Component
 * Displays a skeleton loading state for blog cards while content is being fetched
 */

export default function BlogCardSkeleton() {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-300 rounded-t-lg"></div>

      <div className="card-body">
        {/* Category badge skeleton */}
        <div className="flex gap-2 mb-2">
          <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
        </div>

        {/* Title skeleton */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>

        {/* Excerpt skeleton - multiple lines */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex gap-2">
            <div className="h-5 w-12 bg-gray-300 rounded"></div>
            <div className="h-5 w-16 bg-gray-300 rounded"></div>
          </div>
          <div className="h-5 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
