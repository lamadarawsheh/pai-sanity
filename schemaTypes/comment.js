import { defineType, defineField } from 'sanity'

export const comment = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'subscriber',
      title: 'Subscriber',
      type: 'reference',
      to: [{ type: 'subscriber' }],
      validation: (Rule) => Rule.required(),
      description: 'The subscriber who wrote the comment',
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'blogPost' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (Rule) => Rule.required().min(1).max(2000),
      rows: 4,
    }),
    defineField({
      name: 'parentComment',
      title: 'Parent Comment',
      type: 'reference',
      to: [{ type: 'comment' }],
      description: 'If this is a reply, reference the parent comment',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Pin this comment to the top',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'editedAt',
      title: 'Edited At',
      type: 'datetime',
      description: 'When the comment was last edited',
    }),
  ],
  preview: {
    select: {
      subscriberName: 'subscriber.name',
      content: 'content',
      postTitle: 'post.title',
      featured: 'featured',
    },
    prepare({ subscriberName, content, postTitle, featured }) {
      const status = featured ? '⭐' : '💬'
      return {
        title: `${status} ${subscriberName || 'Anonymous'}`,
        subtitle: `"${content?.substring(0, 50)}..." on "${postTitle}"`,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'oldestFirst',
      by: [{ field: 'createdAt', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [{ field: 'featured', direction: 'desc' }],
    },
  ],
})
