/**
 * Sanity Data Import Script
 * 
 * This script imports sample data for the coding practice platform.
 * 
 * Usage:
 *   1. Get a write token from: https://www.sanity.io/manage/project/ka9py84m/api
 *   2. Run: SANITY_TOKEN=your_token node scripts/importData.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Configure the Sanity client
const client = createClient({
  projectId: 'ka9py84m',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// Read NDJSON file and parse into array of objects
function readNDJSON(filename) {
  const filepath = join(__dirname, '..', 'data', filename)
  const content = readFileSync(filepath, 'utf-8')
  return content
    .split('\n')
    .filter(line => line.trim())
    .map(line => JSON.parse(line))
}

// Import documents with transaction batching
async function importDocuments(documents, batchName) {
  console.log(`\n📦 Importing ${batchName}...`)
  
  const transaction = client.transaction()
  
  for (const doc of documents) {
    transaction.createOrReplace(doc)
  }
  
  try {
    const result = await transaction.commit()
    console.log(`✅ Imported ${documents.length} ${batchName}`)
    return result
  } catch (error) {
    console.error(`❌ Error importing ${batchName}:`, error.message)
    throw error
  }
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('❌ Missing SANITY_TOKEN environment variable')
    console.log('\nTo get a token:')
    console.log('1. Go to https://www.sanity.io/manage/project/ka9py84m/api')
    console.log('2. Create a new token with "Editor" permissions')
    console.log('3. Run: SANITY_TOKEN=your_token node scripts/importData.mjs')
    process.exit(1)
  }

  console.log('🚀 Starting Sanity data import...\n')
  console.log('Project: ka9py84m')
  console.log('Dataset: production')

  try {
    // Import in order (challenges first, then lessons that reference them, etc.)
    const challenges = readNDJSON('sample-challenges.ndjson')
    await importDocuments(challenges, 'Coding Challenges')

    const lessons = readNDJSON('sample-lessons.ndjson')
    await importDocuments(lessons, 'Lessons')

    const chapters = readNDJSON('sample-chapters.ndjson')
    await importDocuments(chapters, 'Chapters')

    const paths = readNDJSON('sample-learning-paths.ndjson')
    await importDocuments(paths, 'Learning Paths')

    console.log('\n✨ All data imported successfully!')
    console.log('\nImported:')
    console.log(`  • ${challenges.length} Coding Challenges`)
    console.log(`  • ${lessons.length} Lessons`)
    console.log(`  • ${chapters.length} Chapters`)
    console.log(`  • ${paths.length} Learning Paths`)
    
  } catch (error) {
    console.error('\n💥 Import failed:', error.message)
    process.exit(1)
  }
}

main()


