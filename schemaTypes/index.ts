import { blogPost } from './blogPost'
import { author } from './author'
import { category } from './category'
import { comment } from './comment'
import { subscriber } from './user'
import { like } from './like'
// Coding Practice Platform
import { codingChallenge } from './codingChallenge'
import { submission } from './submission'
import { userCodingProfile } from './userCodingProfile'
import { learningPath } from './learningPath'
import { chapter } from './chapter'
import { lesson } from './lesson'
import { userProgress } from './userProgress'

export const schemaTypes = [
  // Blog
  blogPost,
  author,
  category,
  subscriber,
  comment,
  like,
  // Coding Practice Platform
  codingChallenge,
  submission,
  userCodingProfile,
  learningPath,
  chapter,
  lesson,
  userProgress,
]