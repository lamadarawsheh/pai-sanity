import { defineType, defineField } from 'sanity'
import { codeInput } from '@sanity/code-input'

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
              { title: 'TypeScript', value: 'typescript' },
              { title: 'JavaScript', value: 'javascript' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'JSON', value: 'json' },
              { title: 'Python', value: 'python' },
              { title: 'Bash', value: 'bash' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
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
      of: [{ type: 'reference', to: { type: 'category' } }],
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
      to: { type: 'author' },
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
      of: [{ type: 'string' }],
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
    // New fields for engagement
//     defineField({
//       name: 'viewCount',
//       title: 'View Count',
//       type: 'number',
//       initialValue: 0,
//       readOnly: true,
//       description: 'Automatically tracks number of views',
//     }),
//     defineField({
//       name: 'likes',
//       title: 'Likes',
//       type: 'array',
//       of: [{ type: 'reference', to: [{ type: 'user' }] }],
//       readOnly: true,
//       description: 'Users who liked this post',
//     }),
//     defineField({
//       name: 'comments',
//       title: 'Comments',
//       type: 'array',
//       of: [{ type: 'reference', to: [{ type: 'comment' }] }],
//       description: 'Comments on this post',
//     }),
//   ],
//   preview: {
//     select: {
//       title: 'title',
//       author: 'author.name',
//       media: 'image',
//       viewCount: 'viewCount',
//     },
//     prepare(selection) {
//       const { author, viewCount } = selection
//       return {
//         ...selection,
//         subtitle: `by ${author || 'Unknown author'} • ${viewCount || 0} views`,
//       }
//     },
//   },
//   orderings: [
//     {
//       title: 'Most Viewed',
//       name: 'viewCountDesc',
//       by: [{ field: 'viewCount', direction: 'desc' }],
//     },
//     {
//       title: 'Newest First',
//       name: 'publishedDateDesc',
//       by: [{ field: 'publishedDate', direction: 'desc' }],
//     },
  ]
})