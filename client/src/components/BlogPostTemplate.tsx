import { Calendar, Clock, Share2, Bookmark } from "lucide-react";
import { Streamdown } from "streamdown";

interface BlogPostTemplateProps {
  title: string;
  category: string;
  readingTime: number;
  publishedDate: string;
  author: string;
  tags: string[];
  content: string;
  onBookmark?: () => void;
  isBookmarked?: boolean;
}

export default function BlogPostTemplate({
  title,
  category,
  readingTime,
  publishedDate,
  author,
  tags,
  content,
  onBookmark,
  isBookmarked = false,
}: BlogPostTemplateProps) {
  const formattedDate = new Date(publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-3xl mx-auto">
      {/* Article Header */}
      <div className="mb-8">
        {/* Category Badge */}
        <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
          {category}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">{title}</h1>

        {/* Meta Information */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground border-b border-border pb-6 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <span>By {author}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-sm md:prose-base max-w-none mb-12">
        <Streamdown>{content}</Streamdown>
      </div>

      {/* Article Actions */}
      <div className="border-t border-border pt-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-foreground font-semibold">Share this post:</span>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Share on Twitter">
            <Share2 className="w-5 h-5 text-muted-foreground hover:text-primary" />
          </button>
        </div>
        {onBookmark && (
          <button
            onClick={onBookmark}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary text-muted-foreground"
            }`}
            title={isBookmarked ? "Remove bookmark" : "Bookmark this post"}
          >
            <Bookmark className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        )}
      </div>
    </article>
  );
}
