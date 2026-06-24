import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Code, BookOpen, Lightbulb, Zap, Sparkles } from "lucide-react";
import BlogLayout from "@/components/BlogLayout";
import BlogCard from "@/components/BlogCard";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import { Button } from "@/components/ui/button";
import { getFeaturedBlogPosts, SanityBlogPost } from "@/lib/sanity";

const features = [
  {
    icon: Code,
    title: "Hands-On Code",
    description: "Every tutorial includes ready-to-use code snippets and complete examples you can run immediately.",
  },
  {
    icon: BookOpen,
    title: "Beginner-Friendly",
    description: "Clear explanations and step-by-step guides make complex AI concepts easy to understand.",
  },
  {
    icon: Lightbulb,
    title: "Practical Projects",
    description: "Build real tools that solve actual problems, from text analysis to image recognition.",
  },
];

export default function Home() {
  const [posts, setPosts] = useState<SanityBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        console.log("Fetching featured blog posts...");
        const featuredPosts = await getFeaturedBlogPosts();
        console.log("Fetched posts:", featuredPosts);
        
        if (!featuredPosts || featuredPosts.length === 0) {
          console.warn("No featured posts found");
        }
        
        setPosts(featuredPosts);
        setError(null);
      } catch (err) {
        console.error("Error loading posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <BlogLayout>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Learn AI by Building
                <span className="text-primary"> Real Projects</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Practical tutorials and guides for developers who want to implement AI in their applications.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/blog">
                    Read the Blog <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#features" className="gap-2">
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-xl border bg-muted/50 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted/20 p-4">
                  <Zap className="h-12 w-12 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What You'll Learn
            </h2>
            <p className="text-muted-foreground">
              Our tutorials are designed to be hands-on and practical, so you can
              start building real AI applications right away.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Featured Articles
              </h2>
              <p className="mt-2 text-muted-foreground">
                Latest insights and tutorials on AI and machine learning
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/blog" className="gap-2">
                View All Articles <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {error ? (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center text-destructive">
              <p>{error}</p>
              <Button 
                variant="ghost" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          ) : isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (post && post._id ? (
                <BlogCard 
                  key={post._id}
                  post={{
                    ...post,
                    id: post._id,
                    category: post.categories?.[0]?.title || 'Uncategorized',
                    readingTime: post.readingTime || 5,
                    tags: post.tags || []
                  }}
                  featured={post.featured}
                />
              ) : null))}
            </div>
          ) : (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">No featured articles found.</p>
            </div>
          )}
        </div>
      </section>
    </BlogLayout>
  );
}