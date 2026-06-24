import { create } from "zustand";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: number;
  publishedDate: string;
  tags: string[];
  featured?: boolean;
}

export interface BlogState {
  // Blog posts
  posts: BlogPost[];
  selectedCategory: string;
  searchQuery: string;
  
  // User preferences
  theme: "light" | "dark";
  bookmarkedPosts: string[];
  
  // Actions
  setPosts: (posts: BlogPost[]) => void;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleBookmark: (postId: string) => void;
  isPostBookmarked: (postId: string) => boolean;
  getFilteredPosts: () => BlogPost[];
}

export const useBlogStore = create<BlogState>((set, get) => ({
  posts: [],
  selectedCategory: "All",
  searchQuery: "",
  theme: "light",
  bookmarkedPosts: [],

  setPosts: (posts) => set({ posts }),

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setTheme: (theme) => set({ theme }),

  toggleBookmark: (postId) =>
    set((state) => ({
      bookmarkedPosts: state.bookmarkedPosts.includes(postId)
        ? state.bookmarkedPosts.filter((id) => id !== postId)
        : [...state.bookmarkedPosts, postId],
    })),

  isPostBookmarked: (postId) => {
    const state = get();
    return state.bookmarkedPosts.includes(postId);
  },

  getFilteredPosts: () => {
    const state = get();
    const { posts, selectedCategory, searchQuery } = state;

    return posts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  },
}));
