import { describe, it, expect, beforeEach } from "vitest";
import { useBlogStore, type BlogPost } from "./blogStore";

describe("useBlogStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    const store = useBlogStore.getState();
    store.setPosts([]);
    store.setSelectedCategory("All");
    store.setSearchQuery("");
    store.setTheme("light");
  });

  describe("Post Management", () => {
    it("should initialize with empty posts array", () => {
      const store = useBlogStore.getState();
      expect(store.posts).toEqual([]);
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

      const store = useBlogStore.getState();
      store.setPosts(mockPosts);

      expect(store.posts).toEqual(mockPosts);
      expect(store.posts.length).toBe(1);
    });

    it("should update posts when setPosts is called multiple times", () => {
      const store = useBlogStore.getState();
      const firstPost: BlogPost = {
        id: "1",
        title: "First Post",
        excerpt: "First excerpt",
        category: "NLP",
        readingTime: 5,
        publishedDate: "2024-11-24",
        tags: ["test"],
      };

      store.setPosts([firstPost]);
      expect(store.posts.length).toBe(1);

      const secondPost: BlogPost = {
        id: "2",
        title: "Second Post",
        excerpt: "Second excerpt",
        category: "CV",
        readingTime: 8,
        publishedDate: "2024-11-23",
        tags: ["test"],
      };

      store.setPosts([firstPost, secondPost]);
      expect(store.posts.length).toBe(2);
    });
  });

  describe("Category Filtering", () => {
    it("should set selected category", () => {
      const store = useBlogStore.getState();
      store.setSelectedCategory("NLP");

      expect(store.selectedCategory).toBe("NLP");
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

      const store = useBlogStore.getState();
      store.setPosts(mockPosts);
      store.setSelectedCategory("Natural Language Processing");

      const filtered = store.getFilteredPosts();
      expect(filtered.length).toBe(1);
      expect(filtered[0].category).toBe("Natural Language Processing");
    });

    it("should return all posts when category is 'All'", () => {
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

      const store = useBlogStore.getState();
      store.setPosts(mockPosts);
      store.setSelectedCategory("All");

      const filtered = store.getFilteredPosts();
      expect(filtered.length).toBe(2);
    });
  });

  describe("Search Functionality", () => {
    it("should set search query", () => {
      const store = useBlogStore.getState();
      store.setSearchQuery("AI");

      expect(store.searchQuery).toBe("AI");
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

      const store = useBlogStore.getState();
      store.setPosts(mockPosts);
      store.setSearchQuery("AI");

      const filtered = store.getFilteredPosts();
      expect(filtered.length).toBe(1);
      expect(filtered[0].title).toContain("AI");
    });

    it("should filter posts by tag search", () => {
      const mockPosts: BlogPost[] = [
        {
          id: "1",
          title: "Post One",
          excerpt: "Excerpt one",
          category: "NLP",
          readingTime: 5,
          publishedDate: "2024-11-24",
          tags: ["python", "ai"],
        },
        {
          id: "2",
          title: "Post Two",
          excerpt: "Excerpt two",
          category: "Web",
          readingTime: 8,
          publishedDate: "2024-11-23",
          tags: ["javascript"],
        },
      ];

      const store = useBlogStore.getState();
      store.setPosts(mockPosts);
      store.setSearchQuery("python");

      const filtered = store.getFilteredPosts();
      expect(filtered.length).toBe(1);
      expect(filtered[0].tags).toContain("python");
    });

    it("should be case-insensitive", () => {
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
      ];

      const store = useBlogStore.getState();
      store.setPosts(mockPosts);
      store.setSearchQuery("building");

      const filtered = store.getFilteredPosts();
      expect(filtered.length).toBe(1);
    });
  });

  describe("Bookmarking", () => {
    it("should toggle bookmark for a post", () => {
      const store = useBlogStore.getState();
      const postId = "1";

      expect(store.isPostBookmarked(postId)).toBe(false);

      store.toggleBookmark(postId);
      expect(store.isPostBookmarked(postId)).toBe(true);

      store.toggleBookmark(postId);
      expect(store.isPostBookmarked(postId)).toBe(false);
    });

    it("should manage multiple bookmarks", () => {
      const store = useBlogStore.getState();

      store.toggleBookmark("1");
      store.toggleBookmark("2");
      store.toggleBookmark("3");

      expect(store.bookmarkedPosts.length).toBe(3);
      expect(store.isPostBookmarked("1")).toBe(true);
      expect(store.isPostBookmarked("2")).toBe(true);
      expect(store.isPostBookmarked("3")).toBe(true);
      expect(store.isPostBookmarked("4")).toBe(false);
    });

    it("should remove bookmark when toggled again", () => {
      const store = useBlogStore.getState();

      store.toggleBookmark("1");
      expect(store.bookmarkedPosts.length).toBe(1);

      store.toggleBookmark("1");
      expect(store.bookmarkedPosts.length).toBe(0);
      expect(store.isPostBookmarked("1")).toBe(false);
    });
  });

  describe("Theme Management", () => {
    it("should set theme to light", () => {
      const store = useBlogStore.getState();
      store.setTheme("light");

      expect(store.theme).toBe("light");
    });

    it("should set theme to dark", () => {
      const store = useBlogStore.getState();
      store.setTheme("dark");

      expect(store.theme).toBe("dark");
    });

    it("should toggle between themes", () => {
      const store = useBlogStore.getState();

      store.setTheme("light");
      expect(store.theme).toBe("light");

      store.setTheme("dark");
      expect(store.theme).toBe("dark");

      store.setTheme("light");
      expect(store.theme).toBe("light");
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

      const store = useBlogStore.getState();
      store.setPosts(mockPosts);
      store.setSelectedCategory("Natural Language Processing");
      store.setSearchQuery("AI");

      const filtered = store.getFilteredPosts();
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe("1");
    });

    it("should return empty array when no posts match filters", () => {
      const mockPosts: BlogPost[] = [
        {
          id: "1",
          title: "Post One",
          excerpt: "Excerpt",
          category: "NLP",
          readingTime: 5,
          publishedDate: "2024-11-24",
          tags: ["tag1"],
        },
      ];

      const store = useBlogStore.getState();
      store.setPosts(mockPosts);
      store.setSelectedCategory("Computer Vision");
      store.setSearchQuery("nonexistent");

      const filtered = store.getFilteredPosts();
      expect(filtered.length).toBe(0);
    });
  });
});
