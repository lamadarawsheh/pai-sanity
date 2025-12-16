import { defineType, defineField } from 'sanity'

export const like = defineType({
  name: 'like',
  title: 'Like',
  type: 'document',
  fields: [
    defineField({
      name: 'subscriber',
      title: 'Subscriber',
      type: 'reference',
      to: [{ type: 'subscriber' }],
      validation: (Rule) => Rule.required(),
      description: 'The subscriber who liked the post',
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'blogPost' }],
      validation: (Rule) => Rule.required(),
      description: 'The post that was liked',
    }),
    defineField({
      name: 'createdAt',
      title: 'Liked At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      subscriberName: 'subscriber.name',
      postTitle: 'post.title',
      createdAt: 'createdAt',
    },
    prepare({ subscriberName, postTitle, createdAt }) {
      const date = createdAt ? new Date(createdAt).toLocaleDateString() : ''
      return {
        title: `❤️ ${subscriberName || 'Unknown'} liked`,
        subtitle: `"${postTitle}" • ${date}`,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
})

