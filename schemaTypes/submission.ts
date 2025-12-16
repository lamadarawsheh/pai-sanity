import { defineType, defineField } from 'sanity'

export const submission = defineType({
  name: 'submission',
  title: 'Submission',
  type: 'document',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'reference',
      to: [{ type: 'codingChallenge' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'subscriber' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Submitted Code',
      type: 'text',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Python', value: 'python' },
          { title: 'JavaScript', value: 'javascript' },
          { title: 'Java', value: 'java' },
          { title: 'C++', value: 'cpp' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Accepted', value: 'accepted' },
          { title: 'Wrong Answer', value: 'wrong_answer' },
          { title: 'Runtime Error', value: 'runtime_error' },
          { title: 'Time Limit Exceeded', value: 'time_limit' },
          { title: 'Compile Error', value: 'compile_error' },
        ],
      },
    }),
    defineField({
      name: 'runtime',
      title: 'Runtime (ms)',
      type: 'number',
    }),
    defineField({
      name: 'memory',
      title: 'Memory (MB)',
      type: 'number',
    }),
    defineField({
      name: 'runtimePercentile',
      title: 'Runtime Percentile',
      type: 'number',
    }),
    defineField({
      name: 'memoryPercentile',
      title: 'Memory Percentile',
      type: 'number',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'text',
    }),
    defineField({
      name: 'testCasesPassed',
      title: 'Test Cases Passed',
      type: 'number',
    }),
    defineField({
      name: 'totalTestCases',
      title: 'Total Test Cases',
      type: 'number',
    }),
    defineField({
      name: 'notes',
      title: 'User Notes',
      type: 'text',
    }),
    defineField({
      name: 'createdAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      challengeTitle: 'challenge.title',
      userName: 'user.name',
      status: 'status',
      createdAt: 'createdAt',
    },
    prepare({ challengeTitle, userName, status, createdAt }) {
      const statusEmoji =
        status === 'accepted'
          ? '✅'
          : status === 'wrong_answer'
            ? '❌'
            : status === 'runtime_error'
              ? '💥'
              : status === 'time_limit'
                ? '⏱️'
                : '🔴'
      const date = createdAt ? new Date(createdAt).toLocaleDateString() : ''
      return {
        title: `${statusEmoji} ${challengeTitle}`,
        subtitle: `by ${userName} • ${date}`,
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

