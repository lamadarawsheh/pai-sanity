import { defineType, defineField } from 'sanity'

export const user = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'image',
      title: 'Image URL',
      type: 'string',
      description: 'URL to the user\'s profile image',
    }),
    defineField({
      name: 'isSubscribed',
      title: 'Is Subscribed',
      type: 'boolean',
      description: 'Whether the user has an active subscription',
      initialValue: false,
    }),
    defineField({
      name: 'subscriptionExpiry',
      title: 'Subscription Expiry',
      type: 'datetime',
      description: 'When the user\'s subscription expires',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'image',
    },
  },
})