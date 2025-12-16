import { defineType, defineField } from 'sanity'

export const codingChallenge = defineType({
  name: 'codingChallenge',
  title: 'Coding Challenge',
  type: 'document',
  icon: () => '💻',
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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'code',
          options: {
            language: 'python',
            languageAlternatives: [
              { title: 'Python', value: 'python' },
              { title: 'JavaScript', value: 'javascript' },
              { title: 'Java', value: 'java' },
              { title: 'C++', value: 'cpp' },
            ],
          },
        },
        { type: 'image' },
      ],
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'xpReward',
      title: 'XP Reward',
      type: 'number',
      validation: (Rule) => Rule.required().min(10).max(500),
      description: 'Easy: 20, Medium: 40, Hard: 80',
    }),
    defineField({
      name: 'timeEstimate',
      title: 'Time Estimate (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Arrays', value: 'Arrays' },
          { title: 'Strings', value: 'Strings' },
          { title: 'Linked Lists', value: 'Linked Lists' },
          { title: 'Trees', value: 'Trees' },
          { title: 'Graphs', value: 'Graphs' },
          { title: 'Dynamic Programming', value: 'Dynamic Programming' },
          { title: 'Sorting', value: 'Sorting' },
          { title: 'Searching', value: 'Searching' },
          { title: 'Hash Table', value: 'Hash Table' },
          { title: 'Two Pointers', value: 'Two Pointers' },
          { title: 'Stack', value: 'Stack' },
          { title: 'Queue', value: 'Queue' },
          { title: 'Heap', value: 'Heap' },
          { title: 'Recursion', value: 'Recursion' },
          { title: 'Backtracking', value: 'Backtracking' },
          { title: 'Math', value: 'Math' },
          { title: 'Bit Manipulation', value: 'Bit Manipulation' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'hints',
      title: 'Hints',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Progressive hints for users who are stuck',
    }),
    defineField({
      name: 'starterCode',
      title: 'Starter Code',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
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
            },
            {
              name: 'code',
              title: 'Code',
              type: 'text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'testCases',
      title: 'Test Cases',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'input', title: 'Input', type: 'text' },
            { name: 'expectedOutput', title: 'Expected Output', type: 'text' },
            { name: 'isHidden', title: 'Hidden Test Case', type: 'boolean', initialValue: false },
          ],
        },
      ],
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'language', title: 'Language', type: 'string' },
            { name: 'code', title: 'Code', type: 'text' },
            { name: 'explanation', title: 'Explanation', type: 'array', of: [{ type: 'block' }] },
          ],
        },
      ],
    }),
    defineField({
      name: 'acceptanceRate',
      title: 'Acceptance Rate (%)',
      type: 'number',
      initialValue: 50,
    }),
    defineField({
      name: 'totalSubmissions',
      title: 'Total Submissions',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'totalSolved',
      title: 'Total Solved',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isBossChallenge',
      title: 'Boss Challenge (for Daily Challenge)',
      type: 'boolean',
      initialValue: false,
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
      xp: 'xpReward',
    },
    prepare({ title, difficulty, xp }) {
      const emoji = difficulty === 'easy' ? '🟢' : difficulty === 'medium' ? '🟡' : '🔴'
      return {
        title: `${emoji} ${title}`,
        subtitle: `${difficulty} • ${xp} XP`,
      }
    },
  },
})

