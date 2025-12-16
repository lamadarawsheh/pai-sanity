import { defineType, defineField } from 'sanity'

export const learningPath = defineType({
  name: 'learningPath',
  title: 'Learning Path',
  type: 'document',
  icon: () => '📚',
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
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Material Symbol)',
      type: 'string',
      description: 'e.g., account_tree, functions',
    }),
    defineField({
      name: 'color',
      title: 'Gradient Color',
      type: 'string',
      description: 'e.g., from-cyan-500 to-teal-500',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'easy' },
          { title: 'Medium', value: 'medium' },
          { title: 'Hard', value: 'hard' },
        ],
      },
    }),
    defineField({
      name: 'totalXp',
      title: 'Total XP',
      type: 'number',
    }),
    defineField({
      name: 'estimatedHours',
      title: 'Estimated Hours',
      type: 'number',
    }),
    defineField({
      name: 'chapters',
      title: 'Chapters',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'chapter' }] }],
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'enrolledCount',
      title: 'Enrolled Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'completedCount',
      title: 'Completed Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      difficulty: 'difficulty',
      totalXp: 'totalXp',
      enrolledCount: 'enrolledCount',
    },
    prepare({ title, difficulty, totalXp, enrolledCount }) {
      const emoji = difficulty === 'easy' ? '🟢' : difficulty === 'medium' ? '🟡' : '🔴'
      return {
        title: `${emoji} ${title}`,
        subtitle: `${totalXp} XP • ${enrolledCount || 0} enrolled`,
      }
    },
  },
})

