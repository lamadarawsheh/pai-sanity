import { defineType, defineField } from 'sanity'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  icon: () => '📝',
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
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Concept (Theory)', value: 'concept' },
          { title: 'Exercise (Code)', value: 'exercise' },
          { title: 'Quiz', value: 'quiz' },
          { title: 'Challenge (Boss)', value: 'challenge' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'code' }, { type: 'image' }],
    }),
    defineField({
      name: 'xpReward',
      title: 'XP Reward',
      type: 'number',
      initialValue: 50,
    }),
    defineField({
      name: 'estimatedMinutes',
      title: 'Estimated Minutes',
      type: 'number',
      initialValue: 10,
    }),
    defineField({
      name: 'challenge',
      title: 'Linked Challenge',
      type: 'reference',
      to: [{ type: 'codingChallenge' }],
      hidden: ({ parent }) => !['exercise', 'challenge'].includes(parent?.type as string),
    }),
    defineField({
      name: 'quiz',
      title: 'Quiz Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'text' },
            { name: 'options', title: 'Options', type: 'array', of: [{ type: 'string' }] },
            { name: 'correctIndex', title: 'Correct Answer Index (0-based)', type: 'number' },
            { name: 'explanation', title: 'Explanation', type: 'text' },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.type !== 'quiz',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      xp: 'xpReward',
      order: 'order',
    },
    prepare({ title, type, xp, order }) {
      const emoji =
        type === 'concept' ? '🧠' : type === 'exercise' ? '💻' : type === 'quiz' ? '❓' : '⚔️'
      return {
        title: `${order}. ${emoji} ${title}`,
        subtitle: `${type} • ${xp} XP`,
      }
    },
  },
})

