# Sanity.io CMS Setup Guide for Practical AI Blog

This guide will help you set up your Sanity.io project and create the blog post schema so you can manage your blog content through Sanity Studio.

## Prerequisites

- Sanity Project ID: `uyvd607s`
- Dataset: `production`
- API Token: Already configured in environment variables

## Step 1: Access Your Sanity Project

1. Go to [https://manage.sanity.io/](https://manage.sanity.io/)
2. Sign in with your Sanity account
3. Select your project: **uyvd607s**

## Step 2: Create the Blog Post Schema

You need to create a `blogPost` document type in Sanity. Here's how:

### Option A: Using Sanity CLI (Recommended)

If you have Sanity CLI installed:

```bash
sanity init
# Select your project
# Choose to create a new schema
```

### Option B: Manual Schema Creation in Sanity Studio

1. Go to your Sanity project dashboard
2. Click on **Settings** → **Schemas**
3. Create a new file called `blogPost.js` with the following content:

```javascript
export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 10,
      validation: Rule => Rule.required()
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
          { title: 'Beginner Projects', value: 'Beginner Projects' },
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string'
    }
  ]
}
```

## Step 3: Create Your First Blog Post

1. Go to your Sanity Studio (usually at `https://uyvd607s.sanity.studio`)
2. Click on **Blog Post** in the left sidebar
3. Click **Create** to add a new blog post
4. Fill in the following fields:

### Example Blog Post: Text Summarizer

**Title:** Build Your First AI Tool: A Simple Text Summarizer

**Slug:** text-summarizer (auto-generated from title)

**Excerpt:** Learn how to create an AI-powered text summarizer using Python and the BART model. This beginner-friendly guide includes code examples and step-by-step instructions.

**Category:** Natural Language Processing

**Tags:** AI, Python, NLP, Transformers, Beginner

**Reading Time:** 8

**Published Date:** 2024-11-24

**Featured:** Yes (toggle on)

**Author:** Practical AI

**Content:**
```
# Build Your First AI Tool: A Simple Text Summarizer

## Introduction

Imagine you're researching a topic and come across a long article, but you only have 5 minutes to understand the key points. What if you could instantly get a concise summary without reading the entire text? That's exactly what an AI-powered text summarizer does.

## How the Tool Works

Text summarization is powered by a technique called **abstractive summarization**, which uses deep learning models to understand the meaning of text and generate new, shorter sentences that capture the essence of the original content.

Here's how it works:

1. **Understanding the Text:** The AI model reads your input text and breaks it down into meaningful units (tokens).
2. **Extracting Key Information:** The model identifies the most important ideas and concepts from the text.
3. **Generating the Summary:** The model generates completely new sentences that convey the key information in fewer words.

## Step-by-Step Guide

### Step 1: Install Required Libraries

```bash
pip install transformers torch
```

### Step 2: Import Libraries

```python
from transformers import pipeline

# Load the summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
```

### Step 3: Create Your Summarizer

```python
def summarize_text(text, max_length=130, min_length=30):
    summary = summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)
    return summary[0]['summary_text']

# Example usage
article = "Your long text here..."
summary = summarize_text(article)
print(summary)
```

## Why This Tool Is Useful

- **Save Time:** Quickly understand the key points of long articles
- **Improve Productivity:** Process more content in less time
- **Better Learning:** Focus on important concepts without getting lost in details
```

## Step 4: Publish Your Post

1. Click the **Publish** button in Sanity Studio
2. Your post is now live and will appear on your blog!

## Step 5: Verify Content Appears on Your Blog

1. Go to your blog at `https://your-domain.com/blog`
2. You should see your newly published post in the list
3. Click on it to view the full post

## Adding More Posts

Repeat Steps 3-5 for each new blog post you want to add.

## Important Notes

- **Slug:** Must be unique and URL-friendly (auto-generated from title)
- **Category:** Choose from the predefined list to enable filtering
- **Featured:** Mark posts as featured to show them on the homepage
- **Reading Time:** Estimate based on ~200 words per minute
- **Content:** Supports Markdown formatting

## Troubleshooting

### Posts Not Appearing on Blog

1. Check that the post is **Published** (not in draft)
2. Verify the **API Token** has read permissions
3. Check browser console for any error messages
4. Try refreshing the page

### Images Not Showing

Currently, the blog supports text content. To add images:

1. Add an `image` field to the schema
2. Update the blog components to display images
3. Upload images through Sanity's asset manager

## Next Steps

- Create 5-10 sample blog posts to populate your blog
- Customize the category list based on your content
- Add author profiles if you have multiple contributors
- Set up scheduled publishing for future posts

## Support

For more information about Sanity.io, visit:
- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://www.sanity.io/community)
