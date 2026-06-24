import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Configuration for Sanity.io CMS
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "ka9py84m"; // Using the correct project ID
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2023-11-24"; // Using a valid API version
const apiToken = import.meta.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
  console.error("Missing Sanity configuration. Please set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if you want fresh data during development
  token: apiToken,
});

// Image URL builder for Sanity images
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max');
}

// Type definitions for Sanity schemas
export interface SanityAuthor {
  _id: string;
  _type: 'author';
  name: string;
  slug: {
    current: string;
  };
  image?: {
    asset: {
      _ref: string;
    };
  };
  bio?: any[]; // Portable Text content
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
}

export interface SanityCategory {
  _id: string;
  _type: 'category';
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  color?: string;
}

export interface SanityBlogPost {
  _id: string;
  _type: 'blogPost';
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: any; // Portable Text content
  categories: SanityCategory[];
  readingTime: number;
  author: SanityAuthor;
  publishedDate: string;
  updatedDate?: string;
  tags: string[];
  featured: boolean;
  image?: {
    asset: {
      _ref: string;
    };
  };
}

// Common fields for blog post queries
const blogPostFields = `
  _id,
  _type,
  title,
  slug,
  excerpt,
  content,
  "categories": categories[]->{
    _id,
    _type,
    title,
    "slug": slug.current,
    description,
    color
  },
  "author": author->{
    _id,
    _type,
    name,
    "slug": slug.current,
    image
  },
  readingTime,
  publishedDate,
  updatedDate,
  tags,
  featured,
  image
`;

// Fetch all blog posts
export async function getAllBlogPosts(): Promise<SanityBlogPost[]> {
  const query = `*[_type == "blogPost"] | order(publishedDate desc) {
    ${blogPostFields}
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching blog posts from Sanity:", error);
    return [];
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    ${blogPostFields}
  }`;

  try {
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching blog post from Sanity:", error);
    return null;
  }
}

// Fetch featured blog posts
export async function getFeaturedBlogPosts(): Promise<SanityBlogPost[]> {
  const query = `*[_type == "blogPost" && featured == true] | order(publishedDate desc) {
    ${blogPostFields}
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching featured blog posts from Sanity:", error);
    return [];
  }
}

// Get all categories
export async function getAllCategories(): Promise<SanityCategory[]> {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    description,
    color
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching categories from Sanity:", error);
    return [];
  }
}

// Fetch blog posts by category slug
export async function getBlogPostsByCategory(categorySlug: string): Promise<SanityBlogPost[]> {
  const query = `*[_type == "blogPost" && $categorySlug in categories[]->slug.current] | order(publishedDate desc) {
    ${blogPostFields}
  }`;

  try {
    return await sanityClient.fetch(query, { categorySlug });
  } catch (error) {
    console.error("Error fetching blog posts by category from Sanity:", error);
    return [];
  }
}

// Search blog posts
export async function searchBlogPosts(searchTerm: string): Promise<SanityBlogPost[]> {
  const query = `*[_type == "blogPost" && (
    title match $searchTerm ||
    excerpt match $searchTerm ||
    tags[] match $searchTerm
  )] | order(publishedDate desc) {
    ${blogPostFields}
  }`;

  try {
    return await sanityClient.fetch(query, { searchTerm });
  } catch (error) {
    console.error("Error searching blog posts in Sanity:", error);
    return [];
  }
}

// Get all authors
export async function getAllAuthors(): Promise<SanityAuthor[]> {
  const query = `*[_type == "author"] | order(name asc) {
    _id,
    _type,
    name,
    "slug": slug.current,
    image,
    bio,
    socialLinks
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching authors from Sanity:", error);
    return [];
  }
}

// Get author by slug
export async function getAuthorBySlug(slug: string): Promise<SanityAuthor | null> {
  const query = `*[_type == "author" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    "slug": slug.current,
    image,
    bio,
    socialLinks
  }`;

  try {
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching author from Sanity:", error);
    return null;
  }
}