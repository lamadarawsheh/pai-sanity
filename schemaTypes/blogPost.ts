import {defineType, defineField} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'code',
          options: {
            language: 'typescript',
            languageAlternatives: [
              {title: 'TypeScript', value: 'typescript'},
              {title: 'JavaScript', value: 'javascript'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'JSON', value: 'json'},
              {title: 'Python', value: 'python'},
              {title: 'Bash', value: 'bash'},
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'savedBy',
      title: 'Saved By',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'subscriber'}]}],
      hidden: true, // Hide from Studio UI
    }),

    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedDate',
      title: 'Updated Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark this post as featured',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    // Engagement tracking fields
    defineField({
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      initialValue: 0,
      description: 'Number of times this post has been viewed',
    }),
    defineField({
      name: 'likeCount',
      title: 'Like Count',
      type: 'number',
      initialValue: 0,
      description: 'Cached count of likes (updated via API)',
    }),
    defineField({
      name: 'commentCount',
      title: 'Comment Count',
      type: 'number',
      initialValue: 0,
      description: 'Cached count of approved comments (updated via API)',
    }),
    defineField({
      name: 'allowComments',
      title: 'Allow Comments',
      type: 'boolean',
      description: 'Enable or disable comments on this post',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'image',
      viewCount: 'viewCount',
      likeCount: 'likeCount',
      commentCount: 'commentCount',
    },
    prepare({title, author, media, viewCount, likeCount, commentCount}) {
      return {
        title,
        subtitle: `by ${author || 'Unknown'} • 👁 ${viewCount || 0} • ❤️ ${likeCount || 0} • 💬 ${commentCount || 0}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Most Viewed',
      name: 'viewCountDesc',
      by: [{field: 'viewCount', direction: 'desc'}],
    },
    {
      title: 'Most Liked',
      name: 'likeCountDesc',
      by: [{field: 'likeCount', direction: 'desc'}],
    },
    {
      title: 'Most Commented',
      name: 'commentCountDesc',
      by: [{field: 'commentCount', direction: 'desc'}],
    },
    {
      title: 'Newest First',
      name: 'publishedDateDesc',
      by: [{field: 'publishedDate', direction: 'desc'}],
    },
  ],
})
