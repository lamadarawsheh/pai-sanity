import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { useBlogStore, type BlogPost } from "../client/src/store/blogStore";

describe("useBlogStore", () => {
  beforeEach(() => {
    useBlogStore.setState({
      posts: [],
      selectedCategory: "All",
      searchQuery: "",
      theme: "light",
      bookmarkedPosts: [],
    });
  });

  afterEach(() => {
    useBlogStore.setState({
      posts: [],
      selectedCategory: "All",
      searchQuery: "",
      theme: "light",
      bookmarkedPosts: [],
    });
  });

  describe("Post Management", () => {
    it("should initialize with empty posts array", () => {
      const state = useBlogStore.getState();
      expect(state.posts).toEqual([]);
    });

    it("should set posts correctly", () => {
      const mockPosts: BlogPost[] = [
        {
          id: "1",
          title: "Test Post",
          excerpt: "Test excerpt",
          category: "NLP",
          readingTime: 5,
          publishedDate: "2024-11-24",
          tags: ["test"],
        },
      ];

      useBlogStore.getState().setPosts(mockPosts);
      const state = useBlogStore.getState();

      expect(state.posts).toEqual(mockPosts);
      expect(state.posts.length).toBe(1);
    });
  });

  describe("Category Filtering", () => {
    it("should set selected category", () => {
      useBlogStore.getState().setSelectedCategory("NLP");
      const state = useBlogStore.getState();

      expect(state.selectedCategory).toBe("NLP");
    });

    it("should filter posts by category", () => {
      const mockPosts: BlogPost[] = [
        {
          id: "1",
          title: "NLP Post",
          excerpt: "NLP excerpt",
          category: "Natural Language Processing",
          readingTime: 5,
          publishedDate: "2024-11-24",
          tags: ["nlp"],
        },
        {
          id: "2",
          title: "CV Post",
          excerpt: "CV excerpt",
          category: "Computer Vision",
          readingTime: 8,
          publishedDate: "2024-11-23",
          tags: ["cv"],
        },
      ];

      useBlogStore.getState().setPosts(mockPosts);
      useBlogStore.getState().setSelectedCategory("Natural Language Processing");

      const filtered = useBlogStore.getState().getFilteredPosts();
      expect(filtered.length).toBe(1);
      expect(filtered[0].category).toBe("Natural Language Processing");
    });
  });

  describe("Search Functionality", () => {
    it("should set search query", () => {
      useBlogStore.getState().setSearchQuery("AI");
      const state = useBlogStore.getState();

      expect(state.searchQuery).toBe("AI");
    });

    it("should filter posts by title search", () => {
      const mockPosts: BlogPost[] = [
        {
          id: "1",
          title: "Building AI Tools",
          excerpt: "Learn how to build AI tools",
          category: "NLP",
          readingTime: 5,
          publishedDate: "2024-11-24",
          tags: ["ai"],
        },
        {
          id: "2",
          title: "Web Development",
          excerpt: "Learn web development",
          category: "Web",
          readingTime: 8,
          publishedDate: "2024-11-23",
          tags: ["web"],
        },
      ];

      useBlogStore.getState().setPosts(mockPosts);
      useBlogStore.getState().setSearchQuery("AI");

      const filtered = useBlogStore.getState().getFilteredPosts();
      expect(filtered.length).toBe(1);
      expect(filtered[0].title).toContain("AI");
    });
  });

  describe("Bookmarking", () => {
    it("should toggle bookmark for a post", () => {
      const postId = "1";

      expect(useBlogStore.getState().isPostBookmarked(postId)).toBe(false);

      useBlogStore.getState().toggleBookmark(postId);
      expect(useBlogStore.getState().isPostBookmarked(postId)).toBe(true);

      useBlogStore.getState().toggleBookmark(postId);
      expect(useBlogStore.getState().isPostBookmarked(postId)).toBe(false);
    });

    it("should manage multiple bookmarks", () => {
      useBlogStore.getState().toggleBookmark("1");
      useBlogStore.getState().toggleBookmark("2");
      useBlogStore.getState().toggleBookmark("3");

      const state = useBlogStore.getState();
      expect(state.bookmarkedPosts.length).toBe(3);
      expect(state.isPostBookmarked("1")).toBe(true);
      expect(state.isPostBookmarked("2")).toBe(true);
      expect(state.isPostBookmarked("3")).toBe(true);
    });
  });

  describe("Theme Management", () => {
    it("should set theme to light", () => {
      useBlogStore.getState().setTheme("light");
      const state = useBlogStore.getState();

      expect(state.theme).toBe("light");
    });

    it("should set theme to dark", () => {
      useBlogStore.getState().setTheme("dark");
      const state = useBlogStore.getState();

      expect(state.theme).toBe("dark");
    });
  });

  describe("Combined Filtering", () => {
    it("should filter by both category and search query", () => {
      const mockPosts: BlogPost[] = [
        {
          id: "1",
          title: "Building AI Tools with Python",
          excerpt: "Learn AI",
          category: "Natural Language Processing",
          readingTime: 5,
          publishedDate: "2024-11-24",
          tags: ["python", "ai"],
        },
        {
          id: "2",
          title: "Building Web Apps",
          excerpt: "Learn web",
          category: "Natural Language Processing",
          readingTime: 8,
          publishedDate: "2024-11-23",
          tags: ["javascript"],
        },
        {
          id: "3",
          title: "Image Classification",
          excerpt: "Learn CV",
          category: "Computer Vision",
          readingTime: 10,
          publishedDate: "2024-11-22",
          tags: ["python", "cv"],
        },
      ];

      useBlogStore.getState().setPosts(mockPosts);
      useBlogStore.getState().setSelectedCategory("Natural Language Processing");
      useBlogStore.getState().setSearchQuery("AI");

      const filtered = useBlogStore.getState().getFilteredPosts();
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe("1");
    });
  });
});
