import { defineType, defineField } from 'sanity'

export const userCodingProfile = defineType({
  name: 'userCodingProfile',
  title: 'User Coding Profile',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({
      name: 'subscriber',
      title: 'Subscriber',
      type: 'reference',
      to: [{ type: 'subscriber' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'xp',
      title: 'Total XP',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'rank',
      title: 'Global Rank',
      type: 'number',
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Expert', value: 'expert' },
          { title: 'Master', value: 'master' },
          { title: 'Grandmaster', value: 'grandmaster' },
          { title: 'Legendary', value: 'legendary' },
        ],
      },
      initialValue: 'beginner',
    }),
    defineField({
      name: 'currentStreak',
      title: 'Current Streak',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'longestStreak',
      title: 'Longest Streak',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'lastActiveDate',
      title: 'Last Active',
      type: 'datetime',
    }),
    defineField({
      name: 'totalSolved',
      title: 'Total Solved',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'easySolved',
      title: 'Easy Solved',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'mediumSolved',
      title: 'Medium Solved',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'hardSolved',
      title: 'Hard Solved',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'totalSubmissions',
      title: 'Total Submissions',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'acceptedSubmissions',
      title: 'Accepted Submissions',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'weeklyXp',
      title: 'Weekly XP',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'monthlyXp',
      title: 'Monthly XP',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'joinedAt',
      title: 'Joined At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'displayName',
      username: 'username',
      xp: 'xp',
      tier: 'tier',
    },
    prepare({ title, username, xp, tier }) {
      return {
        title,
        subtitle: `@${username} • ${xp} XP • ${tier}`,
      }
    },
  },
})

