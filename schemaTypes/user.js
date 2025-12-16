import {defineType, defineField} from 'sanity'

export const subscriber = defineType({
  name: 'subscriber',
  title: 'Subscriber',
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
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Profile picture',
    }),
    defineField({
      name: 'avatarUrl',
      title: 'Avatar URL',
      type: 'url',
      description: 'External avatar URL (e.g., from OAuth provider)',
    }),
    defineField({
      name: 'isSubscribed',
      title: 'Is Subscribed',
      type: 'boolean',
      description: 'Active subscribers can like and comment on posts',
      initialValue: false,
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      description: 'When the user subscribed',
    }),
    defineField({
      name: 'subscriptionExpiry',
      title: 'Subscription Expiry',
      type: 'datetime',
      description: 'When the subscription expires (leave empty for lifetime)',
    }),
    defineField({
      name: 'subscriptionTier',
      title: 'Subscription Tier',
      type: 'string',
      options: {
        list: [
          {title: 'Free', value: 'free'},
          {title: 'Basic', value: 'basic'},
          {title: 'Premium', value: 'premium'},
        ],
        layout: 'radio',
      },
      initialValue: 'free',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'avatar',
      isSubscribed: 'isSubscribed',
      tier: 'subscriptionTier',
    },
    prepare({title, subtitle, media, isSubscribed, tier}) {
      const status = isSubscribed ? `✅ ${tier || 'subscribed'}` : '❌ not subscribed'
      return {
        title: title || 'Unnamed',
        subtitle: `${subtitle} • ${status}`,
        media,
      }
    },
  },
})
