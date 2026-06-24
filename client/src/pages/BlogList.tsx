import BlogCard from "@/components/BlogCard";
import BlogLayout from "@/components/BlogLayout";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllBlogPosts, searchBlogPosts } from "@/lib/sanity";
import { SanityBlogPost } from "@/lib/sanity";

export default function BlogList() {
  const [allPosts, setAllPosts] = useState<SanityBlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<SanityBlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Load all posts on mount
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const posts = await getAllBlogPosts();
        setAllPosts(posts);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(
            posts.flatMap(post => 
              post.categories?.map(category => category.title).filter(Boolean) || []
            )
          )
        ) as string[];
        setCategories(["All", ...uniqueCategories]);

        // Set initial filtered posts
        setFilteredPosts(posts);
      } catch (error) {
        console.error("Error loading posts:", error);
        setAllPosts([]);
        setFilteredPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Filter posts when category or search changes
  useEffect(() => {
    const filterPosts = async () => {
      let results = [...allPosts];

      // Filter by category
      if (selectedCategory !== "All") {
        results = results.filter(post => 
          post.categories?.some(category => category.title === selectedCategory)
        );
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const searchResults = await searchBlogPosts(searchQuery);
        const searchIds = new Set(searchResults.map((post: SanityBlogPost) => post._id));
        results = results.filter(post => searchIds.has(post._id));
      }

      setFilteredPosts(results);
    };

    filterPosts();
  }, [selectedCategory, searchQuery, allPosts]);

  const hasActiveFilters = selectedCategory !== "All" || searchQuery !== "";

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <BlogLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
          <p className="text-muted-foreground">
            Discover the latest articles and tutorials
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - visible on desktop, conditionally on mobile */}
          <div
            className={`${
              isFilterOpen ? "block" : "hidden"
            } md:block w-full md:w-64 flex-shrink-0`}
          >
            <div className="bg-card p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                          selectedCategory === category
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (post && post._id ? (
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
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No posts found matching your criteria.
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </BlogLayout>
  );
}