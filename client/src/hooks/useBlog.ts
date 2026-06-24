import { useBlogStore } from "@/store/blogStore";
import { useCallback } from "react";

/**
 * Custom hook for accessing blog store functionality
 * Provides a cleaner interface for components to interact with the blog state
 */
export function useBlog() {
  const {
    posts,
    selectedCategory,
    searchQuery,
    theme,
    bookmarkedPosts,
    setPosts,
    setSelectedCategory,
    setSearchQuery,
    setTheme,
    toggleBookmark,
    isPostBookmarked,
    getFilteredPosts,
  } = useBlogStore();

  // Memoized function to get filtered posts
  const filteredPosts = useCallback(() => {
    return getFilteredPosts();
  }, [getFilteredPosts]);

  // Memoized function to toggle bookmark
  const handleToggleBookmark = useCallback(
    (postId: string) => {
      toggleBookmark(postId);
    },
    [toggleBookmark]
  );

  // Memoized function to check if post is bookmarked
  const checkIsBookmarked = useCallback(
    (postId: string) => {
      return isPostBookmarked(postId);
    },
    [isPostBookmarked]
  );

  return {
    // State
    posts,
    selectedCategory,
    searchQuery,
    theme,
    bookmarkedPosts,
    
    // Actions
    setPosts,
    setSelectedCategory,
    setSearchQuery,
    setTheme,
    
    // Computed
    filteredPosts: filteredPosts(),
    
    // Methods
    toggleBookmark: handleToggleBookmark,
    isPostBookmarked: checkIsBookmarked,
  };
}
