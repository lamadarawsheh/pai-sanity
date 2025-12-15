// import { defineType, defineField } from 'sanity'

// export const comment = defineType({
//   name: 'comment',
//   title: 'Comment',
//   type: 'document',
//   fields: [
//     defineField({
//       name: 'user',
//       title: 'User',
//       type: 'object',
//       fields: [
//         defineField({
//           name: 'id',
//           title: 'User ID',
//           type: 'string',
//           validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//           name: 'name',
//           title: 'Name',
//           type: 'string',
//           validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//           name: 'image',
//           title: 'Image URL',
//           type: 'string',
//           description: 'URL to the user\'s profile image',
//         }),
//       ],
//     }),
//     defineField({
//       name: 'content',
//       title: 'Content',
//       type: 'text',
//       validation: (Rule) => Rule.required().min(1).max(1000),
//       rows: 4,
//     }),
//     defineField({
//       name: 'approved',
//       title: 'Approved',
//       type: 'boolean',
//       description: 'Comments will not show on the site until approved',
//       initialValue: false,
//     }),
//     defineField({
//       name: 'post',
//       title: 'Post',
//       type: 'reference',
//       to: [{ type: 'blogPost' }],
//       validation: (Rule) => Rule.required(),
//     }),
//     defineField({
//       name: 'createdAt',
//       title: 'Created At',
//       type: 'datetime',
//       initialValue: () => new Date().toISOString(),
//       readOnly: true,
//     }),
//   ],
//   preview: {
//     select: {
//       userName: 'user.name',
//       content: 'content',
//       postTitle: 'post.title',
//       approved: 'approved',
//     },
//     prepare({ userName, content, postTitle, approved }) {
//       return {
//         title: `Comment by ${userName || 'Anonymous'}`,
//         subtitle: `${content?.substring(0, 30)}... on ${postTitle}`,
//         media: approved ? '✅' : '⏳',
//       }
//     },
//   },
//   orderings: [
//     {
//       title: 'Newest First',
//       name: 'newestFirst',
//       by: [{ field: 'createdAt', direction: 'desc' }],
//     },
//     {
//       title: 'Oldest First',
//       name: 'oldestFirst',
//       by: [{ field: 'createdAt', direction: 'asc' }],
//     },
//   ],
// })