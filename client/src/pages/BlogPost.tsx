import BlogLayout from "@/components/BlogLayout";
import BlogPostSkeleton from "@/components/BlogPostSkeleton";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { getAllBlogPosts } from "@/lib/sanity";

export default function BlogPost() {
  const [location, setLocation] = useLocation();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      try {
        const allPosts = await getAllBlogPosts();
        const postId = location.split('/').pop();
        const foundPost = allPosts.find((p: any) => p._id === postId || p.slug?.current === postId);

        if (foundPost) {
          setPost(foundPost);
          const related = allPosts
            .filter((p: any) => 
              p.categories === foundPost.categories && 
              p._id !== foundPost._id
            )
            .slice(0, 3);
          setRelatedPosts(related);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [location]);

  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (!post) {
    return (
      <BlogLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Button onClick={() => setLocation("/blog")} className="gap-2">
            <ArrowLeft size={16} />
            Back to Blog
          </Button>
        </div>
      </BlogLayout>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <BlogLayout>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => setLocation("/blog")}
          className="mb-8 gap-2"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Button>

        <article className="prose prose-invert max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime || '5'} min read</span>
            </div>
            {post.author && (
              <div className="flex items-center gap-2">
                <span>By {post.author.name || 'Unknown Author'}</span>
              </div>
            )}
          </div>

          {post.content && (
            <div className="prose-invert">
              {post.content}
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </section>
        )}
      </div>
    </BlogLayout>
  );
}