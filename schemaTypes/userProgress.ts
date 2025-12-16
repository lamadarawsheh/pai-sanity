import { defineType, defineField } from 'sanity'

export const userProgress = defineType({
  name: 'userProgress',
  title: 'User Progress',
  type: 'document',
  icon: () => '📊',
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'subscriber' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'learningPath',
      title: 'Learning Path',
      type: 'reference',
      to: [{ type: 'learningPath' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'completedLessons',
      title: 'Completed Lesson IDs',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'currentLesson',
      title: 'Current Lesson ID',
      type: 'string',
    }),
    defineField({
      name: 'startedAt',
      title: 'Started At',
      type: 'datetime',
    }),
    defineField({
      name: 'completedAt',
      title: 'Completed At',
      type: 'datetime',
    }),
    defineField({
      name: 'xpEarned',
      title: 'XP Earned',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      userName: 'user.name',
      pathTitle: 'learningPath.title',
      xpEarned: 'xpEarned',
      completedAt: 'completedAt',
    },
    prepare({ userName, pathTitle, xpEarned, completedAt }) {
      const status = completedAt ? '✅ Completed' : '📖 In Progress'
      return {
        title: `${userName} - ${pathTitle}`,
        subtitle: `${status} • ${xpEarned} XP earned`,
      }
    },
  },
})

