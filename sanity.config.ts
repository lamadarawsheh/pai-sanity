import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { documentInternationalization } from '@sanity/document-internationalization'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Practical AI Blog',
  projectId: 'ka9py84m',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
    codeInput(),
    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'ar', title: 'Arabic' },
      ],
      schemaTypes: [
        'blogPost',
        'author',
        'category',
        'codingChallenge',
        'learningPath',
        'chapter',
        'lesson',
      ],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})