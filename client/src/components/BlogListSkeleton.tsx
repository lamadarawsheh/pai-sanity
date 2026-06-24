/**
 * BlogListSkeleton Component
 * Displays skeleton loading states for the blog list page
 */
import BlogCardSkeleton from "./BlogCardSkeleton";

export default function BlogListSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>

      {/* Filter section skeleton */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 animate-pulse">
        <div className="flex-1 h-10 bg-gray-300 rounded"></div>
        <div className="flex-1 h-10 bg-gray-300 rounded"></div>
      </div>

      {/* Blog cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center gap-2 mt-8 animate-pulse">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-10 w-10 bg-gray-300 rounded"></div>
        ))}
      </div>
    </div>
  );
}
