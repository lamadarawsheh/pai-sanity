import { Calendar, Clock, Bookmark } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export interface PortableTextBlock {
  _key: string;
  _type: string;
  children: Array<{ text: string }>;
  markDefs: any[];
  style: string;
}

export interface BlogPost {
  _id: string;
  id: string;
  title: string;
  excerpt: string | PortableTextBlock[];
  category: string;
  readingTime: number;
  publishedDate: string;
  tags: string[];
  featured?: boolean;
}

// Helper function to extract text from Portable Text
export function getExcerptText(excerpt: string | PortableTextBlock[]): string {
  if (typeof excerpt === 'string') return excerpt;
  if (!Array.isArray(excerpt)) return '';
  return excerpt
    .map(block => 
      block.children
        ? block.children.map(child => child.text || '').join('')
        : ''
    )
    .join('\n')
    .substring(0, 200); // Limit excerpt length
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({
  post,
  featured = false,
}: BlogCardProps) {
  const { id, title, excerpt, category, readingTime, publishedDate, tags } = post;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const categoryColors: Record<string, string> = {
    "Natural Language Processing": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    "Computer Vision": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "Machine Learning": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    NLP: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    Web: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  };

  const categoryColor = categoryColors[category] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";

  return (
    <Link href={`/blog/${id}`}>
      <article className="group h-full">
        <div className="relative h-full rounded-2xl border border-border/60 bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-primary/10 cursor-pointer flex flex-col">
          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
              Featured
            </div>
          )}

          {/* Image Placeholder with Gradient */}
          <div className="relative h-48 md:h-56 bg-gradient-to-br from-primary/20 via-blue-500/10 to-cyan-500/20 overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary/30 group-hover:text-primary/50 transition-colors">
                  {category.charAt(0)}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 md:p-6 flex flex-col">
            {/* Category Badge */}
            <div className="mb-3">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColor}`}>
                {category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-2 flex-grow">
              {typeof excerpt === 'string' ? excerpt : getExcerptText(excerpt)}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {Array.isArray(tags) && tags.slice(0, 2).map((tag) => {
                const tagText = String(tag || '').trim();
                return tagText ? (
                  <span key={tagText} className="text-xs px-2 py-1 bg-secondary/50 text-secondary-foreground rounded-md">
                    #{tagText}
                  </span>
                ) : null;
              })}
              {Array.isArray(tags) && tags.length > 2 && (
                <span className="text-xs px-2 py-1 bg-secondary/50 text-secondary-foreground rounded-md">
                  +{tags.length - 2}
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} min</span>
                </div>
              </div>

              {/* Bookmark Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsBookmarked(!isBookmarked);
                }}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isBookmarked
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
                title="Bookmark"
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
