# Sanity.io CMS Setup Guide

This guide will help you set up Sanity.io as the Headless CMS for the Practical AI Blog.

## What is Sanity.io?

Sanity.io is a modern, flexible headless CMS that allows you to manage content through an intuitive interface and access it via APIs. It's perfect for blogs because it provides:

- **Structured Content:** Define your blog post schema once and manage all posts consistently
- **Real-time Collaboration:** Multiple editors can work simultaneously
- **Powerful Querying:** Use GROQ (Sanity's query language) to fetch exactly what you need
- **Free Tier:** Generous free tier for small projects
- **Developer Friendly:** Easy integration with modern frameworks

## Step 1: Create a Sanity.io Account

1. Go to [sanity.io](https://www.sanity.io)
2. Click "Get started" or "Sign up"
3. Create an account using your email or GitHub/Google account
4. Verify your email

## Step 2: Create a New Project

1. After logging in, click "Create new project"
2. Give your project a name (e.g., "Practical AI Blog")
3. Select a dataset name (default: "production")
4. Choose your project template - select "Blank project"
5. Click "Create project"

## Step 3: Define Your Blog Post Schema

Once your project is created, you'll be in the Sanity Studio. Now you need to define the blog post schema:

1. In your Sanity project folder (if you have one locally), or through the web interface, create a schema for blog posts
2. If using the web interface, go to **Desk** > **Schema** and add a new document type

Here's the schema definition for a blog post:

```javascript
// schemas/blogPost.js
export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          type: 'code',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Natural Language Processing', value: 'Natural Language Processing' },
          { title: 'Computer Vision', value: 'Computer Vision' },
          { title: 'Machine Learning', value: 'Machine Learning' },
          { title: 'Tools & Resources', value: 'Tools & Resources' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'updatedDate',
      title: 'Updated Date',
      type: 'datetime',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Check this to feature the post on the homepage',
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      date: 'publishedDate',
    },
    prepare(selection) {
      const { author, date } = selection;
      return {
        title: selection.title,
        subtitle: `by ${author} on ${new Date(date).toLocaleDateString()}`,
      };
    },
  },
};
```

## Step 4: Get Your Project Credentials

1. Go to your Sanity project settings
2. Click on **API** in the left sidebar
3. Note your **Project ID** and **Dataset name**
4. Under **CORS origins**, add your development URL (e.g., `http://localhost:3000`)

## Step 5: Set Environment Variables

Create or update your `.env.local` file with your Sanity credentials:

```bash
VITE_SANITY_PROJECT_ID=your-project-id-here
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-11-24
```

Replace `your-project-id-here` with your actual Sanity project ID.

## Step 6: Create Your First Blog Post

1. Go to your Sanity Studio (usually at `https://your-project-id.sanity.studio`)
2. Click **Create** and select **Blog Post**
3. Fill in the fields:
   - **Title:** "Build Your First AI Tool: A Simple Text Summarizer"
   - **Slug:** Will auto-generate from title
   - **Excerpt:** Your excerpt text
   - **Content:** Add your blog post content using blocks
   - **Category:** "Natural Language Processing"
   - **Reading Time:** 8
   - **Author:** "Practical AI"
   - **Published Date:** Today's date
   - **Tags:** ["AI", "Python", "NLP", "Transformers", "Beginner"]
   - **Featured:** Check this box
4. Click **Publish**

## Step 7: Update Your Blog Pages

The blog pages are already configured to fetch from Sanity. The integration is in `client/src/lib/sanity.ts`.

Update your blog pages to use the Sanity client:

```typescript
import { getAllBlogPosts, getFeaturedBlogPosts } from "@/lib/sanity";

// In your component
const posts = await getAllBlogPosts();
```

## Step 8: Test the Integration

1. Make sure your environment variables are set
2. Restart your dev server
3. Navigate to your blog pages
4. You should see your blog posts from Sanity displayed

## Available Sanity Functions

The `client/src/lib/sanity.ts` file provides several helper functions:

- `getAllBlogPosts()` - Fetch all blog posts
- `getBlogPostBySlug(slug)` - Fetch a single post by slug
- `getFeaturedBlogPosts()` - Fetch featured posts
- `getBlogPostsByCategory(category)` - Fetch posts by category
- `searchBlogPosts(searchTerm)` - Search posts
- `urlFor(image)` - Generate URLs for Sanity images

## Deploying to Production

When deploying to production:

1. Make sure your environment variables are set in your hosting platform
2. Update your CORS origins in Sanity to include your production domain
3. Consider using a CDN for images (Sanity provides this by default)

## Additional Resources

- [Sanity.io Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity React Integration](https://www.sanity.io/docs/js-client)

## Troubleshooting

**Posts not showing up?**
- Check your environment variables are correct
- Make sure your blog posts are published in Sanity
- Check the browser console for API errors

**Images not loading?**
- Verify the image URLs are correct
- Check CORS settings in Sanity
- Make sure images are published in Sanity

**Need help?**
- Check the Sanity documentation
- Visit the Sanity community forums
- Contact Sanity support

