import { defineType, defineField } from 'sanity'

export const chapter = defineType({
  name: 'chapter',
  title: 'Chapter',
  type: 'document',
  icon: () => '📖',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'lesson' }] }],
    }),
    defineField({
      name: 'xpReward',
      title: 'XP Reward',
      type: 'number',
      initialValue: 100,
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      order: 'order',
      xpReward: 'xpReward',
    },
    prepare({ title, order, xpReward }) {
      return {
        title: `${order}. ${title}`,
        subtitle: `${xpReward} XP`,
      }
    },
  },
})

